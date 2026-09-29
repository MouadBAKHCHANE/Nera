import { referencesRoute } from "@/content/references";

/**
 * Retire le lien « Nos références » tant qu'aucune référence n'est publiée dans Sanity.
 * Les listes de liens du contenu le gardent toujours : c'est ici, et nulle part ailleurs,
 * que se décide son affichage.
 */
export function withReferences<T extends { href: string }>(items: readonly T[], show: boolean): T[] {
  return show ? [...items] : items.filter((item) => item.href !== referencesRoute);
}
