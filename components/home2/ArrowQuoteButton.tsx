"use client";

import { useQuote } from "@/components/quote/QuoteModal";
import { arrowLinkClass, ArrowLinkIcon, type ArrowTone } from "./ArrowLink";

/**
 * Même apparence que `ArrowLink`, mais ouvre le pop-up « Devis gratuit » au lieu de
 * naviguer. Utilisé par les deux CTA « Demander un devis gratuit » (héro et contact).
 */
export function ArrowQuoteButton({
  children = "Demander un devis gratuit",
  tone = "light",
  className = "",
  prestation,
}: {
  children?: React.ReactNode;
  tone?: ArrowTone;
  className?: string;
  prestation?: string;
}) {
  const { open } = useQuote();
  return (
    <button type="button" onClick={() => open(prestation)} className={arrowLinkClass(tone, className)}>
      {children}
      <ArrowLinkIcon />
    </button>
  );
}
