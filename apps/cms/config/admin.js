module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "admin-jwt-secret-default"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "api-token-salt-default"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "transfer-token-salt-default"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
