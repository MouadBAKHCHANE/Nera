/**
 * Contenu de la page « Le bureau » (`/bureau`), repris mot pour mot de la page « À propos »
 * de `content/source/textes-client.md` (lignes 694 à 772). Ne jamais reformuler : seules les
 * mentions de mise en page du document client (« H2 », « H3 ») ont été retirées.
 *
 * Consommé par `components/bureau/BureauPage.tsx` et `app/bureau/page.tsx`.
 */

export const bureauRoute = "/bureau";

export const bureau = {
  meta: {
    title: "NERA Ingénieurs Conseils | Bureau à Genève",
    description:
      "Découvrez NERA, bureau d’ingénieurs indépendant à Genève, spécialisé dans l’énergétique, la physique du bâtiment et les techniques CVC.",
  },
  /** Expression principale en tête, puis expressions secondaires. */
  keywords: [
      "NERA Ingénieurs Conseils Genève",
      "bureau d’ingénieurs indépendant Genève",
      "Akram Draidj",
      "physique du bâtiment Genève",
      "ingénieur énergie Genève",
    ],
  h1: "NERA Ingénieurs Conseils",
  lead: [
    "NERA est un bureau d’ingénieurs spécialisé en énergétique, physique du bâtiment, installations CVC et rénovation énergétique.",
    "NERA est née de la volonté de proposer une ingénierie indépendante, claire et pragmatique, fondée sur la précision technique, la proximité et la durabilité.",
  ],

  equilibre: {
    id: "equilibre",
    title: "L’équilibre comme principe",
    intro: "Le nom NERA évoque l’équilibre, la mesure et la justesse. Cette idée traduit notre manière d’aborder les projets.",
    /**
     * Les six lignes « entre A et B » du client. Le document les écrit en énumération
     * (minuscule initiale, point-virgule final) ; présentées ici en cartes autonomes, elles
     * prennent une capitale et perdent leur ponctuation de liste, à la demande du client.
     * Les mots eux-mêmes sont inchangés.
     */
    items: [
      "Équilibre entre performance et faisabilité",
      "Entre ambition énergétique et réalité constructive",
      "Entre investissement et coûts d’exploitation",
      "Entre technique et confort",
      "Entre transformation et préservation du bâti",
      "Entre l’humain et l’environnement",
    ],
  },

  mission: {
    id: "mission",
    title: "Notre mission",
    intro: "Apporter des solutions d’ingénierie énergétique fiables, durables et adaptées aux exigences suisses.",
    lead: "NERA aide ses clients à :",
    /** Même règle que `equilibre.items` : capitale initiale, sans ponctuation de liste. */
    items: [
      "Comprendre leur bâtiment",
      "Identifier les priorités",
      "Intégrer les exigences réglementaires",
      "Comparer les variantes",
      "Prendre des décisions documentées",
      "Accompagner sa mise en œuvre",
    ],
  },

  fondateur: {
    id: "fondateur",
    title: "Akram Draidj, fondateur et directeur",
    /** Cartouche du client : nom, fonction, titres, domaine — sur quatre lignes. */
    card: {
      name: "Akram Draidj",
      role: "Directeur",
      titles: "Ingénieur HES – REG B – MPQ",
      field: "Énergétique & Physique du Bâtiment",
    },
    /**
      * Texte enrichi fourni par le client. Sa première phrase et la dernière disent toutes deux
      * la fondation de NERA ; il a demandé de garder les deux.
      */
    paragraphs: [
      "Akram Draidj a fondé NERA avec la volonté de réunir expertise technique, proximité et indépendance au sein d’une structure à taille humaine.",
      "Akram Draidj a développé son expertise au fil de plusieurs années d’expérience dans les environnements techniques, l’énergétique et la rénovation du bâtiment. Diplômé d’un Bachelor HES-SO en Technique des bâtiments à HEPIA Genève et inscrit au REG B, il est également lauréat du Prix OCEN 2022 pour ses travaux sur le stockage de l’électricité photovoltaïque.",
      "Il fonde NERA avec la volonté de mettre cette expertise au service de projets exigeants, avec une approche indépendante, rigoureuse et proche du terrain.",
    ],
    phoneLabel: "Téléphone direct",
    emailLabel: "E-mail",
  },

  equipe: {
    id: "equipe",
    title: "Une équipe spécialisée et complémentaire",
    intro: "NERA réunit sept collaborateurs actifs dans les domaines de l’énergie, de la physique du bâtiment et des techniques CVC.",
    lead: "Cette organisation permet d’aborder conjointement :",
    /** Même règle que `equilibre.items` : capitale initiale, sans ponctuation de liste. */
    items: [
      "L’enveloppe",
      "Les installations",
      "Les diagnostics",
      "Les certifications",
      "Les procédures cantonales",
      "Les subventions",
      "La coordination technique",
      "Le suivi des projets",
    ],
    outro: "Le client conserve un interlocuteur identifié tout en bénéficiant des compétences nécessaires aux différentes étapes.",
    /** Photo choisie par le client : `Assets/Visuels/Etude plans 2.jpg`. */
    image: "/img/bureau-equipe-etude.webp",
  },

  procedures: {
    id: "procedures",
    title: "Une connaissance concrète des procédures",
    intro:
      "L’expérience réunie au sein de NERA comprend un parcours au sein de l’Office cantonal de l’énergie (OCEN). Cette connaissance contribue à :",
    /** Même règle que `equilibre.items` : capitale initiale, sans ponctuation de liste. */
    items: [
      "Mieux comprendre la logique des procédures",
      "Structurer les dossiers",
      "Anticiper certains points de clarification",
      "Préparer des réponses argumentées",
      "Suivre les évolutions réglementaires",
    ],
  },

  qualifications: {
    id: "qualifications",
    title: "Nos qualifications",
    items: [
      { title: "Experts CECB", text: ["NERA réunit des experts certifiés pour établir les CECB et CECB Plus."] },
      {
        title: "Minergie Partenaire spécialiste",
        text: [
          "NERA est Minergie Partenaire spécialiste et accompagne les projets dans les études et démarches de certification comprises dans son mandat.",
          "Minergie précise qu’un Partenaire spécialiste est une entreprise, et que l’affiliation concerne l’entité inscrite au registre du commerce.",
        ],
      },
      { title: "REG B", text: ["Akram Draidj est ingénieur HES inscrit au REG B."] },
      { title: "MPQ", text: ["Akram Draidj bénéficie du statut de Mandataire professionnellement qualifié."] },
    ],
  },

  valeurs: {
    id: "valeurs",
    title: "Nos valeurs",
    items: [
      { title: "Indépendance", text: "Une analyse guidée par les besoins du projet." },
      { title: "Réactivité", text: "Une structure à taille humaine et des échanges directs." },
      { title: "Proximité", text: "Un accompagnement suivi tout au long du mandat." },
      { title: "Durabilité", text: "Une vision à long terme du bâtiment et de ses installations." },
      { title: "Transparence", text: "Des hypothèses, limites et responsabilités clairement exposées." },
    ],
  },

  /**
   * « NERA en chiffres » reprend désormais les chiffres et les libellés de l'accueil, à la
   * demande du client : la section est rendue par `components/home2/Stats.tsx` sans `items`.
   * Seul l'ancrage reste ici. Les libellés plus longs propres à cette page ont été retirés.
   */
  chiffres: {
    id: "chiffres",
  },

  cantons: {
    id: "cantons",
    title: "Une présence dans six cantons romands",
    text: "Basé à Genève, NERA intervient principalement dans les cantons de Genève et de Vaud, ainsi que dans les cantons du Valais, de Fribourg, de Neuchâtel et du Jura selon la nature des projets.",
  },

  /**
   * Dernier H2 du client. Le CTA « Contacter NERA » qu'il prévoyait a été retiré à la
   * demande du client : seul « Demander un devis gratuit » reste.
   */
  closing: {
    title: "Rencontrons-nous autour de votre projet",
    secondary: "Demander un devis gratuit",
  },
} as const;
