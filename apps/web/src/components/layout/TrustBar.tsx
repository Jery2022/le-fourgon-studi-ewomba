// ══════════════════════════════════════════════
//  TrustBar — Barre de réassurance
//  Maquette : .m-trust (fond vert prairie, étoiles + texte)
//  Visible uniquement sur mobile, intégrée dans le header desktop
// ══════════════════════════════════════════════

export function TrustBar() {
  return (
    <div
      className="
        bg-fourgon-vert-prairie
        px-4 py-1.5
        flex items-center justify-between
        lg:hidden
      "
      aria-label="Évaluations clients"
    >
      <span className="text-[10px] text-amber-300 tracking-wider" aria-hidden="true">
        ★★★★★
      </span>
      <span className="text-[9px] text-white/85 font-medium">
        4.8/5 · +12 000 clients satisfaits
      </span>
    </div>
  );
}
