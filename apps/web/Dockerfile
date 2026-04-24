# ── Dockerfile NextJS (dev mode hot-reload) ──
FROM node:20-bookworm-slim

# Créer un dossier de travail
WORKDIR /app

# Installer pnpm (ou npm/yarn selon ton monorepo)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copier uniquement les fichiers de config pour installer les deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/

# Installer les dépendances du frontend
RUN pnpm install --filter=frontend...

# Copier le code source
COPY apps/frontend ./apps/frontend

# Exposer le port NextJS
EXPOSE 3000

# Lancer en mode dev avec hot-reload
CMD ["pnpm", "--dir", "apps/frontend", "dev"]
