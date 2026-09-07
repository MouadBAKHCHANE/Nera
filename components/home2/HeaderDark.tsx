"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { company } from "@/content/prestations";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * Header variante hestera.ch : transparent sur le héro, logo avec tagline à gauche,
 * icônes LinkedIn + e-mail + burger à droite, à toutes les tailles.
 * Devient marine opaque au scroll.
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-base ${
          solid ? "bg-nera-navy" : "bg-transparent"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between px-6 md:px-10 lg:h-[96px] lg:px-12">
          <Link href="/home-2" aria-label={company.shortName}>
            <Image
              src="/logos/nera-tagline-cream-green.svg"
              alt={company.shortName}
              width={220}
              height={57}
              priority
              style={{ height: 44, width: "auto" }}
            />
          </Link>

          <div className="flex items-center gap-2 text-nera-cream lg:gap-5">
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden size-11 items-center justify-center transition-colors hover:text-accent md:inline-flex"
            >
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>
            </a>
            <a
              href={`mailto:${company.email}`}
              aria-label="Écrire à NERA"
              className="hidden size-11 items-center justify-center transition-colors hover:text-accent md:inline-flex"
            >
              <Mail className="size-6" strokeWidth={1.5} />
            </a>
            {/* Burger en SVG inline : jamais des barres CSS. */}
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center transition-colors hover:text-accent"
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
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} allSizes />
    </>
  );
}
