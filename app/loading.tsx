import { LogoLoader } from "@/components/ui/LogoLoader";

/**
 * Repli affiché pendant le chargement d'une route (Suspense d'App Router).
 * Fond marine, comme le haut de toutes les pages : la transition ne provoque
 * pas de flash clair. Vaut pour toutes les routes qui n'ont pas leur propre `loading`.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-nera-navy-deep bg-blueprint">
      <LogoLoader />
    </div>
  );
}
