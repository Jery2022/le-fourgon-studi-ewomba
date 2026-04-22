# ══════════════════════════════════════════════
#  Dockerfile — Strapi CMS pour Railway
#  Multi-stage build optimisé production
# ══════════════════════════════════════════════

FROM node:20-alpine3.19 AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@9.12.3

# ── Dépendances ──
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
RUN pnpm install --frozen-lockfile --filter=cms...

# ── Build ──
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY . .
ENV NODE_ENV=production
RUN cd apps/cms && pnpm build

# ── Production ──
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copier les fichiers n\u00e9cessaires
COPY --from=builder /app/apps/cms/dist ./apps/cms/dist
COPY --from=builder /app/apps/cms/config ./apps/cms/config
COPY --from=builder /app/apps/cms/src ./apps/cms/src
COPY --from=builder /app/apps/cms/database ./apps/cms/database
COPY --from=builder /app/apps/cms/public ./apps/cms/public
COPY --from=builder /app/apps/cms/package.json ./apps/cms/
COPY --from=builder /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/cms

EXPOSE 1337

CMD ["pnpm", "start"]
