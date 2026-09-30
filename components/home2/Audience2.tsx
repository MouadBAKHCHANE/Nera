import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/home";

/**
 * Section 2b : « Pour qui travaillons-nous ? ». Trois colonnes sur fond crème
 * et grille de plan claire, séparées par des filets, chiffre romain et graduation verte.
 * Textes du client, saisis dans le Studio Sanity (« Page d'accueil »).
 */
/** Chiffre romain de chaque colonne, dans l'ordre. */
const numerals = ["I", "II", "III", "IV", "V", "VI"];

export function Audience2({ audiences }: { audiences: HomeContent["audiences"] }) {
  return (
    <section className="bg-canvas bg-blueprint-light py-20 text-nera-navy lg:py-28">
      <div className="px-6 md:px-10 lg:px-[120px]">
        <Reveal>
          <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-navy/70">
            <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
            Nos clients
          </p>
          <h2 className="mt-6 font-display text-[1.75rem] font-light leading-[1.15] text-nera-navy md:text-[2.5rem]">
            {audiences.title}
          </h2>
        </Reveal>
        <ol className="mt-12 grid divide-y divide-nera-navy/15 border-y border-nera-navy/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {audiences.items.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.08} className="relative px-0 py-10 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0">
              <span className="font-display text-[13px] font-medium tracking-[0.2em] text-accent">{numerals[i] ?? i + 1}</span>
              <h3 className="mt-5 font-display text-[1.5rem] font-medium leading-[1.2] text-nera-navy md:text-[1.75rem]">{a.title}</h3>
              {a.paragraphs.map((text, j) => (
                <p key={j} className={`${j === 0 ? "mt-6" : "mt-4"} text-body-sm font-light leading-[1.7] text-body md:text-body-md lg:text-body-lg`}>
                  {text}
                </p>
              ))}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
