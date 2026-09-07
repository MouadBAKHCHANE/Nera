import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ArrowLink";
import { Ruler } from "./Logomark";

/**
 * Prestations sous le héro : H2 + introduction du client, puis six cartes au coin
 * entaillé (rappel du losange) sur grille de plan, une par prestation du pied de page.
 * Textes et liens fournis par le client.
 */
const panels: { n: string; title: string; text: string; cta: string; href: string; img: string; pos?: string }[] = [
  {
    n: "01",
    title: "CECB et CECB Plus",
    text: "Évaluer la performance énergétique du bâtiment, identifier son potentiel d'amélioration et établir des scénarios de rénovation hiérarchisés.",
    cta: "Découvrir les CECB et CECB Plus",
    href: "/prestations/audit-cecb",
    img: "/img/prestation-diagnostic-energetique.jpg",
  },
  {
    n: "02",
    title: "Physique du bâtiment et labels énergétiques",
    text: "Réaliser les calculs thermiques, étudier l'enveloppe, le confort d'été et les problématiques d'humidité, et accompagner les démarches Minergie, HPE ou THPE.",
    cta: "Découvrir la physique du bâtiment",
    href: "/prestations/modelisation-thermique",
    img: "/img/prestation-enveloppe-facade-vitree.jpg",
  },
  {
    n: "03",
    title: "Ingénierie CVC et énergies renouvelables",
    text: "Étudier, dimensionner et intégrer les installations de chauffage, ventilation et climatisation, ainsi que les solutions renouvelables adaptées au bâtiment.",
    cta: "Découvrir l'ingénierie CVC",
    href: "/prestations/installations-cvc",
    img: "/img/prestation-pompe-a-chaleur.jpg",
  },
  {
    n: "04",
    title: "Autorisations de construire",
    text: "Préparer le volet énergétique des dossiers et accompagner les échanges techniques avec les mandataires et les services compétents.",
    cta: "Découvrir les prestations autorisations",
    href: "/prestations/autorisation-de-construire",
    img: "/img/prestation-plans-autorisation.jpg",
  },
  {
    n: "05",
    title: "Subventions",
    text: "Identifier les aides mobilisables, préparer les demandes et assurer leur suivi jusqu'à la remise des justificatifs d'achèvement.",
    cta: "Découvrir les prestations subventions",
    href: "/prestations/subventions",
    img: "/img/process-panneaux-solaires-immeuble.jpg",
  },
  {
    n: "06",
    title: "Rénovation énergétique globale",
    text: "Piloter les différentes étapes d'une rénovation, du diagnostic initial à la réception, en qualité d'interlocuteur technique du maître d'ouvrage.",
    cta: "Découvrir la rénovation énergétique",
    href: "/prestations/renovation-energetique",
    img: "/img/prestation-renovation-batiment.jpg",
    pos: "object-[50%_70%]",
  },
];

export function ServicePanels() {
  return (
    <section id="prestations" className="relative bg-nera-navy bg-blueprint py-20 text-nera-cream lg:py-28">
      <div className="px-5 md:px-8 lg:px-12">
        <Reveal className="grid gap-8 border-b border-nera-cream/15 pb-10 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="font-display text-[1.75rem] font-light leading-[1.15] text-nera-cream md:text-[2.5rem]">
              Une expertise complète pour la <span className="text-accent">performance</span> de vos bâtiments
            </h2>
          </div>
          <div className="space-y-3 text-body-sm font-light leading-[1.7] text-nera-cream/85 md:text-body-md">
            <p>
              Chaque bâtiment présente des caractéristiques constructives, techniques, énergétiques et réglementaires qui
              lui sont propres.
            </p>
            <p>
              NERA analyse le bâtiment dans son ensemble afin de proposer des solutions cohérentes avec son état, ses
              usages, les objectifs du maître d&apos;ouvrage et les exigences applicables au projet.
            </p>
            <Ruler className="mt-4 w-48 text-nera-cream" ticks={30} />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {panels.map((p, i) => (
            <Reveal key={p.href} delay={(i % 3) * 0.08} className={i % 3 === 1 ? "lg:mt-12" : ""}>
              <article className="group relative flex min-h-[520px] flex-col justify-end overflow-hidden clip-notch bg-nera-navy-deep lg:min-h-[560px]">
                <Image
                  src={p.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={`object-cover opacity-55 transition-all duration-700 ease-out-quart group-hover:scale-[1.06] group-hover:opacity-100 ${p.pos ?? ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nera-navy via-nera-navy/60 to-nera-navy/10 transition-opacity duration-700 group-hover:opacity-60" aria-hidden />
                <span className="absolute left-7 top-7 font-display text-[3rem] font-light leading-none text-nera-cream/40 transition-colors duration-base group-hover:text-accent">
                  {p.n}
                </span>
                <div className="relative p-8">
                  <h3 className="font-display text-[1.375rem] font-medium leading-[1.25] text-nera-cream md:text-[1.5rem]">{p.title}</h3>
                  <p className="mt-4 text-body-sm font-light leading-[1.7] text-nera-cream/80">{p.text}</p>
                  <ArrowLink href={p.href} className="mt-6 min-w-0 w-full">
                    {p.cta}
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
