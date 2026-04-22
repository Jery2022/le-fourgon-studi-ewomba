"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

const defaultRouter = createCoreRouter("api::order.order");

const customRouter = {
  routes: [
    {
      method: "POST",
      path: "/orders/checkout",
      handler: "order.createFromCheckout",
      config: { policies: [] },
    },
    {
      method: "PUT",
      path: "/orders/:id/status",
      handler: "order.updateStatus",
      config: { policies: [] },
    },
  ],
};

module.exports = {
  routes: [...customRouter.routes, ...defaultRouter.routes],
};
