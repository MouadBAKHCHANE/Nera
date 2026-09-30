/**
 * Textes de l'accueil, sortis des composants de `components/home2/` le 1er octobre 2026, mot pour
 * mot, pour passer dans le Studio Sanity (document « homePage »). Ce fichier sert de source à la
 * migration (`studio/scripts/import-pages.ts`) et de repli si Sanity ne répond pas.
 *
 * `accent` : partie du titre affichée en vert. Elle doit figurer telle quelle dans le titre ;
 * sinon, le titre s'affiche sans mise en avant.
 * Restent dans les composants : les surtitres de section (« Nos clients », « Territoire »…), le
 * médaillon « De A à Z », les numéros des cartes et des publics, la liste des cantons.
 */

export type HomeCard = { slug: string; title: string; text: string; cta: string; image: string; imagePosition?: string };

export type HomeContent = {
  hero: {
    eyebrow: string;
    h1: string;
    accent: string;
    /** Sur mobile, seul le premier paragraphe s'affiche. */
    lead: string[];
    image: string;
    imagePosition?: string;
  };
  services: { title: string; accent: string; intro: string[]; cards: HomeCard[] };
  renovation: {
    title: string;
    accent: string;
    paragraphs: string[];
    cta: string;
    image: string;
    imagePosition?: string;
    imageAlt: string;
  };
  audiences: { title: string; items: { title: string; paragraphs: string[] }[] };
  approach: { title: string; accent: string; paragraphs: string[]; cta: string };
  territory: { title: string; accent: string; text: string };
  contact: { title: string; paragraphs: string[]; coordinatesTitle: string; formTitle: string };
};

