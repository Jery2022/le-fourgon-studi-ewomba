// ══════════════════════════════════════════════
//  Seed Data — Le Fourgon
//  Usage : cd apps/cms && node database/seeds/seed.js
//  Pr\u00e9requis : Strapi d\u00e9marr\u00e9 au moins une fois (tables cr\u00e9\u00e9es)
// ══════════════════════════════════════════════

"use strict";

const PRODUCT_CATEGORIES = [
  { name: "Bi\u00e8res", slug: "bieres", description: "Bi\u00e8res artisanales et locales en bouteilles consign\u00e9es", order: 1 },
  { name: "Eaux", slug: "eaux", description: "Eaux min\u00e9rales et gazeuses de source", order: 2 },
  { name: "Jus de fruits", slug: "jus", description: "Jus de fruits press\u00e9s et nectars artisanaux", order: 3 },
  { name: "Sodas", slug: "sodas", description: "Sodas artisanaux et limonades", order: 4 },
  { name: "Vins", slug: "vins", description: "Vins bio et nature en consigne", order: 5 },
  { name: "Cidres", slug: "cidres", description: "Cidres et po\u00edr\u00e9s normands et bretons", order: 6 },
];

const PRODUCTS = [
  { name: "Bi\u00e8re blonde artisanale", slug: "biere-blonde-artisanale", shortDescription: "Blonde dor\u00e9e brass\u00e9e localement", description: "Bi\u00e8re blonde dor\u00e9e brass\u00e9e avec des ingr\u00e9dients bio. Notes de malt, finale douce et \u00e9quilibr\u00e9e.", price: 280, depositAmount: 20, volume: "33cl", unit: "bouteille", catSlug: "bieres", isBio: true, producer: "Brasserie locale", origin: "Hauts-de-France" },
  { name: "IPA houblonn\u00e9e", slug: "ipa-houblonnee", shortDescription: "IPA intense et aromatic", description: "IPA g\u00e9n\u00e9reusement houblonn\u00e9e, notes d\u2019agrumes et de r\u00e9sine. Amertume marqu\u00e9e.", price: 350, depositAmount: 20, volume: "33cl", unit: "bouteille", catSlug: "bieres", isBio: false, producer: "Micro-brasserie", origin: "Bretagne" },
  { name: "Bi\u00e8re blanche", slug: "biere-blanche", shortDescription: "Blanche l\u00e9g\u00e8re aux \u00e9pices", description: "Bi\u00e8re blanche avec coriandre et \u00e9corce d\u2019orange. Fra\u00eeche et d\u00e9salt\u00e9rante.", price: 300, depositAmount: 20, volume: "33cl", unit: "bouteille", catSlug: "bieres", isBio: true, isNew: true, producer: "Brasserie artisanale", origin: "Nord" },
  { name: "Eau min\u00e9rale plate", slug: "eau-minerale-plate", shortDescription: "Eau de source naturelle", description: "Eau min\u00e9rale naturelle de source locale.", price: 120, depositAmount: 15, volume: "75cl", unit: "bouteille", catSlug: "eaux", isBio: false, producer: "Source locale", origin: "Vosges" },
  { name: "Eau gazeuse fine", slug: "eau-gazeuse-fine", shortDescription: "Fines bulles naturelles", description: "Eau naturellement gazeuse, fines bulles.", price: 150, depositAmount: 15, volume: "75cl", unit: "bouteille", catSlug: "eaux", isBio: false, producer: "Source montagne", origin: "Auvergne" },
  { name: "Jus de pomme press\u00e9", slug: "jus-pomme-presse", shortDescription: "100% pommes locales", description: "Jus de pomme press\u00e9 \u00e0 froid, issu de vergers locaux certifi\u00e9s bio.", price: 420, depositAmount: 20, volume: "75cl", unit: "bouteille", catSlug: "jus", isBio: true, producer: "Vergers locaux", origin: "Normandie" },
  { name: "Nectar de poire", slug: "nectar-poire", shortDescription: "Poires Williams fondantes", description: "Nectar de poire Williams, onctueux et parfum\u00e9.", price: 450, depositAmount: 20, volume: "75cl", unit: "bouteille", catSlug: "jus", isBio: true, producer: "Arboriculteur bio", origin: "Rh\u00f4ne-Alpes" },
  { name: "Soda gingembre bio", slug: "soda-gingembre-bio", shortDescription: "Ginger beer pic\u00e0nte", description: "Soda au gingembre frais, l\u00e9g\u00e8rement pic\u00e0nt, 100% naturel.", price: 290, depositAmount: 15, volume: "33cl", unit: "bouteille", catSlug: "sodas", isBio: true, isNew: true, producer: "Atelier artisanal", origin: "Provence" },
  { name: "Citronnade artisanale", slug: "citronnade-artisanale", shortDescription: "Citrons de Menton", description: "Citronnade artisanale avec citrons de Menton et sucre de canne.", price: 320, depositAmount: 15, volume: "50cl", unit: "bouteille", catSlug: "sodas", isBio: false, isNew: true, producer: "Limonadier", origin: "C\u00f4te d\u2019Azur" },
  { name: "Vin rouge nature", slug: "vin-rouge-nature", shortDescription: "C\u00e9pages anciens, z\u00e9ro sulfite ajout\u00e9", description: "Vin rouge nature issu de c\u00e9pages anciens, vinification sans sulfite ajout\u00e9.", price: 990, depositAmount: 25, volume: "75cl", unit: "bouteille", catSlug: "vins", isBio: true, producer: "Vignoble bio", origin: "Languedoc" },
  { name: "P\u00e9tillant ros\u00e9 bio", slug: "petillant-rose-bio", shortDescription: "Bulles fra\u00eeches et fruitées", description: "P\u00e9tillant ros\u00e9 certifi\u00e9 bio, bulles fines et notes de fruits rouges.", price: 750, depositAmount: 25, volume: "75cl", unit: "bouteille", catSlug: "vins", isBio: true, isNew: true, producer: "Domaine familial", origin: "Loire" },
  { name: "Cidre brut fermier", slug: "cidre-brut-fermier", shortDescription: "Pommes \u00e0 cidre normandes", description: "Cidre brut de ferme, assemblagede pommes \u00e0 cidre traditionnelles.", price: 480, depositAmount: 20, volume: "75cl", unit: "bouteille", catSlug: "cidres", isBio: false, producer: "Ferme cidricole", origin: "Normandie" },
];

