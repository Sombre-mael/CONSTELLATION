# CONSTELLATION Blog Backend

## Déploiement sur Railway

### Étape 1 : Créer un compte Railway
1. Allez sur https://railway.app
2. Cliquez "Login" puis "Login with GitHub"
3. Autorisez Railway à accéder à votre GitHub

### Étape 2 : Créer une base de données MongoDB
1. Dans Railway, cliquez "New Project"
2. Cliquez "Provision MongoDB"
3. Attendez que MongoDB soit créé
4. Cliquez sur MongoDB, allez dans "Variables"
5. Copiez la valeur de `MONGO_URL`

### Étape 3 : Déployer le backend
1. Dans le même projet, cliquez "New" → "GitHub Repo"
2. Sélectionnez votre repo (ou uploadez ce dossier)
3. Railway détectera automatiquement Python

### Étape 4 : Configurer les variables d'environnement
Dans Railway, ajoutez ces variables :
- `MONGO_URL` = (la valeur copiée à l'étape 2)
- `DB_NAME` = constellation_blog
- `JWT_SECRET` = votre_secret_tres_long_et_complexe
- `ADMIN_EMAIL` = constellation356@gmail.com
- `ADMIN_PASSWORD` = Constellation2025!
- `FRONTEND_URL` = https://votre-site.netlify.app

### Étape 5 : Obtenir l'URL du backend
1. Une fois déployé, Railway vous donne une URL comme : `https://xxx.railway.app`
2. Notez cette URL

### Étape 6 : Configurer Netlify
Mettez à jour votre frontend pour utiliser l'URL Railway.
