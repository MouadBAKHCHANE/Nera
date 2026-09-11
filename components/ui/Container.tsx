import type { ReactNode } from "react";

/**
 * Deux gabarits de largeur coexistent sur le site :
 * - par défaut, le conteneur centré de 76 rem (`max-w-site`), gouttières 24 / 40 px ;
 * - `wide`, celui des sections « NERA en chiffres » et « Territoire » : pleine largeur, sans
 *   maximum, gouttières 24 / 40 / 120 px.
 *
 * `/bureau` est entièrement en `wide`, pour que toutes ses sections s'alignent sur « NERA en
 * chiffres ». Ne pas mélanger les deux sur une même page : le décalage se voit au défilement.
 */
export function Container({
  children,
  wide = false,
  className = "",
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  const box = wide ? "w-full px-6 md:px-10 lg:px-[120px]" : "mx-auto w-full max-w-site px-6 md:px-10";
  return <div className={`${box} ${className}`}>{children}</div>;
}
