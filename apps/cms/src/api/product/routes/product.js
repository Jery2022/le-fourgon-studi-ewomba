"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

// Routes par d\u00e9faut (CRUD)
const defaultRouter = createCoreRouter("api::product.product");

// Routes custom
const customRouter = {
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
  ],
};

module.exports = {
  routes: [...customRouter.routes, ...defaultRouter.routes],
};
