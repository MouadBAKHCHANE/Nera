import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ArrowLink";
import { DiamondOutline, LogomarkOutline, Ruler } from "./Logomark";
import { company } from "@/content/prestations";

/**
 * Héro plein écran, ton sombre et cinématographique, mais construit sur la
 * géométrie NERA : grille de plan en fond, logomark au trait en grand motif,
 * anneaux de losanges en rotation lente, règle graduée sous le titre.
 * Photo : placeholder Unsplash en attendant les visuels du client.
 */
export function HeroDark() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-nera-navy text-nera-cream">
      <Image
        src="/img/maison-contemporaine-soir.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-nera-navy/70" aria-hidden />
      <div className="absolute inset-0 bg-blueprint opacity-70" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-nera-navy to-transparent" aria-hidden />

      {/* Motif logomark : grand, au trait, coupé par le bord droit */}
      <div className="pointer-events-none absolute -right-[8vw] top-1/2 hidden w-[46vw] -translate-y-1/2 text-nera-cream/20 lg:block" aria-hidden>
        <div className="relative">
          <LogomarkOutline className="w-full" strokeWidth={1} />
          <DiamondOutline className="absolute left-1/2 top-[43%] w-[58%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-accent/50" />
          <DiamondOutline className="absolute left-1/2 top-[43%] w-[74%] -translate-x-1/2 -translate-y-1/2 animate-spin-slower text-nera-cream/15" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-6 pb-24 pt-32 md:px-10 lg:px-[120px]">
        <Reveal as="p" className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/90 md:text-[14px]">
          <span className="h-px w-10 bg-accent" aria-hidden />
          {company.shortName} · Genève
        </Reveal>
        <Reveal
          as="h1"
          delay={0.06}
          className="mt-10 max-w-3xl font-display text-[2.125rem] font-light leading-[1.15] text-nera-cream md:text-[3rem] lg:text-[3.5rem]"
        >
          L&apos;équilibre entre <span className="font-medium text-accent">la technique</span>, l&apos;humain et
          l&apos;environnement, appliqué au bâtiment
        </Reveal>
        <Reveal delay={0.1} className="mt-8 max-w-lg text-body-md font-light leading-[1.7] text-nera-cream/80">
          Audits CECB, physique du bâtiment, installations CVC, rénovation énergétique, labels et subventions.
          Un bureau indépendant, de l&apos;étude à la réalisation, en Suisse romande.
        </Reveal>
        <Reveal delay={0.14} className="mt-12 max-w-xs">
          <Ruler className="mb-6 text-nera-cream" />
          <ArrowLink href="/bureau">Découvrir le bureau</ArrowLink>
        </Reveal>
      </div>

      <div className="relative flex items-end justify-between px-6 pb-6 md:px-10 lg:px-[120px]">
        <span className="hidden text-[12px] font-light uppercase tracking-[0.3em] text-nera-cream/70 md:block">
          Physique du bâtiment · CVC · Énergie
        </span>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[12px] font-light uppercase tracking-[0.35em] text-nera-cream">Nos prestations</span>
          <span className="h-10 w-px bg-accent" aria-hidden />
        </div>
        <span className="hidden text-[12px] font-light uppercase tracking-[0.3em] text-nera-cream/70 md:block">
          Suisse romande
        </span>
      </div>
    </section>
  );
}