const ARTICLE_CATEGORIES = [
  { name: "Z\u00e9ro d\u00e9chet", slug: "zero-dechet" },
  { name: "Recettes", slug: "recettes" },
  { name: "Impact", slug: "impact" },
  { name: "Guides", slug: "guides" },
  { name: "Entreprise", slug: "entreprise" },
];

const ARTICLES = [
  { title: "5 raisons de passer aux bouteilles consign\u00e9es", slug: "5-raisons-bouteilles-consignees", excerpt: "D\u00e9couvrez pourquoi la consigne est l\u2019alternative la plus efficace au plastique \u00e0 usage unique.", content: "<p>La consigne des bouteilles en verre revient en force. Voici 5 raisons d\u2019adopter ce geste simple.</p><h2>1. R\u00e9duction drastique du plastique</h2><p>Chaque bouteille consign\u00e9e remplace jusqu\u2019\u00e0 40 bouteilles plastique.</p>", catSlug: "zero-dechet", readingTime: 5 },
  { title: "Cocktails d\u2019\u00e9t\u00e9 en bouteilles consign\u00e9es", slug: "cocktails-ete-consignes", excerpt: "Des recettes fra\u00eeches et \u00e9co-responsables pour l\u2019\u00e9t\u00e9.", content: "<p>L\u2019\u00e9t\u00e9 est la saison id\u00e9ale pour des boissons fra\u00eeches et responsables.</p>", catSlug: "recettes", readingTime: 7 },
  { title: "Rapport d\u2019impact 2025", slug: "rapport-impact-2025", excerpt: "2,8 millions de bouteilles plastique \u00e9vit\u00e9es par notre communaut\u00e9.", content: "<p>Bilan annuel de la communaut\u00e9 Le Fourgon.</p>", catSlug: "impact", readingTime: 10 },
  { title: "Guide complet : comment fonctionne la consigne ?", slug: "guide-consigne", excerpt: "Tout savoir sur le syst\u00e8me de consigne Le Fourgon.", content: "<p>Le fonctionnement est simple : commandez, recevez, retournez.</p>", catSlug: "guides", readingTime: 6 },
  { title: "RSE et boissons en entreprise", slug: "rse-boissons-entreprise", excerpt: "Int\u00e9grez les boissons consign\u00e9es dans votre politique RSE.", content: "<p>Pour les Office Managers qui veulent valoriser la RSE de leur entreprise.</p>", catSlug: "entreprise", readingTime: 8 },
  { title: "Famille z\u00e9ro d\u00e9chet : par o\u00f9 commencer ?", slug: "famille-zero-dechet", excerpt: "Nos conseils pratiques pour r\u00e9duire le plastique \u00e0 la maison.", content: "<p>Commencer par les boissons est le geste le plus simple et le plus impactant.</p>", catSlug: "zero-dechet", readingTime: 5 },
];

