// ══════════════════════════════════════════════
//  Logo — Le Fourgon
//  Icône fourgon SVG + texte Fraunces
//  Maquette : .m-logo (mobile blanc) / .d-logo (desktop vert)
// ══════════════════════════════════════════════

import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "light", className = "" }: LogoProps) {
  const color = variant === "light" ? "#FFFFFF" : "#1A6B3A";

  return (
    <Link
      href="/"
      className={`flex items-center gap-2 group ${className}`}
      aria-label="Le Fourgon — Retour à l'accueil"
    >
      {/* Icône fourgon */}
      <svg
        width="28"
        height="20"
        viewBox="0 0 28 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        {/* Carrosserie */}
        <rect x="0" y="1" width="28" height="13" rx="3" fill={color} />
        {/* Vitre */}
        <rect
          x="18"
          y="3.5"
          width="7.5"
          height="5"
          rx="1.5"
          fill={variant === "light" ? "#1A6B3A" : "#FFFFFF"}
          opacity="0.6"
        />
        {/* Ligne de séparation */}
        <rect x="2" y="8" width="14" height="1" rx="0.5" fill={color} opacity="0.3" />
        {/* Roue gauche */}
        <circle cx="7" cy="16" r="3.5" fill={color} />
        <circle
          cx="7"
          cy="16"
          r="1.5"
          fill={variant === "light" ? "#1A6B3A" : "#FFFFFF"}
        />
        {/* Roue droite */}
        <circle cx="21" cy="16" r="3.5" fill={color} />
        <circle
          cx="21"
          cy="16"
          r="1.5"
          fill={variant === "light" ? "#1A6B3A" : "#FFFFFF"}
        />
      </svg>

      {/* Texte */}
      <span
        className="font-display text-sm font-bold tracking-tight lg:text-base"
        style={{ color }}
      >
        Le Fourgon
      </span>
    </Link>
  );
}
