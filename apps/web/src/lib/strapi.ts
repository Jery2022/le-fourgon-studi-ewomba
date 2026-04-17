// ══════════════════════════════════════════════
//  Client API Strapi — Le Fourgon
//  Couche d'abstraction pour les appels au CMS
// ══════════════════════════════════════════════

import type { StrapiResponse } from "@le-fourgon/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
}

/**
 * Client HTTP pour l'API Strapi
 */
async function strapiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<StrapiResponse<T>> {
  const { method = "GET", body, cache, revalidate, tags } = options;

  const url = `${STRAPI_URL}/api${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const fetchOptions: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
    ...(cache && { cache }),
  };

  // Next.js ISR / cache control
  if (revalidate !== undefined || tags) {
    fetchOptions.next = {};
    if (revalidate !== undefined) fetchOptions.next.revalidate = revalidate;
    if (tags) fetchOptions.next.tags = tags;
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Strapi API error: ${response.status} ${response.statusText} — ${JSON.stringify(error)}`,
    );
  }

  return response.json();
}

// ── API publiques ──

/**
 * Récupère les pages du site vitrine
 */
export async function getPages() {
  return strapiFetch("/pages?populate=deep", {
    revalidate: 3600, // 1h
    tags: ["pages"],
  });
}

/**
 * Récupère une page par son slug
 */
export async function getPageBySlug(slug: string) {
  return strapiFetch(`/pages?filters[slug][$eq]=${slug}&populate=deep`, {
    revalidate: 3600,
    tags: ["pages", `page-${slug}`],
  });
}

/**
 * Récupère les articles du blog
 */
export async function getArticles(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("populate", "coverImage,category,tags,author");
  searchParams.set("sort", "publishedAt:desc");

  if (params?.page) searchParams.set("pagination[page]", String(params.page));
  if (params?.pageSize) searchParams.set("pagination[pageSize]", String(params.pageSize));
  if (params?.category) searchParams.set("filters[category][slug][$eq]", params.category);
  if (params?.tag) searchParams.set("filters[tags][slug][$in]", params.tag);

  return strapiFetch(`/articles?${searchParams}`, {
    revalidate: 600, // 10 min
    tags: ["articles"],
  });
}

/**
 * Récupère un article par son slug
 */
export async function getArticleBySlug(slug: string) {
  return strapiFetch(
    `/articles?filters[slug][$eq]=${slug}&populate=coverImage,category,tags,author`,
    {
      revalidate: 600,
      tags: ["articles", `article-${slug}`],
    },
  );
}

/**
 * Récupère les produits du catalogue
 */
export async function getProducts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("populate", "images,category");
  searchParams.set("filters[isAvailable][$eq]", "true");
  searchParams.set("sort", "category.order:asc,name:asc");

  if (params?.page) searchParams.set("pagination[page]", String(params.page));
  if (params?.pageSize) searchParams.set("pagination[pageSize]", String(params.pageSize));
  if (params?.category) searchParams.set("filters[category][slug][$eq]", params.category);
  if (params?.search) searchParams.set("filters[name][$containsi]", params.search);

  return strapiFetch(`/products?${searchParams}`, {
    revalidate: 300, // 5 min
    tags: ["products"],
  });
}

/**
 * Récupère un produit par son slug
 */
export async function getProductBySlug(slug: string) {
  return strapiFetch(`/products?filters[slug][$eq]=${slug}&populate=deep`, {
    revalidate: 300,
    tags: ["products", `product-${slug}`],
  });
}

/**
 * Récupère les catégories de produits
 */
export async function getProductCategories() {
  return strapiFetch("/product-categories?sort=order:asc&populate=icon", {
    revalidate: 3600,
    tags: ["product-categories"],
  });
}

/**
 * Récupère les FAQs
 */
export async function getFAQs(category?: string) {
  const filter = category ? `&filters[category][$eq]=${category}` : "";
  return strapiFetch(`/faqs?sort=order:asc${filter}`, {
    revalidate: 3600,
    tags: ["faqs"],
  });
}

/**
 * Récupère les témoignages
 */
export async function getTestimonials(btob?: boolean) {
  const filter = btob !== undefined ? `&filters[isBtoB][$eq]=${btob}` : "";
  return strapiFetch(`/testimonials?populate=avatar${filter}`, {
    revalidate: 3600,
    tags: ["testimonials"],
  });
}

/**
 * Récupère les points de collecte
 */
export async function getCollectionPoints() {
  return strapiFetch("/collection-points?filters[isActive][$eq]=true&populate=address", {
    revalidate: 1800, // 30 min
    tags: ["collection-points"],
  });
}

/**
 * Récupère les zones de livraison
 */
export async function getDeliveryZones() {
  return strapiFetch("/delivery-zones?filters[isActive][$eq]=true", {
    revalidate: 3600,
    tags: ["delivery-zones"],
  });
}

// ── Revalidation On-Demand (appelée par les webhooks Strapi) ──

export { strapiFetch };