const FAQS = [
  { question: "Comment fonctionne le syst\u00e8me de consigne ?", answer: "Lors de votre commande, un montant de consigne est ajout\u00e9 pour chaque bouteille. Quand vous retournez les bouteilles vides, la consigne est int\u00e9gralement rembours\u00e9e.", category: "consigne", order: 1 },
  { question: "Quelles sont les zones de livraison ?", answer: "Le Fourgon livre dans plus de 30 villes en France. V\u00e9rifiez votre \u00e9ligibilit\u00e9 sur notre page Points de collecte.", category: "livraison", order: 1 },
  { question: "Combien co\u00fbte la livraison ?", answer: "La livraison est offerte d\u00e8s 40\u20ac de commande. En dessous, des frais de 4,90\u20ac s\u2019appliquent.", category: "livraison", order: 2 },
  { question: "Quels moyens de paiement acceptez-vous ?", answer: "Cartes bancaires, Apple Pay, Google Pay, et virement pour les professionnels. S\u00e9curis\u00e9 par Stripe.", category: "paiement", order: 1 },
  { question: "Proposez-vous des offres pour les entreprises ?", answer: "Oui ! Commande r\u00e9currente, facturation centralis\u00e9e, rapport RSE trimestriel, account manager d\u00e9di\u00e9. Devis gratuit en 5 minutes.", category: "btob", order: 1 },
];

const TESTIMONIALS = [
  { name: "Sophie B.", role: "Particulier", content: "Depuis 6 mois je ne reviendrai jamais au plastique. L\u2019app est super simple et la livraison toujours ponctuelle !", rating: 5, isBtoB: false },
  { name: "Thomas L.", role: "Organisateur \u00e9v\u00e9nements", company: "Cabinet conseil", content: "En 5 minutes le devis \u00e9tait pr\u00eat et livr\u00e9 le lendemain. La logistique retour \u00e9tait impeccable.", rating: 5, isBtoB: true },
  { name: "Clara M.", role: "Office Manager", company: "PME tech", content: "La commande r\u00e9currente en 3 clics, le rapport RSE automatique \u2014 exactement ce que je cherchais.", rating: 5, isBtoB: true },
];

