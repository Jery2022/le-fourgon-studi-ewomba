import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "@/styles/globals.css";

// ── Polices ──
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// ── Métadonnées SEO ──
export const metadata: Metadata = {
  title: {
    default: "Le Fourgon — Livraison de boissons en bouteilles consignées",
    template: "%s | Le Fourgon",
  },
  description:
    "Faites-vous livrer vos boissons préférées en bouteilles consignées. Bières, jus, eaux, sodas : consommez responsable avec Le Fourgon.",
  keywords: [
    "boissons consignées",
    "livraison boissons",
    "bouteilles consignées",
    "économie circulaire",
    "livraison domicile",
    "consigne verre",
    "zéro déchet",
    "Le Fourgon",
  ],
  authors: [{ name: "Le Fourgon" }],
  creator: "Studigital",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://le-fourgon-studi-ewomba.fr",
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Le Fourgon",
    title: "Le Fourgon — Livraison de boissons en bouteilles consignées",
    description:
      "Faites-vous livrer vos boissons préférées en bouteilles consignées. Consommez responsable.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Fourgon",
    description: "Livraison de boissons en bouteilles consignées",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#1A6B3A",
  width: "device-width",
  initialScale: 1,
};

// ── Layout ──
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col">
        {/* TODO: Header */}
        <main className="flex-1">{children}</main>
        {/* TODO: Footer */}
      </body>
    </html>
  );
}
