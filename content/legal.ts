/**
 * Textes juridiques fournis par le client.
 * Sources : Assets/Documents légaux/Mentions sous formulaires.docx et Bannières cookies.docx.
 * Ne pas reformuler : ces libellés ont été validés par NERA.
 */

/** Mention à afficher sous le formulaire de contact simple. */
export const noticeContact =
  "Les informations transmises sont utilisées par NERA Ingénieurs Conseils Sàrl uniquement pour traiter et suivre votre demande. Pour en savoir plus sur le traitement de vos données et vos droits, consultez notre";

/** Mention à afficher sous le formulaire de demande de devis. */
export const noticeDevis =
  "Les informations et documents transmis sont utilisés par NERA Ingénieurs Conseils Sàrl pour analyser votre demande, vous contacter et, le cas échéant, préparer une offre. Ne transmettez que les documents nécessaires à l'étude de votre projet. Pour en savoir plus sur le traitement de vos données et vos droits, consultez notre";

/** Libellé et cible du lien qui termine les deux mentions ci-dessus. */
export const noticeLink = { label: "Politique de confidentialité", href: "/confidentialite" };

/** Bandeau cookies : titre, texte et libellés de boutons validés par le client. */
export const cookieBanner = {
  title: "Votre confidentialité",
  text: "Nous utilisons des cookies nécessaires au fonctionnement du site et, avec votre accord, des outils de mesure d'audience et de publicité ainsi que Google Maps. Vous pouvez accepter, refuser ou personnaliser ces technologies. Votre choix peut être modifié à tout moment.",
  acceptAll: "Tout accepter",
  rejectAll: "Tout refuser",
  customise: "Personnaliser",
  save: "Enregistrer mes choix",
  link: { label: "Politique relative aux cookies", href: "/cookies" },
};

/**
 * Catégories du panneau « Personnaliser ». Elles reprennent les trois familles citées
 * dans le texte du bandeau : mesure d'audience, publicité et Google Maps.
 */
export const cookieCategories = [
  {
    id: "necessary",
    label: "Nécessaires",
    desc: "Fonctionnement du site et mémorisation de vos choix. Toujours actifs.",
  },
  { id: "analytics", label: "Mesure d'audience", desc: "Statistiques de fréquentation pour améliorer le site." },
  { id: "marketing", label: "Publicité", desc: "Contenus personnalisés et suivi des campagnes." },
] as const;
