"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { company } from "@/content/prestations";

const items = [
  { label: "Accueil", href: "/home-2" },
  { label: "Le bureau", href: "/bureau" },
  { label: "Prestations", href: "/prestations" },
  { label: "Références", href: "/references" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

/**
 * Menu plein écran (tablette et mobile), direction hestera.ch : voile marine qui
 * descend depuis le haut, tout centré sous le header : titres en capitales espacées
 * (l'actif en graisse Medium), puis bouton « Nous contacter », puis coordonnées avec icônes.
 */
export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-40 flex flex-col bg-nera-navy bg-blueprint text-nera-cream transition-transform duration-500 ease-out-quart lg:hidden ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-10 overflow-y-auto px-6 pb-10 pt-[88px] text-center md:gap-14 md:pt-[112px]">
        <nav aria-label="Navigation">
          <ul className="space-y-1">
            {items.map((item, i) => {
              const active = pathname === item.href;
              return (
                <li
                  key={item.href}
                  className={`transition-all duration-500 ease-out-quart ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block py-2 font-display text-[1.375rem] uppercase leading-none tracking-[0.2em] transition-colors hover:text-accent md:py-3 md:text-[1.875rem] ${
                      active ? "font-medium text-nera-cream" : "font-light text-nera-cream/90"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`transition-all duration-500 ease-out-quart ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          style={{ transitionDelay: open ? "420ms" : "0ms" }}
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex h-12 items-center rounded-sm bg-accent px-8 text-[15px] font-medium text-white transition-colors duration-base hover:bg-accent-deep"
          >
            Nous contacter
          </Link>
        </div>

        <div
          className={`transition-all duration-500 ease-out-quart ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          style={{ transitionDelay: open ? "480ms" : "0ms" }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-nera-cream/70">Coordonnées</p>
          <ul className="mt-4 space-y-2.5 text-body-sm font-light md:text-body-md">
            <li className="flex items-center justify-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span>
                {company.street}, {company.zip} {company.city}
              </span>
            </li>
            <li className="flex items-center justify-center gap-2.5">
              <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={company.phoneHref} className="transition-colors hover:text-accent">{company.phone}</a>
            </li>
            <li className="flex items-center justify-center gap-2.5">
              <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-accent">{company.email}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
