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
      <div className="absolute inset-0 bg-nera-navy/30" aria-hidden />
      {/* Voile latéral derrière le texte : lisibilité sans assombrir toute la photo */}
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-nera-navy/80 via-nera-navy/35 to-transparent lg:w-3/4" aria-hidden />
      <div className="absolute inset-0 bg-blueprint opacity-40" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-nera-navy/90 to-transparent" aria-hidden />

      {/* Motif logomark : grand, au trait, coupé par le bord droit */}
      <div className="pointer-events-none absolute -right-[8vw] top-1/2 hidden w-[46vw] -translate-y-1/2 text-nera-cream/20 lg:block" aria-hidden>
        <div className="relative">
          <LogomarkOutline className="w-full" strokeWidth={1} />
          <DiamondOutline className="absolute left-1/2 top-[43%] w-[58%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-accent/50" />
          <DiamondOutline className="absolute left-1/2 top-[43%] w-[74%] -translate-x-1/2 -translate-y-1/2 animate-spin-slower text-nera-cream/15" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-6 pb-10 pt-24 md:px-10 lg:px-[120px] lg:pt-[110px] [text-shadow:0_1px_18px_rgba(10,36,64,0.5)]">
        <Reveal as="p" className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.2em] text-nera-cream/90 md:text-[13px]">
          <span className="h-px w-10 shrink-0 bg-accent" aria-hidden />
          Bureau d&apos;ingénieurs en énergie et physique du bâtiment à Genève
        </Reveal>
        <Reveal
          as="h1"
          delay={0.06}
          className="mt-6 max-w-3xl font-display text-[2rem] font-light leading-[1.15] text-nera-cream md:text-[2.75rem] lg:text-[3.125rem]"
        >
          Au service de la <span className="font-medium text-accent">performance énergétique</span> de vos bâtiments
        </Reveal>
        <Reveal delay={0.1} className="mt-6 max-w-2xl space-y-3 text-body-sm font-light leading-[1.65] text-nera-cream/90 md:text-body-md">
          <p>
            Bureau d&apos;ingénierie indépendant à Genève, NERA Ingénieurs Conseils intervient en énergétique, physique du
            bâtiment et CVC dans toute la Suisse romande : audit énergétique, conception, autorisations de construire,
            subventions et suivi de rénovation.
          </p>
          <p>
            Particuliers, copropriétés, régies, collectivités, architectes et entreprises générales : nous réduisons vos
            consommations et valorisons votre patrimoine immobilier, sans compromis sur le confort.
          </p>
        </Reveal>
        <Reveal delay={0.14} className="mt-8 max-w-xs">
          <Ruler className="mb-5 text-nera-cream" />
          <ArrowLink href="/contact">Demander un devis gratuit</ArrowLink>
        </Reveal>
      </div>

      <div className="relative flex items-end justify-center px-6 pb-3 md:justify-between md:pb-4 lg:px-[120px] md:px-10">
        <span className="hidden text-[12px] font-light uppercase tracking-[0.3em] text-nera-cream/80 md:block">
          Physique du bâtiment · CVC · Énergie
        </span>
        <a href="#prestations" className="group mt-6 flex flex-col items-center gap-3 text-nera-cream transition-colors hover:text-accent md:absolute md:bottom-2 md:left-1/2 md:mt-0 md:-translate-x-1/2">
          <span className="text-[12px] font-medium uppercase tracking-[0.35em]">Nos prestations</span>
          <span className="relative block h-12 w-px overflow-hidden bg-nera-cream/30" aria-hidden>
            <span className="absolute inset-x-0 top-0 h-1/2 bg-accent animate-scroll-line" />
          </span>
        </a>
        <span className="hidden text-[12px] font-light uppercase tracking-[0.3em] text-nera-cream/80 md:block">
          Suisse romande
        </span>
      </div>
    </section>
  );
}
