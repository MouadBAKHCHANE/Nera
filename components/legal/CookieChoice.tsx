"use client";

import { useEffect, useState } from "react";
import { Check, Minus, Settings2 } from "lucide-react";
import { cookieCategories } from "@/content/legal";
import { CONSENT_SAVED, openConsentManager, readConsent, type Consent } from "@/lib/consent";

const dateFormat = new Intl.DateTimeFormat("fr-CH", { day: "numeric", month: "long", year: "numeric" });

/**
 * Rappel du choix enregistré par le visiteur, sur la page /cookies. Lit le consentement
 * en localStorage, se met à jour quand le bandeau enregistre un nouveau choix, et expose
 * « Gérer mes cookies », qui émet nera:open-cookie-preferences (le bandeau rouvre alors
 * la vue « Personnaliser »).
 */
export function CookieChoice() {
  /** `undefined` tant que le composant n'est pas monté : le rendu serveur ne connaît pas le choix. */
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    setConsent(readConsent());
    const onSaved = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_SAVED, onSaved);
    return () => window.removeEventListener(CONSENT_SAVED, onSaved);
  }, []);

  const state: Record<string, boolean> = {
    necessary: true,
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  };

  /** `null` si aucun choix n'est enregistré ou si la date stockée est illisible. */
  const savedAt = consent?.date ? new Date(consent.date) : null;
  const saved = savedAt && !Number.isNaN(savedAt.getTime()) ? dateFormat.format(savedAt) : null;

  return (
    <div className="mt-8 rounded-md border border-hairline bg-canvas-alt p-6 sm:p-8">
      <h3 className="font-display text-display-sm text-nera-navy">Votre choix actuel</h3>

      <p className="mt-2 text-body-sm text-body">
        {consent === undefined
          ? "Lecture de vos préférences…"
          : consent === null
            ? "Aucun choix n’est enregistré sur cet appareil. Les technologies de mesure et de publicité restent désactivées tant que vous n’avez pas donné votre accord."
            : saved
              ? `Choix enregistré sur cet appareil le ${saved}.`
              : "Un choix est enregistré sur cet appareil."}
      </p>

      <ul
        className="mt-6 divide-y divide-hairline border-y border-hairline"
        aria-busy={consent === undefined}
      >
        {cookieCategories.map((c) => {
          const on = state[c.id];
          const locked = c.id === "necessary";
          return (
            <li key={c.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-body-sm font-medium text-nera-navy">{c.label}</p>
                <p className="text-[13px] text-mute">{c.desc}</p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium ${
                  on ? "border-accent/40 bg-nera-green-soft text-accent-deep" : "border-hairline text-mute"
                }`}
              >
                {on ? <Check className="size-3.5" strokeWidth={2} /> : <Minus className="size-3.5" strokeWidth={2} />}
                {locked ? "Toujours actifs" : on ? "Acceptés" : "Refusés"}
              </span>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => openConsentManager()}
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-sm bg-nera-navy px-5 text-body-sm font-medium text-nera-cream transition-colors duration-base hover:bg-nera-navy-deep"
      >
        <Settings2 className="size-4" strokeWidth={1.75} />
        Gérer mes cookies
      </button>
    </div>
  );
}
