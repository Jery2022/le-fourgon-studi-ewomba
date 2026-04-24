// ══════════════════════════════════════════════
//  Order Lifecycles — Hooks Strapi
//  afterCreate : envoyer email confirmation
//  afterUpdate : webhook revalidation frontend si statut change
// ══════════════════════════════════════════════

"use strict";

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Envoyer email de confirmation
    try {
      if (result.customer) {
        const user = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          result.customer,
        );

        if (user && user.email) {
          await strapi.plugins["email"]?.services?.email?.send({
            to: user.email,
            subject: `Commande ${result.orderNumber} confirm\u00e9e \u2014 Le Fourgon`,
            text: `Bonjour ${user.firstName || ""},\n\nVotre commande ${result.orderNumber} est confirm\u00e9e.\nTotal : ${(result.total / 100).toFixed(2)}\u20ac\n\nMerci pour votre engagement \u00e9co-responsable !\n\nL\u2019\u00e9quipe Le Fourgon`,
          });
        }
      }
    } catch (err) {
      strapi.log.error("Erreur envoi email confirmation commande:", err);
    }

    // D\u00e9clencher revalidation frontend
    await triggerRevalidation("order", result);
  },

  async afterUpdate(event) {
    const { result } = event;
    await triggerRevalidation("order", result);
  },
};

async function triggerRevalidation(model, entry) {
  const frontendUrl = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATION_SECRET;

  if (!frontendUrl || !secret) return;

  try {
    await fetch(`${frontendUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-secret": secret,
      },
      body: JSON.stringify({ model, entry: { id: entry.id } }),
    });
  } catch (err) {
    strapi.log.warn("Revalidation frontend \u00e9chou\u00e9e:", err.message);
  }
}
