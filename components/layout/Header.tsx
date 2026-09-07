"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navigation, contactCta } from "@/content/navigation";
import { company } from "@/content/prestations";
import { MobileMenu } from "./MobileMenu";

/**
 * Header transparent posé sur le héro (direction hestera / i-neea), qui devient
 * crème opaque avec filet hairline dès que l'on scrolle.
 * `onDark` : true quand la page commence par un héro sombre (accueil).
 */
export function Header({ onDark = false }: { onDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = onDark && !scrolled && !open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-base ${
        light ? "bg-transparent" : "bg-canvas/95 backdrop-blur-sm border-b border-hairline"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Link href="/" aria-label={company.shortName} className="shrink-0">
          <Image
            src={light ? "/logos/nera-horizontal-cream-green.svg" : "/logos/nera-horizontal-navy-green.svg"}
            alt={company.shortName}
            width={174}
            height={45}
            priority
            style={{ height: 36, width: "auto" }}
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 px-3 py-2 text-body-sm font-medium transition-colors ${
                    light ? "text-nera-cream/85 hover:text-nera-cream" : "text-body hover:text-nera-navy"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="size-3.5 opacity-70" strokeWidth={1.75} />
                </Link>
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-base group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="w-80 rounded-md border border-hairline bg-canvas-alt p-2 shadow-hairline">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block rounded-sm px-3 py-2.5 text-body-sm text-body transition-colors hover:bg-nera-cream hover:text-nera-navy"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-body-sm font-medium transition-colors ${
                  light ? "text-nera-cream/85 hover:text-nera-cream" : "text-body hover:text-nera-navy"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={company.phoneHref}
            className={`text-body-sm font-medium transition-colors ${
              light ? "text-nera-cream/85 hover:text-nera-cream" : "text-body hover:text-nera-navy"
            }`}
          >
            {company.phone}
          </a>
          <Link
            href={contactCta.href}
            className={`inline-flex h-10 items-center rounded-sm px-5 text-body-sm font-medium transition-colors duration-base ${
              light
                ? "border border-nera-cream/50 text-nera-cream hover:border-nera-cream hover:bg-nera-cream/10"
                : "bg-nera-navy text-nera-cream hover:bg-nera-navy-deep"
            }`}
          >
            {contactCta.label}
          </Link>
        </div>

        {/* Burger en SVG inline : jamais des barres CSS (bug iPhone constaté). */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className={`-mr-2 inline-flex size-11 items-center justify-center lg:hidden ${
            light ? "text-nera-cream" : "text-nera-navy"
          }`}
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
      </Container>
    </header>
    {/* Hors du <header> : backdrop-filter crée un containing block qui casserait le fixed */}
    <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
