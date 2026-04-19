type EnvFn = {
  (key: string, defaultValue?: unknown): any;
};

export default ({ env }: { env: EnvFn }) => ({
  // ── GraphQL ──
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: env("NODE_ENV") !== "production",
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: env("NODE_ENV") !== "production",
      },
    },
  },

  // ── Users & Permissions ──
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "7d",
      },
      register: {
        allowedFields: ["firstName", "lastName", "phone"],
      },
    },
  },
});
