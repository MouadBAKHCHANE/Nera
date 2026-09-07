import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/content/prestations";
import { footerTagline, footerPrestations, footerBureau, footerLegal, mapsHref } from "@/content/footer";
import { CookiePrefsButton } from "@/components/ui/CookiePrefsButton";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

const link = "text-body-sm font-light text-nera-cream/80 transition-colors hover:text-accent";
const head = "text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream";

/**
 * Pied de page sombre (Home 2) : marque + accroche + réseaux + coordonnées cliquables,
 * prestations, le bureau, mentions légales.
 */
export function FooterDark() {
  return (
    <footer className="border-t border-nera-cream/15 bg-nera-navy-deep text-nera-cream">
      <div className="grid gap-12 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-[6fr_3fr_3fr] lg:px-[120px] lg:py-20">
        <div>
          <Image src="/logos/nera-tagline-cream-green.svg" alt={company.shortName} width={220} height={57} style={{ height: 48, width: "auto" }} />
          <p className="mt-6 max-w-sm text-body-sm font-light leading-[1.7] text-nera-cream/80">{footerTagline}</p>


          <address className="mt-6 space-y-3 not-italic text-body-sm font-light text-nera-cream/85">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-accent">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span>
                {company.street}
                <br />
                {company.zip} {company.city}
              </span>
            </a>
            <a href={company.phoneHref} className="flex items-center gap-3 transition-colors hover:text-accent">
              <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 transition-colors hover:text-accent">
              <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              {company.email}
            </a>
          </address>
        </div>

        <div>
          <h3 className={head}>Prestations</h3>
          <ul className="mt-6 space-y-2.5">
            {footerPrestations.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={link}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={head}>Le bureau</h3>
          <ul className="mt-6 space-y-2.5">
            {footerBureau.map((b) =>
              b.external ? (
                <li key={b.href}>
                  <a href={b.href} target="_blank" rel="noopener noreferrer" className={link}>{b.label}</a>
                </li>
              ) : (
                <li key={b.href}>
                  <Link href={b.href} className={link}>{b.label}</Link>
                </li>
              ),
            )}
          </ul>
          <a
            href={company.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="mt-5 inline-flex size-11 items-center justify-center border border-nera-cream/20 text-nera-cream transition-colors hover:border-accent hover:text-accent"
          >
            <LinkedInIcon />
          </a>
        </div>

      </div>

      <div className="flex flex-col items-center gap-4 border-t border-nera-cream/15 px-6 py-6 text-[12px] font-light text-nera-cream/60 md:flex-row md:justify-between md:px-10 lg:px-[120px]">
        <p>© {new Date().getFullYear()} {company.name}. Tous droits réservés.</p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {footerLegal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-nera-cream">{l.label}</Link>
            </li>
          ))}
          <li>
            <CookiePrefsButton className="cursor-pointer transition-colors hover:text-nera-cream" />
          </li>
        </ul>
      </div>
    </footer>
  );
}
