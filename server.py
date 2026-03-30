from dotenv import load_dotenv
load_dotenv()

import os
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import Optional, List
from bson import ObjectId
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request, Response, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient

# ============ CONFIG ============
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "constellation_blog")
JWT_SECRET = os.environ.get("JWT_SECRET", "fallback_secret_key")
JWT_ALGORITHM = "HS256"
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")

# ============ DATABASE ============
client = None
db = None

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

async def init_db():
    global client, db
    try:
        client = AsyncIOMotorClient(
            MONGO_URL,
            tls=True,
            tlsAllowInvalidCertificates=True,
            serverSelectionTimeoutMS=10000,
            connectTimeoutMS=10000
        )
        db = client[DB_NAME]
        await client.admin.command('ping')
        print("MongoDB connected successfully!")
        
        await db.users.create_index("email", unique=True)
        await db.articles.create_index([("title", "text"), ("content", "text"), ("tags", "text")])
        await db.articles.create_index("category")
        await db.articles.create_index("created_at")
        await db.categories.create_index("name", unique=True)
        
        admin_email = os.environ.get("ADMIN_EMAIL", "constellation356@gmail.com")
        admin_password = os.environ.get("ADMIN_PASSWORD", "Constellation2025!")
        
        existing = await db.users.find_one({"email": admin_email})
        if existing is None:
            hashed = hash_password(admin_password)
            await db.users.insert_one({
                "email": admin_email,
                "password_hash": hashed,
                "name": "Admin",
                "role": "admin",
                "created_at": datetime.now(timezone.utc)
            })
            print(f"Admin created: {admin_email}")
        
        default_categories = [
            {"name": "Actualités", "description": "Dernières nouvelles"},
            {"name": "Projets", "description": "Nos réalisations"},
            {"name": "Conseils", "description": "Conseils professionnels"},
            {"name": "Événements", "description": "Événements"}
        ]
        for cat in default_categories:
            await db.categories.update_one(
                {"name": cat["name"]},
                {"$setOnInsert": {**cat, "created_at": datetime.now(timezone.utc)}},
                upsert=True
            )
        print("Database initialized!")
    except Exception as e:
        print(f"MongoDB error: {e}")
        raise

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    if client:
        client.close()

