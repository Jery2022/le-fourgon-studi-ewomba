module.exports = ({ env }) => ({
  stripe: {
    publicKey: env("STRIPE_PUBLIC_KEY"),
    secretKey: env("STRIPE_SECRET_KEY"),
  },
});
