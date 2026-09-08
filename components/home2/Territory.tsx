import { Reveal } from "@/components/ui/Reveal";
import { DiamondOutline } from "./Logomark";

/** Section 5 : « NERA intervient dans toute la Suisse romande ». Cantons en médaillons losange. */
const cantons = ["Genève", "Vaud", "Valais", "Fribourg", "Neuchâtel", "Jura"];

export function Territory() {
  return (
    <section className="bg-canvas bg-blueprint-light py-20 text-nera-navy lg:py-28">
      <div className="px-6 md:px-10 lg:px-[120px]">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-navy/70">
              <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
              Territoire
            </p>
            <h2 className="mt-6 font-display text-[1.75rem] font-light leading-[1.15] text-nera-navy md:text-[2.5rem]">
              NERA intervient dans toute la <span className="font-medium text-accent-deep">Suisse romande</span>
            </h2>
            <p className="mt-6 max-w-lg text-body-md font-light leading-[1.75] text-body">
              Basé à Genève, NERA intervient principalement dans les cantons de Genève et de Vaud, ainsi que dans le
              reste de la Suisse romande selon la nature des projets.
            </p>
          </Reveal>
          <ul className="grid grid-cols-3 gap-3 md:grid-cols-6 lg:gap-4">
            {cantons.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 0.06} className="relative flex aspect-square items-center justify-center text-center">
                <DiamondOutline className={`absolute inset-0 ${i < 2 ? "text-accent" : "text-nera-navy/30"}`} strokeWidth={1} />
                <span className={`font-display text-[0.9375rem] font-medium leading-tight md:text-[1rem] ${i < 2 ? "text-nera-navy" : "text-nera-navy/80"}`}>{c}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
