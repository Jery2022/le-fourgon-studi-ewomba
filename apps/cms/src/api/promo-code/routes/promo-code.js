"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

const defaultRouter = createCoreRouter("api::promo-code.promo-code");

const customRouter = {
  routes: [
    {
      method: "GET",
      path: "/promo-codes/validate",
      handler: "promo-code.validate",
      config: { auth: false, policies: [] },
    },
  ],
};

module.exports = {
  routes: [...customRouter.routes, ...defaultRouter.routes],
};
