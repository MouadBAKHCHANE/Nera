/**
 * Réglages d'apparition repris de hestera.ch/a-propos, la direction validée avec le client.
 *
 * Leur page n'utilise que trois combinaisons, relevées dans le HTML servi
 * (`data-aos` / `data-aos-duration`), avec `AOS.init({ once: true })` et aucun autre réglage :
 * ni `data-aos-delay`, ni easing personnalisé. Les apparitions en cascade que nous avions
 * (60 ms d'écart entre éléments d'une grille) n'existent pas chez eux : les éléments d'un même
 * groupe apparaissent ensemble.
 *
 * | Emploi chez hestera                              | Effet        | Durée   |
 * | ------------------------------------------------ | ------------ | ------- |
 * | Bloc de section (titre + texte, encadré, CTA)    | `fade`       | 1000 ms |
 * | Éléments répétés d'un groupe (les trois valeurs) | `fade`       |  600 ms |
 * | Cartes empilées (les six fiches collaborateur)   | `fade-right` |  600 ms |
 *
 * `Reveal` respecte déjà `once: true` et l'easing `ease` (`[0.25, 0.1, 0.25, 1]`).
 * S'étaler en `<Reveal {...aosBlock}>` plutôt que de retaper les valeurs.
 */

/** Bloc de section : titre, chapô, encadré, CTA. */
export const aosBlock = { effect: "fade", duration: 1000 } as const;

/** Élément répété d'un groupe : carte de grille, valeur, item de liste. Aucun décalage. */
export const aosItem = { effect: "fade", duration: 600 } as const;

/** Carte empilée à côté d'un texte : fiche, visuel de colonne. */
export const aosCard = { effect: "fade-right", duration: 600 } as const;
