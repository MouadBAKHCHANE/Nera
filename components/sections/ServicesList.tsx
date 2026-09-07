import Link from "next/link";
import { ArrowUpRight, Gauge, Thermometer, Wind, House, Award, FileCheck, Coins } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { prestations, type Prestation } from "@/content/prestations";

const icons: Record<Prestation["icon"], typeof Gauge> = {
  gauge: Gauge,
  thermometer: Thermometer,
  wind: Wind,
  house: House,
  award: Award,
  "file-check": FileCheck,
  coins: Coins,
};

/**
 * Section marine, liste de prestations en lignes séparées par des filets
 * (direction For Future home-b). Icône Lucide à la place de la vignette photo
 * tant que le client n'a pas fourni de visuels par prestation.
 */
export function ServicesList() {
  return (
    <section id="prestations" className="bg-surface-dark py-section-sm text-nera-cream lg:py-section">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="light">Prestations</Eyebrow>
          <h2 className="mt-6 text-display-md text-nera-cream md:text-display-lg">Sept prestations, un seul interlocuteur</h2>
          <p className="mt-5 text-body-md text-nera-cream/75">
            De l&apos;audit au dépôt du dossier d&apos;autorisation, jusqu&apos;à l&apos;obtention des subventions et au suivi
            d&apos;exécution. Genève, Vaud, Valais, Neuchâtel et Fribourg.
          </p>
        </Reveal>

        <ul className="mt-14 border-t border-nera-cream/15">
          {prestations.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <Reveal as="li" key={p.slug} delay={i * 0.04} className="border-b border-nera-cream/15">
                <Link
                  href={`/prestations/${p.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 transition-colors md:gap-8 md:py-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-md border border-nera-cream/20 text-accent transition-colors duration-base group-hover:border-accent md:size-16">
                    <Icon className="size-6 md:size-7" strokeWidth={1.5} />
                  </span>
                  <span>
                    <h3 className="text-display-sm text-nera-cream md:text-display-md">{p.title}</h3>
                    <p className="mt-2 max-w-2xl text-body-sm text-nera-cream/70 md:text-body-md">{p.short}</p>
                  </span>
                  <ArrowUpRight
                    className="size-6 text-nera-cream/50 transition-all duration-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    strokeWidth={1.5}
                  />
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
