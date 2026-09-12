import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Héro clair et centré (direction For Future home-b) : H1 large, paragraphe court,
 * deux boutons, puis photo pleine largeur. Photo fournie par le client (Assets/Visuels).
 */
export function Hero() {
  return (
    <section className="bg-canvas">
      <Container className="flex flex-col items-center pb-16 pt-20 text-center lg:pb-20 lg:pt-24">
        <Reveal
          as="h1"
          className="max-w-4xl text-[2.5rem] leading-[1.08] tracking-[-0.02em] md:text-display-lg lg:text-display-xl lg:leading-[1.15]"
        >
          Ingénierie énergétique et physique du bâtiment, guidées par l&apos;équilibre
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-6 max-w-xl text-body-md text-body md:text-body-lg">
          Bureau d&apos;ingénieurs conseils indépendant basé à Genève, de l&apos;audit CECB au suivi de réalisation, sur
          toute la Suisse romande.
        </Reveal>
        <Reveal delay={0.12} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/contact" variant="accent">
            Nous contacter
          </Button>
          <Button href="/prestations" variant="secondary">
            Nos prestations
          </Button>
        </Reveal>
      </Container>

      <div className="relative h-[56vw] max-h-[720px] min-h-[320px] w-full overflow-hidden bg-nera-navy">
        <Image
          src="/img/hero-immeuble-geneve-soleil.webp"
          alt="Immeuble résidentiel à Genève au soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
