"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  // Cr\u00e9ation de commande depuis le checkout frontend
  async createFromCheckout(ctx) {
    const { items, deliveryAddress, deliverySlot, promoCode, paymentIntentId, stripeSessionId } = ctx.request.body;

    // G\u00e9n\u00e9rer num\u00e9ro de commande unique
    const now = new Date();
    const orderNumber = `LF-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;

    // Calculer les totaux
    const productIds = items.map((i) => i.productId);
    const products = await strapi.entityService.findMany("api::product.product", {
      filters: { id: { $in: productIds } },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));

    let subtotal = 0;
    let totalDeposit = 0;
    const orderItems = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) continue;
      const itemSub = product.price * item.quantity;
      const itemDep = product.depositAmount * item.quantity;
      subtotal += itemSub;
      totalDeposit += itemDep;
      orderItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        depositAmount: product.depositAmount,
        subtotal: itemSub,
      });
    }

    // Appliquer promo si pr\u00e9sent
    let promoDiscount = 0;
    if (promoCode) {
      const promos = await strapi.entityService.findMany("api::promo-code.promo-code", {
        filters: { code: promoCode, isActive: true },
      });
      if (promos.length > 0) {
        const promo = promos[0];
        if (promo.type === "percentage") {
          promoDiscount = Math.round(subtotal * promo.value / 100);
        } else {
          promoDiscount = promo.value;
        }
        // Incr\u00e9menter le compteur d'utilisation
        await strapi.entityService.update("api::promo-code.promo-code", promo.id, {
          data: { currentUses: promo.currentUses + 1 },
        });
      }
    }

    const deliveryFee = subtotal >= 4000 ? 0 : 490; // gratuit d\u00e8s 40\u20ac
    const total = subtotal + totalDeposit + deliveryFee - promoDiscount;

    // Cr\u00e9er la commande
    const order = await strapi.entityService.create("api::order.order", {
      data: {
        orderNumber,
        status: "confirmed",
        items: orderItems,
        subtotal,
        totalDeposit,
        deliveryFee,
        promoDiscount,
        total,
        deliveryAddress,
        deliverySlot,
        paymentIntentId: paymentIntentId || "",
        stripeSessionId: stripeSessionId || "",
        customer: ctx.state.user?.id || null,
        promoCode: promoCode || null,
      },
    });

    ctx.body = { data: order };
  },

  // Mise \u00e0 jour du statut (admin ou webhook Stripe)
  async updateStatus(ctx) {
    const { id } = ctx.params;
    const { status } = ctx.request.body;

    const validStatuses = ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled", "refunded"];
    if (!validStatuses.includes(status)) {
      return ctx.badRequest(`Statut invalide. Valeurs accept\u00e9es : ${validStatuses.join(", ")}`);
    }

    const order = await strapi.entityService.update("api::order.order", id, {
      data: { status },
    });

    ctx.body = { data: order };
  },
}));
