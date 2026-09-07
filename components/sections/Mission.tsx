import Image from "next/image";
import { Scale, Compass, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/prestations";

const pillars = [
  {
    icon: Scale,
    title: "Indépendance",
    text: "Aucun lien avec un installateur ou un fabricant. Nos recommandations ne dépendent que de votre bâtiment.",
  },
  {
    icon: Compass,
    title: "Précision",
    text: "Physique du bâtiment, exigences réglementaires et enjeux énergétiques maîtrisés, du calcul au chantier.",
  },
  {
    icon: MapPin,
    title: "Proximité",
    text: "Un bureau à taille humaine, réactif, qui connaît finement les territoires genevois et vaudois.",
  },
];

/**
 * Déclaration de mission centrée (direction For Future) puis photo + cartes.
 * Texte issu du cahier des charges, sans chiffre inventé.
 */
export function Mission() {
  return (
    <section className="bg-canvas py-section-sm lg:py-section">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>Le bureau</Eyebrow>
          <h2 className="mt-6 text-display-sm leading-[1.3] md:text-display-md lg:text-[2.5rem] lg:leading-[1.3]">
            Un bureau d&apos;ingénierie indépendant, à taille humaine, qui apporte aux maîtres d&apos;ouvrage, architectes
            et institutions publiques des solutions énergétiques fiables, durables et équilibrées, adaptées aux
            exigences suisses les plus élevées.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[5fr_7fr]">
          <Reveal className="flex flex-col justify-between rounded-md bg-canvas-alt p-8 md:p-10">
            <p className="text-body-lg text-nera-navy">
              « NERA vient du mot équilibre. Il rappelle la recherche d&apos;harmonie entre la technique, l&apos;humain et
              l&apos;environnement, projet après projet. »
            </p>
            <p className="mt-8 text-body-sm text-mute">
              {company.founder.name} · {company.founder.titles}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="relative min-h-[320px] overflow-hidden rounded-md bg-nera-navy-soft">
            <Image
              src="/img/mission-villa-blanche.jpg"
              alt="Villa contemporaine à l'enveloppe blanche"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className={`rounded-md p-8 ${i === 1 ? "bg-surface-dark text-nera-cream" : "bg-canvas-alt"}`}>
              <p.icon className={`size-8 ${i === 1 ? "text-accent" : "text-nera-navy"}`} strokeWidth={1.5} />
              <h3 className={`mt-6 text-display-sm ${i === 1 ? "text-nera-cream" : ""}`}>{p.title}</h3>
              <p className={`mt-3 text-body-sm ${i === 1 ? "text-nera-cream/75" : "text-body"}`}>{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
