import type { Config } from "tailwindcss";

/**
 * Configuration Tailwind CSS — Le Fourgon
 * Tokens issus de la charte graphique validée en Phase 1
 */
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Palette Le Fourgon ──
      colors: {
        fourgon: {
          // Verts — couleur principale
          "vert-foret": "#1A6B3A",
          "vert-prairie": "#2D8F5E",
          "vert-menthe": "#A8D5BA",
          "vert-clair": "#E8F5E9",

          // Bleus — confiance & fraîcheur
          "bleu-ocean": "#1565C0",
          "bleu-ciel": "#64B5F6",
          "bleu-glace": "#E3F2FD",

          // Neutres
          "blanc": "#FFFFFF",
          "gris-clair": "#F5F5F5",
          "gris-moyen": "#9E9E9E",
          "gris-fonce": "#424242",
          "noir": "#212121",

          // Accents
          "orange": "#FF6F00",
          "orange-clair": "#FFF3E0",
          "corail": "#FF7043",
        },
      },

      // ── Typographie ──
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      fontSize: {
        // Échelle typographique mobile-first
        "display-xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-md": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4" }],
      },

      // ── Espacement ──
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },

      // ── Border Radius ──
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ── Ombres ──
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06)",
        "elevated": "0 8px 30px rgba(0,0,0,0.08)",
        "inner-glow": "inset 0 1px 4px rgba(26,107,58,0.1)",
      },

      // ── Animations ──
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },

      // ── Transitions ──
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "450": "450ms",
      },
    },
  },
  plugins: [],
};

export default config;
