// ══════════════════════════════════════════════
//  CartButton — Bouton panier avec badge
//  Maquette : .m-cart-btn (mobile) / desktop nav
// ══════════════════════════════════════════════

"use client";

import Link from "next/link";

interface CartButtonProps {
  itemCount?: number;
  variant?: "light" | "dark";
  className?: string;
}

export function CartButton({
  itemCount = 0,
  variant = "light",
  className = "",
}: CartButtonProps) {
  return (
    <Link
      href="/panier"
      className={`
        relative flex items-center justify-center
        w-8 h-8 rounded-lg
        transition-all duration-250
        ${
          variant === "light"
            ? "bg-white/15 hover:bg-white/25 text-white"
            : "bg-fourgon-vert-clair hover:bg-fourgon-vert-menthe text-fourgon-vert-foret"
        }
        ${className}
      `}
      aria-label={`Panier${itemCount > 0 ? `, ${itemCount} article${itemCount > 1 ? "s" : ""}` : ""}`}
    >
      {/* Icône panier */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>

      {/* Badge compteur */}
      {itemCount > 0 && (
        <span
          className="
            absolute -top-1 -right-1
            min-w-[14px] h-[14px]
            flex items-center justify-center
            bg-fourgon-orange rounded-full
            text-[7px] font-bold text-white
            px-0.5
            animate-scale-in
          "
          aria-hidden="true"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
