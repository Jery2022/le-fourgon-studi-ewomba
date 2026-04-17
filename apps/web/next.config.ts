import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Images Strapi ──
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },

  // ── Transpiler les packages du monorepo ──
  transpilePackages: ["@le-fourgon/ui", "@le-fourgon/utils", "@le-fourgon/types"],

  // ── Headers sécurité ──
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
};

export default nextConfig;
