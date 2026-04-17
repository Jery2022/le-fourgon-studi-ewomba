// ══════════════════════════════════════════════
//  Utilitaires partagés — Le Fourgon
// ══════════════════════════════════════════════

import type { Cart, CartItem, Product } from "@le-fourgon/types";

// ── Prix & Formatage ──

/**
 * Formate un prix en euros (locale française)
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/**
 * Formate un prix sans centimes si le montant est rond
 */
export function formatPriceShort(cents: number): string {
  const euros = cents / 100;
  if (Number.isInteger(euros)) {
    return `${euros}\u00A0€`;
  }
  return formatPrice(cents);
}

// ── Calculs Panier & Consigne ──

/**
 * Calcule le sous-total d'un item (sans consigne)
 */
export function calcItemSubtotal(product: Product, quantity: number): number {
  return product.price * quantity;
}

/**
 * Calcule le montant total de consigne d'un item
 */
export function calcItemDeposit(product: Product, quantity: number): number {
  return product.depositAmount * quantity;
}

/**
 * Calcule les totaux du panier
 */
export function calcCartTotals(
  items: CartItem[],
  deliveryFee: number = 0,
  promoDiscount: number = 0,
): Cart {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalDeposit = items.reduce((sum, item) => sum + item.depositTotal, 0);

  return {
    items,
    subtotal,
    totalDeposit,
    deliveryFee,
    promoDiscount,
    total: subtotal + totalDeposit + deliveryFee - promoDiscount,
  };
}

// ── Slugs & URLs ──

/**
 * Génère un slug à partir d'un texte français
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Construit l'URL d'une image Strapi
 */
export function strapiMediaUrl(url: string, apiUrl?: string): string {
  if (url.startsWith("http")) return url;
  const base = apiUrl || process.env.NEXT_PUBLIC_STRAPI_API_URL || "";
  return `${base}${url}`;
}

// ── Dates ──

/**
 * Formate une date en français
 */
export function formatDate(dateStr: string, style: "short" | "long" = "short"): string {
  const date = new Date(dateStr);
  if (style === "long") {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Formate un créneau de livraison : "Mardi 15 avril, 14h-16h"
 */
export function formatDeliverySlot(date: string, startTime: string, endTime: string): string {
  const d = new Date(date);
  const dayStr = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
  return `${dayStr.charAt(0).toUpperCase() + dayStr.slice(1)}, ${startTime}-${endTime}`;
}

// ── Temps de lecture ──

/**
 * Estime le temps de lecture d'un article (en minutes)
 */
export function estimateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// ── Validation ──

/**
 * Valide un code postal français
 */
export function isValidPostalCode(code: string): boolean {
  return /^\d{5}$/.test(code);
}

/**
 * Valide un email
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valide un numéro de téléphone français
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, "");
  return /^(?:0|\+33)[1-9]\d{8}$/.test(cleaned);
}

// ── Constantes ──

export const SITE_NAME = "Le Fourgon";
export const SITE_DESCRIPTION =
  "Livraison de boissons en bouteilles consignées. Consommez responsable avec Le Fourgon.";
export const DEFAULT_LOCALE = "fr-FR";
export const CURRENCY = "EUR";
