// ══════════════════════════════════════════════
//  Header — Le Fourgon
//  Composant principal de navigation
//
//  MAQUETTE MOBILE (.m-hdr) :
//  - Fond vert forêt #1A6B3A
//  - Logo blanc (icône fourgon + texte Fraunces 14px)
//  - Bouton panier (fond blanc/15, badge ambre)
//  - Hamburger 3 barres blanches
//  - Sous le header : TrustBar (fond vert prairie)
//
//  MAQUETTE DESKTOP (.d-hdr / .d-nav) :
//  - Fond blanc, shadow légère
//  - Logo vert forêt
//  - Navigation horizontale : 5 liens DM Sans 13px
//  - Trustpilot stars inline
//  - CTA "Professionnels" bleu
//  - Bouton panier vert
//  - CTA "Commander" ambre
//  - Nav sticky au scroll
// ══════════════════════════════════════════════

"use client";

import { useState, useEffect, useCallback, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { CartButton } from "@/components/shared/CartButton";
import { TrustBar } from "./TrustBar";
import { MobileMenu } from "./MobileMenu";

// ── Liens de navigation desktop ──
const DESKTOP_NAV_LINKS = [
  { href: "/catalogue", label: "Nos produits" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/notre-mission", label: "Notre mission" },
  { href: "/points-de-collecte", label: "Points de collecte" },
  { href: "/blog", label: "Blog" },
] as const;

export function Header(): ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // ── Détecter le scroll pour le header sticky ──
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // TODO : Connecter au store panier (Zustand)
  const cartItemCount = 3;

  return (
    <>
      <header
        className={`
          sticky top-0 z-30
          transition-shadow duration-300
          ${isScrolled ? "shadow-card" : ""}
        `}
      >
        {/* ═══════════════════════════════════════
            MOBILE HEADER (< lg)
            Maquette : .m-hdr
        ═══════════════════════════════════════ */}
        <div
          className="
            bg-fourgon-vert-foret
            px-4 py-3
            flex items-center justify-between
            lg:hidden
          "
        >
          {/* Logo blanc */}
          <Logo variant="light" />

          {/* Actions droite */}
          <div className="flex items-center gap-2.5">
            {/* Panier */}
            <CartButton itemCount={cartItemCount} variant="light" />

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
              className="
                flex flex-col gap-[3.5px]
                p-1.5
                -mr-1
              "
            >
              <span
                className="block w-[18px] h-[2px] bg-white rounded-full"
                aria-hidden="true"
              />
              <span
                className="block w-[18px] h-[2px] bg-white rounded-full"
                aria-hidden="true"
              />
              <span
                className="block w-[18px] h-[2px] bg-white rounded-full"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Trust bar mobile */}
        <TrustBar />

        {/* ═══════════════════════════════════════
            DESKTOP HEADER (>= lg)
            Maquette : .d-hdr + .d-nav
        ═══════════════════════════════════════ */}
        <div
          className={`
            hidden lg:block
            bg-white
            border-b border-fourgon-gris-clair/30
          `}
        >
          {/* Barre supérieure — trust + infos */}
          <div className="bg-fourgon-vert-foret px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-1.5">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-amber-300 tracking-wider">
                  ★★★★★
                </span>
                <span className="text-[11px] text-white/80 font-medium">
                  4.8/5 sur Trustpilot · +12 000 clients satisfaits
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-white/70">
                  🚚 Livraison offerte dès 40€
                </span>
                <span className="text-[11px] text-white/50">|</span>
                <span className="text-[11px] text-white/70">
                  ♻️ Consigne 100% remboursée
                </span>
              </div>
            </div>
          </div>

          {/* Navigation principale */}
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo vert forêt */}
              <Logo variant="dark" />

              {/* Liens de navigation */}
              <nav
                className="flex items-center gap-1"
                aria-label="Navigation principale"
              >
                {DESKTOP_NAV_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        px-3 py-2 rounded-lg
                        text-[13px] font-medium
                        transition-all duration-200
                        ${
                          isActive
                            ? "text-fourgon-vert-foret bg-fourgon-vert-clair font-semibold"
                            : "text-fourgon-gris-fonce hover:text-fourgon-vert-foret hover:bg-fourgon-vert-clair/50"
                        }
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Actions droite */}
              <div className="flex items-center gap-3">
                {/* CTA Professionnels */}
                <Link
                  href="/btob"
                  className="
                    px-4 py-2 rounded-lg
                    text-[13px] font-semibold
                    text-fourgon-bleu-ocean
                    bg-fourgon-bleu-glace
                    hover:bg-blue-100
                    transition-colors duration-200
                  "
                >
                  Professionnels
                </Link>

                {/* Panier */}
                <CartButton itemCount={cartItemCount} variant="dark" />

                {/* Connexion */}
                <Link
                  href="/connexion"
                  className="
                    flex items-center gap-1.5
                    px-3 py-2 rounded-lg
                    text-[13px] font-medium
                    text-fourgon-gris-fonce
                    hover:text-fourgon-vert-foret hover:bg-fourgon-vert-clair/50
                    transition-colors duration-200
                  "
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Connexion
                </Link>

                {/* CTA Commander */}
                <Link
                  href="/catalogue"
                  className="
                    px-5 py-2.5 rounded-xl
                    text-[13px] font-bold text-white
                    bg-fourgon-orange
                    hover:bg-amber-600
                    transition-colors duration-250
                    shadow-sm hover:shadow-md
                  "
                >
                  Commander →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Menu mobile (drawer) ── */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
