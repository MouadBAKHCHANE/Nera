import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ArrowLink";
import { Ruler } from "./Logomark";

/**
 * Quatre familles de prestations en panneaux au coin entaillé (rappel du losange),
 * numérotés en grand, posés en escalier sur une grille de plan.
 * Les 7 prestations du cahier des charges sont regroupées en 4 familles.
 */
const panels = [
  {
    n: "01",
    title: "Audits et modélisation",
    text: "Audits CECB et CECB Plus, modélisation thermique Lesosai : un diagnostic clair de l'enveloppe et des besoins, avec des scénarios chiffrés.",
    href: "/prestations/audit-cecb",
    img: "/img/hero-immeuble-residentiel.jpg",
    offset: "lg:mt-0",
  },
  {
    n: "02",
    title: "Installations CVC",
    text: "Études et conception des installations de chauffage, ventilation et climatisation, énergies renouvelables, soumissions et suivi.",
    href: "/prestations/installations-cvc",
    img: "/img/prestation-thermostat.jpg",
    offset: "lg:mt-16",
  },
  {
    n: "03",
    title: "Rénovation et labels",
    text: "Conception et suivi de rénovations énergétiques, accompagnement Minergie, HPE et THPE jusqu'à la certification.",
    href: "/prestations/renovation-energetique",
    img: "/img/mission-villa-blanche.jpg",
    offset: "lg:mt-32",
  },
  {
    n: "04",
    title: "Autorisations et subventions",
    text: "Dépôt du volet énergétique des autorisations de construire, montage et suivi des demandes Programme Bâtiments et communales.",
    href: "/prestations/subventions",
    img: "/img/process-panneaux-solaires.jpg",
    offset: "lg:mt-48",
  },
];

export function ServicePanels() {
  return (
    <section id="prestations" className="relative bg-nera-navy bg-blueprint py-20 text-nera-cream lg:py-28">
      <div className="px-5 md:px-8 lg:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-nera-cream/15 pb-8">
          <h2 className="font-display text-[1.75rem] font-light leading-[1.15] text-nera-cream md:text-[2.5rem]">
            Sept prestations, <span className="text-accent">quatre familles</span>, un interlocuteur
          </h2>
          <Ruler className="w-48 text-nera-cream" ticks={30} />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {panels.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.08} className={p.offset}>
              <article className="group relative flex min-h-[560px] flex-col justify-end overflow-hidden clip-notch bg-nera-navy-deep lg:min-h-[680px]">
                <Image
                  src={p.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-55 transition-all duration-700 ease-out-quart group-hover:scale-[1.06] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nera-navy via-nera-navy/60 to-nera-navy/10 transition-opacity duration-700 group-hover:opacity-60" aria-hidden />
                <span className="absolute left-7 top-7 font-display text-[3rem] font-light leading-none text-nera-cream/40 transition-colors duration-base group-hover:text-accent">
                  {p.n}
                </span>
                <div className="relative p-8">
                  <h3 className="font-display text-[1.375rem] font-medium leading-[1.25] text-nera-cream md:text-[1.5rem]">{p.title}</h3>
                  <p className="mt-4 text-body-sm font-light leading-[1.7] text-nera-cream/80">{p.text}</p>
                  <ArrowLink href={p.href} className="mt-6 min-w-0 w-full">
                    En savoir plus
                  </ArrowLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
