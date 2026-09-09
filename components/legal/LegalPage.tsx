import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeaderDark } from "@/components/home2/HeaderDark";
import { FooterDark } from "@/components/home2/FooterDark";
import { Container } from "@/components/ui/Container";
import { RichText } from "./RichText";
import { CookieChoice } from "./CookieChoice";
import type { LegalBlock, LegalDoc } from "@/content/legal-pages";
import { seo } from "@/content/seo";
import { company } from "@/content/prestations";

/** Numéro du document source, formaté pour le titre de section. */
const label = (num: number | undefined, title: string) => (num ? `${num}. ${title}` : title);

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="mt-4 text-body-md leading-[1.75] text-body first:mt-0">
                <RichText text={b.text} />
              </p>
            );
          case "lines":
            return (
              <p key={i} className="mt-4 text-body-md leading-[1.9] text-body first:mt-0">
                {b.lines.map((line, j) => (
                  <span key={j} className="block">
                    <RichText text={line} />
                  </span>
                ))}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-4 space-y-2 first:mt-0">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-body-md leading-[1.75] text-body">
                    <span className="mt-[0.7em] size-1.5 shrink-0 bg-accent" aria-hidden />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[32rem] border-collapse text-left text-body-sm">
                  <thead>
                    <tr className="border-b border-nera-navy/25">
                      {b.head.map((h) => (
                        <th key={h} className="py-2.5 pr-6 text-[12px] font-medium uppercase tracking-[0.14em] text-nera-navy">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j} className="border-b border-hairline">
                        {row.map((cell, k) => (
                          <td key={k} className="py-3 pr-6 align-top text-body">
                            {k === 0 ? <code className="text-nera-navy">{cell}</code> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <div key={i} className="mt-6 border-l-2 border-accent bg-nera-green-soft/50 px-5 py-4">
                <p className="text-body-sm font-medium text-nera-navy">{b.title}</p>
                {b.body.map((text, j) => (
                  <p key={j} className="mt-2 text-body-sm leading-[1.7] text-body">
                    <RichText text={text} />
                  </p>
                ))}
              </div>
            );
          case "consent":
            return <CookieChoice key={i} />;
        }
      })}
    </>
  );
}

/**
 * Gabarit partagé des trois pages légales : bandeau marine (fil d'Ariane, H1, date de
 * mise à jour), sommaire, puis prose sur fond crème. Le contenu vient de
 * `content/legal-pages.ts` et n'est jamais reformulé ici.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${seo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: doc.shortTitle, item: `${seo.siteUrl}${doc.route}` },
    ],
  };

  return (
    <>
      <HeaderDark />
      <main>
        <header className="bg-nera-navy-deep bg-blueprint pb-14 pt-[120px] text-nera-cream lg:pb-20 lg:pt-[180px]">
          <Container className="max-w-3xl">
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
                  {doc.shortTitle}
                </li>
              </ol>
            </nav>

            <p className="mt-8 flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">
              <span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />
              Informations légales
            </p>

            <h1 className="mt-6 font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">
              {doc.title}
            </h1>

            {doc.lead && <p className="mt-5 max-w-[52ch] text-body-md font-light text-nera-cream/80">{doc.lead}</p>}

            <p className="mt-6 text-body-sm font-light text-nera-cream/60">
              Dernière mise à jour : <time dateTime={doc.updatedIso}>{doc.updated}</time>
            </p>
          </Container>
        </header>

        <div className="py-section-sm lg:py-section">
          <Container className="max-w-3xl">
            <nav aria-labelledby="sommaire" className="border-y border-hairline py-6">
              <h2 id="sommaire" className="text-[12px] font-medium uppercase tracking-[0.2em] text-nera-navy">
                Sommaire
              </h2>
              <ol className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-body-sm text-body transition-colors hover:text-accent-deep">
                      {label(s.num, s.title)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-28 first:mt-10">
                <h2 className="font-display text-display-sm text-nera-navy">{label(s.num, s.title)}</h2>
                <div className="mt-4">
                  <Blocks blocks={s.blocks} />
                </div>
              </section>
            ))}

            <p className="mt-14 border-t border-hairline pt-6 text-body-sm text-mute">
              Une question sur ce document ? Écrivez-nous à{" "}
              <a
                href={`mailto:${company.email}`}
                className="underline underline-offset-2 transition-colors hover:text-accent-deep"
              >
                {company.email}
              </a>
              .
            </p>
          </Container>
        </div>
      </main>
      <FooterDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
