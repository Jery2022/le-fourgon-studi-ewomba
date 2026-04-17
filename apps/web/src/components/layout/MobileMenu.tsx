// ══════════════════════════════════════════════
//  MobileMenu — Drawer de navigation mobile
//  Maquette : drawer latéral depuis le hamburger
//  Overlay + slide depuis la droite
// ══════════════════════════════════════════════

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Accueil", emoji: "🏠" },
  { href: "/catalogue", label: "Nos produits", emoji: "🍾" },
  { href: "/comment-ca-marche", label: "Comment ça marche", emoji: "🔄" },
  { href: "/notre-mission", label: "Notre mission", emoji: "🌱" },
  { href: "/points-de-collecte", label: "Points de collecte", emoji: "📍" },
  { href: "/blog", label: "Blog", emoji: "📝" },
  { href: "/faq", label: "FAQ", emoji: "❓" },
] as const;

const BTOB_LINKS = [
  { href: "/btob", label: "Offre Professionnels", emoji: "🏢" },
  { href: "/btob/devis", label: "Demander un devis", emoji: "📋" },
] as const;

export function MobileMenu({ isOpen, onClose }: MobileMenuProps): JSX.Element {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);

  // Fermer le menu uniquement lors d'une vraie navigation
  useEffect(() => {
    if (previousPathnameRef.current !== pathname && isOpen) {
      onClose();
    }

    previousPathnameRef.current = pathname;
  }, [pathname, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40
          bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          lg:hidden
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        id="mobile-menu"
        className={`
          fixed top-0 right-0 z-50
          w-[85vw] max-w-[320px] h-full
          bg-white shadow-elevated
          flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:hidden
        `}
        aria-label="Menu de navigation mobile"
        role="dialog"
        aria-modal="true"
      >
        {/* En-tête du drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-fourgon-gris-clair/50">
          <span className="font-display text-lg font-bold text-fourgon-vert-foret">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="
              w-8 h-8 flex items-center justify-center
              rounded-lg hover:bg-fourgon-gris-clair
              transition-colors duration-200
            "
            aria-label="Fermer le menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Liens principaux */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      flex items-center gap-3
                      px-4 py-3 rounded-xl
                      text-sm font-medium
                      transition-colors duration-200
                      ${
                        isActive
                          ? "bg-fourgon-vert-clair text-fourgon-vert-foret font-semibold"
                          : "text-fourgon-gris-fonce hover:bg-fourgon-gris-clair"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="text-base" aria-hidden="true">
                      {link.emoji}
                    </span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Séparateur BtoB */}
          <div className="mx-5 my-4 border-t border-fourgon-gris-clair/50" />

          <div className="px-5 mb-2">
            <span className="text-[10px] font-bold text-fourgon-gris-moyen uppercase tracking-widest">
              Professionnels
            </span>
          </div>
          <ul className="space-y-1 px-3">
            {BTOB_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    flex items-center gap-3
                    px-4 py-3 rounded-xl
                    text-sm font-medium text-fourgon-bleu-ocean
                    hover:bg-fourgon-bleu-glace
                    transition-colors duration-200
                  "
                >
                  <span className="text-base" aria-hidden="true">
                    {link.emoji}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pied du drawer — CTA connexion */}
        <div className="px-5 py-4 border-t border-fourgon-gris-clair/50">
          <Link
            href="/connexion"
            className="
              flex items-center justify-center gap-2
              w-full py-3 rounded-xl
              bg-fourgon-vert-foret text-white
              text-sm font-semibold
              hover:bg-fourgon-vert-prairie
              transition-colors duration-250
            "
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Se connecter
          </Link>
        </div>
      </nav>
    </>
  );
}
