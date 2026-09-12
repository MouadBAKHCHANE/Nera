/**
 * Contenu des six pages prestation, repris mot pour mot de `content/source/textes-client.md`
 * (lignes 176 à 685). Ne jamais reformuler : seules les mentions de mise en page du document
 * client (« H2 », « (frise chronologique ?) », « /Formulaire ») ont été retirées, le texte
 * restant intact.
 *
 * Consommé par le gabarit unique `components/prestations/PrestationPage.tsx` et par
 * `app/prestations/[slug]/page.tsx`. Les routes reprennent celles de `content/footer.ts`.
 */

export type PrestationBlock =
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  /** Frise chronologique numérotée du document client. */
  | { t: "steps"; items: { title: string; text: string }[] }
  /** Groupe de cartes : les publics visés et les variantes présentées côte à côte. */
  | { t: "cards"; items: { title: string; text: string }[] }
  /** Sous-section H3 du document client. */
  | { t: "sub"; title: string; blocks: PrestationBlock[] };

export type PrestationSection = {
  /** Ancre stable, utilisée par le sommaire. */
  id: string;
  title: string;
  blocks: PrestationBlock[];
};

export type PrestationPage = {
  /** Segment de route, identique à `content/footer.ts`. */
  slug: string;
  /**
   * Sigles employés dans la page, expliqués sous le chapô. Libellés donnés par le client.
   * Deux pages n'en emploient aucun : le champ y est absent et rien ne s'affiche.
   */
  acronyms?: { short: string; long: string }[];
  /** Libellé court : fil d'Ariane, sommaire et blocs de maillage. */
  shortTitle: string;
  h1: string;
  /** Chapô sous le H1, un paragraphe par entrée. */
  lead: string[];
  /** Libellé du CTA d'en-tête, tel qu'écrit par le client. */
  heroCta: string;
  image: string;
  /** Cadrage de l'image d'en-tête quand le centrage par défaut ne convient pas. */
  imagePosition?: string;
  meta: { title: string; description: string };
  /** Expression principale en tête, puis expressions secondaires. */
  keywords: string[];
  sections: PrestationSection[];
  /** Dernier H2 du document, au-dessus du CTA de bas de page. */
  closing: string;
  faq: { q: string; a: string }[];
  /**
   * Maillage interne (`content/source/README.md`), par slug. Le bloc « Poursuivre avec »
   * qui l'affichait en bas de page a été retiré à la demande du client : la donnée reste
   * ici, sans consommateur, pour rétablir le maillage sans la ressaisir.
   */
  related: string[];
};

