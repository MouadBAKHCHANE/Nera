"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { navigation, contactCta } from "@/content/navigation";
import { company } from "@/content/prestations";
import { MenuOverlay } from "./MenuOverlay";
import { QuoteButton } from "@/components/quote/QuoteModal";
import { PrestationsMenu } from "@/components/layout/PrestationsMenu";

/**
 * Header Home 2 : transparent sur le héro, marine opaque au scroll.
 * Desktop : logo à gauche, menu centré en capitales espacées, bouton « Nous contacter » à droite.
 * Tablette et mobile : logo + burger, qui ouvre le menu plein écran (MenuOverlay).
 */
export function HeaderDark({ solidOnScroll = false }: { solidOnScroll?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Desktop : menu centré et bouton visibles seulement en haut de page, menu fermé. */
  const showNav = !scrolled && !open;
  /**
   * Desktop, page défilée : fond transparent sur l'accueil (direction hestera), logo +
   * icônes e-mail / téléphone + burger. `solidOnScroll` garde le fond marine sur les pages
   * à corps clair, où le logo crème serait illisible.
   */
  const collapsed = scrolled && !open;
  const link =
    "inline-flex items-center gap-1 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-nera-cream transition-colors hover:text-accent [text-shadow:0_1px_12px_rgba(10,36,64,0.6)]";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-base ${
          open
            ? "bg-nera-navy border-b border-nera-cream/10"
            : collapsed
              ? solidOnScroll
                ? "bg-nera-navy border-b border-nera-cream/10"
                : "bg-nera-navy border-b border-nera-cream/10 lg:border-0 lg:bg-transparent"
              : "bg-gradient-to-b from-nera-navy/80 to-transparent"
        }`}
      >
        <div className="flex h-[72px] items-center px-6 md:px-10 lg:h-[82px] lg:px-12">
          <Link
            href="/"
            aria-label={company.shortName}
            className="shrink-0 drop-shadow-[0_1px_10px_rgba(10,36,64,0.6)] lg:w-[220px]"
          >
            <Image
              src="/logos/nera-tagline-cream-green.svg"
              alt={company.shortName}
              width={220}
              height={57}
              priority
              // 40 px sur mobile, 52 px des `lg` : le logo etait juge trop petit sur ecran.
              // Classe plutot que `style`, qui ne connait pas les points de rupture.
              className="h-10 w-auto lg:h-[52px]"
            />
          </Link>

          <nav
            aria-label="Navigation principale"
            className={`hidden flex-1 items-center justify-center ${showNav ? "lg:flex" : ""}`}
          >
            {navigation.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link href={item.href} className={link}>
                    {item.label}
                    <ChevronDown className="size-3.5" strokeWidth={1.75} />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-base group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <PrestationsMenu tone="dark" />
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={link}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className={`ml-auto hidden lg:w-[220px] lg:justify-end ${showNav ? "lg:flex" : ""}`}>
            <QuoteButton className="inline-flex h-12 items-center rounded-sm border border-nera-cream/60 px-6 text-[15px] font-medium text-nera-cream transition-colors duration-base hover:border-accent hover:bg-accent hover:text-white">
              {contactCta.label}
            </QuoteButton>
          </div>

          <div className="ml-auto flex items-center gap-1 text-nera-cream drop-shadow-[0_1px_8px_rgba(10,36,64,0.7)] lg:gap-3">
            {/*
              Enveloppe et téléphone : visibles au défilement (desktop) et dans le menu ouvert.
              L'enveloppe mène à la page contact — et non plus à un `mailto:` — pour laisser le
              choix entre le formulaire, le téléphone et l'e-mail. Le lien `mailto:` reste
              offert sur la page contact et dans le pied de page.
            */}
            <Link
              href="/contact"
              aria-label="Contacter NERA"
              className={`hidden size-11 items-center justify-center transition-colors hover:text-accent ${showNav ? "" : "lg:inline-flex"}`}
            >
              <Mail className="size-6" strokeWidth={1.5} />
            </Link>
            <a
              href={company.phoneHref}
              aria-label="Appeler NERA"
              className={`hidden size-11 items-center justify-center transition-colors hover:text-accent ${showNav ? "" : "lg:inline-flex"}`}
            >
              <Phone className="size-6" strokeWidth={1.5} />
            </a>
            {/* Burger en SVG inline : tablette et mobile, et desktop une fois la page défilée. */}
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={`-mr-2 inline-flex size-11 items-center justify-center transition-colors hover:text-accent ${showNav ? "lg:hidden" : ""}`}
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
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
