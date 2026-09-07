import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { navigation } from "@/content/navigation";
import { prestations, company } from "@/content/prestations";

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
];

/**
 * Pied de page sombre variante hestera.ch : marque + accroche, prestations, liens rapides.
 */
export function FooterDark() {
  const link = "text-body-sm font-light text-nera-cream/80 transition-colors hover:text-accent";
  return (
    <footer className="border-t border-nera-cream/15 bg-nera-navy-deep text-nera-cream">
      <div className="grid gap-12 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-[6fr_3fr_3fr] lg:px-[120px] lg:py-20">
        <div>
          <Image src="/logos/nera-tagline-cream-green.svg" alt={company.shortName} width={220} height={57} style={{ height: 48, width: "auto" }} />
          <p className="mt-6 max-w-sm text-body-sm font-light leading-[1.7] text-nera-cream/80">
            Bureau d&apos;ingénieurs conseils en énergie, physique du bâtiment et CVC. Genève et Suisse romande.
          </p>
          <div className="mt-6 flex items-center gap-2 text-nera-cream">
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-11 items-center justify-center border border-nera-cream/20 transition-colors hover:border-accent hover:text-accent"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>
            </a>
            <a
              href={`mailto:${company.email}`}
              aria-label="Écrire à NERA"
              className="inline-flex size-11 items-center justify-center border border-nera-cream/20 transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="size-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream">Prestations</h3>
          <ul className="mt-6 space-y-2.5">
            {prestations.map((p) => (
              <li key={p.slug}>
                <Link href={`/prestations/${p.slug}`} className={link}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream">Liens rapides</h3>
          <ul className="mt-6 space-y-2.5">
            {navigation.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={link}>{n.label}</Link>
              </li>
            ))}
            <li><Link href="/contact" className={link}>Contact</Link></li>
            <li>
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className={link}>LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-nera-cream/15 px-6 py-6 text-center text-[12px] font-light text-nera-cream/60 md:px-10 lg:px-[120px]">
        <p>
          © {new Date().getFullYear()} {company.name} · {company.street}, {company.zip} {company.city}
        </p>
        <ul className="mt-2 flex flex-wrap justify-center gap-5">
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-nera-cream">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
