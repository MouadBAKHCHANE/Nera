"use client";

import { useEffect, useState } from "react";
import { ArrowUp, FileText, Phone } from "lucide-react";
import { useQuote } from "@/components/quote/QuoteModal";
import { company } from "@/content/prestations";

/**
 * Éléments flottants :
 * - deux onglets empilés à mi-hauteur sur le bord droit, qui apparaissent une fois le héro
 *   passé : « Devis gratuit », téléphone et tablette seulement — l'en-tête desktop porte déjà
 *   le bouton devis, épinglé —, puis le numéro de téléphone, sur tous les formats ;
 * - bouton « retour en haut » carré en bas à droite, en vert comme les onglets, sur tous
 *   les formats, visible après un défilement.
 */

/**
 * Un onglet : icône seule au repos, libellé déplié au survol ou à la prise de focus clavier.
 * Le libellé est animé en largeur *maximale* et non en largeur : `max-width` se transitionne,
 * `width: auto` non. Sur un écran tactile, où le survol n'existe pas, l'onglet reste à
 * l'icône seule — d'où l'`aria-label`, nom accessible constant quel que soit l'affichage.
 */
function Tab({
  label,
  ariaLabel,
  icon: Icon,
  href,
  onClick,
  shown,
  extra = "",
}: {
  label: string;
  ariaLabel: string;
  icon: typeof FileText;
  href?: string;
  onClick?: () => void;
  shown: boolean;
  /** Classes supplémentaires : sert à masquer l'onglet devis en desktop. */
  extra?: string;
}) {
  const className = `group inline-flex h-11 items-center rounded-l-sm bg-accent px-3 text-white shadow-[0_8px_24px_rgba(10,36,64,0.35)] transition-all duration-300 hover:bg-accent-deep lg:h-12 ${extra} ${
    shown ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"
  }`;
  const inner = (
    <>
      <Icon className="size-5 shrink-0" strokeWidth={1.75} />
      <span
        className={`max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-medium transition-all duration-300 group-hover:max-w-[12rem] group-hover:pl-2 group-focus-visible:max-w-[12rem] group-focus-visible:pl-2`}
      >
        {label}
      </span>
    </>
  );

  return href ? (
    <a href={href} aria-label={ariaLabel} className={className}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={className}>
      {inner}
    </button>
  );
}

export function CallButton() {
  const { open } = useQuote();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // les onglets et le retour en haut apparaissent une fois le héro passé
      setShown(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Les deux onglets sont empilés dans un même bloc : l'un sous l'autre, alignés à droite. */}
      <div className="fixed right-0 top-1/2 z-[80] flex -translate-y-1/2 flex-col items-end gap-2">
        <Tab
          label="Devis gratuit"
          ariaLabel="Demander un devis gratuit"
          icon={FileText}
          onClick={() => open()}
          shown={shown}
          extra="lg:hidden"
        />
        <Tab
          label={company.phone}
          ariaLabel={`Appeler NERA au ${company.phone}`}
          icon={Phone}
          href={company.phoneHref}
          shown={shown}
        />
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className={`fixed bottom-4 right-3 z-[80] inline-flex size-10 items-center justify-center rounded-sm bg-accent text-white shadow-[0_8px_24px_rgba(10,36,64,0.35)] transition-all duration-300 hover:bg-accent-deep lg:bottom-6 lg:right-6 lg:size-11 ${
          shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="size-4" strokeWidth={1.75} />
      </button>
    </>
  );
}
