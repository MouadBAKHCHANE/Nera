import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/prestations";

/**
 * Héro plein écran, direction hestera.ch : photo pleine largeur sous voile marine,
 * eyebrow en capitales espacées, H1 clair en Clash Display, un lien fléché + un bouton.
 * La photo est un placeholder Unsplash en attendant les photos du client.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[720px] items-end overflow-hidden bg-nera-navy text-nera-cream lg:min-h-[82vh]">
      <Image
        src="/img/hero-immeuble-residentiel.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Voile marine : lisibilité du texte, cohérence de palette */}
      <div className="absolute inset-0 bg-gradient-to-t from-nera-navy via-nera-navy/75 to-nera-navy/35" aria-hidden />

      <Container className="relative pb-20 pt-40 lg:pb-28">
        <Reveal as="p" className="text-eyebrow font-medium uppercase text-accent">
          Genève · Suisse romande
        </Reveal>
        <Reveal as="h1" delay={0.06} className="mt-6 max-w-4xl text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-nera-cream md:text-display-lg lg:text-display-xl">
          Ingénierie énergétique et physique du bâtiment, avec équilibre
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-6 max-w-2xl text-body-lg text-nera-cream/80">
          Bureau d&apos;ingénieurs conseils indépendant : audits CECB, installations CVC, rénovation énergétique,
          labels Minergie et subventions, de l&apos;étude au suivi de réalisation.
        </Reveal>
        <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/contact" variant="accent">
            Nous contacter
          </Button>
          <Link
            href="/prestations"
            className="group inline-flex items-center gap-3 border-b border-nera-cream/40 pb-1 text-[15px] font-medium text-nera-cream transition-colors hover:border-nera-cream"
          >
            Nos prestations
            <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1" strokeWidth={1.75} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
