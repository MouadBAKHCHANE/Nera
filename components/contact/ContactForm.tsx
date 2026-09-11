import { ArrowRight } from "lucide-react";
import { FormNotice } from "@/components/ui/FormNotice";
import { prestations } from "@/content/prestations";

/**
 * Formulaire de contact simple, partagé par la section contact de l'accueil
 * (`components/home2/ContactDark.tsx`, fond marine) et par la page `/contact` (fond clair).
 * Un seul jeu de champs pour les deux : le `tone` ne change que les couleurs.
 *
 * Le formulaire n'est pas encore relié — `action="#"` — en attendant l'envoi des e-mails
 * par Microsoft Graph (point 3 d'`ETAT.md`). Ne pas brancher sur `/api/devis` : cette route
 * sert le pop-up en quatre étapes, dont les champs sont différents.
 */
const tones = {
  dark: {
    field:
      "w-full border-0 border-b border-nera-cream/40 bg-transparent px-0 py-3 text-body-md font-light text-nera-cream placeholder:text-nera-cream/60 focus:border-accent focus:outline-none",
    option: "text-nera-ink",
    submit: "border-nera-cream/50 text-nera-cream hover:border-nera-cream",
    notice: "text-nera-cream/60",
  },
  light: {
    field:
      "w-full border-0 border-b border-hairline bg-transparent px-0 py-3 text-body-md font-light text-ink placeholder:text-mute focus:border-accent focus:outline-none",
    option: "text-nera-ink",
    submit: "border-nera-navy/40 text-nera-navy hover:border-nera-navy",
    notice: "text-mute",
  },
} as const;

export function ContactForm({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const t = tones[tone];
  return (
    <form action="#" method="post" className={`grid gap-x-16 gap-y-6 lg:grid-cols-2 ${className}`}>
      <div className="grid content-start gap-6">
        <label className="block">
          <span className="sr-only">Nom complet</span>
          <input name="nom" type="text" placeholder="Nom complet*" required autoComplete="name" className={t.field} />
        </label>
        <label className="block">
          <span className="sr-only">Adresse e-mail</span>
          <input name="email" type="email" placeholder="Adresse e-mail*" required autoComplete="email" className={t.field} />
        </label>
        <label className="block">
          <span className="sr-only">Entreprise</span>
          <input name="entreprise" type="text" placeholder="Entreprise" autoComplete="organization" className={t.field} />
        </label>
        <label className="block">
          <span className="sr-only">Téléphone</span>
          <input name="telephone" type="tel" placeholder="Téléphone" autoComplete="tel" className={t.field} />
        </label>
      </div>
      <div className="grid content-start gap-6">
        <label className="block">
          <span className="sr-only">Sujet</span>
          <select name="sujet" defaultValue="" className={`${t.field} appearance-none`}>
            <option value="" disabled className={t.option}>
              Sujet*
            </option>
            {prestations.map((p) => (
              <option key={p.slug} value={p.slug} className={t.option}>
                {p.title}
              </option>
            ))}
            <option value="autre" className={t.option}>
              Autre demande
            </option>
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Message</span>
          <textarea name="message" rows={5} placeholder="Message*" required className={`${t.field} resize-none`} />
        </label>
        {/* Honeypot anti-spam */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button
          type="submit"
          className={`group ml-auto inline-flex items-center gap-4 border-t pt-4 text-[15px] font-medium transition-colors ${t.submit}`}
        >
          Envoyer le message
          <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1.5" strokeWidth={1.75} />
        </button>
        <FormNotice variant="contact" className={t.notice} />
      </div>
    </form>
  );
}
