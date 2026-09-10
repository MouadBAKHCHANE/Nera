import Image from "next/image";
import Link from "next/link";
import { Award, BadgeCheck, ChevronRight, Mail, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { ArrowQuoteButton } from "@/components/home2/ArrowQuoteButton";
import { DiamondOutline, LogomarkOutline, Ruler } from "@/components/home2/Logomark";
import { Stats } from "@/components/home2/Stats";
import { Territory } from "@/components/home2/Territory";
import { Container } from "@/components/ui/Container";
import { PartnerLogos } from "@/components/ui/PartnerLogos";
import { Reveal } from "@/components/ui/Reveal";
import { bureau, bureauRoute } from "@/content/bureau";
import { company } from "@/content/prestations";
import { seo } from "@/content/seo";

/** Une icône Lucide par qualification, dans l'ordre du contenu : CECB, Minergie, REG B, MPQ. */
const qualificationIcons = [BadgeCheck, Sparkles, Award, ShieldCheck];

const pad = (n: number) => String(n).padStart(2, "0");

/** Bandeau de section : filet vert + libellé, puis H2. Reprend le style des autres pages. */
function SectionHeading({
  eyebrow,
  title,
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
  as?: "h2" | "h3";
}) {
  const light = tone === "light";
  return (
    <>
      <p
        className={`flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] ${
          light ? "text-nera-cream/80" : "text-nera-navy/70"
        }`}
      >
        <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
        {eyebrow}
      </p>
      <Tag
        className={`mt-6 font-display text-[1.75rem] font-light leading-[1.15] md:text-[2.5rem] ${
          light ? "text-nera-cream" : "text-nera-navy"
        }`}
      >
        {title}
      </Tag>
    </>
  );
}

/**
 * Page « Le bureau » : en-tête sombre, puis les H2 du texte client dans l'ordre du document,
 * en alternant les fonds (crème, blanc, marine) sans deux sections marine consécutives.
 * Le contenu vient de `content/bureau.ts` et n'est jamais reformulé ici.
 */
export function BureauPage() {
  const founder = company.founder;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${seo.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Le bureau", item: `${seo.siteUrl}${bureauRoute}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: bureau.meta.title,
      description: bureau.meta.description,
      url: `${seo.siteUrl}${bureauRoute}`,
      mainEntity: {
        "@type": "ProfessionalService",
        name: company.name,
        foundingDate: String(company.founded),
        founder: {
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.role,
          telephone: founder.phone,
          email: founder.email,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: company.street,
          postalCode: company.zip,
          addressLocality: company.city,
          addressCountry: company.country,
        },
        telephone: company.phone,
        email: company.email,
      },
    },
  ];

  return (
    <>
      <HeaderDark solidOnScroll />
      <main>
        {/* En-tête : photo assombrie, fil d'Ariane, H1 et les trois paragraphes d'introduction. */}
        <header className="relative overflow-hidden bg-nera-navy-deep pb-16 pt-[120px] text-nera-cream lg:pb-24 lg:pt-[180px]">
          <Image
            src="/img/bureau-batiment-clair-moderne.jpg"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-nera-navy-deep via-nera-navy-deep/90 to-nera-navy-deep/40"
            aria-hidden
          />
          <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden />

          <Container className="relative">
            <nav aria-label="Fil d'Ariane">
              <ol className="flex flex-wrap items-center gap-1 text-[12px] font-light text-nera-cream/70">
                <li>
                  <Link href="/" className="transition-colors hover:text-accent">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="size-3.5 text-nera-cream/40" strokeWidth={1.5} />
                </li>
                <li aria-current="page" className="text-nera-cream">
                  Le bureau
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <p className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
                <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
                Le bureau
              </p>
              <h1 className="mt-6 font-display text-[1.875rem] font-light leading-[1.15] text-nera-cream md:text-[3rem]">
                {bureau.h1}
              </h1>
              {bureau.lead.map((text, i) => (
                <p key={i} className="mt-5 text-body-md font-light leading-[1.75] text-nera-cream/85 md:text-body-lg">
                  {text}
                </p>
              ))}
              <Ruler className="mt-12 w-56 text-nera-cream" ticks={30} />
            </div>
          </Container>
        </header>

        {/* 1. L'équilibre comme principe — crème. Les six « entre… » en médaillons losange. */}
        <section id={bureau.equilibre.id} className="scroll-mt-24 bg-canvas bg-blueprint-light py-section-sm lg:py-section">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
              <Reveal effect="fade-right">
                <SectionHeading eyebrow="Principe" title={bureau.equilibre.title} />
                <p className="mt-6 max-w-lg text-body-md font-light leading-[1.75] text-body md:text-body-lg">
                  {bureau.equilibre.intro}
                </p>
              </Reveal>
              <ul className="grid gap-4 sm:grid-cols-2 lg:pt-2">
                {bureau.equilibre.items.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 0.06} className="flex items-center gap-5 border border-hairline bg-canvas-alt p-5">
                    <span className="relative flex size-12 shrink-0 items-center justify-center">
                      <DiamondOutline className="absolute inset-0 text-accent" strokeWidth={1} />
                      <span className="font-display text-[13px] font-medium text-nera-navy">{pad(i + 1)}</span>
                    </span>
                    <p className="text-body-md leading-[1.6] text-nera-navy">{item}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* 2. Notre mission — blanc. Phrase de mission, puis les sept verbes numérotés. */}
        <section id={bureau.mission.id} className="scroll-mt-24 border-t border-hairline bg-canvas-alt py-section-sm lg:py-section">
          <Container>
            <Reveal className="max-w-3xl">
              <SectionHeading eyebrow="Mission" title={bureau.mission.title} />
              <p className="mt-8 font-display text-[1.25rem] font-light leading-[1.4] text-nera-navy md:text-[1.625rem]">
                {bureau.mission.intro}
              </p>
              <p className="mt-8 text-body-md text-body">{bureau.mission.lead}</p>
            </Reveal>
            <ol className="mt-8 grid gap-x-10 gap-y-5 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {bureau.mission.items.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.05} className="flex gap-4">
                  <span className="font-display text-[1.375rem] font-light leading-none text-accent-deep">{pad(i + 1)}</span>
                  <p className="pt-0.5 text-body-md leading-[1.6] text-body">{item}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {/* 3. Le fondateur — marine. Cartouche client à gauche, texte et contact à droite. */}
        <section id={bureau.fondateur.id} className="relative scroll-mt-24 overflow-hidden bg-nera-navy bg-blueprint py-section-sm text-nera-cream lg:py-section">
          <LogomarkOutline
            className="pointer-events-none absolute -right-[6vw] top-1/2 hidden w-[30vw] -translate-y-1/2 text-nera-cream/10 lg:block"
            strokeWidth={1}
          />
          <Container className="relative">
            <Reveal className="max-w-3xl">
              <SectionHeading eyebrow="Fondateur" title={bureau.fondateur.title} tone="light" />
            </Reveal>
            <div className="mt-12 grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-20">
              <Reveal effect="fade-right" delay={0.05}>
                <div className="border border-nera-cream/20 p-8">
                  <span className="block h-6 w-px bg-accent" aria-hidden />
                  <p className="mt-5 font-display text-[1.625rem] font-medium leading-[1.15] text-nera-cream">
                    {bureau.fondateur.card.name}
                  </p>
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.2em] text-accent">{bureau.fondateur.card.role}</p>
                  <p className="mt-5 text-body-sm font-light text-nera-cream/85">{bureau.fondateur.card.titles}</p>
                  <p className="mt-1 text-body-sm font-light text-nera-cream/85">{bureau.fondateur.card.field}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="max-w-2xl">
                {bureau.fondateur.paragraphs.map((text) => (
                  <p key={text} className="mt-6 text-body-md font-light leading-[1.75] text-nera-cream/85 first:mt-0 md:text-body-lg">
                    {text}
                  </p>
                ))}
                <ul className="mt-8 space-y-3 border-t border-nera-cream/15 pt-8 text-body-md font-light">
                  <li className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                    <span className="text-nera-cream/70">{bureau.fondateur.phoneLabel} :</span>
                    <a href={founder.phoneHref} className="transition-colors hover:text-accent">
                      {founder.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                    <span className="text-nera-cream/70">{bureau.fondateur.emailLabel} :</span>
                    <a href={`mailto:${founder.email}`} className="transition-colors hover:text-accent">
                      {founder.email}
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 4. L'équipe — crème. Photo à gauche, texte et huit domaines à droite. */}
        <section id={bureau.equipe.id} className="scroll-mt-24 bg-canvas py-section-sm lg:py-section">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">
              <Reveal effect="fade-right" className="relative aspect-[4/3] overflow-hidden rounded-md lg:aspect-[4/5]">
                <Image
                  src={bureau.equipe.image}
                  alt="Trois personnes réunies autour d’un plan d’étage lors d’une séance de travail"
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover saturate-[0.85]"
                />
              </Reveal>
              <Reveal delay={0.08}>
                <SectionHeading eyebrow="Équipe" title={bureau.equipe.title} />
                <p className="mt-6 text-body-md font-light leading-[1.75] text-body md:text-body-lg">{bureau.equipe.intro}</p>
                <p className="mt-6 text-body-md text-body">{bureau.equipe.lead}</p>
                <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {bureau.equipe.items.map((item) => (
                    <li key={item} className="flex gap-3 text-body-md leading-[1.6] text-body">
                      <span className="mt-[0.65em] size-1.5 shrink-0 bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-l-2 border-accent pl-5 text-body-md leading-[1.7] text-nera-navy">{bureau.equipe.outro}</p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 5. Les procédures — blanc. */}
        <section id={bureau.procedures.id} className="scroll-mt-24 border-t border-hairline bg-canvas-alt py-section-sm lg:py-section">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
              <Reveal effect="fade-right">
                <SectionHeading eyebrow="Procédures" title={bureau.procedures.title} />
              </Reveal>
              <Reveal delay={0.08} className="max-w-2xl lg:pt-2">
                <p className="text-body-md font-light leading-[1.75] text-body md:text-body-lg">{bureau.procedures.intro}</p>
                <ol className="mt-8">
                  {bureau.procedures.items.map((item, i, all) => (
                    <li key={item} className="relative flex gap-5 pb-6 last:pb-0">
                      {i < all.length - 1 && <span className="absolute bottom-0 left-[15px] top-9 w-px bg-hairline" aria-hidden />}
                      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center border border-nera-navy/25 bg-canvas-alt font-display text-[13px] font-medium text-nera-navy">
                        {i + 1}
                      </span>
                      <p className="pt-1.5 text-body-md leading-[1.6] text-body">{item}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 6. Les qualifications — crème. Quatre cartes blanches à filet, puis les logos officiels. */}
        <section id={bureau.qualifications.id} className="scroll-mt-24 bg-canvas py-section-sm lg:py-section">
          <Container>
            <Reveal className="max-w-3xl">
              <SectionHeading eyebrow="Qualifications" title={bureau.qualifications.title} />
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {bureau.qualifications.items.map((q, i) => {
                const Icon = qualificationIcons[i % qualificationIcons.length];
                return (
                  <Reveal
                    as="li"
                    key={q.title}
                    delay={i * 0.06}
                    className="flex flex-col rounded-md border border-hairline bg-canvas-alt p-7 transition-colors hover:border-accent"
                  >
                    <Icon className="size-6 text-accent-deep" strokeWidth={1.5} aria-hidden />
                    <h3 className="mt-6 font-display text-[1.1875rem] font-medium leading-[1.25] text-nera-navy">{q.title}</h3>
                    {q.text.map((t) => (
                      <p key={t} className="mt-3 text-body-sm leading-[1.7] text-body">
                        {t}
                      </p>
                    ))}
                  </Reveal>
                );
              })}
            </ul>
            <Reveal delay={0.1} className="mt-12 border-t border-hairline pt-10">
              <PartnerLogos />
            </Reveal>
          </Container>
        </section>

        {/* 7. Les valeurs — blanc. Cinq colonnes, un filet vert en tête de chacune. */}
        <section id={bureau.valeurs.id} className="scroll-mt-24 border-t border-hairline bg-canvas-alt py-section-sm lg:py-section">
          <Container>
            <Reveal className="max-w-3xl">
              <SectionHeading eyebrow="Valeurs" title={bureau.valeurs.title} />
            </Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-hairline">
              {bureau.valeurs.items.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.06} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
                  <span className="block h-6 w-px bg-accent" aria-hidden />
                  <h3 className="mt-5 font-display text-[1.25rem] font-medium leading-[1.25] text-nera-navy">{v.title}</h3>
                  <p className="mt-3 text-body-sm leading-[1.7] text-body">{v.text}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        {/* 8. NERA en chiffres — marine, section de l'accueil avec les libellés de cette page. */}
        <Stats id={bureau.chiffres.id} items={bureau.chiffres.items} />

        {/* 9. Six cantons — crème, section de l'accueil avec le H2 de cette page. */}
        <Territory
          id={bureau.cantons.id}
          title={
            <>
              Une présence dans <span className="font-medium text-accent-deep">six cantons romands</span>
            </>
          }
          text={bureau.cantons.text}
        />

        {/* 10. Rencontrons-nous — marine, deux CTA du client. */}
        <section className="bg-nera-navy-deep bg-blueprint py-section-sm text-nera-cream lg:py-section">
          <Container>
            <Reveal className="max-w-3xl">
              <h2 className="font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
                {bureau.closing.title}
              </h2>
              <ArrowQuoteButton className="mt-10">{bureau.closing.secondary}</ArrowQuoteButton>
            </Reveal>
          </Container>
        </section>
      </main>
      <FooterDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
