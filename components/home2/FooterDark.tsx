import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/content/prestations";
import { footerTagline, footerPrestations, footerBureau, footerLegal, mapsHref } from "@/content/footer";
import { prestationsIndexRoute } from "@/content/prestation-pages";
import { CookiePrefsButton } from "@/components/ui/CookiePrefsButton";
import { SocialLinks } from "@/components/ui/SocialLinks";

const link = "text-body-sm font-light text-nera-cream/80 transition-colors hover:text-accent";
const head = "text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream";
const row = "flex items-center justify-center gap-3 transition-colors hover:text-accent lg:justify-start";

/**
 * Pied de page sombre.
 * Mobile : tout centré. Tablette : marque + coordonnées centrées, menus à gauche et à droite,
 * icônes sociales centrées, liens légaux puis copyright. Desktop : trois colonnes, icônes sous Contact.
 */
export function FooterDark() {
  return (
    <footer className="border-t border-nera-cream/15 bg-nera-navy-deep text-nera-cream">
      <div className="grid gap-12 px-6 py-16 text-center md:grid-cols-[auto_auto] md:justify-center md:gap-x-24 md:px-10 lg:grid-cols-[6fr_3fr_3fr] lg:px-[120px] lg:py-20 lg:text-left">
        {/* Marque + coordonnées */}
        <div className="flex flex-col items-center md:col-span-2 lg:col-span-1 lg:items-start">
          <Image src="/logos/nera-tagline-cream-green.svg" alt={company.shortName} width={220} height={57} style={{ height: 48, width: "auto" }} />
          <p className="mt-6 max-w-sm text-body-sm font-light leading-[1.7] text-nera-cream/80">{footerTagline}</p>
          <address className="mt-6 space-y-3 not-italic text-body-sm font-light text-nera-cream/85">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={`${row} items-start`}>
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="text-left">
                {company.street}
                <br />
                {company.zip} {company.city}
              </span>
            </a>
            <a href={company.phoneHref} className={row}>
              <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className={row}>
              <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
              {company.email}
            </a>
          </address>
        </div>

        {/* Menus : centrés sur mobile, gauche / droite sur tablette, colonnes sur desktop */}
        <div className="md:text-left">
          <h3 className={head}>Prestations</h3>
          <ul className="mt-6 space-y-2.5">
            {/* L'index en tête de liste, au même style que les six prestations. */}
            <li>
              <Link href={prestationsIndexRoute} className={link}>Toutes les prestations</Link>
            </li>
            {footerPrestations.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={link}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right lg:text-left">
          <h3 className={head}>Le bureau</h3>
          <ul className="mt-6 space-y-2.5">
            {footerBureau.map((b) => (
              <li key={b.href}>
                <Link href={b.href} className={link}>{b.label}</Link>
              </li>
            ))}
          </ul>
          <SocialLinks tone="light" className="mt-4 hidden md:flex md:justify-end lg:-ml-2.5 lg:justify-start" />
        </div>

        {/* Icônes sociales centrées, mobile et tablette seulement */}
        <div className="flex justify-center md:hidden">
          <SocialLinks tone="light" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 border-t border-nera-cream/15 px-6 py-6 text-center text-[12px] font-light text-nera-cream/60 md:px-10 lg:flex-row lg:justify-between lg:px-[120px] lg:text-left">
        <ul className="order-1 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:order-2">
          {footerLegal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-nera-cream">{l.label}</Link>
            </li>
          ))}
          <li>
            <CookiePrefsButton className="cursor-pointer transition-colors hover:text-nera-cream" />
          </li>
        </ul>
        <p className="order-2 lg:order-1">© {new Date().getFullYear()} {company.name}. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
