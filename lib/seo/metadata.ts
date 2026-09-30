import type { Metadata } from "next";

/**
 * Métadonnées d'une page : titre, description, adresse canonique, partage sur les réseaux,
 * indexation.
 *
 * Un seul point d'entrée, parce que Next remplace **tout** le bloc `openGraph` du parent dès
 * qu'une page déclare le sien : sans ce helper, chaque page perdait l'image de partage, le nom du
 * site et la langue. L'image est celle du Studio (onglet SEO de la page) ou, à défaut, l'image
 * par défaut générée par `app/partage.png/route.tsx`.
 */

export const SITE_NAME = "NERA Ingénieurs Conseils";

export const DEFAULT_SHARE_IMAGE = {
  url: "/partage.png",
  width: 1200,
  height: 630,
  alt: "NERA Ingénieurs Conseils, bureau d'ingénieurs en énergie et physique du bâtiment, basé à Genève",
};

/** Bloc `openGraph` commun, repris par la mise en page racine pour les pages sans métadonnées. */
export const baseOpenGraph = {
  type: "website" as const,
  locale: "fr_CH",
  siteName: SITE_NAME,
  images: [DEFAULT_SHARE_IMAGE],
};

export function pageMetadata({
  title,
  description,
  route,
  keywords,
  image,
  noIndex = false,
  template = false,
}: {
  title: string;
  description: string;
  /** Adresse de la page, « / » compris : sert d'URL canonique et d'URL de partage. */
  route: string;
  keywords?: readonly string[];
  /** Image de partage propre à la page (URL absolue, 1200 × 630). */
  image?: string;
  /** Masquer la page de Google (case du Studio). Elle reste accessible. */
  noIndex?: boolean;
  /** Ajouter « | NERA » au titre (gabarit de la mise en page racine), comme les pages légales. */
  template?: boolean;
}): Metadata {
  const shareTitle = template ? `${title} | NERA` : title;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: shareTitle }] : [DEFAULT_SHARE_IMAGE];
  return {
    // Titre SEO du client, repris tel quel : pas de suffixe de gabarit, sauf demande.
    title: template ? title : { absolute: title },
    description,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    alternates: { canonical: route },
    openGraph: { ...baseOpenGraph, title: shareTitle, description, url: route, images },
    twitter: { card: "summary_large_image", title: shareTitle, description, images },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
