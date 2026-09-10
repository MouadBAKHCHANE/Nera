import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Audit et étude",
    text: "Audit CECB, modélisation thermique, étude des installations : un diagnostic clair et des scénarios chiffrés.",
  },
  {
    n: "02",
    title: "Dossier et subventions",
    text: "Autorisation de construire, labels Minergie, HPE ou THPE, demandes Programme Bâtiments et communales.",
  },
  {
    n: "03",
    title: "Réalisation",
    text: "Appels d'offres, soumissions, coordination technique et suivi d'exécution jusqu'à la réception.",
  },
];

/**
 * Processus en trois temps sur photo assombrie (direction For Future home-b).
 * Reprend l'« accompagnement complet » décrit dans le cahier des charges.
 */
export function Process() {
  return (
    <section className="relative overflow-hidden bg-nera-navy py-section-sm text-nera-cream lg:py-section">
      <Image
        src="/img/process-panneaux-solaires-immeuble.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-nera-navy/60 via-transparent to-nera-navy" aria-hidden />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="light">Accompagnement</Eyebrow>
          <h2 className="mt-6 text-display-md text-nera-cream md:text-display-lg">
            Un accompagnement complet, de l&apos;audit à la réception
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.08} className="rounded-md border border-nera-cream/15 bg-nera-navy/60 p-8 backdrop-blur-sm">
              <span className="font-display text-display-lg text-accent">{s.n}</span>
              <h3 className="mt-6 text-display-sm text-nera-cream">{s.title}</h3>
              <p className="mt-3 text-body-sm text-nera-cream/75">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
