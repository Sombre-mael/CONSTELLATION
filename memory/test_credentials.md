# Test Credentials

## Admin Account
- **Email**: constellation356@gmail.com
- **Password**: Constellation2025!
- **Role**: admin

## Access URLs
- Site principal: /
- Blog: /blog
- Admin Login: /admin/login
- Admin Dashboard: /admin

## Auth Endpoints
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

## Blog Endpoints
- GET /api/articles (public - articles publiés)
- GET /api/articles/all (admin - tous les articles)
- POST /api/articles (admin only)
- GET /api/articles/:id
- PUT /api/articles/:id (admin only)
- DELETE /api/articles/:id (admin only)
- POST /api/articles/:id/like (anonyme)
- POST /api/articles/:id/comments (anonyme)
- GET /api/categories
- GET /api/tags
