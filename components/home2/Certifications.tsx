import { Reveal } from "@/components/ui/Reveal";
import { DiamondOutline } from "./Logomark";
import { company, cantons } from "@/content/prestations";

/**
 * Certifications en médaillons losange (forme du logomark), sur fond marine.
 * À remplacer par les logos officiels CECB Expert et Minergie dès réception.
 */
export function Certifications() {
  return (
    <section className="bg-nera-navy py-20 text-nera-cream lg:py-28">
      <div className="px-6 md:px-10 lg:px-[120px]">
        <div className="grid gap-12 lg:grid-cols-[4fr_8fr] lg:items-center">
          <Reveal>
            <p className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
              <span className="h-px w-10 bg-accent" aria-hidden />
              Qualifications
            </p>
            <h2 className="mt-8 font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.25rem]">
              Des compétences reconnues, sur cinq cantons
            </h2>
            <p className="mt-6 text-[12px] font-light uppercase leading-[2] tracking-[0.25em] text-nera-cream/60">
              {cantons.join(" · ")}
            </p>
          </Reveal>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {company.credentials.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 0.06} className="relative flex aspect-square items-center justify-center text-center">
                <DiamondOutline className="absolute inset-0 text-nera-cream/25" strokeWidth={1} />
                <DiamondOutline className="absolute inset-[12%] text-accent/70" strokeWidth={1} />
                <span className="max-w-[60%] font-display text-[0.9375rem] font-medium leading-[1.3] text-nera-cream md:text-[1rem]">{c}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
