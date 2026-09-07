import { MapPin, Phone, Mail } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/prestations";
import { prestations } from "@/content/prestations";
import { mapsHref } from "@/content/footer";

const field =
  "w-full border-0 border-b border-nera-cream/40 bg-transparent px-0 py-3 text-body-md font-light text-nera-cream placeholder:text-nera-cream/60 focus:border-accent focus:outline-none";

/**
 * Bloc contact variante hestera.ch : titre CONTACT + coordonnées, puis formulaire
 * à champs soulignés sur fond marine. Le formulaire n'est pas encore relié
 * (Route Handler + Resend à venir) : l'attribut action est un placeholder.
 */
export function ContactDark() {
  return (
    <section id="contact" className="bg-nera-navy-deep bg-blueprint py-20 text-nera-cream lg:py-[100px]">
      <div className="px-6 md:px-10 lg:px-[120px]">
        <div className="grid gap-10 border-b border-nera-cream/15 pb-12 lg:grid-cols-2">
          <Reveal>
            <p className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/80"><span className="h-px w-10 bg-accent" aria-hidden />Contact</p>
            <h2 className="mt-8 font-display text-[1.75rem] font-light leading-[1.2] text-nera-cream md:text-[2.5rem]">Parlons de votre bâtiment avec un ingénieur</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="text-[13px] font-medium uppercase tracking-[0.25em] text-nera-cream/80">Coordonnées</h3>
            <ul className="mt-6 space-y-3 text-body-md font-light">
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

        <Reveal className="pt-12">
          <h3 className="text-[15px] font-medium uppercase tracking-[0.2em] text-nera-cream">
            Entrez en contact avec NERA
          </h3>
          <form action="#" method="post" className="mt-8 grid gap-x-16 gap-y-6 lg:grid-cols-2">
            <div className="grid content-start gap-6">
              <label className="block">
                <span className="sr-only">Nom complet</span>
                <input name="nom" type="text" placeholder="Nom complet*" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Adresse e-mail</span>
                <input name="email" type="email" placeholder="Adresse e-mail*" required autoComplete="email" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Entreprise</span>
                <input name="entreprise" type="text" placeholder="Entreprise" autoComplete="organization" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Téléphone</span>
                <input name="telephone" type="tel" placeholder="Téléphone" autoComplete="tel" className={field} />
              </label>
            </div>
            <div className="grid content-start gap-6">
              <label className="block">
                <span className="sr-only">Sujet</span>
                <select name="sujet" defaultValue="" className={`${field} appearance-none`}>
                  <option value="" disabled className="text-nera-ink">Sujet*</option>
                  {prestations.map((p) => (
                    <option key={p.slug} value={p.slug} className="text-nera-ink">{p.title}</option>
                  ))}
                  <option value="autre" className="text-nera-ink">Autre demande</option>
                </select>
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea name="message" rows={5} placeholder="Message*" required className={`${field} resize-none`} />
              </label>
              {/* Honeypot anti-spam */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <button
                type="submit"
                className="group ml-auto inline-flex items-center gap-4 border-t border-nera-cream/50 pt-4 text-[15px] font-medium text-nera-cream transition-colors hover:border-nera-cream"
              >
                Envoyer le message
                <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1.5" strokeWidth={1.75} />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
