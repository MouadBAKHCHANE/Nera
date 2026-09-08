"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { navigation, contactCta } from "@/content/navigation";
import { company } from "@/content/prestations";
import { MobileMenu } from "./MobileMenu";
import { QuoteButton } from "@/components/quote/QuoteModal";
import { PrestationsMenu } from "@/components/layout/PrestationsMenu";

/**
 * Header en trois cellules séparées par des filets verticaux (direction For Future home-b) :
 * marque | navigation | CTA. Fond crème, 82px, sticky.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  const link =
    "inline-flex items-center gap-1 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.08em] text-nera-ink transition-colors hover:text-accent-deep";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-stretch lg:h-[82px]">
          <div className="flex items-center px-6 md:px-10 lg:w-[280px] lg:border-r lg:border-hairline">
            <Link href="/" aria-label={company.shortName}>
              <Image
                src="/logos/nera-horizontal-navy-green.svg"
                alt={company.shortName}
                width={174}
                height={45}
                priority
                style={{ height: 36, width: "auto" }}
              />
            </Link>
          </div>

          <nav aria-label="Navigation principale" className="hidden flex-1 items-center justify-center lg:flex">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link href={item.href} className={link}>
                    {item.label}
                    <ChevronDown className="size-3.5" strokeWidth={1.75} />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-base group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <PrestationsMenu tone="light" />
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={link}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto hidden items-center px-10 lg:flex lg:w-[280px] lg:justify-end lg:border-l lg:border-hairline">
            <QuoteButton className="inline-flex h-12 items-center rounded-sm border border-nera-navy px-6 text-[15px] font-medium text-nera-navy transition-colors duration-base hover:bg-nera-navy hover:text-nera-cream">
              {contactCta.label}
            </QuoteButton>
          </div>

          {/* Burger en SVG inline : jamais des barres CSS (bug iPhone constaté). */}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto mr-4 inline-flex size-11 items-center justify-center self-center text-nera-navy lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M3 7h18" />
                  <path d="M3 12h18" />
                  <path d="M3 17h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>
      {/* Hors du <header> : un backdrop-filter ou transform y créerait un containing block qui casserait le fixed. */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
