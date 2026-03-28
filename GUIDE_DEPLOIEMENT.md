# 🚀 Guide de Déploiement Backend CONSTELLATION

## Ce dont vous avez besoin :
- Un compte GitHub (vous l'avez déjà)
- 5 minutes de votre temps

---

## 📋 ÉTAPE 1 : Créer une base de données MongoDB (2 min)

1. Allez sur **https://www.mongodb.com/atlas**
2. Cliquez **"Try Free"** → Créez un compte (ou connectez-vous avec Google)
3. Créez un cluster **FREE** (M0 Sandbox)
4. Choisissez la région la plus proche (ex: Europe - Paris)
5. Cliquez **"Create Cluster"**

### Configurer l'accès :
1. Dans le menu gauche : **Database Access** → **Add New Database User**
   - Username: `constellation`
   - Password: `Constellation2025` (notez-le !)
   - Cliquez **Add User**

2. Dans le menu gauche : **Network Access** → **Add IP Address**
   - Cliquez **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Cliquez **Confirm**

3. Retournez dans **Database** → Cliquez **Connect** → **Connect your application**
   - Copiez l'URL qui ressemble à :
   ```
   mongodb+srv://constellation:Constellation2025@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

## 📋 ÉTAPE 2 : Déployer sur Render (3 min)

1. Allez sur **https://render.com**
2. Cliquez **"Get Started for Free"** → Connectez-vous avec **GitHub**

3. Cliquez **"New +"** → **"Web Service"**

4. Choisissez **"Build and deploy from a Git repository"** → **Next**

5. Connectez votre repo GitHub ou utilisez **"Public Git repository"** et entrez :
   ```
   https://github.com/VOTRE_USERNAME/constellation-backend
   ```

6. Configurez :
   - **Name**: `constellation-api`
   - **Region**: Frankfurt (EU) ou le plus proche
   - **Branch**: `main`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

7. Cliquez **"Advanced"** et ajoutez ces **Environment Variables** :
   
   | Key | Value |
   |-----|-------|
   | `MONGO_URL` | (l'URL MongoDB copiée à l'étape 1) |
   | `DB_NAME` | `constellation_blog` |
   | `JWT_SECRET` | `constellation_jwt_secret_key_2025_secure` |
   | `ADMIN_EMAIL` | `constellation356@gmail.com` |
   | `ADMIN_PASSWORD` | `Constellation2025!` |
   | `FRONTEND_URL` | `https://votre-site.netlify.app` |

8. Cliquez **"Create Web Service"**

9. Attendez 2-3 minutes que le déploiement se termine

10. Render vous donnera une URL comme : `https://constellation-api.onrender.com`

---

## 📋 ÉTAPE 3 : Configurer votre site Netlify

1. Dans votre code frontend, mettez à jour le fichier `/src/services/api.js` :

```javascript
const API_URL = 'https://constellation-api.onrender.com';
```

2. Mettez aussi à jour `/src/context/AuthContext.jsx` :

```javascript
const API_URL = 'https://constellation-api.onrender.com';
```

3. Redéployez sur Netlify

---

## ✅ C'est terminé !

Votre blog avec admin devrait maintenant fonctionner !

**Identifiants Admin :**
- Email : `constellation356@gmail.com`
- Mot de passe : `Constellation2025!`
