import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route de revalidation on-demand
 * Appelée par les webhooks Strapi lors de modifications de contenu
 *
 * POST /api/revalidate
 * Headers: { "x-revalidate-secret": "..." }
 * Body: { "model": "article", "entry": { "slug": "..." } }
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  // Vérifier le secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, entry } = body;

    // Revalidation par modèle Strapi
    const tagMap: Record<string, string[]> = {
      article: ["articles", entry?.slug ? `article-${entry.slug}` : ""].filter(Boolean),
      page: ["pages", entry?.slug ? `page-${entry.slug}` : ""].filter(Boolean),
      product: ["products", entry?.slug ? `product-${entry.slug}` : ""].filter(Boolean),
      "product-category": ["product-categories", "products"],
      faq: ["faqs"],
      testimonial: ["testimonials"],
      "collection-point": ["collection-points"],
      "delivery-zone": ["delivery-zones"],
    };

    const tags = tagMap[model] || [];

    for (const tag of tags) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      revalidated: true,
      tags,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 },
    );
  }
}
