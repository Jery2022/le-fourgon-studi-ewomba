// ══════════════════════════════════════════════
//  Product Controller — Custom endpoints
//  GET /api/products/search?q=...
//  POST /api/products/calculate-cart
// ══════════════════════════════════════════════

"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  // Recherche full-text produits
  async search(ctx) {
    const { q, category, bio, page = 1, pageSize = 20 } = ctx.query;

    const filters = { isAvailable: true };
    if (category) filters.category = { slug: { $eq: category } };
    if (bio === "true") filters.isBio = true;

    let where = { ...filters };
    if (q) {
      where.$or = [
        { name: { $containsi: q } },
        { shortDescription: { $containsi: q } },
        { producer: { $containsi: q } },
        { origin: { $containsi: q } },
      ];
    }

    const results = await strapi.entityService.findMany("api::product.product", {
      filters: where,
      populate: ["images", "category"],
      sort: { category: { order: "asc" }, name: "asc" },
      start: (page - 1) * pageSize,
      limit: pageSize,
    });

    const total = await strapi.entityService.count("api::product.product", { filters: where });

    ctx.body = {
      data: results,
      meta: { pagination: { page: +page, pageSize: +pageSize, pageCount: Math.ceil(total / pageSize), total } },
    };
  },

  // Calcul panier avec consignes
  async calculateCart(ctx) {
    const { items } = ctx.request.body; // [{ productId, quantity }]

    if (!items || !Array.isArray(items)) {
      return ctx.badRequest("Le champ items est requis (tableau de { productId, quantity })");
    }

    const productIds = items.map((i) => i.productId);
    const products = await strapi.entityService.findMany("api::product.product", {
      filters: { id: { $in: productIds }, isAvailable: true },
      populate: ["category"],
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    let subtotal = 0;
    let totalDeposit = 0;
    const cartItems = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) continue;

      const itemSubtotal = product.price * item.quantity;
      const itemDeposit = product.depositAmount * item.quantity;

      subtotal += itemSubtotal;
      totalDeposit += itemDeposit;

      cartItems.push({
        product: { id: product.id, name: product.name, slug: product.slug, price: product.price, depositAmount: product.depositAmount, volume: product.volume },
        quantity: item.quantity,
        subtotal: itemSubtotal,
        depositTotal: itemDeposit,
      });
    }

    ctx.body = {
      data: {
        items: cartItems,
        subtotal,
        totalDeposit,
        total: subtotal + totalDeposit,
      },
    };
  },
}));
