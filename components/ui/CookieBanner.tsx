"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; date: string };
const KEY = "nera-cookie-consent";

const read = (): Consent | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
};
const write = (c: Consent) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
  window.dispatchEvent(new CustomEvent("nera:cookie-consent", { detail: c }));
};

/**
 * Bandeau cookies, direction hestera.ch : carte blanche en bas à droite, titre, texte,
 * trois boutons (Personnaliser, Tout rejeter, Accepter tout). Le choix est mémorisé en
 * localStorage ; « Gérer mes cookies » dans le pied de page rouvre le bandeau.
 * Aucun traceur n'est chargé tant que le consentement correspondant n'est pas donné.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = read();
    if (!saved) setOpen(true);
    else {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
    }
    const reopen = (e: Event) => {
      e.preventDefault();
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener("nera:open-cookie-preferences", reopen);
    return () => window.removeEventListener("nera:open-cookie-preferences", reopen);
  }, []);

  const save = (a: boolean, m: boolean) => {
    write({ necessary: true, analytics: a, marketing: m, date: new Date().toISOString() });
    setAnalytics(a);
    setMarketing(m);
    setOpen(false);
    setCustom(false);
  };

  if (!open) return null;

  const outline =
    "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-sm border border-nera-navy px-2 text-[13px] font-medium text-nera-navy sm:flex-none sm:px-4 sm:text-[14px] transition-colors duration-base hover:bg-nera-navy-soft";
  const filled =
    "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-sm bg-nera-navy px-2 text-[13px] font-medium text-nera-cream sm:flex-none sm:px-4 sm:text-[14px] transition-colors duration-base hover:bg-nera-navy-deep";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed bottom-4 left-4 right-4 z-[90] max-w-[460px] rounded-md border border-hairline bg-canvas-alt p-4 shadow-[0_20px_60px_rgba(10,36,64,0.25)] sm:left-auto sm:right-5 sm:bottom-5 sm:p-6"
    >
      <div className="flex items-start gap-2">
        {custom && (
          <button
            type="button"
            onClick={() => setCustom(false)}
            aria-label="Retour"
            className="-ml-1 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-sm text-nera-navy transition-colors hover:bg-nera-navy-soft"
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} />
          </button>
        )}
        <h2 id="cookie-title" className="font-display text-[1.125rem] font-semibold leading-tight text-nera-navy md:text-[1.25rem]">
          {custom ? "Personnaliser mes cookies" : "Nous respectons votre vie privée."}
        </h2>
      </div>

      {!custom ? (
        <>
          <p className="mt-2.5 text-[13px] leading-[1.5] text-body sm:text-body-sm">
            Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser des publicités ou des
            contenus personnalisés et analyser notre trafic. En cliquant sur « Tout accepter », vous consentez à notre
            utilisation des cookies.
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => setCustom(true)} className={outline}>
              Personnaliser
            </button>
            <button type="button" onClick={() => save(false, false)} className={outline}>
              Tout rejeter
            </button>
            <button type="button" onClick={() => save(true, true)} className={filled}>
              Accepter tout
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-[13px] leading-[1.55] text-body">
            Choisissez les catégories de cookies que vous acceptez. Les cookies nécessaires au fonctionnement du site sont
            toujours actifs. Détails dans notre{" "}
            <Link href="/cookies" className="underline underline-offset-2 hover:text-nera-navy">
              politique relative aux cookies
            </Link>
            .
          </p>
          <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
            {[
              { id: "necessary", label: "Nécessaires", desc: "Fonctionnement du site et mémorisation de vos choix.", on: true, locked: true, set: () => {} },
              { id: "analytics", label: "Statistiques", desc: "Mesure d'audience anonyme pour améliorer le site.", on: analytics, locked: false, set: setAnalytics },
              { id: "marketing", label: "Marketing", desc: "Contenus personnalisés et suivi des campagnes.", on: marketing, locked: false, set: setMarketing },
            ].map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 py-2.5">
                <div>
                  <p className="text-body-sm font-medium text-nera-navy">{c.label}</p>
                  <p className="text-[13px] text-mute">{c.desc}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={c.on}
                  aria-label={c.label}
                  disabled={c.locked}
                  onClick={() => c.set(!c.on)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${c.on ? "bg-accent" : "bg-hairline"} ${c.locked ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${c.on ? "left-0.5 translate-x-5" : "left-0.5"}`} />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => save(false, false)} className={outline}>
              Tout rejeter
            </button>
            <button type="button" onClick={() => save(analytics, marketing)} className={filled}>
              Enregistrer mes choix
            </button>
          </div>
        </>
      )}
    </div>
  );
}
