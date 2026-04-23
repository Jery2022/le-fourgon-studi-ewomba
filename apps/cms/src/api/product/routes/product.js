"use strict";
// @ts-nocheck

const { createCoreRouter } = require("@strapi/strapi").factories;

/** @type {any} */
const productRouter = createCoreRouter(
  "api::product.product",
  ({ extend }) => ({
    routes: [
      {
        method: "GET",
        path: "/products/search",
        handler: "product.search",
        config: { auth: false, policies: [] },
      },
      {
        method: "POST",
        path: "/products/calculate-cart",
        handler: "product.calculateCart",
        config: { auth: false, policies: [] },
      },
      ...extend.routes,
    ],
  }),
);

module.exports = productRouter;
