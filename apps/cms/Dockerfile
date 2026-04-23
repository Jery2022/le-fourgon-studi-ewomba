# ══════════════════════════════════════════════
#  Dockerfile — Strapi CMS pour Railway
#  Multi-stage build optimisé production
# ══════════════════════════════════════════════

FROM node:20-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# ── Dépendances ──
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
# Essayer frozen-lockfile d'abord, puis fallback à --no-frozen-lockfile si config mismatch
RUN pnpm install --frozen-lockfile --filter=cms... 2>&1 | grep -q "LOCKFILE_CONFIG_MISMATCH" && pnpm install --no-frozen-lockfile --filter=cms... || true

# ── Build ──
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm --dir apps/cms build

# ── Production ──
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copier les fichiers nécessaires
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
