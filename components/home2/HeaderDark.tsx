"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { navigation, contactCta } from "@/content/navigation";
import { company } from "@/content/prestations";
import { MenuOverlay } from "./MenuOverlay";

/**
 * Header Home 2 : transparent sur le héro, marine opaque au scroll.
 * Desktop : logo à gauche, menu centré en capitales espacées, bouton « Nous contacter » à droite.
 * Tablette et mobile : logo + burger, qui ouvre le menu plein écran (MenuOverlay).
 */
export function HeaderDark() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const link =
    "inline-flex items-center gap-1 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-nera-cream transition-colors hover:text-accent [text-shadow:0_1px_12px_rgba(10,36,64,0.6)]";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-base ${
          solid ? "bg-nera-navy border-b border-nera-cream/10" : "bg-gradient-to-b from-nera-navy/80 to-transparent"
        }`}
      >
        <div className="flex h-[72px] items-center px-6 md:px-10 lg:h-[82px] lg:px-12">
          <Link href="/home-2" aria-label={company.shortName} className="shrink-0 lg:w-[220px]">
            <Image
              src="/logos/nera-tagline-cream-green.svg"
              alt={company.shortName}
              width={220}
              height={57}
              priority
              style={{ height: 40, width: "auto" }}
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden flex-1 items-center justify-center lg:flex">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link href={item.href} className={link}>
                    {item.label}
                    <ChevronDown className="size-3.5" strokeWidth={1.75} />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-base group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="w-80 border border-nera-cream/15 bg-nera-navy-deep p-2">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block rounded-sm px-3 py-2.5 text-body-sm font-light text-nera-cream/85 transition-colors hover:bg-nera-navy hover:text-nera-cream"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={link}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto hidden lg:flex lg:w-[220px] lg:justify-end">
            <Link
              href={contactCta.href}
              className="inline-flex h-12 items-center rounded-sm border border-nera-cream/60 px-6 text-[15px] font-medium text-nera-cream transition-colors duration-base hover:border-accent hover:bg-accent hover:text-white"
            >
              {contactCta.label}
            </Link>
          </div>

          {/* Burger en SVG inline, tablette et mobile seulement. */}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto -mr-2 inline-flex size-11 items-center justify-center text-nera-cream drop-shadow-[0_1px_8px_rgba(10,36,64,0.7)] transition-colors hover:text-accent lg:hidden"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
