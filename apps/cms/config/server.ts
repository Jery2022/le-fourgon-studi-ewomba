// ══════════════════════════════════════════════
//  Configuration Serveur — Strapi v5
//  Le Fourgon CMS
// ══════════════════════════════════════════════

type EnvFn = {
  (key: string, defaultValue?: unknown): any;
  int: (key: string, defaultValue?: number) => number;
  array: (key: string, defaultValue?: string[]) => string[];
  bool: (key: string, defaultValue?: boolean) => boolean;
};

export default ({ env }: { env: EnvFn }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("PUBLIC_URL", "http://localhost:1337"),
  app: {
    keys: env.array("APP_KEYS", ["key1-default", "key2-default"]),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
