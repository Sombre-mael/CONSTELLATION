# PRD - CONSTELLATION Blog

## Problem Statement
Ajout d'une fonctionnalité de blog sur le site CONSTELLATION (agence multiservices à Lubumbashi) permettant de poster des informations importantes de l'entreprise avec interactions des visiteurs.

## User Choices
- Likes simples + commentaires
- Seuls les administrateurs peuvent poster
- Catégories/tags, recherche, partage social
- Réactions anonymes autorisées

## Architecture
- **Frontend**: Vite + React + Tailwind CSS (dans /app)
- **Backend**: FastAPI + MongoDB (dans /app/backend)
- **Auth**: JWT avec bcrypt pour le hashing

## Core Requirements
1. ✅ Blog avec liste d'articles paginés
2. ✅ Filtrage par catégorie et tags
3. ✅ Recherche full-text
4. ✅ Détail article avec contenu complet
5. ✅ Likes anonymes (basés sur IP)
6. ✅ Commentaires anonymes (nom + contenu)
7. ✅ Partage social (Facebook, Twitter, LinkedIn, WhatsApp, copier lien)
8. ✅ Admin login sécurisé
9. ✅ Dashboard admin avec stats
10. ✅ CRUD articles complet

## What's Been Implemented (28 Mars 2026)
- Backend FastAPI avec endpoints complets
- Pages Blog et ArticleDetail
- Interface admin (login + dashboard)
- Système de likes toggle
- Commentaires anonymes
- Partage social
- Navigation mise à jour (Header + Footer)
- 2 articles de test créés
- 4 catégories par défaut

## User Personas
1. **Visiteur** : Consulte le blog, like et commente anonymement
2. **Admin** : Crée, modifie, publie/dépublie et supprime les articles

## Prioritized Backlog
- P0: ✅ MVP Blog complet
- P1: Notifications email pour nouveaux articles
- P1: Upload d'images directement (au lieu d'URL)
- P2: Modération des commentaires
- P2: Newsletter subscription

## Next Tasks
- Ajouter plus de contenu (articles)
- Personnaliser les catégories selon les services