const COLLECTION_POINTS = [
  { name: "Le Fourgon Lille Centre", street: "15 rue Faidherbe", postalCode: "59000", city: "Lille", latitude: 50.6292, longitude: 3.0573, openingHours: "Lun-Sam 9h-19h", isActive: true },
  { name: "Le Fourgon Lyon Presqu\u2019\u00eele", street: "42 rue de la R\u00e9publique", postalCode: "69002", city: "Lyon", latitude: 45.7640, longitude: 4.8357, openingHours: "Lun-Sam 8h30-18h30", isActive: true },
  { name: "Le Fourgon Paris Bastille", street: "8 rue de la Roquette", postalCode: "75011", city: "Paris", latitude: 48.8534, longitude: 2.3728, openingHours: "Lun-Sam 9h-20h", isActive: true },
  { name: "Le Fourgon Bordeaux Chartrons", street: "28 rue Notre-Dame", postalCode: "33000", city: "Bordeaux", latitude: 44.8523, longitude: -0.5695, openingHours: "Mar-Sam 10h-18h", isActive: true },
];

const DELIVERY_ZONES = [
  { name: "Lille M\u00e9tropole", postalCodes: ["59000", "59100", "59110", "59120", "59130", "59160", "59170", "59200", "59260", "59650", "59700", "59800"], deliveryFee: 490, minOrderAmount: 0, isActive: true },
  { name: "Lyon M\u00e9tropole", postalCodes: ["69001", "69002", "69003", "69004", "69005", "69006", "69007", "69008", "69009"], deliveryFee: 490, minOrderAmount: 0, isActive: true },
  { name: "Paris & Petite Couronne", postalCodes: ["75001", "75002", "75003", "75004", "75005", "75006", "75007", "75008", "75009", "75010", "75011", "75012", "75013", "75014", "75015", "75016", "75017", "75018", "75019", "75020", "92100", "92200", "92300"], deliveryFee: 490, minOrderAmount: 0, isActive: true },
  { name: "Bordeaux M\u00e9tropole", postalCodes: ["33000", "33100", "33200", "33300", "33400", "33800"], deliveryFee: 490, minOrderAmount: 0, isActive: true },
];

const PROMO_CODES = [
  { code: "BIENVENUE10", type: "percentage", value: 10, minOrderAmount: 2000, maxUses: 1000, currentUses: 0, isActive: true },
  { code: "ETE2026", type: "fixed", value: 500, minOrderAmount: 3000, maxUses: 500, currentUses: 0, isActive: true },
  { code: "PARRAIN5", type: "fixed", value: 500, minOrderAmount: 0, maxUses: null, currentUses: 0, isActive: true },
];

// ── Script d'ex\u00e9cution ──
// Ce fichier est con\u00e7u pour \u00eatre ex\u00e9cut\u00e9 comme un script Strapi bootstrap ou via API
// Pour l'utiliser, copiez les donn\u00e9es dans l'admin Strapi ou cr\u00e9ez un script bootstrap

module.exports = {
  PRODUCT_CATEGORIES,
  PRODUCTS,
  ARTICLE_CATEGORIES,
  ARTICLES,
  FAQS,
  TESTIMONIALS,
  COLLECTION_POINTS,
  DELIVERY_ZONES,
  PROMO_CODES,
};

// ── Instructions d'utilisation ──
// 1. D\u00e9marrer Strapi : cd apps/cms && pnpm develop
// 2. Cr\u00e9er un fichier src/bootstrap.js qui importe ces donn\u00e9es
// 3. Ou utiliser l'admin Strapi pour saisir manuellement
// 4. Ou cr\u00e9er un script custom : strapi console puis importer

console.log("=== Seed Data Le Fourgon ===");
console.log(`${PRODUCT_CATEGORIES.length} cat\u00e9gories produits`);
console.log(`${PRODUCTS.length} produits`);
console.log(`${ARTICLE_CATEGORIES.length} cat\u00e9gories articles`);
console.log(`${ARTICLES.length} articles`);
console.log(`${FAQS.length} FAQs`);
console.log(`${TESTIMONIALS.length} t\u00e9moignages`);
console.log(`${COLLECTION_POINTS.length} points de collecte`);
console.log(`${DELIVERY_ZONES.length} zones de livraison`);
console.log(`${PROMO_CODES.length} codes promo`);
console.log("Importez ces donn\u00e9es via le bootstrap Strapi ou l'admin.");
