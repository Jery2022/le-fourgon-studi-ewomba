"use strict";
// @ts-nocheck

const { createCoreRouter } = require("@strapi/strapi").factories;

/** @type {any} */
const promoCodeRouter = createCoreRouter(
  "api::promo-code.promo-code",
  ({ extend }) => ({
    routes: [
      {
        method: "GET",
        path: "/promo-codes/validate",
        handler: "promo-code.validate",
        config: { auth: false, policies: [] },
      },
      ...extend.routes,
    ],
  }),
);

module.exports = promoCodeRouter;
