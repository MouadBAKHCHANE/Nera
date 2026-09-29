"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { FormNotice } from "@/components/ui/FormNotice";
import { company, prestations } from "@/content/prestations";

/**
 * Formulaire de contact simple, partagé par la section contact de l'accueil
 * (`components/home2/ContactDark.tsx`, fond marine) et par la page `/contact` (fond clair).
 * Un seul jeu de champs pour les deux : le `tone` ne change que les couleurs.
 *
 * Envoi vers `/api/contact`, qui transmet à info@nera-ing.ch par Microsoft Graph. Ne pas
 * brancher sur `/api/devis` : cette route sert le pop-up en quatre étapes, dont les champs
 * sont différents.
 */
const tones = {
  dark: {
    field:
      "w-full border-0 border-b border-nera-cream/40 bg-transparent px-0 py-3 text-body-md font-light text-nera-cream placeholder:text-nera-cream/60 focus:border-accent focus:outline-none",
    option: "text-nera-ink",
    submit: "border-nera-cream/50 text-nera-cream hover:border-nera-cream",
    notice: "text-nera-cream/60",
    title: "text-nera-cream",
    text: "text-nera-cream/75",
    error: "text-[#ffb4a8]",
  },
  light: {
    field:
      "w-full border-0 border-b border-hairline bg-transparent px-0 py-3 text-body-md font-light text-ink placeholder:text-mute focus:border-accent focus:outline-none",
    option: "text-nera-ink",
    submit: "border-nera-navy/40 text-nera-navy hover:border-nera-navy",
    notice: "text-mute",
    title: "text-nera-navy",
    text: "text-body",
    error: "text-[#b3261e]",
  },
} as const;

export function ContactForm({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const t = tones[tone];
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: new FormData(e.currentTarget) });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError(`L'envoi a échoué. Réessayez, ou écrivez-nous à ${company.email} ou appelez le ${company.phone}.`);
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className={`flex items-start gap-4 ${className}`}>
        <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <Check className="size-5" strokeWidth={2} aria-hidden />
        </span>
        <div>
          <p className={`font-display text-[1.375rem] font-light leading-snug ${t.title}`}>Merci, votre message est bien parti.</p>
          <p className={`mt-2 text-body-md font-light leading-[1.7] ${t.text}`}>
            Nous revenons vers vous rapidement. Un accusé de réception vous a été envoyé par e-mail.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={className}>
      <div className="grid gap-x-16 gap-y-6 lg:grid-cols-2">
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
            <select name="sujet" defaultValue="" required className={`${t.field} appearance-none`}>
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
          {error && (
            <p role="alert" className={`text-body-sm ${t.error}`}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className={`group ml-auto inline-flex items-center gap-4 border-t pt-4 text-[15px] font-medium transition-colors disabled:opacity-60 ${t.submit}`}
          >
            {status === "sending" ? "Envoi…" : "Envoyer le message"}
            <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1.5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
      {/* La mention légale court sous les deux colonnes, alignée sur le bord gauche du formulaire. */}
      <FormNotice variant="contact" className={`mt-8 max-w-[80ch] ${t.notice}`} />
    </form>
  );
}
