"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Données du site venues de Sanity, lues une fois par la mise en page racine (côté serveur)
 * puis mises à disposition des composants client, qui ne peuvent pas interroger Sanity.
 */
export type SiteData = {
  /** Vrai dès qu'une référence est publiée dans le Studio : la page et ses liens apparaissent. */
  showReferences: boolean;
};

const SiteContext = createContext<SiteData>({ showReferences: false });

export function SiteProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
