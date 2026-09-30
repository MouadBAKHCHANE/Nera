import { Gauge, Thermometer, Wind, House, Award, FileCheck, Coins } from "lucide-react";
import { prestations } from "@/content/prestations";

/**
 * Icône d'une prestation (Lucide, trait 1.5). Le nom d'icône vient de
 * `content/prestations.ts`, source des sept prestations. `of` accepte le slug (`subventions`) ou la route
 * (`/prestations/subventions`), pour être utilisable depuis les menus comme depuis
 * les listes de prestations.
 */
export function PrestationIcon({
  of,
  className = "size-6",
  strokeWidth = 1.5,
}: {
  of: string;
  className?: string;
  strokeWidth?: number;
}) {
  // Choix explicite parmi des composants statiques : un composant obtenu par un appel de
  // fonction pendant le rendu serait vu par React comme recréé à chaque rendu.
  const slug = of.replace(/^\/prestations\//, "");
  const props = { className, strokeWidth, "aria-hidden": true } as const;
  switch (prestations.find((x) => x.slug === slug)?.icon) {
    case "gauge":
      return <Gauge {...props} />;
    case "thermometer":
      return <Thermometer {...props} />;
    case "wind":
      return <Wind {...props} />;
    case "house":
      return <House {...props} />;
    case "award":
      return <Award {...props} />;
    case "file-check":
      return <FileCheck {...props} />;
    case "coins":
      return <Coins {...props} />;
    default:
      return null;
  }
}
