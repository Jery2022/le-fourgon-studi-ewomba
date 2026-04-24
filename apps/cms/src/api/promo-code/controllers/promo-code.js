"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::promo-code.promo-code", ({ strapi }) => ({
  async validate(ctx) {
    const { code, orderAmount } = ctx.query;

    if (!code) return ctx.badRequest("Le param\u00e8tre code est requis.");

    const promos = await strapi.entityService.findMany("api::promo-code.promo-code", {
      filters: { code: { $eq: code }, isActive: true },
    });

    if (promos.length === 0) {
      return ctx.notFound("Code promo invalide ou expir\u00e9.");
    }

    const promo = promos[0];

    // V\u00e9rifier expiration
    if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
      return ctx.notFound("Ce code promo a expir\u00e9.");
    }

    // V\u00e9rifier limite d'utilisation
    if (promo.maxUses && promo.currentUses >= promo.maxUses) {
      return ctx.notFound("Ce code promo a atteint sa limite d\u2019utilisation.");
    }

    // V\u00e9rifier montant minimum
    if (promo.minOrderAmount && orderAmount && +orderAmount < promo.minOrderAmount) {
      return ctx.badRequest(`Montant minimum de commande : ${(promo.minOrderAmount / 100).toFixed(2)}\u20ac`);
    }

    // Calculer la r\u00e9duction
    let discount = 0;
    if (orderAmount) {
      discount = promo.type === "percentage"
        ? Math.round(+orderAmount * promo.value / 100)
        : promo.value;
    }

    ctx.body = {
      data: {
        code: promo.code,
        type: promo.type,
        value: promo.value,
        discount,
        valid: true,
      },
    };
  },
}));