export const home: HomeContent = {
  hero: {
    eyebrow: "Bureau d'ingénieurs en énergie et physique du bâtiment, basé à Genève",
    h1: "Au service de la performance énergétique de vos bâtiments",
    accent: "performance énergétique",
    lead: [
      "Bureau d'ingénierie indépendant basé à Genève, NERA Ingénieurs Conseils intervient en énergétique, physique du bâtiment et CVC dans toute la Suisse romande : audit énergétique, conception, autorisations de construire, subventions et suivi de rénovation.",
      "Particuliers, copropriétés, régies, collectivités, architectes et entreprises générales : nous réduisons vos consommations et valorisons votre patrimoine immobilier, sans compromis sur le confort.",
    ],
    image: "/img/hero-immeuble-geneve-soleil.webp",
  },

  services: {
    title: "Une expertise complète pour la performance de vos bâtiments",
    accent: "performance",
    intro: [
      "Chaque bâtiment présente des caractéristiques constructives, techniques, énergétiques et réglementaires qui lui sont propres.",
      "NERA analyse le bâtiment dans son ensemble afin de proposer des solutions cohérentes avec son état, ses usages, les objectifs du maître d'ouvrage et les exigences applicables au projet.",
    ],
    /**
     * Visuels **en portrait, propres aux cartes** (`card-*.webp`), et non ceux des en-têtes de
     * pages prestation, qui sont en paysage : voir `ServicePanels.tsx`.
     */
    cards: [
      {
        slug: "audit-cecb",
        title: "CECB et CECB Plus",
        text: "Évaluer la performance énergétique du bâtiment, identifier son potentiel d'amélioration et établir des scénarios de rénovation hiérarchisés.",
        cta: "Découvrir les CECB et CECB Plus",
        image: "/img/card-diagnostic-energetique.webp",
      },
      {
        slug: "modelisation-thermique",
        title: "Physique du bâtiment et labels énergétiques",
        text: "Réaliser les calculs thermiques, étudier l'enveloppe, le confort d'été et les problématiques d'humidité, et accompagner les démarches Minergie, HPE ou THPE.",
        cta: "Découvrir la physique du bâtiment",
        image: "/img/card-enveloppe-facade-vitree.webp",
      },
      {
        slug: "installations-cvc",
        title: "Ingénierie CVC et énergies renouvelables",
        text: "Étudier, dimensionner et intégrer les installations de chauffage, ventilation et climatisation, ainsi que les solutions renouvelables adaptées au bâtiment.",
        cta: "Découvrir l'ingénierie CVC",
        image: "/img/card-pompe-a-chaleur.webp",
      },
      {
        slug: "autorisation-de-construire",
        title: "Autorisations de construire",
        text: "Préparer le volet énergétique des dossiers et accompagner les échanges techniques avec les mandataires et les services compétents.",
        cta: "Découvrir les prestations autorisations",
        image: "/img/card-plans-autorisation.webp",
      },
      {
        slug: "subventions",
        title: "Subventions",
        text: "Identifier les aides mobilisables, préparer les demandes et assurer leur suivi jusqu'à la remise des justificatifs d'achèvement.",
        cta: "Découvrir les prestations subventions",
        image: "/img/card-subventions-plans.webp",
      },
      {
        slug: "renovation-energetique",
        title: "Rénovation énergétique globale",
        text: "Piloter les différentes étapes d'une rénovation, du diagnostic initial à la réception, en qualité d'interlocuteur technique du maître d'ouvrage.",
        cta: "Découvrir la rénovation énergétique",
        image: "/img/card-renovation-batiment.webp",
      },
    ],
  },

  renovation: {
    title: "Votre rénovation énergétique, de A à Z",
    accent: "de A à Z",
    paragraphs: [
      "Vous souhaitez rénover sans devoir coordonner vous-même les experts, l'ingénieur, l'administration et les entreprises ?",
      "NERA prend en charge l'ensemble du projet et intervient comme interlocuteur technique unique, du premier diagnostic à la réception des travaux.",
    ],
    cta: "Découvrir notre accompagnement global",
    image: "/img/accompagnement-facade-vegetale.webp",
    imageAlt: "Façade vitrée reflétant la végétation, vue en contre-plongée",
  },

  audiences: {
    title: "Pour qui travaillons-nous ?",
    items: [
      {
        title: "Particuliers et copropriétés",
        paragraphs: [
          "NERA aide les propriétaires, copropriétés et PPE à comprendre l'état énergétique de leur bien, à identifier les interventions pertinentes et à les organiser dans un ordre cohérent.",
          "Notre accompagnement peut comprendre le CECB Plus, l'étude des variantes, les calculs techniques, les autorisations, les demandes de subventions et le suivi de la rénovation.",
        ],
      },
      {
        title: "Régies, fondations et collectivités",
        paragraphs: [
          "Nous accompagnons les gestionnaires et propriétaires de patrimoines immobiliers dans l'évaluation, la planification et la rénovation de leurs bâtiments.",
          "Notre approche permet de disposer d'une lecture structurée de l'état du bâti, des priorités d'intervention, des investissements à prévoir et des démarches réglementaires à engager.",
        ],
      },
      {
        title: "Architectes et entreprises générales",
        paragraphs: [
          "NERA prend en charge le volet énergétique et technique des projets, en coordination avec l'architecte et les autres mandataires.",
          "Nous réalisons notamment les calculs thermiques, les justificatifs énergétiques, les études CVC, les démarches de labellisation et les pièces nécessaires aux autorisations de construire.",
        ],
      },
    ],
  },

  approach: {
    title: "Une approche indépendante, précise et réactive",
    accent: "indépendante",
    paragraphs: [
      "NERA est un bureau d'ingénieurs à taille humaine. Nous privilégions la proximité, la réactivité et une compréhension approfondie de chaque bâtiment.",
      "Notre indépendance nous permet d'évaluer les variantes à partir des besoins du projet et des objectifs du maître d'ouvrage, sans réponse standardisée.",
    ],
    cta: "En savoir plus sur NERA",
  },

  territory: {
    title: "NERA intervient dans toute la Suisse romande",
    accent: "Suisse romande",
    text: "Basé à Genève, NERA intervient principalement dans les cantons de Genève et de Vaud, ainsi que dans le reste de la Suisse romande selon la nature des projets.",
  },

  contact: {
    title: "Parlons de votre bâtiment",
    paragraphs: [
      "Vous prévoyez une vente, une rénovation, une transformation, un remplacement de chauffage ou une nouvelle construction ?",
      "Décrivez-nous votre bâtiment et votre objectif. NERA vous aidera à identifier la prestation et le niveau d’accompagnement adaptés.",
    ],
    coordinatesTitle: "Coordonnées",
    formTitle: "Entrez en contact avec NERA",
  },
};