app = FastAPI(title="CONSTELLATION Blog API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ArticleCreate(BaseModel):
    title: str
    content: str
    excerpt: str
    category: str
    tags: List[str] = []
    image_url: Optional[str] = None

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    image_url: Optional[str] = None
    published: Optional[bool] = None

class CommentCreate(BaseModel):
    author_name: str
    content: str

class CategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Non authentifié")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Token invalide")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="Utilisateur non trouvé")
        return {"id": str(user["_id"]), "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "user")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

async def get_admin_user(request: Request) -> dict:
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Accès admin requis")
    return user

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/auth/login")
async def login(request: LoginRequest, response: Response):
    user = await db.users.find_one({"email": request.email.lower()})
    if not user or not verify_password(request.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    access_token = create_access_token(str(user["_id"]), user["email"])
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="none", max_age=86400)
    return {"id": str(user["_id"]), "email": user["email"], "name": user.get("name"), "role": user.get("role"), "token": access_token}

@app.post("/api/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Déconnexion réussie"}

@app.get("/api/auth/me")
async def get_me(user: dict = Depends(get_current_user)):
    return user

@app.get("/api/categories")
async def get_categories():
    return await db.categories.find({}, {"_id": 0}).to_list(100)

@app.post("/api/categories")
async def create_category(category: CategoryCreate, user: dict = Depends(get_admin_user)):
    if await db.categories.find_one({"name": category.name}):
        raise HTTPException(status_code=400, detail="Catégorie existe déjà")
    await db.categories.insert_one({"name": category.name, "description": category.description, "created_at": datetime.now(timezone.utc)})
    return {"message": "Catégorie créée"}

@app.get("/api/articles")
async def get_articles(category: Optional[str] = None, search: Optional[str] = None, tag: Optional[str] = None, page: int = Query(1, ge=1), limit: int = Query(10, ge=1, le=50)):
    query = {"published": True}
    if category:
        query["category"] = category
    if tag:
        query["tags"] = tag
    if search:
        query["$text"] = {"$search": search}
    
    skip = (page - 1) * limit
    articles = await db.articles.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.articles.count_documents(query)
    
    result = []
    for a in articles:
        result.append({
            "id": str(a["_id"]), "title": a["title"], "excerpt": a["excerpt"], "content": a["content"],
            "category": a["category"], "tags": a.get("tags", []), "image_url": a.get("image_url"),
            "author_name": a.get("author_name", "Admin"), "likes_count": a.get("likes_count", 0),
            "comments_count": a.get("comments_count", 0), "published": a.get("published", True),
            "created_at": a["created_at"].isoformat() if isinstance(a["created_at"], datetime) else a["created_at"]
        })
    return {"articles": result, "total": total, "page": page, "pages": (total + limit - 1) // limit}

@app.get("/api/articles/all")
async def get_all_articles(user: dict = Depends(get_admin_user)):
    articles = await db.articles.find({}).sort("created_at", -1).to_list(100)
    result = []
    for a in articles:
        result.append({
            "id": str(a["_id"]), "title": a["title"], "excerpt": a["excerpt"], "content": a["content"],
            "category": a["category"], "tags": a.get("tags", []), "image_url": a.get("image_url"),
            "author_name": a.get("author_name", "Admin"), "likes_count": a.get("likes_count", 0),
            "comments_count": a.get("comments_count", 0), "published": a.get("published", True),
            "created_at": a["created_at"].isoformat() if isinstance(a["created_at"], datetime) else a["created_at"]
        })
    return {"articles": result}

@app.post("/api/articles")
async def create_article(article: ArticleCreate, user: dict = Depends(get_admin_user)):
    doc = {
        "title": article.title, "content": article.content, "excerpt": article.excerpt,
        "category": article.category, "tags": article.tags, "image_url": article.image_url,
        "author_id": user["id"], "author_name": user["name"], "likes_count": 0, "comments_count": 0,
        "likes": [], "published": True, "created_at": datetime.now(timezone.utc), "updated_at": datetime.now(timezone.utc)
    }
    result = await db.articles.insert_one(doc)
    return {"id": str(result.inserted_id), "message": "Article créé"}

@app.get("/api/articles/{article_id}")
async def get_article(article_id: str):
    try:
        article = await db.articles.find_one({"_id": ObjectId(article_id)})
    except:
        raise HTTPException(status_code=400, detail="ID invalide")
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    
    comments = await db.comments.find({"article_id": article_id}).sort("created_at", -1).to_list(100)
    comments_list = [{"id": str(c["_id"]), "author_name": c["author_name"], "content": c["content"], 
                      "created_at": c["created_at"].isoformat() if isinstance(c["created_at"], datetime) else c["created_at"]} for c in comments]
    
    return {
        "id": str(article["_id"]), "title": article["title"], "content": article["content"],
        "excerpt": article["excerpt"], "category": article["category"], "tags": article.get("tags", []),
        "image_url": article.get("image_url"), "author_name": article.get("author_name", "Admin"),
        "likes_count": article.get("likes_count", 0), "comments_count": article.get("comments_count", 0),
        "published": article.get("published", True), "comments": comments_list,
        "created_at": article["created_at"].isoformat() if isinstance(article["created_at"], datetime) else article["created_at"]
    }

@app.put("/api/articles/{article_id}")
async def update_article(article_id: str, article: ArticleUpdate, user: dict = Depends(get_admin_user)):
    try:
        existing = await db.articles.find_one({"_id": ObjectId(article_id)})
    except:
        raise HTTPException(status_code=400, detail="ID invalide")
    if not existing:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    
    update_data = {"updated_at": datetime.now(timezone.utc)}
    for field in ["title", "content", "excerpt", "category", "tags", "image_url", "published"]:
        val = getattr(article, field)
        if val is not None:
            update_data[field] = val
    
    await db.articles.update_one({"_id": ObjectId(article_id)}, {"$set": update_data})
    return {"message": "Article mis à jour"}

@app.delete("/api/articles/{article_id}")
async def delete_article(article_id: str, user: dict = Depends(get_admin_user)):
    try:
        result = await db.articles.delete_one({"_id": ObjectId(article_id)})
    except:
        raise HTTPException(status_code=400, detail="ID invalide")
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    await db.comments.delete_many({"article_id": article_id})
    return {"message": "Article supprimé"}

@app.post("/api/articles/{article_id}/like")
async def like_article(article_id: str, request: Request):
    try:
        article = await db.articles.find_one({"_id": ObjectId(article_id)})
    except:
        raise HTTPException(status_code=400, detail="ID invalide")
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    
    client_ip = request.client.host if request.client else "unknown"
    likes = article.get("likes", [])
    
    if client_ip in likes:
        likes.remove(client_ip)
    else:
        likes.append(client_ip)
    
    await db.articles.update_one({"_id": ObjectId(article_id)}, {"$set": {"likes": likes, "likes_count": len(likes)}})
    return {"liked": client_ip in likes, "likes_count": len(likes)}

@app.post("/api/articles/{article_id}/comments")
async def add_comment(article_id: str, comment: CommentCreate):
    try:
        article = await db.articles.find_one({"_id": ObjectId(article_id)})
    except:
        raise HTTPException(status_code=400, detail="ID invalide")
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    
    doc = {"article_id": article_id, "author_name": comment.author_name, "content": comment.content, "created_at": datetime.now(timezone.utc)}
    result = await db.comments.insert_one(doc)
    await db.articles.update_one({"_id": ObjectId(article_id)}, {"$inc": {"comments_count": 1}})
    return {"id": str(result.inserted_id), "author_name": comment.author_name, "content": comment.content, "created_at": doc["created_at"].isoformat()}

@app.get("/api/articles/{article_id}/comments")
async def get_comments(article_id: str):
    comments = await db.comments.find({"article_id": article_id}).sort("created_at", -1).to_list(100)
    return {"comments": [{"id": str(c["_id"]), "author_name": c["author_name"], "content": c["content"],
                          "created_at": c["created_at"].isoformat() if isinstance(c["created_at"], datetime) else c["created_at"]} for c in comments]}

@app.get("/api/tags")
async def get_tags():
    pipeline = [{"$match": {"published": True}}, {"$unwind": "$tags"}, {"$group": {"_id": "$tags", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}, {"$limit": 20}]
    tags = await db.articles.aggregate(pipeline).to_list(20)
    return [{"name": t["_id"], "count": t["count"]} for t in tags]