export const prestationPages: PrestationPage[] = [
  {
    slug: "audit-cecb",
    acronyms: [{ short: "IDC", long: "Indice de dépense de chaleur" }],
    shortTitle: "CECB et CECB Plus",
    h1: "CECB, CECB Plus et diagnostic énergétique du bâtiment",
    lead: [
      "Connaître précisément son bâtiment permet de mieux planifier sa rénovation, de hiérarchiser les investissements et de préparer les démarches qui en découlent.",
      "Les experts CECB de NERA établissent les certificats et diagnostics nécessaires pour évaluer la situation existante, identifier les possibilités d’amélioration et construire une stratégie cohérente.",
    ],
    heroCta: "Demander un devis CECB",
    image: "/img/prestation-diagnostic-energetique.webp",
    meta: {
      title: "CECB et CECB Plus en Suisse romande | NERA",
      description:
        "Les experts CECB de NERA réalisent CECB, CECB Plus, IDC, audits et diagnostics EPIQR+ dans toute la Suisse romande.",
    },
    keywords: [
      "expert CECB Suisse romande",
      "CECB Plus Suisse romande",
      "CECB+ Suisse romande",
      "diagnostic énergétique bâtiment",
      "EPIQR+",
      "IDC Suisse romande",
    ],
    sections: [
      {
        id: "qu-est-ce-que-le-cecb",
        title: "Qu’est-ce que le CECB ?",
        blocks: [
          {
            t: "p",
            text: "Le Certificat énergétique cantonal des bâtiments est l’étiquette-énergie officielle des cantons suisses.",
          },
          {
            t: "p",
            text: "Il évalue le bâtiment sur une échelle de sept classes, de A à G, à partir de trois caractéristiques :",
          },
          {
            t: "ul",
            items: [
              "L’efficacité de l’enveloppe",
              "L’efficacité énergétique globale",
              "Les émissions directes de CO₂",
            ],
          },
          { t: "p", text: "Ces trois indicateurs correspondent à la définition officielle du CECB." },
        ],
      },
      {
        id: "dans-quels-cas-etablir-un-cecb",
        title: "Dans quels cas établir un CECB ?",
        blocks: [
          {
            t: "p",
            text: "Selon le canton et la situation du bâtiment, un CECB peut notamment intervenir dans le cadre :",
          },
          {
            t: "ul",
            items: [
              "D’une vente immobilière",
              "D’un projet de rénovation",
              "D’un remplacement de chauffage",
              "D’une demande de subvention",
              "D’une obligation réglementaire",
              "D’une volonté de connaître la performance énergétique du bien",
            ],
          },
          { t: "p", text: "NERA vérifie les exigences applicables à la situation concernée" },
        ],
      },
      {
        id: "cecb-plus",
        title: "Qu’apporte le CECB Plus ?",
        blocks: [
          {
            t: "p",
            text: "Le CECB Plus complète le certificat par un rapport de conseil proposant des mesures d’amélioration.",
          },
          { t: "p", text: "Il permet d’étudier et de comparer différentes variantes de rénovation." },
          { t: "p", text: "Selon le projet, le rapport peut notamment intégrer :" },
          {
            t: "ul",
            items: [
              "Les interventions sur l’enveloppe",
              "L’évolution des installations techniques",
              "Les économies d’énergie estimées",
              "Les coûts indicatifs",
              "Les aides financières potentiellement mobilisables",
              "Les effets sur la performance du bâtiment",
              "Une réalisation en une ou plusieurs étapes",
            ],
          },
        ],
      },
      {
        id: "idc-geneve",
        title: "Calcul et dépôt de l’IDC à Genève",
        blocks: [
          {
            t: "p",
            text: "L’indice de dépense de chaleur (IDC) permet de suivre la consommation énergétique d’un bâtiment pour le chauffage et la production d’eau chaude sanitaire.",
          },
          {
            t: "p",
            text: "NERA réalise le calcul de l’IDC, prépare les éléments nécessaires à sa déclaration et analyse les résultats au regard de la situation du bâtiment.",
          },
          {
            t: "p",
            text: "En cas de valeur élevée ou de dépassement d’un seuil applicable, nous pouvons étudier différentes pistes :",
          },
          {
            t: "ul",
            items: [
              "Optimisation de l’exploitation",
              "Réglage des installations",
              "Amélioration de l’enveloppe",
              "Évolution de la production de chaleur",
              "Rénovation plus globale",
            ],
          },
        ],
      },
      {
        id: "diagnostic-epiqr",
        title: "Le diagnostic EPIQR+",
        blocks: [
          {
            t: "sub",
            title: "Évaluer l’état du bâtiment élément par élément",
            blocks: [
              {
                t: "p",
                text: "La méthode EPIQR+ apporte une lecture complémentaire au diagnostic énergétique en évaluant l’état physique et fonctionnel des éléments constructifs et des installations.",
              },
              { t: "p", text: "L’analyse peut notamment porter sur :" },
              {
                t: "ul",
                items: [
                  "Façades",
                  "Fenêtres",
                  "Toiture",
                  "Revêtements",
                  "Installations techniques",
                  "Obsolescence des équipements",
                  "Coûts prévisionnels",
                  "Priorités d’intervention",
                ],
              },
            ],
          },
          {
            t: "sub",
            title: "EPIQR+ CO₂",
            blocks: [
              {
                t: "p",
                text: "Le module EPIQR+ CO₂ permet d’intégrer l’impact carbone des scénarios de rénovation et d’élargir la comparaison au-delà des seuls coûts et consommations.",
              },
            ],
          },
        ],
      },
      {
        id: "cecb-plus-et-epiqr",
        title: "CECB Plus et EPIQR+ : deux lectures complémentaires",
        blocks: [
          {
            t: "p",
            text: "Le CECB Plus traite principalement de la performance énergétique et des variantes d’amélioration.",
          },
          {
            t: "p",
            text: "EPIQR+ apporte une lecture complémentaire de l’état constructif, des coûts et de la programmation des travaux.",
          },
          {
            t: "p",
            text: "Combinés, ils permettent de disposer d’une vision plus complète : performance énergétique, état du bâtiment, investissements, calendrier et impact environnemental.",
          },
        ],
      },
      {
        id: "nos-prestations",
        title: "Nos prestations",
        blocks: [
          {
            t: "ul",
            items: [
              "CECB",
              "CECB Plus",
              "Visite et relevés",
              "Analyse des consommations et documents disponibles",
              "Calcul et dépôt de l’IDC",
              "Audit énergétique",
              "Diagnostic EPIQR+",
              "EPIQR+ CO₂",
              "Scénarios de rénovation par étapes",
              "Estimation des coûts",
              "Conseil avant achat ou avant-vente",
              "Accompagnement à la planification des travaux",
            ],
          },
        ],
      },
      {
        id: "deroulement-de-la-mission",
        title: "Comment se déroule notre mission ?",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Cadrage", text: "Définition du besoin, du bâtiment et des exigences applicables." },
              {
                title: "Collecte des documents",
                text: "Plans, consommations, factures d’énergie et informations techniques disponibles.",
              },
              { title: "Visite du bâtiment", text: "Analyse de l’enveloppe, des installations et des usages." },
              { title: "Modélisation et diagnostic", text: "Traitement des données dans les outils appropriés." },
              { title: "Restitution", text: "Présentation des résultats et explication des variantes." },
              {
                title: "Suite du projet",
                text: "NERA peut poursuivre avec les études, les autorisations, les subventions ou l’accompagnement global.",
              },
            ],
          },
        ],
      },
    ],
    closing: "Faites le point sur votre bâtiment",
    faq: [
      {
        q: "Quelle est la différence entre un CECB et un CECB Plus ?",
        a: "Le CECB évalue l’état initial et la performance actuelle du bâtiment. Le CECB Plus ajoute un rapport de conseil plus complet avec des mesures et variantes de rénovation.",
      },
      { q: "Le CECB est-il obligatoire lors d’une vente ?", a: "Cela dépend du canton et de la situation du bâtiment." },
      {
        q: "Le CECB Plus remplace-t-il les devis des entreprises ?",
        a: "Non, il ne remplace pas une étude complète réalisée par un architecte et/ou un ingénieur.",
      },
      {
        q: "Peut-on associer un CECB Plus et un diagnostic EPIQR+ ?",
        a: "Oui. Les deux démarches apportent des informations complémentaires.",
      },
    ],
    related: ["subventions", "renovation-energetique", "modelisation-thermique"],
  },

  {
    slug: "modelisation-thermique",
    acronyms: [
      { short: "HPE", long: "Haute performance énergétique" },
      { short: "THPE", long: "Très haute performance énergétique" },
    ],
    shortTitle: "Physique du bâtiment et labels énergétiques",
    h1: "Physique du bâtiment et labels énergétiques",
    lead: [
      "Un bâtiment performant repose sur une enveloppe cohérente, des installations correctement dimensionnées et une maîtrise des échanges thermiques, de l’air et de l’humidité.",
      "NERA réalise les études de physique du bâtiment nécessaires à la conception, à la transformation et à la rénovation de bâtiments performants, confortables et durables.",
    ],
    heroCta: "Demander une étude",
    image: "/img/prestation-enveloppe-facade-vitree.webp",
    meta: {
      title: "Physique du bâtiment et labels en Suisse romande | NERA",
      description:
        "Bilans thermiques, confort d’été, humidité, Minergie, HPE et THPE pour vos projets de construction et de rénovation en Suisse romande.",
    },
    keywords: [
      "physique du bâtiment Suisse romande",
      "bilan thermique SIA 380/1",
      "ingénieur thermique bâtiment",
      "Minergie Suisse romande",
      "HPE THPE",
      "humidité bâtiment",
      "confort d’été",
    ],
    sections: [
      {
        id: "performance-des-l-avant-projet",
        title: "Intégrer la performance dès l’avant-projet",
        blocks: [
          {
            t: "p",
            text: "L’orientation, la géométrie, l’isolation, les surfaces vitrées, les ponts thermiques, l’étanchéité à l’air, l’inertie et les protections solaires influencent directement :",
          },
          {
            t: "ul",
            items: [
              "Les besoins de chauffage",
              "Le confort hivernal",
              "Le risque de surchauffe",
              "Le dimensionnement des installations",
              "Les consommations",
              "La capacité à atteindre un standard énergétique",
            ],
          },
          {
            t: "p",
            text: "NERA collabore avec l’architecte et les autres mandataires afin d’intégrer ces paramètres dès la conception.",
          },
        ],
      },
      {
        id: "bilans-thermiques",
        title: "Bilans thermiques et justificatifs énergétiques",
        blocks: [
          { t: "p", text: "NERA réalise notamment :" },
          {
            t: "ul",
            items: [
              "Bilan thermique selon SIA 380/1",
              "Calcul des besoins de chaleur",
              "Justificatifs énergétiques",
              "Analyse de la composition des parois",
              "Étude des valeurs thermiques",
              "Analyse des fenêtres et surfaces vitrées",
              "Ponts thermiques",
              "Continuité de l’enveloppe",
              "Modélisation énergétique",
              "Coordination avec les plans architecturaux",
            ],
          },
        ],
      },
      {
        id: "confort-d-ete",
        title: "Confort thermique d’été et protection solaire",
        blocks: [
          { t: "p", text: "Une enveloppe performante doit protéger aussi bien du froid que de la chaleur." },
          { t: "p", text: "NERA étudie :" },
          {
            t: "ul",
            items: [
              "Les apports solaires",
              "Les surfaces vitrées",
              "Les protections solaires",
              "L’inertie thermique",
              "Les charges internes",
              "La ventilation",
              "Le risque de surchauffe",
              "Les stratégies de rafraîchissement passif",
            ],
          },
          {
            t: "p",
            text: "L’objectif est de préserver le confort tout en limitant le recours au refroidissement actif lorsque des mesures constructives ou passives sont suffisantes.",
          },
        ],
      },
      {
        id: "minergie-et-labels",
        title: "Minergie et labels énergétiques",
        blocks: [
          {
            t: "sub",
            title: "Minergie",
            blocks: [
              { t: "p", text: "NERA est Minergie Partenaire spécialiste." },
              {
                t: "p",
                text: "Le bureau accompagne les projets dans la définition des objectifs, les calculs, la préparation des justificatifs et le suivi des démarches comprises dans son mandat.",
              },
            ],
          },
          {
            t: "sub",
            title: "HPE et THPE",
            blocks: [
              {
                t: "p",
                text: "À Genève, NERA accompagne également les démarches liées aux standards HPE et THPE, en construction comme en rénovation.",
              },
              {
                t: "p",
                text: "Les variantes HPE-Rénovation et THPE-Rénovation sont définies par le canton de Genève selon des exigences énergétiques spécifiques.",
              },
            ],
          },
        ],
      },
      {
        id: "humidite-et-moisissures",
        title: "Humidité, condensation et moisissures",
        blocks: [
          { t: "p", text: "Les pathologies d’humidité peuvent avoir des causes multiples :" },
          {
            t: "ul",
            items: [
              "Défaut d’isolation",
              "Pont thermique",
              "Infiltration",
              "Ventilation insuffisante",
              "Température de surface trop basse",
              "Humidité intérieure importante",
              "Combinaison de plusieurs facteurs",
            ],
          },
          {
            t: "p",
            text: "NERA croise l’analyse constructive avec des mesures sur site afin d’identifier les causes probables et de proposer des mesures correctives adaptées.",
          },
        ],
      },
      {
        id: "nos-prestations",
        title: "Nos prestations",
        blocks: [
          {
            t: "ul",
            items: [
              "Bilan thermique SIA 380/1",
              "Justificatifs énergétiques",
              "Enveloppe",
              "Ponts thermiques",
              "Étanchéité à l’air",
              "Confort d’été",
              "Protection solaire",
              "Modélisation énergétique",
              "Minergie",
              "Minergie-P",
              "Démarches Minergie-ECO selon le projet",
              "HPE et THPE",
              "Diagnostic humidité et moisissures",
              "Risques de condensation",
            ],
          },
        ],
      },
    ],
    closing: "Sécurisez la performance de votre projet",
    faq: [
      { q: "Quand mandater un ingénieur en physique du bâtiment ?", a: "Idéalement dès l’avant-projet." },
      {
        q: "Minergie concerne-t-il aussi les rénovations ?",
        a: "Oui. Les standards Minergie comprennent des procédures adaptées aux bâtiments existants.",
      },
      {
        q: "Une moisissure signifie-t-elle nécessairement un problème d’isolation ?",
        a: "Non. Une analyse du bâtiment, de la ventilation et des usages est nécessaire.",
      },
    ],
    related: ["autorisation-de-construire", "installations-cvc", "renovation-energetique"],
  },

  {
    slug: "installations-cvc",
    shortTitle: "Ingénierie CVC et énergies renouvelables",
    h1: "Ingénierie CVC et énergies renouvelables",
    lead: [
      "Une installation performante doit être dimensionnée à partir des besoins réels du bâtiment, coordonnée avec son enveloppe et adaptée aux usages, aux contraintes d’exploitation et aux exigences réglementaires.",
      "NERA étudie et planifie les installations de chauffage, ventilation et climatisation pour les constructions neuves, transformations et rénovations.",
    ],
    heroCta: "Demander une étude CVC",
    image: "/img/prestation-pompe-a-chaleur.webp",
    meta: {
      title: "Ingénierie CVC et énergies renouvelables | NERA",
      description:
        "NERA étudie et planifie vos installations CVC, pompes à chaleur, ventilation, réseaux de chaleur et solutions solaires en Suisse romande.",
    },
    keywords: [
      "ingénierie CVC Suisse romande",
      "bureau d’études CVC Suisse romande",
      "pompe à chaleur",
      "ventilation",
      "réseau de chaleur",
      "photovoltaïque bâtiment",
    ],
    sections: [
      {
        id: "installations-dimensionnees",
        title: "Des installations dimensionnées et conçues pour durer",
        blocks: [
          { t: "p", text: "NERA analyse notamment :" },
          {
            t: "ul",
            items: [
              "Les besoins de chaleur",
              "Les besoins de froid",
              "Les températures de distribution",
              "L’état de l’enveloppe",
              "Les usages",
              "Les contraintes d’implantation",
              "L’acoustique",
              "Les possibilités de raccordement",
              "L’évolution future du bâtiment",
            ],
          },
        ],
      },
      {
        id: "production-de-chaleur",
        title: "Production de chaleur",
        blocks: [
          {
            t: "cards",
            items: [
              {
                title: "Pompes à chaleur",
                text: "Étude des besoins, de la source disponible, des températures de distribution et des contraintes d’intégration.",
              },
              {
                title: "Réseaux de chaleur",
                text: "Analyse de la possibilité de raccordement, des conditions techniques et de l’adaptation des installations intérieures.",
              },
              {
                title: "Autres variantes",
                text: "Selon le bâtiment et le projet : solaire thermique, bois ou solutions hybrides techniquement pertinentes.",
              },
            ],
          },
        ],
      },
      {
        id: "ventilation",
        title: "Ventilation et qualité de l’air intérieur",
        blocks: [
          { t: "p", text: "NERA étudie :" },
          {
            t: "ul",
            items: [
              "Les débits",
              "La ventilation simple ou double flux",
              "La récupération de chaleur",
              "L’intégration des réseaux",
              "Les consommations auxiliaires",
              "Les contraintes acoustiques",
              "La coordination avec l’architecture",
              "La cohérence avec l’étanchéité à l’air",
            ],
          },
        ],
      },
      {
        id: "climatisation",
        title: "Climatisation et confort estival",
        blocks: [
          {
            t: "p",
            text: "Avant de dimensionner un refroidissement actif, NERA analyse les possibilités de réduire le besoin grâce à :",
          },
          {
            t: "ul",
            items: [
              "La protection solaire",
              "L’inertie",
              "La ventilation nocturne",
              "La réduction des apports internes",
              "Des stratégies passives",
            ],
          },
        ],
      },
      {
        id: "energies-renouvelables",
        title: "Intégration des énergies renouvelables",
        blocks: [
          {
            t: "sub",
            title: "Solaire thermique",
            blocks: [{ t: "p", text: "Étude de son intégration au concept énergétique du bâtiment." }],
          },
          {
            t: "sub",
            title: "Photovoltaïque",
            blocks: [
              { t: "p", text: "NERA intervient pour :" },
              {
                t: "ul",
                items: [
                  "L’étude de faisabilité",
                  "L’intégration au concept énergétique",
                  "L’analyse du potentiel de production",
                  "L’autoconsommation",
                  "La coordination avec les autres installations",
                ],
              },
              { t: "p", text: "La mission de NERA porte sur l’étude et l’intégration du photovoltaïque." },
            ],
          },
        ],
      },
      {
        id: "ingenierie-independante",
        title: "Une ingénierie indépendante et neutre",
        blocks: [
          {
            t: "p",
            text: "NERA analyse les solutions à partir des caractéristiques du bâtiment et des objectifs du maître d’ouvrage.",
          },
          {
            t: "p",
            text: "Les variantes sont comparées selon des critères techniques, énergétiques, économiques et environnementaux afin d’éclairer la décision.",
          },
        ],
      },
    ],
    closing: "Étudions les installations adaptées à votre bâtiment",
    faq: [
      { q: "NERA installe-t-elle les équipements ?", a: "Non. NERA intervient comme bureau d’études et de conseil." },
      { q: "NERA réalise-t-elle des études photovoltaïques ?", a: "Oui, pour l’étude et l’intégration énergétique." },
      { q: "Le suivi de chantier peut-il être inclus ?", a: "Oui, selon le périmètre du mandat." },
    ],
    related: ["modelisation-thermique", "autorisation-de-construire", "subventions", "renovation-energetique"],
  },

  {
    slug: "autorisation-de-construire",
    acronyms: [
      { short: "APA", long: "Autorisation par procédure accélérée" },
      { short: "DD", long: "Demande définitive" },
    ],
    shortTitle: "Autorisations de construire",
    h1: "Autorisations de construire et dossiers énergétiques",
    lead: [
      "Selon le projet, une autorisation peut nécessiter des calculs thermiques, formulaires, justificatifs énergétiques, plans techniques ou attestations.",
      "NERA constitue le volet énergétique relevant de ses compétences et accompagne son instruction auprès des services concernés.",
    ],
    heroCta: "Faire analyser mon projet",
    image: "/img/prestation-plans-autorisation.webp",
    meta: {
      title: "Dossier énergétique et autorisations | NERA Suisse romande",
      description:
        "NERA prépare le volet énergétique de vos autorisations de construire et accompagne les échanges techniques avec les autorités en Suisse romande.",
    },
    keywords: [
      "dossier énergétique autorisation de construire Suisse romande",
      "justificatif énergie Suisse romande",
      "permis de construire énergie",
      "CAMAC énergie Vaud",
      "autorisation pompe à chaleur",
    ],
    sections: [
      {
        id: "dossiers-structures",
        title: "Des dossiers structurés pour faciliter leur instruction",
        blocks: [
          { t: "p", text: "Les exigences dépendent notamment :" },
          {
            t: "ul",
            items: [
              "Du canton",
              "De la commune",
              "De l’affectation",
              "Du type de bâtiment",
              "De la nature des travaux",
              "Du système énergétique",
              "Du contexte patrimonial",
              "Des caractéristiques du projet",
            ],
          },
          {
            t: "p",
            text: "NERA identifie les pièces nécessaires, réalise les études comprises dans son mandat et coordonne les informations avec les autres mandataires.",
          },
        ],
      },
      {
        id: "geneve",
        title: "Genève",
        blocks: [
          {
            t: "sub",
            title: "APA et DD",
            blocks: [
              { t: "p", text: "NERA intervient notamment pour :" },
              {
                t: "ul",
                items: [
                  "Bilans thermiques",
                  "Formulaires énergie",
                  "Données relatives aux installations techniques",
                  "Énergies renouvelables",
                  "Refroidissement",
                  "Réponses aux demandes de compléments",
                  "Coordination technique avec les services",
                  "Dossiers énergétiques d’exécution",
                  "Attestations finales",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "vaud",
        title: "Vaud",
        blocks: [
          {
            t: "p",
            text: "NERA prépare les justificatifs énergétiques correspondant au projet et accompagne leur intégration à la procédure d’autorisation.",
          },
        ],
      },
      {
        id: "autres-cantons",
        title: "Valais, Fribourg, Neuchâtel et Jura",
        blocks: [
          {
            t: "p",
            text: "NERA adapte les calculs, formulaires et justificatifs aux exigences du canton concerné et coordonne son intervention avec les autres mandataires.",
          },
        ],
      },
      {
        id: "pour-quels-projets",
        title: "Pour quels projets ?",
        blocks: [
          {
            t: "ul",
            items: [
              "Construction neuve",
              "Transformation",
              "Extension",
              "Surélévation",
              "Rénovation énergétique",
              "Changement d’affectation",
              "Remplacement de chauffage",
              "Pompe à chaleur",
              "Raccordement à un réseau thermique",
              "Installation solaire",
              "Refroidissement",
              "Régularisation",
              "Mise en conformité",
            ],
          },
        ],
      },
      {
        id: "deroulement-de-la-mission",
        title: "Déroulement de la mission",
        blocks: [
          {
            t: "steps",
            items: [
              {
                title: "Analyse réglementaire",
                text: "Identification de la procédure et des documents relevant du volet énergétique.",
              },
              { title: "Collecte des données", text: "Coordination des plans et données techniques." },
              { title: "Calculs et justificatifs", text: "Réalisation des études prévues au mandat." },
              {
                title: "Intégration au dossier",
                text: "Transmission au mandataire principal ou intégration selon la procédure définie.",
              },
              { title: "Suivi de l’instruction", text: "Réponse aux demandes techniques relevant du domaine de NERA." },
              { title: "Exécution et achèvement", text: "Préparation des documents finaux lorsque la mission le prévoit." },
            ],
          },
        ],
      },
    ],
    closing: "Faites vérifier les exigences de votre projet",
    faq: [
      {
        q: "NERA prend-elle en charge toute l’autorisation ?",
        a: "NERA prend en charge le volet énergétique et technique compris dans son mandat. Le dossier architectural général reste coordonné par le mandataire compétent.",
      },
      {
        q: "Une pompe à chaleur nécessite-t-elle toujours une autorisation ?",
        a: "La procédure dépend du canton et des caractéristiques du projet.",
      },
      { q: "Quand contacter NERA ?", a: "Idéalement dès l’avant-projet." },
    ],
    related: ["modelisation-thermique", "installations-cvc", "subventions"],
  },

  {
    slug: "subventions",
    shortTitle: "Subventions",
    h1: "Subventions pour la rénovation énergétique",
    lead: [
      "Les aides financières peuvent contribuer au financement d’une rénovation énergétique, à condition de respecter les critères techniques, les délais et les procédures du programme concerné.",
      "NERA identifie les aides potentiellement mobilisables, prépare les pièces prévues dans son mandat et accompagne le suivi administratif.",
    ],
    heroCta: "Étudier mes subventions",
    image: "/img/prestation-subventions-plans.webp",
    meta: {
      title: "Subventions rénovation énergétique | NERA Suisse romande",
      description:
        "NERA identifie, prépare et suit vos demandes de subventions pour la rénovation énergétique dans toute la Suisse romande.",
    },
    keywords: [
      "subventions rénovation énergétique Suisse romande",
      "subventions Suisse romande",
      "aides financières rénovation bâtiment",
      "Programme Bâtiments",
      "subventions pompe à chaleur",
      "subvention isolation",
    ],
    sections: [
      {
        id: "anticiper-les-aides",
        title: "Anticiper les aides avant d’engager les travaux",
        blocks: [
          {
            t: "p",
            text: "Les demandes relevant du Programme Bâtiments doivent être soumises avant le début des travaux. Une demande ultérieure n’est pas prise en compte.",
          },
          { t: "p", text: "Il est donc essentiel d’analyser les aides avant :" },
          {
            t: "ul",
            items: [
              "Le lancement du chantier",
              "Les commandes engageantes",
              "Certaines signatures contractuelles",
              "Le retrait des installations existantes",
            ],
          },
        ],
      },
      {
        id: "mesures-concernees",
        title: "Quelles mesures peuvent être concernées ?",
        blocks: [
          {
            t: "p",
            text: "Selon le canton, le programme et le bâtiment, les aides peuvent notamment concerner :",
          },
          {
            t: "ul",
            items: [
              "L’isolation de l’enveloppe",
              "L’amélioration énergétique globale",
              "Le remplacement d’un chauffage",
              "Les pompes à chaleur",
              "Le bois",
              "Les réseaux thermiques",
              "Le solaire thermique",
              "Certaines rénovations globales",
              "Certaines certifications",
              "Certaines prestations d’accompagnement",
            ],
          },
        ],
      },
      {
        id: "accompagnement",
        title: "L’accompagnement de NERA",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Analyse du projet", text: "Étude du bâtiment, des travaux envisagés et du calendrier." },
              {
                title: "Identification des aides",
                text: "Recherche des dispositifs cantonaux, communaux ou complémentaires potentiellement applicables.",
              },
              {
                title: "Vérification technique",
                text: "Contrôle de la cohérence des travaux avec les conditions connues du programme.",
              },
              {
                title: "Constitution du dossier",
                text: "Préparation des formulaires et justificatifs compris dans le mandat.",
              },
              { title: "Suivi de l’instruction", text: "Réponse aux demandes de compléments techniques." },
              { title: "Dossier d’achèvement", text: "Préparation des attestations et pièces finales." },
              {
                title: "Clôture",
                text: "En cas d’acceptation et de réalisation conforme, suivi administratif jusqu’à la phase de versement.",
              },
            ],
          },
        ],
      },
      {
        id: "six-cantons-romands",
        title: "Une compétence dans six cantons romands",
        blocks: [
          { t: "p", text: "NERA accompagne les projets à :" },
          { t: "p", text: "Genève · Vaud · Valais · Fribourg · Neuchâtel · Jura" },
          {
            t: "p",
            text: "Les programmes, conditions et montants évoluent. NERA vérifie donc les règles applicables au moment de chaque dossier.",
          },
        ],
      },
      {
        id: "plus-de-50-dossiers",
        title: "Plus de 50 dossiers de subventions déposés",
        blocks: [
          { t: "p", text: "NERA a déposé plus de 50 dossiers de subventions." },
          {
            t: "p",
            text: "Cette expérience permet de mieux anticiper les pièces à réunir et de maintenir une cohérence entre le diagnostic, le projet, les travaux et le dossier final.",
          },
        ],
      },
      {
        id: "octroi-soumis-a-decision",
        title: "L’octroi reste soumis à décision",
        blocks: [
          { t: "p", text: "NERA ne garantit ni l’obtention ni le montant définitif d’une aide." },
          { t: "p", text: "La décision dépend notamment :" },
          {
            t: "ul",
            items: [
              "De l’éligibilité",
              "De la date du dépôt",
              "Des conditions techniques",
              "De la qualité du dossier",
              "De la réalisation conforme",
              "Des crédits disponibles",
            ],
          },
          {
            t: "p",
            text: "Le Programme Bâtiments confirme que le versement intervient après l’examen final du dossier.",
          },
        ],
      },
    ],
    closing: "Identifiez les aides avant d’engager votre projet",
    faq: [
      {
        q: "Peut-on demander une subvention après le début des travaux ?",
        a: "Pour le Programme Bâtiments, non : la demande doit être déposée avant le début des travaux.",
      },
      { q: "Le CECB Plus est-il toujours obligatoire ?", a: "Non. Cela dépend de la mesure et du canton." },
      { q: "NERA garantit-elle une aide ?", a: "Non. La décision appartient à l’organisme compétent." },
      { q: "Les aides sont-elles identiques dans tous les cantons ?", a: "Non." },
    ],
    related: ["audit-cecb", "renovation-energetique", "autorisation-de-construire"],
  },

  {
    slug: "renovation-energetique",
    acronyms: [{ short: "AMO", long: "Assistant au maître d’ouvrage" }],
    shortTitle: "Rénovation énergétique globale",
    h1: "Rénovation énergétique globale et AMO énergie",
    lead: [
      "Rénover un bâtiment implique de coordonner des décisions constructives, énergétiques, financières et administratives.",
      "Un mauvais enchaînement peut conduire à dimensionner une installation sur des besoins mal évalués, perdre une possibilité d’aide, retarder une autorisation ou réaliser des interventions contradictoires.",
      "NERA accompagne le maître d’ouvrage comme interlocuteur technique tout au long du processus.",
    ],
    heroCta: "Présenter mon projet de rénovation",
    image: "/img/prestation-renovation-batiment.webp",
    imagePosition: "object-[50%_70%]",
    meta: {
      title: "Rénovation énergétique et AMO | NERA Suisse romande",
      description:
        "Diagnostic, études, autorisations, subventions, appels d’offres et suivi : NERA accompagne votre rénovation énergétique globale.",
    },
    keywords: [
      "rénovation énergétique bâtiment Suisse romande",
      "AMO énergie Suisse romande",
      "rénovation globale",
      "assistance maîtrise d’ouvrage énergie",
      "pilotage rénovation",
      "subvention isolation",
    ],
    sections: [
      {
        id: "de-a-a-z",
        title: "Votre rénovation énergétique, de A à Z",
        blocks: [
          { t: "p", text: "Selon le mandat, NERA peut coordonner :" },
          {
            t: "ul",
            items: [
              "Diagnostic",
              "Stratégie",
              "Études",
              "Autorisations",
              "Subventions",
              "Appels d’offres",
              "Suivi technique",
              "Réception",
            ],
          },
          { t: "p", text: "Le maître d’ouvrage conserve la maîtrise des décisions, du budget et du choix des entreprises." },
        ],
      },
      {
        id: "amo-energie",
        title: "Qu’est-ce que l’AMO énergie ?",
        blocks: [
          {
            t: "p",
            text: "L’assistance à maîtrise d’ouvrage énergétique (AMO) aide le propriétaire ou le gestionnaire à définir, organiser et suivre son projet.",
          },
          { t: "p", text: "NERA apporte une expertise indépendante pour :" },
          {
            t: "ul",
            items: [
              "Comparer les variantes",
              "Structurer les étapes",
              "Coordonner les études",
              "Préparer les décisions",
              "Suivre les volets énergétiques et techniques du projet",
            ],
          },
          {
            t: "p",
            text: "L’AMO énergie ne remplace pas automatiquement l’architecte ou la direction générale des travaux. Le rôle de chaque intervenant est défini dans le mandat.",
          },
        ],
      },
      {
        id: "pour-qui",
        title: "Pour qui ?",
        blocks: [
          {
            t: "cards",
            items: [
              {
                title: "Particuliers et copropriétés",
                text: "Pour organiser une rénovation sans devoir coordonner seuls l’ensemble des spécialistes et procédures.",
              },
              {
                title: "Régies, fondations et collectivités",
                text: "Pour planifier les investissements et piloter les aspects énergétiques d’un bâtiment ou d’un patrimoine.",
              },
              {
                title: "Architectes et entreprises générales",
                text: "Pour confier le volet énergétique et technique à un bureau spécialisé.",
              },
            ],
          },
        ],
      },
      {
        id: "etapes",
        title: "Les étapes d’une rénovation globale",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "État des lieux", text: "CECB Plus, audit, diagnostic EPIQR+ ou autre étude adaptée." },
              { title: "Définition des objectifs", text: "Performance, confort, budget, calendrier et contraintes." },
              {
                title: "Étude des variantes",
                text: "Enveloppe, chauffage, ventilation, refroidissement et énergies renouvelables.",
              },
              { title: "Concept de rénovation", text: "Organisation des mesures dans un ordre cohérent." },
              { title: "Autorisations", text: "Préparation du volet énergétique." },
              { title: "Subventions", text: "Préparation et suivi des demandes lorsque le projet est éligible." },
              { title: "Appels d’offres", text: "Cahiers des charges et analyse des offres." },
              { title: "Suivi technique", text: "Contrôle des éléments compris dans le mandat." },
              { title: "Réception", text: "Réception technique et dossiers d’achèvement" },
            ],
          },
        ],
      },
      {
        id: "enveloppe-et-chauffage",
        title: "Pourquoi coordonner l’enveloppe et le chauffage ?",
        blocks: [
          { t: "p", text: "Les besoins de chauffage dépendent directement de la performance de l’enveloppe." },
          {
            t: "p",
            text: "Dimensionner une nouvelle installation avant d’avoir défini les futures mesures d’isolation peut conduire à un système inadapté aux besoins du bâtiment une fois rénové.",
          },
          { t: "p", text: "Une approche globale permet de coordonner les interventions dans un ordre cohérent." },
        ],
      },
      {
        id: "assistance-independante",
        title: "Une assistance indépendante et neutre",
        blocks: [
          {
            t: "p",
            text: "NERA compare les variantes à partir des objectifs du maître d’ouvrage et des caractéristiques du bâtiment.",
          },
          { t: "p", text: "Notre rôle consiste à :" },
          {
            t: "ul",
            items: [
              "Clarifier les options",
              "Identifier les risques",
              "Expliquer les conséquences",
              "Coordonner les études",
              "Analyser les offres",
              "Défendre les objectifs techniques du projet",
            ],
          },
          { t: "p", text: "La décision finale appartient au maître d’ouvrage." },
        ],
      },
    ],
    closing: "Donnez une structure claire à votre rénovation",
    faq: [
      {
        q: "CECB Plus ou AMO énergie ?",
        a: "Le CECB Plus établit un diagnostic et des variantes. L’AMO accompagne ensuite leur traduction en projet et en travaux.",
      },
      {
        q: "NERA choisit-elle les entreprises ?",
        a: "NERA peut analyser les offres et formuler une recommandation. La décision appartient au maître d’ouvrage.",
      },
      { q: "Peut-on ne confier qu’une partie du projet ?", a: "Oui." },
      {
        q: "Peut-on contacter NERA lorsque le projet a déjà commencé ?",
        a: "Oui, après analyse de la situation. Certaines démarches, notamment certaines aides financières, peuvent toutefois ne plus être accessibles.",
      },
    ],
    related: [
      "audit-cecb",
      "modelisation-thermique",
      "installations-cvc",
      "autorisation-de-construire",
      "subventions",
    ],
  },
];

