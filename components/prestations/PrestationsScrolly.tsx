"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLink } from "@/components/home2/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { PrestationIcon } from "@/components/ui/PrestationIcon";
import { Blocks } from "./Blocks";
import { PrestationIllustration } from "./PrestationIllustration";
import { prestationRoute, type PrestationBlock } from "@/content/prestation-pages";

export type ScrollyEntry = {
  slug: string;
  title: string;
  subtitle: string;
  blocks: PrestationBlock[];
  cta: string;
  image?: string;
  imagePosition?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Scrollytelling des six prestations de `/prestations` (direction hestera.ch/nos-services) :
 * - À gauche : le panneau sticky avec l'illustration architecturale vectorielle qui change d'état
 *   à chaque scroll, sans carte blanche, flottant directement sur le fond.
 * - À droite : les 6 sections de textes NERA qui défilent.
 * - Le panneau apparaît à la première prestation, reste en place pour les six, puis part avec la dernière.
 */
export function PrestationsScrolly({ entries }: { entries: ScrollyEntry[] }) {
  const [active, setActive] = useState(0);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const panel = useRef<HTMLDivElement | null>(null);
  /** Padding bas du dernier bloc, mesuré : voir `useEffect` ci-dessous. */
  const [lastPad, setLastPad] = useState<number | undefined>(undefined);

  // Le panneau collant se décroche quand le bas de la colonne texte atteint le bas du panneau.
  // Le padding bas du dernier bloc décide donc du moment où il se décroche, et jusqu'où le
  // dernier texte peut remonter.
  //
  // Il vaut deux choses additionnées, mesurées et non devinées :
  // 1. la distance bas du panneau - bas du dessin, lue dans la matrice du SVG. La boîte du
  //    panneau garde du vide sous un dessin limité en largeur : sans cette part, le panneau se
  //    décrocherait alors que le texte est encore loin du dessin ;
  // 2. la moitié de la hauteur du dessin, pour que le dernier bloc continue de monter jusqu'au
  //    milieu du visuel au lieu de s'arrêter à son bas — demande du client.
  //
  // Sous `lg`, le panneau est masqué : pas de padding mesuré.
  useEffect(() => {
    const update = () => {
      const el = panel.current;
      const svg = el?.querySelector("svg");
      const ctm = svg?.getScreenCTM();
      if (!el || !svg || !ctm || el.offsetWidth === 0) {
        setLastPad(undefined);
        return;
      }
      const vb = svg.viewBox.baseVal;
      const drawnTop = ctm.f + ctm.d * vb.y;
      const drawnBottom = ctm.f + ctm.d * (vb.y + vb.height);
      const toDrawingBottom = el.getBoundingClientRect().bottom - drawnBottom;
      const halfDrawing = (drawnBottom - drawnTop) / 2;
      setLastPad(Math.max(0, Math.round(toDrawingBottom + halfDrawing)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Calcul de la prestation active au défilement
  const updateActiveSection = useCallback(() => {
    const vh = window.innerHeight;
    const targetY = vh * 0.45; // Axe de lecture à 45% du haut

    let bestIndex = 0;
    let minDistance = Infinity;

    sections.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= targetY && rect.bottom >= targetY) {
        bestIndex = index;
        minDistance = 0;
      } else {
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - targetY);
        if (dist < minDistance) {
          minDistance = dist;
          bestIndex = index;
        }
      }
    });

    setActive(bestIndex);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (list) => {
        list.forEach((en) => {
          if (en.isIntersecting) {
            setActive(Number((en.target as HTMLElement).dataset.index));
          }
        });
      },
      { rootMargin: "-25% 0px -50% 0px", threshold: 0 }
    );

    sections.current.forEach((el) => el && io.observe(el));

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateActiveSection]);

  const current = entries[active] || entries[0];

  return (
    <div className="relative grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
      {/* ============================================================ */}
      {/* COLONNE GAUCHE : PANNEAU STICKY AVEC LE VISUEL FLOTTANT */}
      {/* S'ancre à la 1re prestation, reste en place pour les 6, part avec la dernière */}
      {/* ============================================================ */}
      <div className="hidden lg:col-span-6 lg:block xl:col-span-6">
        <div ref={panel} className="sticky top-20 flex h-[calc(100vh-6rem)] flex-col justify-center">
          <div className="relative flex h-full max-h-[640px] w-full items-center justify-center">
            {/* L'illustration isométrique vectorielle flottante (sans carte blanche ni bordure) */}
            <PrestationIllustration
              active={active}
              slug={current.slug}
              className="h-full w-full max-h-[600px]"
            />

            {/* Repère de navigation vertical latéral discret */}
            <nav
              aria-label="Sélectionner une prestation"
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20"
            >
              <ol className="flex flex-col items-center gap-3 p-1">
                {entries.map((e, i) => {
                  const isCurrent = i === active;
                  return (
                    <li key={e.slug}>
                      <a
                        href={`#${e.slug}`}
                        aria-label={`Aller à ${e.title}`}
                        aria-current={isCurrent ? "true" : undefined}
                        className="group relative flex size-5 items-center justify-center"
                      >
                        <span
                          className={`block rounded-full transition-all duration-300 ${
                            isCurrent
                              ? "size-3 bg-nera-navy ring-2 ring-accent ring-offset-2 ring-offset-canvas"
                              : "size-1.5 bg-hairline hover:size-2.5 hover:bg-mute"
                          }`}
                        />
                        {/* Tooltip au survol */}
                        <span className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-nera-navy px-2.5 py-1 text-[11px] font-medium text-nera-cream opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                          {pad(i + 1)}. {e.title}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* COLONNE DROITE : LES TEXTES DES PRESTATIONS */}
      {/* ============================================================ */}
      <div className="lg:col-span-6 xl:col-span-6">
        {entries.map((e, i) => (
          <section
            key={e.slug}
            id={e.slug}
            data-index={i}
            ref={(el) => {
              sections.current[i] = el;
            }}
            className="scroll-mt-28 border-b border-hairline py-14 last:border-0 lg:flex lg:min-h-[calc(100vh-6rem)] lg:flex-col lg:justify-center lg:py-24 lg:last:min-h-0"
            style={i === entries.length - 1 ? { paddingBottom: lastPad } : undefined}
          >
            {/* Version mobile de l'illustration (affichée au-dessus de chaque texte sous lg) */}
            <div className="relative mb-8 overflow-hidden rounded-2xl lg:hidden">
              <PrestationIllustration active={i} slug={e.slug} className="h-[360px] w-full" />
            </div>

            <Reveal effect="fade-up" duration={700}>
              <p className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.25em] text-accent-deep">
                <span className="font-display text-[15px] tracking-normal text-mute">{pad(i + 1)}</span>
                <PrestationIcon of={e.slug} className="size-5 text-accent-deep" />
              </p>
              <h2 className="mt-4 font-display text-[1.625rem] font-light leading-[1.2] text-nera-navy md:text-[2.125rem]">
                {e.title}
              </h2>
              <p className="mt-3 font-display text-[1.0625rem] font-medium leading-[1.35] text-accent-deep">
                {e.subtitle}
              </p>
              <div className="mt-6 text-body">
                <Blocks blocks={e.blocks} />
              </div>
              <div className="mt-8">
                <ArrowLink href={prestationRoute(e.slug)} tone="dark">
                  {e.cta}
                </ArrowLink>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </div>
  );
}
