// ══════════════════════════════════════════════
//  Footer — Le Fourgon
//
//  MAQUETTE MOBILE :
//  - Fond vert forêt plein
//  - Logo blanc + claim crème
//  - Colonnes liens en 2x2
//  - Newsletter email input crème
//  - Certifications et labels éco
//  - Copyright DM Sans 10px blanc/60
//  - Icônes réseaux sociaux
//
//  MAQUETTE DESKTOP (.d-footer) :
//  - Fond vert forêt, padding 48px 40px
//  - Grid 4 colonnes : marque (2fr) + 3 colonnes liens (1fr chacune)
//  - Barre bottom : copyright + socials
//  - Séparation border-top white/12
// ══════════════════════════════════════════════

"use client";

import { useState } from "react";
import type { FormEvent, JSX } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

const FOOTER_LINKS = {
  produits: {
    title: "Produits",
    links: [
      { href: "/catalogue", label: "Tout le catalogue" },
      { href: "/catalogue?cat=bieres", label: "Bières" },
      { href: "/catalogue?cat=eaux", label: "Eaux" },
      { href: "/catalogue?cat=jus", label: "Jus de fruits" },
      { href: "/catalogue?cat=sodas", label: "Sodas" },
      { href: "/catalogue?cat=vins", label: "Vins" },
    ],
  },
  entreprise: {
    title: "Le Fourgon",
    links: [
      { href: "/notre-mission", label: "Notre mission" },
      { href: "/comment-ca-marche", label: "Comment ça marche" },
      { href: "/points-de-collecte", label: "Points de collecte" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  pro: {
    title: "Professionnels",
    links: [
      { href: "/btob", label: "Offre entreprises" },
      { href: "/btob/evenements", label: "Offre événements" },
      { href: "/btob/devis", label: "Demander un devis" },
      { href: "/btob/etudes-de-cas", label: "Études de cas" },
      { href: "/btob/contact", label: "Contact B2B" },
    ],
  },
} as const;

const SOCIAL_LINKS = [
  { label: "Instagram", emoji: "📷", href: "https://instagram.com/lefourgon" },
  { label: "Facebook", emoji: "📘", href: "https://facebook.com/lefourgon" },
  {
    label: "LinkedIn",
    emoji: "💼",
    href: "https://linkedin.com/company/lefourgon",
  },
  { label: "TikTok", emoji: "🎵", href: "https://tiktok.com/@lefourgon" },
] as const;

export function Footer(): JSX.Element {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO : connecter à l'API newsletter (SendGrid / Resend)
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="
        bg-fourgon-vert-foret
        text-white
      "
    >
      {/* ══ Contenu principal ══ */}
      <div
        className="
          max-w-7xl mx-auto
          px-5 pt-12 pb-8
          lg:px-10 lg:pt-14 lg:pb-10
        "
      >
        <div
          className="
            grid grid-cols-2 gap-8
            lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12
          "
        >
          {/* ── Colonne marque ── */}
          <div className="col-span-2 lg:col-span-1">
            {/* Logo */}
            <Logo variant="light" className="mb-4" />

            {/* Claim */}
            <p className="text-[13px] text-white/70 leading-relaxed max-w-[300px] mb-6">
              Livraison de boissons en bouteilles consignées. Consommez
              responsable, on s&apos;occupe du reste.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-3">
                Newsletter
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-[13px] text-fourgon-vert-menthe font-medium">
                  <span aria-hidden="true">✓</span>
                  Merci ! Vous êtes inscrit.
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    required
                    className="
                      flex-1 min-w-0
                      px-3 py-2.5 rounded-lg
                      bg-white/10 border border-white/20
                      text-[13px] text-white placeholder:text-white/40
                      outline-none
                      focus:border-white/40 focus:bg-white/15
                      transition-all duration-200
                    "
                    aria-label="Adresse email pour la newsletter"
                  />
                  <button
                    type="submit"
                    className="
                      px-4 py-2.5 rounded-lg
                      bg-fourgon-orange text-white
                      text-[12px] font-bold
                      hover:bg-amber-600
                      transition-colors duration-200
                      shrink-0
                    "
                  >
                    OK
                  </button>
                </form>
              )}
            </div>

            {/* Labels éco */}
            <div className="flex items-center gap-3">
              {["♻️ Consigne", "🌱 Éco-responsable", "🇫🇷 Local"].map(
                (label) => (
                  <span
                    key={label}
                    className="
                      text-[9px] font-semibold text-white/50
                      bg-white/5 px-2 py-1 rounded
                    "
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* ── Colonnes de liens ── */}
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <p className="text-[11px] font-bold text-white/50 uppercase tracking-[1.5px] mb-4">
                {section.title}
              </p>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        text-[13px] text-white/70
                        hover:text-white
                        transition-colors duration-200
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Barre inférieure ══ */}
      <div
        className="
          border-t border-white/[0.12]
        "
      >
        <div
          className="
            max-w-7xl mx-auto
            px-5 py-5
            flex flex-col gap-4 items-center
            lg:px-10 lg:flex-row lg:justify-between
          "
        >
          {/* Copyright + liens légaux */}
          <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
            <span className="text-[12px] text-white/40">
              © 2026 Le Fourgon. Tous droits réservés.
            </span>
            <div className="flex items-center gap-3">
              {[
                { href: "/mentions-legales", label: "Mentions légales" },
                { href: "/cgv", label: "CGV" },
                { href: "/confidentialite", label: "Confidentialité" },
                { href: "/cookies", label: "Cookies" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] text-white/35 hover:text-white/60 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-9 h-9
                  flex items-center justify-center
                  bg-white/10 rounded-lg
                  text-sm
                  hover:bg-white/20
                  transition-colors duration-200
                "
                aria-label={`Le Fourgon sur ${social.label}`}
              >
                {social.emoji}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