/** Accès par slug, pour le gabarit, les routes statiques et le maillage interne. */
export const prestationPageBySlug = new Map(prestationPages.map((p) => [p.slug, p]));

export const prestationRoute = (slug: string) => `/prestations/${slug}`;

export const prestationsIndexRoute = "/prestations";

export type PrestationsIndex = {
  h1: string;
  lead: string[];
  heroCta: string;
  meta: { title: string; description: string };
  keywords: string[];
  /** Un bloc par prestation, dans l'ordre du document client. `slug` porte le lien du CTA. */
  entries: { slug: string; title: string; subtitle: string; blocks: PrestationBlock[]; cta: string }[];
  /** Les H2 de fin qui ne renvoient pas à une prestation. */
  /**
   * Les H2 de fin qui ne renvoient pas à une prestation, rendus en cartes : chaque carte reprend
   * un paragraphe du client, son titre est tiré des mots du H2 ou du paragraphe lui-même.
   */
  outro: { id: string; title: string; cards: { title: string; text: string; highlight?: boolean }[] }[];
  closing: { title: string; text: string };
};

/**
 * Page d'index « Nos prestations », lignes 92 à 175 de `content/source/textes-client.md`.
 * Les six blocs renvoient vers les pages de `prestationPages`.
 */
export const prestationsIndex: PrestationsIndex = {
  h1: "Nos prestations en ingénierie énergétique du bâtiment",
  lead: [
    "NERA accompagne les projets de construction, de transformation et de rénovation énergétique, de l’analyse initiale au suivi de la réalisation.",
    "Nos compétences couvrent six domaines complémentaires. Chaque prestation peut être confiée séparément ou intégrée dans un mandat global selon le bâtiment, le stade du projet et le niveau d’accompagnement recherché.",
  ],
  heroCta: "Demander un devis gratuit",
  meta: {
    title: "Ingénierie énergétique du bâtiment | NERA Suisse romande",
    description:
      "CECB, physique du bâtiment, CVC, autorisations, subventions et rénovation globale : découvrez les prestations de NERA en Suisse romande.",
  },
  keywords: [
    "ingénierie énergétique bâtiment Suisse romande",
    "bureau d’études énergie Suisse romande",
    "ingénierie bâtiment Suisse romande",
    "physique du bâtiment",
    "ingénierie CVC",
    "rénovation énergétique Suisse romande",
  ],
  entries: [
    {
      slug: "audit-cecb",
      title: "CECB, CECB Plus, IDC et diagnostic EPIQR+",
      subtitle: "Connaître son bâtiment pour décider juste",
      cta: "Découvrir CECB et CECB Plus",
      blocks: [
        {
          t: "p",
          text: "NERA réalise les diagnostics nécessaires pour comprendre la performance énergétique, l’état constructif et le potentiel de rénovation du bâtiment.",
        },
        { t: "p", text: "Nos prestations comprennent notamment :" },
        {
          t: "ul",
          items: [
            "CECB",
            "CECB Plus",
            "Calcul et dépôt de l’IDC",
            "Diagnostic EPIQR+",
            "Audit énergétique",
            "Estimation des coûts par famille de travaux",
            "Scénarios de rénovation par étapes",
            "Analyse carbone avec EPIQR+ CO₂",
            "Conseil avant achat ou avant-vente",
          ],
        },
      ],
    },
    {
      slug: "modelisation-thermique",
      title: "Physique du bâtiment et labels énergétiques",
      subtitle: "Concevoir des bâtiments performants, certifiés et sains",
      cta: "Découvrir la physique du bâtiment",
      blocks: [
        {
          t: "p",
          text: "NERA réalise les études relatives à l’enveloppe, aux besoins thermiques, au confort d’été, à l’humidité et aux standards énergétiques.",
        },
        { t: "p", text: "Nos prestations comprennent notamment :" },
        {
          t: "ul",
          items: [
            "Bilan thermique selon SIA 380/1",
            "Justificatifs énergétiques",
            "Études d’enveloppe",
            "Ponts thermiques",
            "Étanchéité à l’air",
            "Confort thermique d’été",
            "Modélisation énergétique",
            "Minergie",
            "Minergie-P",
            "Minergie-ECO selon le projet",
            "HPE et THPE",
            "Diagnostic d’humidité et de condensation",
          ],
        },
      ],
    },
    {
      slug: "installations-cvc",
      title: "Ingénierie CVC et énergies renouvelables",
      subtitle: "Des installations dimensionnées au plus juste, conçues pour durer",
      cta: "Découvrir l’ingénierie CVC",
      blocks: [
        {
          t: "p",
          text: "NERA étudie les installations de chauffage, ventilation et climatisation en coordination avec l’enveloppe et les usages du bâtiment.",
        },
        { t: "p", text: "Nos prestations comprennent notamment :" },
        {
          t: "ul",
          items: [
            "Pompes à chaleur",
            "Géothermie",
            "Réseaux de chaleur",
            "Ventilation",
            "Refroidissement",
            "Solaire thermique",
            "Étude et intégration photovoltaïque",
            "Cahiers des charges",
            "Soumissions",
            "Appels d’offres",
            "Analyse des offres",
            "Suivi technique",
            "Mise en service et réception selon le mandat",
          ],
        },
      ],
    },
    {
      slug: "autorisation-de-construire",
      title: "Autorisations de construire",
      subtitle: "Constituer un volet énergétique cohérent et documenté",
      cta: "Découvrir les autorisations de construire",
      blocks: [
        {
          t: "p",
          text: "NERA prépare les calculs, formulaires, plans et justificatifs relevant de l’énergie et de la technique du bâtiment.",
        },
        {
          t: "p",
          text: "Nous intervenons dans les six cantons couverts par le bureau et adaptons les pièces aux procédures applicables.",
        },
      ],
    },
    {
      slug: "subventions",
      title: "Subventions",
      subtitle: "Mobiliser les aides disponibles au bon moment",
      cta: "Découvrir les subventions",
      blocks: [
        {
          t: "p",
          text: "NERA identifie les aides potentiellement mobilisables, prépare les pièces techniques nécessaires et accompagne le suivi administratif.",
        },
      ],
    },
    {
      slug: "renovation-energetique",
      title: "Rénovation énergétique globale et AMO énergie",
      subtitle: "Un interlocuteur technique pour coordonner votre projet",
      cta: "Découvrir notre accompagnement global",
      blocks: [
        {
          t: "p",
          text: "NERA peut réunir au sein d’un même mandat le diagnostic, les études, les autorisations, les subventions, les appels d’offres et le suivi technique de la réalisation.",
        },
      ],
    },
  ],
  outro: [
    {
      id: "perimetre-de-mission",
      title: "Une prestation ciblée ou un accompagnement complet",
      cards: [
        {
          title: "Une prestation ciblée",
          text: "Certains projets nécessitent uniquement un CECB, un bilan thermique, un justificatif énergétique ou une étude CVC.",
        },
        {
          title: "Un accompagnement complet",
          text: "D’autres demandent une coordination plus large entre l’enveloppe, les installations, les procédures administratives et les entreprises.",
        },
        {
          title: "Un périmètre de mission clair",
          text: "NERA définit avec le maître d’ouvrage un périmètre de mission clair, adapté au stade du projet et au niveau d’accompagnement recherché.",
          highlight: true,
        },
      ],
    },
  ],
  closing: {
    title: "Quelle prestation correspond à votre projet ?",
    text: "Décrivez-nous votre bâtiment et votre besoin.",
  },
};
