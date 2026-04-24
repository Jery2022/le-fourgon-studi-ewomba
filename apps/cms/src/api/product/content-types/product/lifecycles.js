"use strict";

module.exports = {
  async afterCreate(event) {
    await revalidate("product", event.result);
  },
  async afterUpdate(event) {
    await revalidate("product", event.result);
  },
  async afterDelete(event) {
    await revalidate("product", event.result);
  },
};

async function revalidate(model, entry) {
  const url = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATION_SECRET;
  if (!url || !secret) return;
  try {
    await fetch(`${url}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-revalidate-secret": secret },
      body: JSON.stringify({ model, entry: { slug: entry.slug, id: entry.id } }),
    });
  } catch (err) {
    strapi.log.warn(`Revalidation ${model} \u00e9chou\u00e9e:`, err.message);
  }
}
