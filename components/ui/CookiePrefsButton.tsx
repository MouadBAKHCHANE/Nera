"use client";

import { useRouter } from "next/navigation";
import { openConsentManager } from "@/lib/consent";

/**
 * « Gérer mes cookies » : rouvre le bandeau de consentement sur la vue « Personnaliser ».
 * Si aucun bandeau n'écoute (JavaScript désactivé côté bandeau), renvoie vers /cookies.
 */
export function CookiePrefsButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (!openConsentManager()) router.push("/cookies");
      }}
    >
      Gérer mes cookies
    </button>
  );
}
