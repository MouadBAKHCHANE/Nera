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
    <div className={`w-[760px] rounded-md border p-4 shadow-[0_24px_60px_rgba(10,36,64,0.35)] ${panel}`}>
      <div className="grid grid-cols-[240px_1fr] gap-4">
        {/* Carte de gauche : logomark en haut, nom en bas, sur toute la hauteur du panneau */}
        <div className={`flex flex-col justify-between rounded-sm p-6 ${card}`}>
          <Image src="/logos/nera-mark-green.svg" alt="" width={40} height={46} style={{ height: 44, width: "auto" }} />
          <p className={`font-display text-[1.25rem] font-medium ${title}`}>NERA</p>
        </div>
        <div className="flex flex-col">
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
            {navPrestations.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={`block rounded-sm px-3 py-2.5 transition-colors ${hover}`}>
                  <span className={`block text-[15px] font-semibold ${title}`}>{p.label}</span>
                  <span className={`mt-0.5 block text-[13px] font-light leading-[1.45] ${desc}`}>{p.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 px-3 pb-1">
            <Link href="/prestations" className={`group inline-flex items-center gap-2 text-[15px] font-semibold transition-colors hover:text-accent ${title}`}>
              Toutes les prestations
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
