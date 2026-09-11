/**
 * Textes de la page 404. Ce sont des textes d'interface, pas du contenu client : le document
 * source n'en prévoit aucun. Écrits dans la voix du site — français de Suisse romande,
 * vouvoiement, phrases courtes, aucune formule d'excuse ni point d'exclamation.
 *
 * Consommé par `app/not-found.tsx`.
 */

export const notFound = {
  meta: {
    title: "Page introuvable | NERA",
    description: "La page demandée n’existe pas ou a été déplacée.",
  },
  eyebrow: "Erreur 404",
  h1: "Cette page n’existe pas",
  lead: [
    "L’adresse saisie est peut-être incomplète, ou la page a été déplacée depuis votre dernière visite.",
    "Vérifiez l’adresse, ou reprenez par l’une des pages ci-contre.",
  ],
  homeCta: "Retour à l’accueil",
  linksTitle: "Aller directement à",
  /** Les cinq entrées du menu principal, sans les sous-pages. */
  links: [
    { label: "Nos prestations", href: "/prestations", desc: "Les six domaines d’intervention du bureau." },
    { label: "Le bureau", href: "/bureau", desc: "L’équipe, les qualifications et la manière de travailler." },
    { label: "Nos références", href: "/references", desc: "Les projets accompagnés par NERA." },
    { label: "Contact", href: "/contact", desc: "Nous écrire, nous appeler ou demander une offre." },
  ],
} as const;
