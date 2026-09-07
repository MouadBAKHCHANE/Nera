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
 * descend depuis le haut, titres en grandes capitales espacées à gauche (l'actif en
 * graisse Medium), coordonnées avec icônes à droite, bouton « Nous contacter » centré en bas.
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
      <div className="flex flex-1 flex-col justify-center gap-12 overflow-y-auto px-6 pb-10 pt-24 md:grid md:grid-cols-[1fr_auto] md:content-center md:items-center md:gap-16 md:px-12">
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
                    className={`block py-2.5 font-display text-[1.5rem] uppercase leading-none tracking-[0.18em] transition-colors hover:text-accent md:text-[1.875rem] ${
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
          className={`transition-all duration-500 ease-out-quart md:text-right ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          style={{ transitionDelay: open ? "380ms" : "0ms" }}
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-nera-cream/80">Coordonnées</p>
          <ul className="mt-5 space-y-3 text-body-sm font-light md:text-body-md">
            <li className="flex items-center gap-3 md:flex-row-reverse">
              <MapPin className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <span>
                {company.street}, {company.zip} {company.city}
              </span>
            </li>
            <li className="flex items-center gap-3 md:flex-row-reverse">
              <Phone className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={company.phoneHref} className="transition-colors hover:text-accent">{company.phone}</a>
            </li>
            <li className="flex items-center gap-3 md:flex-row-reverse">
              <Mail className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-accent">{company.email}</a>
            </li>
          </ul>
        </div>

        <div
          className={`flex justify-center transition-all duration-500 ease-out-quart md:col-span-2 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          style={{ transitionDelay: open ? "460ms" : "0ms" }}
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex h-12 items-center rounded-sm bg-accent px-8 text-[15px] font-medium text-white transition-colors duration-base hover:bg-accent-deep"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
