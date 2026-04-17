// ══════════════════════════════════════════════
//  Configuration Serveur — Strapi v5
//  Le Fourgon CMS
// ══════════════════════════════════════════════

export default ({ env }) => ({
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
