/**
 * Contenu de la page « Nos références » (`/references`), repris mot pour mot de
 * `content/source/textes-client.md` (lignes 686 à 693) : H1, H2 de fin et son CTA.
 *
 * Les projets eux-mêmes sont saisis par NERA dans le Studio Sanity (type « realisation »),
 * voir `lib/sanity/realisations.ts`. Tant qu'aucun n'est publié, la page répond 404 et ses
 * liens disparaissent du menu, du pied de page et de la page 404.
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
  closing: {
    title: "Vous souhaitez nous confier un projet ?",
    cta: "Présenter mon projet",
  },
  image: "/img/references-immeubles-modernes.webp",
};

