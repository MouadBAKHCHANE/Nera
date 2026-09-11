"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cookieBanner, cookieCategories } from "@/content/legal";
import { CONSENT_OPEN, readConsent, writeConsent } from "@/lib/consent";

/**
 * Bandeau cookies. Titre, texte et libellés de boutons repris mot pour mot du document
 * client (Assets/Documents légaux/Bannières cookies.docx) ; la mise en forme suit la
 * direction hestera.ch : carte en bas à droite, trois boutons, vue « Personnaliser ».
 * Le choix est mémorisé en localStorage ; « Gérer mes cookies » dans le pied de page
 * rouvre le bandeau. Aucun traceur n'est chargé sans le consentement correspondant.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readConsent();
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
    window.addEventListener(CONSENT_OPEN, reopen);
    return () => window.removeEventListener(CONSENT_OPEN, reopen);
  }, []);

  const save = (a: boolean, m: boolean) => {
    writeConsent({ necessary: true, analytics: a, marketing: m, date: new Date().toISOString() });
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

  const toggles: Record<string, { on: boolean; set: (v: boolean) => void } | undefined> = {
    analytics: { on: analytics, set: setAnalytics },
    marketing: { on: marketing, set: setMarketing },
  };

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
          {custom ? cookieBanner.customise : cookieBanner.title}
        </h2>
      </div>

      {!custom ? (
        <>
          <p className="mt-2.5 text-[13px] leading-[1.5] text-body sm:text-body-sm">
            {cookieBanner.text}{" "}
            <Link href={cookieBanner.link.href} className="underline underline-offset-2 hover:text-nera-navy">
              {cookieBanner.link.label}
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => setCustom(true)} className={outline}>
              {cookieBanner.customise}
            </button>
            <button type="button" onClick={() => save(false, false)} className={outline}>
              {cookieBanner.rejectAll}
            </button>
            <button type="button" onClick={() => save(true, true)} className={filled}>
              {cookieBanner.acceptAll}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-[13px] leading-[1.55] text-body">
            Choisissez les technologies que vous acceptez. Les cookies nécessaires au fonctionnement du site sont
            toujours actifs. Détails dans notre{" "}
            <Link href={cookieBanner.link.href} className="underline underline-offset-2 hover:text-nera-navy">
              {cookieBanner.link.label.toLowerCase()}
            </Link>
            .
          </p>
          <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
            {cookieCategories.map((c) => {
              const t = toggles[c.id];
              const on = t ? t.on : true;
              return (
                <li key={c.id} className="flex items-center justify-between gap-4 py-2.5">
                  <div>
                    <p className="text-body-sm font-medium text-nera-navy">{c.label}</p>
                    <p className="text-[13px] text-mute">{c.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={c.label}
                    disabled={!t}
                    onClick={() => t?.set(!on)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-accent" : "bg-hairline"} ${t ? "" : "cursor-not-allowed opacity-70"}`}
                  >
                    <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${on ? "left-0.5 translate-x-5" : "left-0.5"}`} />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => save(false, false)} className={outline}>
              {cookieBanner.rejectAll}
            </button>
            <button type="button" onClick={() => save(true, true)} className={outline}>
              {cookieBanner.acceptAll}
            </button>
            <button type="button" onClick={() => save(analytics, marketing)} className={filled}>
              {cookieBanner.save}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
