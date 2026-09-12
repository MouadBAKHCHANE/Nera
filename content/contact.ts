/**
 * Contenu de la page « Contact » (`/contact`), repris mot pour mot de
 * `content/source/textes-client.md` (lignes 781 à 800). Ne jamais reformuler : seules les
 * mentions de mise en page du document client (« H1 », « Bouton : », « Formulaire devis ? »)
 * ont été retirées, le texte restant intact.
 *
 * Consommé par `components/contact/ContactPage.tsx` et `app/contact/page.tsx`.
 */

export const contactRoute = "/contact";

export const contact = {
  meta: {
    title: "Contact NERA | Bureau d’ingénieurs basé à Genève",
    description:
      "Contactez NERA pour un CECB, une étude CVC, un dossier énergétique, des subventions ou une rénovation globale en Suisse romande.",
  },
  /** Expression principale en tête, puis expressions secondaires. */
  keywords: [
    "contact bureau ingénieurs énergie Suisse romande",
    "Devis CECB Suisse romande",
    "Ingénieur bâtiment Suisse romande",
    "bureau études CVC Suisse romande",
    "rénovation énergétique devis",
  ],
  h1: "Contactez NERA Ingénieurs Conseils",
  lead: [
    "Vous avez besoin d’un CECB, d’une étude énergétique, d’un dossier d’autorisation, d’un accompagnement pour les subventions ou d’un pilotage global de rénovation ?",
    "Présentez-nous votre bâtiment et votre objectif.",
    "Nous vous répondrons sous 48 heures ouvrées afin de préciser la prestation adaptée et les informations nécessaires à l’établissement d’une offre.",
  ],
  /**
   * Bloc « Formulaire devis ? » du document client. Le client a remplacé son titre
   * « Demandez un devis gratuit » par « Envoyez-nous un message » : le formulaire de cette page
   * est le formulaire de contact simple, la demande d'offre détaillée passant par le pop-up.
   * La phrase d'accompagnement reste celle du document.
   */
  form: {
    title: "Envoyez-nous un message",
    text: "Décrivez votre bâtiment, la prestation recherchée et le stade d’avancement du projet.",
    image: "/img/contact-conseil.webp",
    imageAlt: "Une conseillère présente un dossier à deux clients autour d’une table basse",
  },
  coordonnees: {
    title: "Nos coordonnées",
    /**
     * Libellés exacts des deux boutons et du lien du document client. À la demande du client,
     * les boutons affichent le numéro et l'adresse ; ces libellés servent d'`aria-label`.
     */
    callCta: "Appeler NERA",
    mailCta: "Envoyer un e-mail",
    linkedinCta: "LinkedIn",
  },
  map: {
    /** Sert de nom accessible à la section : la carte occupe toute la largeur, sans titre visible. */
    title: "Carte localisation",
    /**
     * Coordonnées exactes du 37, chemin J.-Ph.-de-Sauvage, relevées dans le registre fédéral
     * des adresses (`api3.geo.admin.ch`, « Chemin J.-Ph.-De-SAUVAGE 37, 1219 Châtelaine »).
     * La carte est centrée dessus et y pose son repère : on ne dépend pas du géocodage de
     * l'adresse écrite par Google, qui peut échouer ou viser le mauvais bâtiment.
     */
    lat: 46.214455,
    lon: 6.104332,
    zoom: 17,
    /** Affiché tant que le consentement « cartes » n'est pas donné. */
    consentText:
      "La carte est fournie par Google Maps. Elle se charge une fois les cookies de cartographie acceptés.",
    consentCta: "Autoriser et afficher la carte",
    fallbackCta: "Ouvrir dans Google Maps",
  },
} as const;
