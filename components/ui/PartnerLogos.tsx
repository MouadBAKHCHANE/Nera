import Image from "next/image";

/**
 * Logos officiels (Assets/Logos officiels), posés sur des tuiles blanches pour respecter
 * leurs couleurs d'origine sur fond sombre. Largeurs proportionnelles aux fichiers exportés (hauteur 160 px).
 */
const partners = [
  { src: "/logos/partenaires/cecb-expert.png", alt: "CECB Expert", w: 873, href: "https://www.cecb.ch" },
  { src: "/logos/partenaires/minergie.png", alt: "Minergie", w: 595, href: "https://www.minergie.ch" },
  { src: "/logos/partenaires/reg.png", alt: "REG, Registre suisse des professionnels de l'ingénierie, de l'architecture et de l'environnement", w: 694, href: "https://www.reg.ch" },
  { src: "/logos/partenaires/programme-batiments.png", alt: "Le Programme Bâtiments", w: 677, href: "https://www.leprogrammebatiments.ch" },
  { src: "/logos/partenaires/epiqr.png", alt: "EPIQR", w: 377, href: "https://www.epiqr.ch" },
];

export function PartnerLogos({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-5 md:gap-7 ${className}`} aria-label="Certifications et partenaires">
      {partners.map((p) => (
        <li key={p.src}>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center rounded-sm bg-white px-4 transition-opacity hover:opacity-90"
            title={p.alt}
          >
            <Image src={p.src} alt={p.alt} width={p.w} height={160} className="h-8 w-auto" />
          </a>
        </li>
      ))}
    </ul>
  );
}
