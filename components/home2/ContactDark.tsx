import { MapPin, Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/prestations";
import { mapsHref } from "@/content/footer";
import { QuoteCta } from "./QuoteCta";
import { ContactForm } from "@/components/contact/ContactForm";

/**
 * Bloc contact variante hestera.ch : titre CONTACT + coordonnées, puis formulaire
 * à champs soulignés sur fond marine. Les champs vivent dans `components/contact/ContactForm.tsx`,
 * partagés avec la page `/contact` pour que les deux ne divergent pas.
 */
export function ContactDark() {
  return (
    <section id="contact" className="bg-nera-navy-deep bg-blueprint py-16 text-nera-cream lg:py-20">
      <div className="px-6 md:px-10 lg:px-[120px]">
        <div className="grid gap-8 border-b border-nera-cream/15 pb-10 lg:grid-cols-2">
          <Reveal>
            <p className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/80"><span className="h-2 w-7 shrink-0 bg-accent" aria-hidden />Contact</p>
            <h2 className="mt-6 font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">Parlons de votre bâtiment</h2>
            <p className="mt-5 max-w-[46ch] text-body-md font-light text-nera-cream/80">
              Vous prévoyez une vente, une rénovation, une transformation, un remplacement de chauffage ou une
              nouvelle construction ?
            </p>
            <p className="mt-3 max-w-[46ch] text-body-md font-light text-nera-cream/80">
              Décrivez-nous votre bâtiment et votre objectif. NERA vous aidera à identifier la prestation et le niveau
              d’accompagnement adaptés.
            </p>
            <QuoteCta className="mt-6" />
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">Coordonnées</h3>
            <ul className="mt-5 space-y-2.5 text-body-md font-light">
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-accent" strokeWidth={1.5} />
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  {company.street}, {company.zip} {company.city}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-accent" strokeWidth={1.5} />
                <a href={company.phoneHref} className="transition-colors hover:text-accent">{company.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-accent" strokeWidth={1.5} />
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-accent">{company.email}</a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="pt-10">
          <h3 className="text-[15px] font-medium uppercase tracking-[0.2em] text-nera-cream">
            Entrez en contact avec NERA
          </h3>
          <ContactForm tone="dark" className="mt-6" />
        </Reveal>
      </div>
    </section>
  );
}
