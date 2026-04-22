# Deploiement Le Fourgon

## Architecture de production

```
[Utilisateur] → [Vercel CDN] → [Next.js App (SSR/ISR)]
                                      ↓
                              [Strapi API (Railway)]
                                      ↓
                              [PostgreSQL (Railway)]
                              [Cloudinary CDN (medias)]
```

## 1. Frontend — Vercel

### Setup initial

```bash
# Installer Vercel CLI
npm i -g vercel

# Lier le projet (depuis apps/web)
cd apps/web
vercel link

# Configurer le root directory dans Vercel Dashboard :
# → Settings → General → Root Directory → apps/web
# → Build Command → cd ../.. && pnpm turbo run build --filter=web
# → Install Command → cd ../.. && pnpm install
# → Output Directory → .next
```

### Variables d'environnement Vercel

Ajouter dans **Settings → Environment Variables** :

| Variable | Environnement | Valeur |
|----------|--------------|--------|
| `NEXT_PUBLIC_STRAPI_API_URL` | Production | `https://api.le-fourgon-studi-ewomba.fr` |
| `NEXT_PUBLIC_STRAPI_API_URL` | Preview/Dev | `https://api-staging.le-fourgon-studi-ewomba.fr` |
| `STRAPI_API_TOKEN` | Tous | Token API Strapi (Full access) |
| `REVALIDATION_SECRET` | Tous | Secret partage avec Strapi (32 chars) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Production | `pk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Preview | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Production | `sk_live_...` |
| `STRIPE_SECRET_KEY` | Preview | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Tous | `whsec_...` |
| `NEXTAUTH_URL` | Production | `https://le-fourgon-studi-ewomba.fr` |
| `NEXTAUTH_SECRET` | Tous | Secret NextAuth (32 chars) |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://le-fourgon-studi-ewomba.fr` |

### Domaines

```
le-fourgon-studi-ewomba.fr         → Production (main)
staging.le-fourgon-studi-ewomba.fr → Staging (develop)
preview-*.vercel.app               → Preview (PR)
```

### Deploiement

```bash
# Preview (automatique sur chaque PR)
git push origin feature/sprint-1-homepage

# Staging (automatique sur push develop)
git checkout develop && git merge feature/sprint-1-homepage && git push

# Production (automatique sur push main)
git checkout main && git merge develop && git push
```

---

## 2. Backend — Railway

### Setup initial

1. Creer un projet sur [railway.app](https://railway.app)
2. Ajouter un service **PostgreSQL** (provision automatique)
3. Ajouter un service **Custom** (depuis le repo GitHub)
4. Configurer :
   - **Root Directory** : `/` (racine du monorepo)
   - **Dockerfile Path** : `apps/cms/Dockerfile`

### Variables d'environnement Railway

| Variable | Valeur |
|----------|--------|
| `HOST` | `0.0.0.0` |
| `PORT` | `1337` |
| `APP_KEYS` | `openssl rand -base64 32` (x2, separees par virgule) |
| `ADMIN_JWT_SECRET` | `openssl rand -base64 32` |
| `API_TOKEN_SALT` | `openssl rand -base64 32` |
| `JWT_SECRET` | `openssl rand -base64 32` |
| `TRANSFER_TOKEN_SALT` | `openssl rand -base64 32` |
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_HOST` | `${{Postgres.PGHOST}}` (ref Railway) |
| `DATABASE_PORT` | `${{Postgres.PGPORT}}` |
| `DATABASE_NAME` | `${{Postgres.PGDATABASE}}` |
| `DATABASE_USERNAME` | `${{Postgres.PGUSER}}` |
| `DATABASE_PASSWORD` | `${{Postgres.PGPASSWORD}}` |
| `DATABASE_SSL` | `true` |
| `FRONTEND_URL` | `https://le-fourgon-studi-ewomba.fr` |
| `REVALIDATION_SECRET` | Meme secret que Vercel |
| `CLOUDINARY_NAME` | Votre cloud name |
| `CLOUDINARY_KEY` | Votre API key |
| `CLOUDINARY_SECRET` | Votre API secret |

### Domaine personnalise

```
api.le-fourgon-studi-ewomba.fr → Service Strapi Railway
```

### Webhook de deploiement

Copier le Deploy Hook Railway dans GitHub Secrets :
- `RAILWAY_STAGING_DEPLOY_HOOK`
- `RAILWAY_PROD_DEPLOY_HOOK`

---

## 3. Stripe

### Configuration

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# Se connecter
stripe login

# Ecouter les webhooks en dev
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Webhooks Stripe (Production)

Ajouter dans Stripe Dashboard → Developers → Webhooks :
- **URL** : `https://le-fourgon-studi-ewomba.fr/api/webhooks/stripe`
- **Events** : `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

---

## 4. Cloudinary

### Configuration Strapi

```bash
# Installer le provider dans apps/cms
cd apps/cms
pnpm add @strapi/provider-upload-cloudinary
```

Ajouter dans `apps/cms/config/plugins.ts` :

```typescript
export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
});
```

---

## 5. Monitoring

### Sentry (erreurs)

```bash
cd apps/web
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Vercel Analytics

Active dans le dashboard Vercel :
- **Settings → Analytics → Enable**
- **Settings → Speed Insights → Enable**

---

## 6. Checklist Pre-Launch

- [ ] Variables d'environnement configurees (Vercel + Railway)
- [ ] Domaines DNS configures et SSL actif
- [ ] Stripe en mode live avec webhooks
- [ ] Cloudinary configure pour les medias
- [ ] Seed data charge dans Strapi production
- [ ] Permissions Strapi configurees (Public: find/findOne)
- [ ] API Token cree et copie dans Vercel
- [ ] REVALIDATION_SECRET identique Vercel ↔ Railway
- [ ] Backup PostgreSQL automatique configure
- [ ] Sentry configure et teste
- [ ] Lighthouse > 90 sur toutes les pages
- [ ] Tests E2E passes sur staging
- [ ] Redirections 301 configurees
- [ ] Robots.txt et sitemap.xml verifies
- [ ] Schema.org / Open Graph valides
- [ ] Go/No-Go avec le client Le Fourgon
