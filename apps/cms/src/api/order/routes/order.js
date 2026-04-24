"use strict";

module.exports = {
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
