# 🚚 Le Fourgon — Application Web

> Livraison de boissons en bouteilles consignées — Économie circulaire

## Stack technique

| Couche | Technologie |
|--------|-------------|
| **Frontend** | Next.js 15 (App Router, React 19, TypeScript) |
| **Backend / CMS** | Strapi v5 (Headless CMS) |
| **Base de données** | PostgreSQL 16 |
| **Design system** | Tailwind CSS + Radix UI |
| **Paiement** | Stripe |
| **Auth** | NextAuth.js |
| **Déploiement** | Vercel (web) + Railway (CMS + DB) |
| **Monorepo** | Turborepo + pnpm |

## Structure du projet

```
le-fourgon/
├── apps/
│   ├── web/              → Application Next.js (frontend)
│   └── cms/              → Instance Strapi (backend)
├── packages/
│   ├── ui/               → Composants design system
│   ├── types/            → Types TypeScript partagés
│   ├── utils/            → Utilitaires communs
│   └── config/           → Config TS, ESLint, Tailwind, Prettier
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Démarrage rapide

### Prérequis

- **Node.js** >= 20
- **pnpm** >= 9 (`npm install -g pnpm`)
- **PostgreSQL** 16 (local ou Docker)

### Installation

```bash
# 1. Cloner le repo
git clone https://github.com/studigital/le-fourgon.git
cd le-fourgon

# 2. Installer les dépendances
pnpm install

# 3. Configurer les variables d'environnement
cp apps/web/.env.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env.local
# Éditer les fichiers .env.local avec vos valeurs

# 4. Lancer en développement
pnpm dev
```

L'application sera disponible sur :
- **Frontend** : http://localhost:3000
- **Strapi Admin** : http://localhost:1337/admin

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Lance tous les services en développement |
| `pnpm build` | Build de production |
| `pnpm lint` | Linting du code |
| `pnpm typecheck` | Vérification des types TypeScript |
| `pnpm format` | Formatage du code (Prettier) |
| `pnpm clean` | Nettoyage des builds et node_modules |

## Conventions

### Branches Git (Git Flow)

- `main` → Production
- `develop` → Développement
- `feature/xxx` → Nouvelles fonctionnalités
- `fix/xxx` → Corrections de bugs
- `release/x.x.x` → Préparation de release

### Commits (Conventional Commits)

```
feat: ajouter le panier d'achat
fix: corriger le calcul de consigne
docs: mettre à jour le README
style: reformater les composants UI
refactor: restructurer le client API Strapi
test: ajouter les tests du tunnel de commande
chore: mettre à jour les dépendances
```

## Équipe

| Rôle | Responsable |
|------|-------------|
| Chef de projet | Yves |
| Agence | Studigital |
| Client | Le Fourgon |

---

*Projet réalisé par [Studigital](https://studigital.fr) pour Le Fourgon — 2026*
