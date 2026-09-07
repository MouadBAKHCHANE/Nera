import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2b : « Pour qui travaillons-nous ? ». Trois colonnes sur fond crème
 * et grille de plan claire, séparées par des filets, chiffre romain et graduation verte.
 * Textes du client.
 */
const audiences = [
  {
    n: "I",
    title: "Particuliers et copropriétés",
    p1: "NERA aide les propriétaires, copropriétés et PPE à comprendre l'état énergétique de leur bien, à identifier les interventions pertinentes et à les organiser dans un ordre cohérent.",
    p2: "Notre accompagnement peut comprendre le CECB Plus, l'étude des variantes, les calculs techniques, les autorisations, les demandes de subventions et le suivi de la rénovation.",
  },
  {
    n: "II",
    title: "Régies, fondations et collectivités",
    p1: "Nous accompagnons les gestionnaires et propriétaires de patrimoines immobiliers dans l'évaluation, la planification et la rénovation de leurs bâtiments.",
    p2: "Notre approche permet de disposer d'une lecture structurée de l'état du bâti, des priorités d'intervention, des investissements à prévoir et des démarches réglementaires à engager.",
  },
  {
    n: "III",
    title: "Architectes et entreprises générales",
    p1: "NERA prend en charge le volet énergétique et technique des projets, en coordination avec l'architecte et les autres mandataires.",
    p2: "Nous réalisons notamment les calculs thermiques, les justificatifs énergétiques, les études CVC, les démarches de labellisation et les pièces nécessaires aux autorisations de construire.",
  },
];

export function Audience2() {
  return (
    <section className="bg-canvas bg-blueprint-light py-20 text-nera-navy lg:py-28">
      <div className="px-6 md:px-10 lg:px-[120px]">
        <Reveal>
          <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-navy/70">
            <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
            Nos clients
          </p>
          <h2 className="mt-6 font-display text-[1.75rem] font-light leading-[1.15] text-nera-navy md:text-[2.5rem]">
            Pour qui travaillons-nous ?
          </h2>
        </Reveal>
        <ol className="mt-12 grid divide-y divide-nera-navy/15 border-y border-nera-navy/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.08} className="relative px-0 py-10 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0">
              <span className="font-display text-[13px] font-medium tracking-[0.2em] text-accent">{a.n}</span>
              <h3 className="mt-5 font-display text-[1.5rem] font-medium leading-[1.2] text-nera-navy md:text-[1.75rem]">{a.title}</h3>
              <p className="mt-6 text-body-sm font-light leading-[1.7] text-body md:text-body-md">{a.p1}</p>
              <p className="mt-4 text-body-sm font-light leading-[1.7] text-body md:text-body-md">{a.p2}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
