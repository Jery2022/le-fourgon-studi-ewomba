// ══════════════════════════════════════════════
//  Configuration Base de Données — Strapi v5
//  PostgreSQL en production, SQLite en développement (optionnel)
// ══════════════════════════════════════════════

type EnvFn = {
  (key: string, defaultValue?: string): string;
  int: (key: string, defaultValue?: number) => number;
  bool: (key: string, defaultValue?: boolean) => boolean;
};

type DatabaseClient = "postgres" | "sqlite";

type DatabaseConfig = {
  connection: Record<string, unknown>;
  pool?: {
    min: number;
    max: number;
  };
  useNullAsDefault?: boolean;
};

export default ({ env }: { env: EnvFn }) => {
  const client = env("DATABASE_CLIENT", "postgres") as DatabaseClient;

  const connections: Record<DatabaseClient, DatabaseConfig> = {
    postgres: {
      connection: {
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "lefourgon_db"),
        user: env("DATABASE_USERNAME", "lefourgon"),
        password: env("DATABASE_PASSWORD", ""),
        ssl: env.bool("DATABASE_SSL", false) && {
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            true,
          ),
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: env("DATABASE_FILENAME", ".tmp/data.db"),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
