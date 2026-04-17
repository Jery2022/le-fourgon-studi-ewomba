// ══════════════════════════════════════════════
//  MobileNav — Bottom navigation bar
//  Maquette : .m-bottomnav (4 items + icons)
//  Fixée en bas, masquée en desktop (lg:hidden)
// ══════════════════════════════════════════════

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Accueil",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/catalogue",
    label: "Produits",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    href: "/comment-ca-marche",
    label: "Consigne",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
  },
  {
    href: "/connexion",
    label: "Compte",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-0 inset-x-0 z-30
        bg-white border-t border-fourgon-gris-clair/50
        flex justify-around
        py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]
        lg:hidden
      "
      aria-label="Navigation mobile"
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex flex-col items-center gap-1
              px-2 py-1
              text-[9px] font-medium
              transition-colors duration-200
              ${
                isActive
                  ? "text-fourgon-vert-foret"
                  : "text-fourgon-gris-moyen hover:text-fourgon-gris-fonce"
              }
            `}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className={isActive ? "text-fourgon-vert-foret" : ""}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
