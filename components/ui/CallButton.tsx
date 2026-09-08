import { Phone } from "lucide-react";
import { company } from "@/content/prestations";

/** Bouton d'appel carré fixé en bas à droite, téléphone et tablette seulement. */
export function CallButton() {
  return (
    <a
      href={company.phoneHref}
      aria-label={`Appeler NERA au ${company.phone}`}
      className="fixed bottom-4 right-4 z-[80] inline-flex size-10 items-center justify-center rounded-sm bg-accent text-white shadow-[0_8px_24px_rgba(10,36,64,0.35)] transition-colors hover:bg-accent-deep lg:hidden"
    >
      <Phone className="size-4" strokeWidth={1.75} />
    </a>
  );
}
