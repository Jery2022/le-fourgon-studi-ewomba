import type { NextConfig } from "next";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      { protocol: "https", hostname: "*.railway.app", pathname: "/uploads/**" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
  },

  env: {
    NEXT_PUBLIC_SITE_NAME: "Le Fourgon",
  },

  async redirects() {
    return [
      { source: "/professionnels", destination: "/btob", permanent: true },
      { source: "/produits", destination: "/catalogue", permanent: true },
      {
        source: "/produits/:slug",
        destination: "/catalogue/:slug",
        permanent: true,
      },
      {
        source: "/nos-engagements",
        destination: "/notre-mission",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
