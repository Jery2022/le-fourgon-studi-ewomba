"use strict";

module.exports = {
  async register(/* { strapi } */) {
    // Enregistrement de plugins ou modifications du schema
  },

  async bootstrap({ strapi }) {
    // Exécuter le seed automatique
    const bootstrapFn = require("./bootstrap");
    await bootstrapFn({ strapi });
  },
};
