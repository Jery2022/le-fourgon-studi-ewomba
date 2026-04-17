// ══════════════════════════════════════════════
//  HeroSection — Page d'accueil Le Fourgon
//
//  MAQUETTE MOBILE (.m-hero) :
//  - Fond gradient 160deg : #0f4a27 → #1A6B3A → #2E8B57
//  - Image de fond avec overlay gradient vers le bas
//  - Contenu calé en bas (flex-end)
//  - Tag : "♻️ Économie circulaire" (fond blanc/15, rounded)
//  - H1 Fraunces 24px blanc bold, <em> italic ambre
//  - Sous-titre 13px blanc/80
//  - CTA ambre pleine largeur 52px hauteur
//  - CTA secondaire outline blanc
//  - Mini stats (3 items en row) sous les CTAs
//
//  MAQUETTE DESKTOP (.d-hero) :
//  - Layout 60/40 (grid 3fr 2fr)
//  - Colonne gauche : titre Fraunces 48-56px, sous-titre, double CTA côte à côte
//  - Colonne droite : carte impact (compteur bouteilles) + carte Trustpilot
//  - Fond même gradient mais plus subtil
//  - Min-height 70vh
// ══════════════════════════════════════════════

import type { JSX } from "react";
import Link from "next/link";

export function HeroSection(): JSX.Element {
  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-br from-[#0f4a27] via-fourgon-vert-foret to-fourgon-vert-prairie
      "
    >
      {/* ── Décorations de fond ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Cercle décoratif haut droite */}
        <div
          className="
            absolute -top-32 -right-24
            w-[400px] h-[400px]
            rounded-full
            border-[60px] border-white/[0.04]
            lg:-top-48 lg:-right-20 lg:w-[600px] lg:h-[600px] lg:border-[80px]
          "
        />
        {/* Cercle décoratif bas gauche */}
        <div
          className="
            absolute -bottom-20 -left-16
            w-[200px] h-[200px]
            rounded-full
            border-[30px] border-white/[0.03]
            lg:-bottom-24 lg:-left-20 lg:w-[300px] lg:h-[300px] lg:border-[40px]
          "
        />
        {/* Gradient overlay mobile (pour lisibilité du texte en bas) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:hidden" />
      </div>

      {/* ── Contenu ── */}
      <div
        className="
          relative
          min-h-[55vh] flex flex-col justify-end
          px-5 pb-6 pt-8
          lg:min-h-[70vh]
          lg:grid lg:grid-cols-5 lg:items-center lg:gap-12
          lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-20
        "
      >
        {/* ── Colonne gauche : Texte + CTAs ── */}
        <div className="lg:col-span-3">
          {/* Tag */}
          <div
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 mb-4
              bg-white/15 backdrop-blur-sm
              border border-white/20
              rounded-full
              text-[11px] font-semibold text-white
              lg:text-xs lg:px-4 lg:py-2 lg:mb-6
            "
          >
            <span aria-hidden="true">♻️</span>
            Économie circulaire
          </div>

          {/* Titre */}
          <h1
            className="
              font-display font-black text-white
              text-[28px] leading-[1.08] tracking-tight
              mb-3
              lg:text-[56px] lg:leading-[1.04] lg:mb-5
            "
          >
            Vos boissons,
            <br />
            <em className="italic text-amber-400">sans plastique.</em>
          </h1>

          {/* Sous-titre */}
          <p
            className="
              text-[13px] text-white/80 leading-relaxed
              max-w-[280px] mb-5
              lg:text-[17px] lg:max-w-[520px] lg:mb-8 lg:leading-[1.7]
            "
          >
            +3 000 références consignées, livrées chez vous.
            <span className="hidden lg:inline">
              {" "}
              Chaque commande = des bouteilles plastique évitées.
            </span>
          </p>

          {/* CTAs */}
          <div
            className="
              flex flex-col gap-3
              lg:flex-row lg:gap-4
            "
          >
            {/* CTA Primaire — ambre */}
            <Link
              href="/catalogue"
              className="
                flex items-center justify-center gap-2
                w-full h-[52px] rounded-xl
                bg-fourgon-orange text-white
                text-[15px] font-bold
                shadow-lg shadow-amber-900/20
                hover:bg-amber-600
                active:scale-[0.98]
                transition-all duration-250
                lg:w-auto lg:px-8 lg:h-[46px] lg:text-[15px]
              "
            >
              <span aria-hidden="true">🛒</span>
              Commander pour ma maison
            </Link>

            {/* CTA Secondaire — outline blanc */}
            <Link
              href="/btob"
              className="
                flex items-center justify-center gap-2
                w-full h-[52px] rounded-xl
                border-2 border-white/30 text-white
                text-[14px] font-semibold
                backdrop-blur-sm
                hover:bg-white/10 hover:border-white/50
                active:scale-[0.98]
                transition-all duration-250
                lg:w-auto lg:px-7 lg:h-[46px] lg:text-[14px]
              "
            >
              <span aria-hidden="true">🏢</span>
              Solution entreprise →
            </Link>
          </div>

          {/* Mini stats mobile */}
          <div
            className="
              flex items-center gap-4 mt-5
              lg:mt-8
            "
          >
            {[
              { value: "3 000+", label: "produits" },
              { value: "40×", label: "réutilisable" },
              { value: "100%", label: "consigné" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-sm font-display font-bold text-white lg:text-base">
                  {stat.value}
                </div>
                <div className="text-[9px] text-white/60 font-medium lg:text-[11px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Colonne droite : Cartes impact (desktop only) ── */}
        <div
          className="
            hidden lg:flex lg:col-span-2
            lg:flex-col lg:gap-4
          "
        >
          {/* Carte compteur d'impact */}
          <div
            className="
              bg-white/10 backdrop-blur-md
              border border-white/15
              rounded-2xl p-7
            "
          >
            <div className="font-display text-[44px] font-black text-white leading-none tracking-tight">
              2 847 193
            </div>
            <div className="text-[15px] font-bold text-amber-400 mt-1">
              bouteilles plastique évitées
            </div>
            <div className="text-[12px] text-white/50 mt-1">
              ce mois-ci · par toute notre communauté
            </div>
          </div>

          {/* Carte Trustpilot */}
          <div
            className="
              bg-white/10 backdrop-blur-md
              border border-white/15
              rounded-2xl p-5
              flex items-center gap-4
            "
          >
            <div>
              <div className="text-amber-300 text-sm tracking-widest">
                ★★★★★
              </div>
              <div className="text-white font-bold text-sm mt-1">
                4,9 / 5 sur Trustpilot
              </div>
              <div className="text-white/50 text-[11px] mt-0.5">
                12 000+ avis clients vérifiés
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
