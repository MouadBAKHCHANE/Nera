"use client";

import { openConsentManager } from "@/lib/consent";

/**
 * « Gérer mes cookies » : rouvre le bandeau de consentement sur la vue « Personnaliser ».
 * Si aucun bandeau n'écoute (JavaScript désactivé côté bandeau), renvoie vers /cookies.
 */
export function CookiePrefsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (!openConsentManager()) window.location.href = "/cookies";
      }}
    >
      Gérer mes cookies
    </button>
  );
}
