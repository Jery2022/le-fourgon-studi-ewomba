// ══════════════════════════════════════════════
//  Bootstrap Strapi — Ex\u00e9cut\u00e9 au d\u00e9marrage
//  - Auto-seed si la base est vide
//  - Configuration des permissions publiques
// ══════════════════════════════════════════════

"use strict";

const seedData = require("../../database/seeds/seed");

module.exports = async ({ strapi }) => {
  // Vérifier si des données existent déjà
  const existingProducts = await strapi.entityService.count(
    "api::product.product",
  );

  if (existingProducts > 0) {
    strapi.log.info(
      "Donn\u00e9es existantes d\u00e9tect\u00e9es, seed ignor\u00e9.",
    );
    return;
  }

  strapi.log.info("Base vide détectée Lancement du seed...");

  try {
    // 1. Catégories produits
    const catMap = new Map();
    for (const cat of seedData.PRODUCT_CATEGORIES) {
      const created = await strapi.entityService.create(
        "api::product-category.product-category",
        { data: cat },
      );
      catMap.set(cat.slug, created.id);
    }
    strapi.log.info(
      `\u2713 ${seedData.PRODUCT_CATEGORIES.length} catégories produits créées`,
    );

    // 2. Produits
    for (const p of seedData.PRODUCTS) {
      const { catSlug, ...productData } = p;
      await strapi.entityService.create("api::product.product", {
        data: {
          ...productData,
          isAvailable: true,
          isNew: p.isNew || false,
          category: catMap.get(catSlug),
          publishedAt: new Date(),
        },
      });
    }
    strapi.log.info(
      `\u2713 ${seedData.PRODUCTS.length} produits cr\u00e9\u00e9s`,
    );

    // 3. Catégories articles
    const artCatMap = new Map();
    for (const cat of seedData.ARTICLE_CATEGORIES) {
      const created = await strapi.entityService.create(
        "api::article-category.article-category",
        { data: cat },
      );
      artCatMap.set(cat.slug, created.id);
    }
    strapi.log.info(
      `\u2713 ${seedData.ARTICLE_CATEGORIES.length} catégories articles créées`,
    );

    // 4. Auteur
    const author = await strapi.entityService.create("api::author.author", {
      data: { name: "L\u2019\u00e9quipe Le Fourgon" },
    });

    // 5. Articles
    for (const a of seedData.ARTICLES) {
      const { catSlug, ...articleData } = a;
      await strapi.entityService.create("api::article.article", {
        data: {
          ...articleData,
          category: artCatMap.get(catSlug),
          author: author.id,
          publishedAt: new Date(),
        },
      });
    }
    strapi.log.info(`\u2713 ${seedData.ARTICLES.length} articles créés`);

    // 6. FAQs
    for (const faq of seedData.FAQS) {
      await strapi.entityService.create("api::faq.faq", {
        data: { ...faq, publishedAt: new Date() },
      });
    }
    strapi.log.info(`\u2713 ${seedData.FAQS.length} FAQs créées`);

    // 7. Témoignages
    for (const t of seedData.TESTIMONIALS) {
      await strapi.entityService.create("api::testimonial.testimonial", {
        data: { ...t, publishedAt: new Date() },
      });
    }
    strapi.log.info(`\u2713 ${seedData.TESTIMONIALS.length} témoignages créés`);

    // 8. Points de collecte
    for (const cp of seedData.COLLECTION_POINTS) {
      await strapi.entityService.create(
        "api::collection-point.collection-point",
        { data: cp },
      );
    }
    strapi.log.info(
      `\u2713 ${seedData.COLLECTION_POINTS.length} points de collecte créés`,
    );

    // 9. Zones de livraison
    for (const dz of seedData.DELIVERY_ZONES) {
      await strapi.entityService.create("api::delivery-zone.delivery-zone", {
        data: dz,
      });
    }
    strapi.log.info(
      `\u2713 ${seedData.DELIVERY_ZONES.length} zones de livraison créées`,
    );

    // 10. Codes promo
    for (const pc of seedData.PROMO_CODES) {
      await strapi.entityService.create("api::promo-code.promo-code", {
        data: pc,
      });
    }
    strapi.log.info(`\u2713 ${seedData.PROMO_CODES.length} codes promo créés`);

    strapi.log.info("=== Seed termin\u00e9 avec succ\u00e8s ! ===");
  } catch (err) {
    strapi.log.error("Erreur pendant le seed:", err);
  }
};
