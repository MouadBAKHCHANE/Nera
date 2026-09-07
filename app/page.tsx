import Image from "next/image";
import { prestations, company, cantons } from "@/content/prestations";

/**
 * Page temporaire de vérification des fondations (tokens, polices, logos).
 * À remplacer par l'accueil réel dès que le header et le héro sont validés.
 */
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-site px-6 py-section-sm">
      <header className="flex items-center justify-between border-b border-hairline pb-6">
        <Image src="/logos/nera-horizontal-navy-green.svg" alt={company.shortName} width={174} height={45} priority />
        <a
          href={company.phoneHref}
          className="inline-flex h-12 items-center rounded-sm bg-nera-navy px-[22px] font-medium text-[15px] text-nera-cream transition-colors duration-base hover:bg-nera-navy-deep"
        >
          {company.phone}
        </a>
      </header>

      <section className="py-section-sm">
        <p className="text-eyebrow font-medium uppercase text-accent">Fondations · vérification</p>
        <h1 className="mt-4 max-w-3xl text-[2.5rem] leading-[1.05] tracking-[-0.02em] md:text-display-xl">
          Bureau d&apos;ingénieurs conseils en énergie et physique du bâtiment à Genève
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-body">
          {company.shortName} accompagne architectes, promoteurs, régies et collectivités de l&apos;audit CECB
          jusqu&apos;au suivi d&apos;exécution, sur les cantons de {cantons.join(", ")}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="inline-flex h-12 items-center rounded-sm bg-accent px-[22px] font-medium text-[15px] text-white transition-colors duration-base hover:bg-accent-deep">
            Nous contacter
          </a>
          <a href="#prestations" className="inline-flex h-12 items-center rounded-sm border border-nera-navy px-[22px] font-medium text-[15px] text-nera-navy transition-colors duration-base hover:bg-nera-navy-soft">
            Nos prestations
          </a>
        </div>
      </section>

      <section id="prestations" className="border-t border-hairline py-section-sm">
        <p className="text-eyebrow font-medium uppercase text-accent">Prestations</p>
        <h2 className="mt-4 text-display-lg">Sept prestations, un seul interlocuteur</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prestations.map((p) => (
            <li key={p.slug} className="rounded-md border border-hairline bg-canvas-alt p-8 transition-colors duration-base hover:border-accent">
              <h3 className="text-display-sm">{p.title}</h3>
              <p className="mt-3 text-body-sm text-body">{p.short}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-md bg-surface-dark px-8 py-16 text-nera-cream">
        <Image src="/logos/nera-tagline-cream-green.svg" alt="" width={220} height={57} className="h-auto w-[220px]" />
        <p className="mt-6 text-eyebrow font-medium uppercase text-accent">Section marine</p>
        <h2 className="mt-3 text-display-md text-nera-cream">Titre sur fond marine, accent vert, texte crème</h2>
        <p className="mt-4 max-w-xl text-body-md text-nera-cream/80">
          {company.credentials.join(" · ")}
        </p>
      </section>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6 text-body-sm text-mute">
        <span>{company.name} · {company.street}, {company.zip} {company.city}</span>
        <span>Clash Display + Satoshi · #28AC75 #F4F3EF #222222 #0F3557</span>
      </footer>
    </main>
  );
}
