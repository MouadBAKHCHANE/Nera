/**
 * Contenu de la page « Nos références » (`/references`), repris mot pour mot de
 * `content/source/textes-client.md` (lignes 686 à 693). Le corps de la page est « En attente »
 * chez le client : seuls le H1, le H2 de fin et son CTA existent. Aucun projet n'est inventé.
 *
 * Consommé par `components/references/ReferencesPage.tsx` et `app/references/page.tsx`.
 */

export const referencesRoute = "/references";

export const references = {
  meta: {
    title: "Références en ingénierie énergétique | NERA",
    description:
      "Découvrez les projets accompagnés par NERA en CECB, physique du bâtiment, CVC, autorisations et rénovation énergétique.",
  },
  h1: "Nos références",
  /** Projets à recevoir du client. Tant que la liste est vide, la page n'est pas indexée. */
  projects: [] as { title: string; place: string; text: string; image?: string }[],
  closing: {
    title: "Vous souhaitez nous confier un projet ?",
    cta: "Présenter mon projet",
  },
  image: "/img/references-immeubles-modernes.webp",
};
