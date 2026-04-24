"use strict";

module.exports = {
  async beforeCreate(event) {
    calculateReadingTime(event);
  },
  async beforeUpdate(event) {
    calculateReadingTime(event);
  },
  async afterCreate(event) {
    await revalidate("article", event.result);
  },
  async afterUpdate(event) {
    await revalidate("article", event.result);
  },
  async afterDelete(event) {
    await revalidate("article", event.result);
  },
};

function calculateReadingTime(event) {
  const { data } = event.params;
  if (data.content) {
    const wordCount = data.content.replace(/<[^>]*>/g, "").trim().split(/\s+/).length;
    data.readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }
}

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
