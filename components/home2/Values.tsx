import { Reveal } from "@/components/ui/Reveal";

/**
 * « Nos valeurs » en bande horizontale : trois colonnes séparées par des filets,
 * chacune sous une graduation verte, grand mot en Clash Light. Fond crème sur
 * grille de plan claire. Valeurs issues du cahier des charges.
 */
const values = [
  {
    n: "I",
    title: "Précision",
    text: "Physique du bâtiment, exigences réglementaires et enjeux énergétiques maîtrisés, du calcul jusqu'au chantier.",
  },
  {
    n: "II",
    title: "Réactivité",
    text: "Une structure indépendante et agile, un interlocuteur unique, des réponses rapides et une vraie proximité.",
  },
  {
    n: "III",
    title: "Transparence",
    text: "Neutralité vis-à-vis des fabricants et installateurs : nos recommandations ne dépendent que de votre projet.",
  },
];

export function Values() {
  return (
    <section className="bg-canvas bg-blueprint-light py-20 text-nera-navy lg:py-28">
      <div className="px-6 md:px-10 lg:px-[120px]">
        <Reveal className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.25em] text-nera-navy/70">
          <span className="h-px w-10 bg-accent" aria-hidden />
          Nos valeurs
        </Reveal>
        <ol className="mt-10 grid divide-y divide-nera-navy/15 border-y border-nera-navy/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.08} className="relative px-0 py-10 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0">
              <span className="absolute left-0 top-0 h-6 w-px bg-accent md:left-10 md:first:left-0" aria-hidden />
              <span className="font-display text-[13px] font-medium tracking-[0.2em] text-accent">{v.n}</span>
              <h3 className="mt-5 font-display text-[2rem] font-light leading-none text-nera-navy md:text-[2.5rem]">{v.title}</h3>
              <p className="mt-6 max-w-sm text-body-md font-light leading-[1.7] text-body">{v.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
