import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ArrowLink";
import { LogomarkOutline, Ruler } from "./Logomark";

/**
 * Section 3 : « Une approche indépendante, précise et réactive ». Fond marine,
 * logomark au trait en motif, règle graduée. Textes du client.
 */
export function Approach() {
  return (
    <section className="relative overflow-hidden bg-nera-navy bg-blueprint py-24 text-nera-cream lg:py-[130px]">
      <LogomarkOutline className="pointer-events-none absolute -left-[6vw] top-1/2 hidden w-[30vw] -translate-y-1/2 text-nera-cream/10 lg:block" strokeWidth={1} />
      <div className="px-6 md:px-10 lg:px-[120px]">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <Reveal>
            <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
              <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
              Notre approche
            </p>
            <h2 className="mt-8 font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
              Une approche <span className="font-medium text-accent">indépendante</span>, précise et réactive
            </h2>
            <Ruler className="mt-10 w-56 text-nera-cream" ticks={30} />
          </Reveal>
          <Reveal delay={0.08} className="max-w-2xl lg:pt-2">
            <p className="text-body-md font-light leading-[1.75] text-nera-cream/85 md:text-body-lg">
              NERA est un bureau d&apos;ingénieurs à taille humaine. Nous privilégions la proximité, la réactivité et une
              compréhension approfondie de chaque bâtiment.
            </p>
            <p className="mt-6 text-body-md font-light leading-[1.75] text-nera-cream/85 md:text-body-lg">
              Notre indépendance nous permet d&apos;évaluer les variantes à partir des besoins du projet et des objectifs du
              maître d&apos;ouvrage, sans réponse standardisée.
            </p>
            <ArrowLink href="/bureau" className="mt-10">
              En savoir plus sur NERA
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
