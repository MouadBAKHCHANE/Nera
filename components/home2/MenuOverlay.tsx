"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { company } from "@/content/prestations";
import { navigation, type NavItem } from "@/content/navigation";
import { mapsHref } from "@/content/footer";
import { SocialLinks } from "@/components/ui/SocialLinks";

const items: NavItem[] = navigation;

/**
 * Menu plein écran (tablette, mobile, et desktop une fois la page défilée), direction hestera.ch.
 * Mobile : tout centré sous le header (titres, bouton, coordonnées). Desktop : titres à gauche,
 * coordonnées et bouton à droite. Les entrées Prestations et Le bureau se déplient
 * sur les mêmes sous-menus que le header et le pied de page.
 */
export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) setExpanded(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const title =
    "font-display text-[1.375rem] uppercase leading-none tracking-[0.2em] transition-colors hover:text-accent md:text-[1.875rem] lg:text-[2.25rem]";

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-40 flex flex-col bg-nera-navy bg-blueprint text-nera-cream transition-transform duration-500 ease-out-quart ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-1 flex-col items-center justify-start gap-10 overflow-y-auto px-6 pb-10 pt-[104px] text-center md:gap-12 md:pt-[120px] lg:grid lg:grid-cols-[1fr_auto] lg:content-center lg:items-center lg:gap-x-24 lg:px-[120px] lg:text-left">
        <nav aria-label="Navigation" className="w-full lg:self-center">
          <ul className="space-y-1 lg:space-y-2">
            {items.map((item, i) => {
              const active = pathname === item.href;
              const isOpen = expanded === item.label;
              const weight = active ? "font-medium text-nera-cream" : "font-light text-nera-cream/90";
              return (
                <li
                  key={item.href}
                  className={`transition-all duration-500 ease-out-quart ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                >
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`submenu-${i}`}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className={`inline-flex items-center justify-center gap-3 py-2 md:py-3 lg:justify-start ${title} ${weight} ${isOpen ? "text-accent" : ""}`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`size-5 shrink-0 transition-transform duration-base md:size-6 ${isOpen ? "rotate-180" : ""}`}
                          strokeWidth={1.5}
                        />
                      </button>
                      <ul
                        id={`submenu-${i}`}
                        hidden={!isOpen}
                        className="mx-auto mb-3 mt-1 max-w-xs space-y-1 border-l border-accent/60 pl-4 text-left lg:mx-0 lg:ml-1 lg:max-w-md"
                      >
                        {item.children.map((c) =>
                          c.external ? (
                            <li key={c.href}>
                              <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-1.5 text-body-sm font-light text-nera-cream/85 transition-colors hover:text-accent md:text-body-md"
                              >
                                {c.label}
                              </a>
                            </li>
                          ) : (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={onClose}
                                className="block py-1.5 text-body-sm font-light text-nera-cream/85 transition-colors hover:text-accent md:text-body-md"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href} onClick={onClose} className={`block py-2 md:py-3 ${title} ${weight}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`transition-all duration-500 ease-out-quart lg:order-2 lg:justify-self-end lg:text-right ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          style={{ transitionDelay: open ? "480ms" : "0ms" }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-nera-cream/70">Coordonnées</p>
          <ul className="mt-4 space-y-2.5 text-body-sm font-light md:text-body-md">
            <li className="flex items-center justify-center gap-2.5 lg:flex-row-reverse lg:justify-start">
              <MapPin className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                {company.street}, {company.zip} {company.city}
              </a>
            </li>
            <li className="flex items-center justify-center gap-2.5 lg:flex-row-reverse lg:justify-start">
              <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={company.phoneHref} className="transition-colors hover:text-accent">{company.phone}</a>
            </li>
            <li className="flex items-center justify-center gap-2.5 lg:flex-row-reverse lg:justify-start">
              <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-accent">{company.email}</a>
            </li>
          </ul>
          <SocialLinks tone="light" className="mt-5 justify-center lg:justify-end" />
        </div>
      </div>
    </div>
  );
}
