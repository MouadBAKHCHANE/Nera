import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Credentials } from "@/components/sections/Credentials";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { prestations, company, cantons } from "@/content/prestations";

export default function Home() {
  return (
    <>
      <Header onDark />
      <main>
        <Hero />
        <Credentials />

        <section id="prestations" className="py-section-sm lg:py-section">
          <Container>
            <Reveal className="max-w-2xl">
              <p className="text-eyebrow font-medium uppercase text-accent">Prestations</p>
              <h2 className="mt-4 text-display-md md:text-display-lg">Sept prestations, un seul interlocuteur</h2>
              <p className="mt-5 text-body-lg text-body">
                De l&apos;audit au dépôt du dossier d&apos;autorisation, jusqu&apos;à l&apos;obtention des subventions et au suivi
                d&apos;exécution, sur les cantons de {cantons.join(", ")}.
              </p>
            </Reveal>
            <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {prestations.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 0.06}>
                  <Link
                    href={`/prestations/${p.slug}`}
                    className="group flex h-full flex-col rounded-md border border-hairline bg-canvas-alt p-8 transition-colors duration-base hover:border-accent"
                  >
                    <h3 className="text-display-sm">{p.title}</h3>
                    <p className="mt-3 flex-1 text-body-sm text-body">{p.short}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-nera-navy">
                      En savoir plus
                      <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1" strokeWidth={1.75} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <section className="bg-surface-dark py-section-sm text-nera-cream lg:py-section">
          <Container className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <Reveal>
              <Image src="/logos/nera-mark-green.svg" alt="" width={40} height={46} className="h-11 w-auto" />
              <p className="mt-8 text-eyebrow font-medium uppercase text-accent">Un projet à étudier ?</p>
              <h2 className="mt-4 max-w-2xl text-display-md text-nera-cream md:text-display-lg">
                Parlons de votre bâtiment avec un ingénieur, pas avec un commercial
              </h2>
              <p className="mt-5 max-w-xl text-body-md text-nera-cream/75">
                {company.founder.name}, {company.founder.titles}, vous répond directement.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap gap-3">
              <Button href="/contact" variant="accent">Nous contacter</Button>
              <Button href={company.phoneHref} variant="ghost-light">{company.phone}</Button>
            </Reveal>
          </Container>
        </section>

        <footer className="py-8">
          <Container className="flex flex-wrap items-center justify-between gap-4 text-body-sm text-mute">
            <span>{company.name} · {company.street}, {company.zip} {company.city}</span>
            <span>Footer provisoire</span>
          </Container>
        </footer>
      </main>
    </>
  );
}
