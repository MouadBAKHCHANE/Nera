import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { navPrestations } from "@/content/navigation";

/**
 * Méga-menu « Prestations » (direction i-neea.ch) : panneau avec, à gauche, une carte de
 * présentation du bureau et, à droite, les six prestations avec une ligne de description,
 * puis le lien « Toutes les prestations ». `tone` : sombre (accueil) ou clair.
 */
export function PrestationsMenu({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const panel = dark ? "border-nera-cream/10 bg-nera-navy-deep text-nera-cream" : "border-hairline bg-canvas-alt text-nera-ink";
  const card = dark ? "bg-nera-navy/70" : "bg-canvas";
  const title = dark ? "text-nera-cream" : "text-nera-navy";
  const desc = dark ? "text-nera-cream/65" : "text-body";
  const hover = dark ? "hover:bg-nera-navy/60" : "hover:bg-canvas";

  return (
    <div className={`w-[720px] rounded-md border p-3 shadow-[0_24px_60px_rgba(10,36,64,0.35)] ${panel}`}>
      <div className="grid grid-cols-[180px_1fr] gap-3">
        {/* Carte de gauche : logo vertical en haut à gauche, lien « Toutes les prestations » en bas à gauche */}
        <div className={`flex flex-col justify-between rounded-sm p-4 ${card}`}>
          <Image src={dark ? "/logos/nera-vertical-cream-green.svg" : "/logos/nera-mark-green.svg"} alt="NERA" width={120} height={120} style={{ height: 88, width: "auto" }} />
          <Link href="/prestations" className={`group mt-6 inline-flex items-center gap-2 text-[14px] font-semibold transition-colors hover:text-accent ${title}`}>
            Toutes les prestations
            <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
          {navPrestations.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className={`block rounded-sm px-3 py-2 transition-colors ${hover}`}>
                <span className={`block text-[14px] font-semibold ${title}`}>{p.label}</span>
                <span className={`mt-0.5 block text-[12.5px] font-light leading-[1.4] ${desc}`}>{p.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
