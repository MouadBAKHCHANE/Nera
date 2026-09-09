/**
 * Texte intégral des trois pages légales, repris mot pour mot des documents client
 * (`content/source/legal-*.md`, datés du 3 septembre 2026). Ne jamais reformuler :
 * seules les coupures de ligne du PDF ont été recollées et les en-têtes de page retirés.
 *
 * Balisage en ligne : `[libellé](/route)` devient un lien. Le libellé reste le texte source.
 */

export type LegalBlock =
  | { t: "p"; text: string }
  /** Bloc d'adresse ou d'identité : une ligne par entrée, sans puce. */
  | { t: "lines"; lines: string[] }
  | { t: "ul"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  /** Encadré du document source (« Pièces jointes »). */
  | { t: "note"; title: string; body: string[] }
  /** Emplacement du rappel de consentement + bouton « Gérer mes cookies ». */
  | { t: "consent" };

export type LegalSection = {
  /** Ancre stable, utilisée par le sommaire. */
  id: string;
  /** Numéro du document source, absent pour les sections non numérotées. */
  num?: number;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  route: string;
  /** Libellé court : fil d'Ariane et onglet. */
  shortTitle: string;
  /** H1, repris du document source. */
  title: string;
  /** Sous-titre du document source, quand il y en a un. */
  lead?: string;
  /** Date de mise à jour, telle qu'écrite dans le document source. */
  updated: string;
  /** La même date en ISO 8601, pour l'attribut `datetime` et le plan du site. */
  updatedIso: string;
  meta: { title: string; description: string };
  sections: LegalSection[];
};

const EMAIL = "[info@nera-ing.ch](mailto:info@nera-ing.ch)";
const PHONE = "[+41 22 313 73 54](tel:+41223137354)";

export const mentionsLegales: LegalDoc = {
  route: "/mentions-legales",
  shortTitle: "Mentions légales",
  title: "Mentions légales et conditions d’utilisation",
  updated: "3 septembre 2026",
  updatedIso: "2026-09-03",
  meta: {
    title: "Mentions légales",
    description:
      "Éditeur, responsable éditorial, hébergement, propriété intellectuelle et conditions d’utilisation du site de NERA Ingénieurs Conseils Sàrl, à Genève.",
  },
  sections: [
    {
      id: "editeur",
      num: 1,
      title: "Éditeur du site",
      blocks: [
        { t: "p", text: "Le site www.nera-ing.ch est édité par :" },
        {
          t: "lines",
          lines: [
            "NERA Ingénieurs Conseils Sàrl",
            "Chemin J.-Ph.-De-Sauvage 37",
            "1219 Châtelaine, Suisse",
            "Siège : Vernier (GE)",
            `${EMAIL}  |  ${PHONE}`,
          ],
        },
        {
          t: "lines",
          lines: [
            "Forme juridique : société à responsabilité limitée de droit suisse.",
            "IDE : CHE-336.972.907",
            "N° du Registre du commerce : CH-660.8.224.025-9",
            "Registre du commerce du canton de Genève",
            "Gérant : Akram Draidj, avec signature individuelle",
          ],
        },
      ],
    },
    {
      id: "responsable-editorial",
      num: 2,
      title: "Responsable éditorial",
      blocks: [
        {
          t: "p",
          text: "Le responsable éditorial du site est Akram Draidj, Directeur de NERA Ingénieurs Conseils Sàrl.",
        },
      ],
    },
    {
      id: "hebergement",
      num: 3,
      title: "Hébergement",
      blocks: [
        { t: "p", text: "Le site est hébergé auprès de :" },
        { t: "lines", lines: ["Vercel Inc.", "440 N Barranca Avenue #4133", "Covina, CA 91723", "États-Unis."] },
        {
          t: "p",
          text: "Des infrastructures et sous-traitants techniques situés dans différents pays peuvent être utilisés dans le cadre de la fourniture du service. Les traitements de données liés à l’hébergement sont décrits dans la [Politique de confidentialité](/confidentialite).",
        },
      ],
    },
    {
      id: "objet-du-site",
      num: 4,
      title: "Objet du site",
      blocks: [
        {
          t: "p",
          text: "Le site www.nera-ing.ch présente NERA Ingénieurs Conseils Sàrl, son activité, ses compétences et ses prestations dans les domaines notamment de l’ingénierie du bâtiment, de la physique et de la thermique du bâtiment, de la performance énergétique, de la rénovation énergétique, des installations CVC et de la durabilité environnementale.",
        },
        {
          t: "p",
          text: "Le site permet également aux visiteurs de contacter NERA Ingénieurs Conseils Sàrl et de transmettre une demande de devis.",
        },
        {
          t: "p",
          text: "Les informations diffusées sur le site sont fournies à titre général et informatif. Elles ne constituent ni une offre contractuelle, ni un engagement de résultat, ni un avis technique individualisé. Une analyse propre au bâtiment et au projet concerné est nécessaire avant toute recommandation technique définitive.",
        },
      ],
    },
    {
      id: "exactitude",
      num: 5,
      title: "Exactitude et actualité des informations",
      blocks: [
        {
          t: "p",
          text: "NERA Ingénieurs Conseils Sàrl apporte un soin particulier à l’exactitude et à l’actualité des informations publiées. Toutefois, les réglementations, normes techniques, dispositifs de subvention, exigences cantonales ou communales, standards énergétiques et autres informations relevant des domaines traités sur le site sont susceptibles d’évoluer.",
        },
        {
          t: "p",
          text: "NERA Ingénieurs Conseils Sàrl ne garantit par conséquent pas que toutes les informations présentes sur le site demeurent en permanence exhaustives ou à jour. Seuls les documents contractuels, études, rapports, offres ou mandats établis spécifiquement par NERA Ingénieurs Conseils Sàrl dans le cadre d’une relation professionnelle sont susceptibles d’engager la société.",
        },
      ],
    },
    {
      id: "responsabilite",
      num: 6,
      title: "Responsabilité",
      blocks: [
        {
          t: "p",
          text: "L’utilisation du site s’effectue sous la responsabilité de l’utilisateur. Dans les limites autorisées par le droit suisse, NERA Ingénieurs Conseils Sàrl ne saurait être tenue responsable d’un dommage résultant notamment de l’utilisation ou de l’impossibilité d’utiliser le site, de l’utilisation d’informations générales qui y sont publiées ou de contenus provenant de sites tiers.",
        },
        {
          t: "p",
          text: "La présente clause ne limite pas la responsabilité dans les cas où une exclusion ou une limitation serait interdite par le droit impératif suisse.",
        },
      ],
    },
    {
      id: "liens-tiers",
      num: 7,
      title: "Liens vers des sites tiers",
      blocks: [
        {
          t: "p",
          text: "Le site peut contenir des liens vers des plateformes ou sites exploités par des tiers, notamment LinkedIn, Google Maps, organismes publics, associations professionnelles ou partenaires. NERA Ingénieurs Conseils Sàrl n’exerce aucun contrôle sur ces services externes et ne peut être tenue responsable de leur disponibilité, de leur contenu ou de leurs pratiques en matière de protection des données.",
        },
        {
          t: "p",
          text: "Lorsque l’utilisateur quitte www.nera-ing.ch pour consulter un service externe, les conditions et politiques de confidentialité du service concerné sont applicables.",
        },
      ],
    },
    {
      id: "propriete-intellectuelle",
      num: 8,
      title: "Propriété intellectuelle",
      blocks: [
        {
          t: "p",
          text: "Sauf indication contraire, les textes, photographies, illustrations, graphiques, logos, éléments visuels, documents, structures de pages et autres contenus présents sur www.nera-ing.ch sont la propriété de NERA Ingénieurs Conseils Sàrl ou sont utilisés avec l’autorisation de leurs titulaires respectifs.",
        },
        {
          t: "p",
          text: "Ils sont protégés par le droit suisse et, le cas échéant, international de la propriété intellectuelle. Toute reproduction, adaptation, publication, transmission, exploitation ou utilisation substantielle de ces contenus à des fins commerciales est interdite sans l’autorisation préalable du titulaire des droits. Les marques, logos et contenus appartenant à des tiers restent la propriété de leurs titulaires respectifs.",
        },
      ],
    },
    {
      id: "disponibilite",
      num: 9,
      title: "Disponibilité et sécurité du site",
      blocks: [
        {
          t: "p",
          text: "NERA Ingénieurs Conseils Sàrl s’efforce d’assurer la disponibilité et la sécurité du site, sans pouvoir garantir un fonctionnement continu et exempt de toute interruption ou erreur. Le site peut notamment être temporairement indisponible en raison d’opérations de maintenance, de mises à jour, d’incidents techniques ou de circonstances indépendantes de la volonté de NERA Ingénieurs Conseils Sàrl.",
        },
      ],
    },
    {
      id: "protection-des-donnees",
      num: 10,
      title: "Protection des données",
      blocks: [
        {
          t: "p",
          text: "Le traitement des données personnelles lié à l’utilisation du site est détaillé dans la [Politique de confidentialité](/confidentialite) et dans la [Politique relative aux cookies et technologies similaires](/cookies).",
        },
      ],
    },
    {
      id: "droit-applicable",
      num: 11,
      title: "Droit applicable et juridiction",
      blocks: [
        {
          t: "p",
          text: "Les présentes dispositions sont soumises au droit suisse. Sous réserve des fors impératifs prévus par la loi, tout litige relatif au site relève des tribunaux compétents du canton de Genève.",
        },
      ],
    },
  ],
};

export const confidentialite: LegalDoc = {
  route: "/confidentialite",
  shortTitle: "Politique de confidentialité",
  title: "Politique de confidentialité",
  lead: "Protection des données personnelles sur www.nera-ing.ch",
  updated: "3 septembre 2026",
  updatedIso: "2026-09-03",
  meta: {
    title: "Politique de confidentialité",
    description:
      "Données collectées sur www.nera-ing.ch, finalités, destinataires, durées de conservation et droits des personnes, selon la loi fédérale sur la protection des données (LPD).",
  },
  sections: [
    {
      id: "cadre-applicable",
      title: "Cadre applicable",
      blocks: [
        {
          t: "p",
          text: "La présente politique est conçue pour les activités de NERA en Suisse romande et repose principalement sur la loi fédérale sur la protection des données (LPD) et son ordonnance d’application (OPDo).",
        },
      ],
    },
    {
      id: "objet",
      num: 1,
      title: "Objet de la présente politique",
      blocks: [
        {
          t: "p",
          text: "NERA Ingénieurs Conseils Sàrl accorde une importance particulière à la protection des données personnelles. La présente politique explique quelles données personnelles sont collectées lorsque vous consultez www.nera-ing.ch ou utilisez ses formulaires, pourquoi elles sont traitées, à qui elles peuvent être transmises, pendant combien de temps elles sont conservées et quels sont vos droits.",
        },
      ],
    },
    {
      id: "responsable-du-traitement",
      num: 2,
      title: "Responsable du traitement",
      blocks: [
        {
          t: "lines",
          lines: [
            "NERA Ingénieurs Conseils Sàrl",
            "Chemin J.-Ph.-De-Sauvage 37",
            "1219 Châtelaine, Suisse",
            "Siège : Vernier (GE)",
            `${EMAIL}  |  ${PHONE}`,
          ],
        },
        {
          t: "p",
          text: `Toute question relative au traitement de vos données personnelles peut être adressée à ${EMAIL}.`,
        },
      ],
    },
    {
      id: "consultation-du-site",
      num: 3,
      title: "Données traitées lors de la consultation du site",
      blocks: [
        {
          t: "p",
          text: "Lors de l’accès au site, certaines données techniques peuvent être traitées automatiquement par l’infrastructure informatique nécessaire à son fonctionnement. Il peut notamment s’agir de l’adresse IP, de la date et de l’heure de la requête, de la page demandée, du type de navigateur, du système d’exploitation, d’informations techniques relatives à l’appareil et de données nécessaires à la sécurité et au fonctionnement du site.",
        },
        {
          t: "p",
          text: "Ces traitements ont pour finalités la mise à disposition du site, sa sécurité, la prévention des abus, le diagnostic des erreurs et le maintien de ses performances. Le site est hébergé auprès de Vercel Inc.",
        },
      ],
    },
    {
      id: "formulaire-de-contact",
      num: 4,
      title: "Formulaire de contact",
      blocks: [
        {
          t: "p",
          text: "Lorsque vous utilisez le formulaire de contact, NERA traite les données que vous fournissez volontairement, notamment vos coordonnées et le contenu de votre message. Ces données sont utilisées pour traiter votre demande, vous répondre, assurer le suivi des échanges et préparer, le cas échéant, une relation commerciale ou contractuelle.",
        },
        {
          t: "p",
          text: "Les informations transmises par le formulaire sont envoyées à NERA par courrier électronique. Elles ne sont pas destinées à être conservées dans le CMS du site et ne sont pas utilisées à ce jour pour l’inscription à une newsletter ou l’envoi de communications commerciales non sollicitées.",
        },
      ],
    },
    {
      id: "formulaire-de-devis",
      num: 5,
      title: "Formulaire de demande de devis",
      blocks: [
        { t: "p", text: "Lorsque vous demandez un devis, NERA peut notamment collecter les informations suivantes :" },
        {
          t: "ul",
          items: [
            "prestation souhaitée ;",
            "type de bâtiment ;",
            "commune et canton ;",
            "année de construction et surface approximative ;",
            "objectif du projet ;",
            "nom, adresse e-mail et numéro de téléphone ;",
            "message libre ;",
            "documents facultatifs joints au formulaire, tels que plans, factures d’énergie ou photographies.",
          ],
        },
        {
          t: "p",
          text: "Ces informations permettent à NERA de comprendre votre projet, d’évaluer la prestation demandée, de vous contacter, de préparer une offre et, le cas échéant, de poursuivre les démarches précontractuelles nécessaires.",
        },
        {
          t: "note",
          title: "Pièces jointes",
          body: [
            "Ne transmettez que les informations nécessaires à l’étude de votre demande. Évitez d’inclure des données personnelles sensibles dans les documents transmis lorsque cela n’est pas nécessaire.",
          ],
        },
      ],
    },
    {
      id: "finalites",
      num: 6,
      title: "Finalités du traitement",
      blocks: [
        { t: "p", text: "NERA traite les données personnelles principalement afin :" },
        {
          t: "ul",
          items: [
            "d’exploiter, maintenir et sécuriser son site Internet ;",
            "de répondre aux demandes qui lui sont adressées ;",
            "d’analyser les demandes de prestations et d’établir des offres ;",
            "d’assurer le suivi des relations commerciales et contractuelles ;",
            "de mesurer l’utilisation du site ;",
            "de mesurer l’efficacité de ses campagnes publicitaires et les conversions correspondantes.",
          ],
        },
        {
          t: "p",
          text: "NERA n’utilise actuellement pas les coordonnées communiquées par les formulaires pour des campagnes générales de prospection commerciale. Si cette finalité devait être introduite ultérieurement, les modalités de traitement et la présente politique seraient adaptées avant sa mise en œuvre.",
        },
      ],
    },
    {
      id: "google-analytics",
      num: 7,
      title: "Google Analytics 4",
      blocks: [
        {
          t: "p",
          text: "NERA utilise Google Analytics 4 afin d’obtenir des statistiques sur la fréquentation et l’utilisation du site. Selon sa configuration, Google Analytics peut notamment traiter le nombre d’utilisateurs et de sessions, des informations relatives aux pages visitées, une géolocalisation approximative ainsi que des informations relatives au navigateur et à l’appareil.",
        },
        {
          t: "p",
          text: "Google Analytics utilise notamment les cookies _ga et _ga_<identifiant> afin de distinguer les utilisateurs et de conserver l’état des sessions. Ces cookies ont une durée d’expiration par défaut de deux ans, sous réserve des limitations imposées par les navigateurs et de la configuration retenue.",
        },
        {
          t: "p",
          text: "NERA conditionne l’activation de Google Analytics au choix de l’utilisateur exprimé dans le gestionnaire de cookies. La conservation des données utilisateur et événementielles dans Google Analytics doit être configurée à 14 mois au maximum.",
        },
      ],
    },
    {
      id: "google-tag-manager",
      num: 8,
      title: "Google Tag Manager",
      blocks: [
        {
          t: "p",
          text: "NERA utilise Google Tag Manager pour administrer le déploiement des balises utilisées sur le site. Google Tag Manager est un outil de gestion de balises : son utilisation ne signifie pas que toutes les balises qu’il contient sont automatiquement activées. Les balises Google Analytics, Google Ads et Meta Pixel doivent respecter les préférences exprimées dans le gestionnaire de cookies.",
        },
      ],
    },
    {
      id: "google-ads",
      num: 9,
      title: "Google Ads",
      blocks: [
        {
          t: "p",
          text: "NERA utilise une balise de conversion Google Ads afin de mesurer l’efficacité de ses campagnes publicitaires. Lorsque vous avez accepté les technologies de marketing, certaines informations relatives à votre interaction avec le site et avec une campagne publicitaire peuvent être transmises à Google afin d’attribuer une conversion à une publicité.",
        },
        {
          t: "p",
          text: "NERA n’active pas de fonctionnalités supplémentaires de personnalisation ou de remarketing au-delà de celles effectivement nécessaires sans réexaminer au préalable les traitements concernés et, le cas échéant, adapter la présente politique.",
        },
      ],
    },
    {
      id: "meta-pixel",
      num: 10,
      title: "Meta Pixel",
      blocks: [
        {
          t: "p",
          text: "NERA utilise le Meta Pixel afin de mesurer les performances de ses campagnes publicitaires diffusées notamment sur Facebook et Instagram. Lorsque vous avez accepté les technologies de marketing, le Meta Pixel peut transmettre à Meta des informations relatives à votre navigation, à votre appareil, à votre interaction avec le site ou à la provenance d’une visite.",
        },
        {
          t: "p",
          text: "Ces données peuvent permettre à Meta de mesurer les conversions et, selon la configuration de ses services et le statut de l’utilisateur auprès de Meta, de rapprocher certaines interactions d’un compte ou d’autres informations dont Meta dispose. Le Meta Pixel reste désactivé tant que le choix requis n’a pas été donné.",
        },
      ],
    },
    {
      id: "google-maps",
      num: 11,
      title: "Google Maps",
      blocks: [
        {
          t: "p",
          text: "Le site contient une carte Google Maps intégrée. Le chargement d’une carte Google peut entraîner une connexion aux serveurs de Google et la transmission d’informations techniques concernant l’utilisateur. Afin de limiter la communication de données à des tiers, la carte doit être bloquée par défaut et chargée uniquement après l’acceptation de la catégorie correspondante dans le gestionnaire de cookies ou après une action explicite de l’utilisateur.",
        },
      ],
    },
    {
      id: "linkedin",
      num: 12,
      title: "LinkedIn",
      blocks: [
        {
          t: "p",
          text: "Le site contient un lien vers la page LinkedIn de NERA Ingénieurs Conseils Sàrl. NERA n’intègre actuellement aucun plugin LinkedIn ni balise LinkedIn de suivi sur le site. Aucune connexion avec LinkedIn n’est donc initiée du seul fait de l’affichage de ce lien. Lorsque vous cliquez sur ce lien et quittez le site NERA, le traitement de vos données relève ensuite des conditions de LinkedIn.",
        },
      ],
    },
    {
      id: "destinataires",
      num: 13,
      title: "Destinataires des données",
      blocks: [
        {
          t: "p",
          text: "Les données peuvent être accessibles aux personnes habilitées au sein de NERA dans la mesure nécessaire à leurs fonctions. Elles peuvent également être traitées par les prestataires techniques nécessaires à l’exploitation du site, notamment l’hébergeur Vercel, le prestataire de messagerie utilisé par NERA ainsi que Google et Meta pour les services décrits ci-dessus.",
        },
        {
          t: "p",
          text: "Ces prestataires doivent traiter les données uniquement dans le cadre des services concernés et conformément aux obligations légales et contractuelles applicables.",
        },
      ],
    },
    {
      id: "maintenance",
      num: 14,
      title: "Maintenance technique ponctuelle",
      blocks: [
        {
          t: "p",
          text: "Le développement initial du site a été réalisé par un prestataire externe établi au Maroc. Ce prestataire ne dispose pas d’un accès permanent aux données ou aux systèmes de NERA après la livraison du site.",
        },
        {
          t: "p",
          text: "NERA peut toutefois lui confier ponctuellement une intervention de maintenance corrective lorsque cela est nécessaire. Dans un tel cas, tout accès aux environnements contenant des données personnelles doit être limité à ce qui est strictement nécessaire à l’intervention, être temporaire, sécurisé et soumis aux instructions de NERA ainsi qu’aux garanties contractuelles applicables.",
        },
      ],
    },
    {
      id: "communication-etranger",
      num: 15,
      title: "Communication de données à l’étranger",
      blocks: [
        {
          t: "p",
          text: "Certains prestataires utilisés par NERA sont établis à l’étranger ou peuvent traiter des données depuis plusieurs pays. C’est notamment le cas de Vercel et de certains services de Google et de Meta.",
        },
        {
          t: "p",
          text: "Lorsque des données sont communiquées à l’étranger, NERA applique les mécanismes prévus par la LPD. Lorsque le pays ou l’organisation concernée bénéficie d’un niveau de protection reconnu comme adéquat pour la Suisse, le transfert peut s’appuyer sur cette reconnaissance. Dans les autres situations, NERA veille à mettre en place des garanties appropriées, notamment au moyen de clauses contractuelles reconnues en Suisse, lorsqu’elles sont requises.",
        },
        {
          t: "p",
          text: "Si une intervention de maintenance depuis le Maroc implique un accès à des données personnelles, NERA encadre cet accès avant l’intervention conformément aux exigences applicables aux communications de données à l’étranger.",
        },
      ],
    },
    {
      id: "conservation",
      num: 16,
      title: "Durée de conservation",
      blocks: [
        {
          t: "p",
          text: "Les demandes reçues par l’intermédiaire des formulaires qui ne donnent pas lieu à une relation contractuelle sont conservées pendant une durée maximale de 24 mois après le dernier échange utile, puis supprimées lorsqu’elles ne sont plus nécessaires.",
        },
        {
          t: "p",
          text: "Si une demande aboutit à un mandat ou à une relation contractuelle, les données nécessaires au suivi du projet peuvent être conservées pendant toute la durée de cette relation puis pendant les délais légaux de conservation ou de prescription applicables. Certains documents commerciaux et comptables doivent notamment être conservés pendant dix ans.",
        },
        {
          t: "p",
          text: "Certaines données peuvent être conservées plus longtemps lorsqu’une obligation légale l’impose ou lorsque leur conservation est nécessaire à la constatation, à l’exercice ou à la défense de droits en justice. Les durées propres aux cookies et outils de mesure sont précisées dans la [Politique relative aux cookies](/cookies).",
        },
      ],
    },
    {
      id: "securite",
      num: 17,
      title: "Sécurité",
      blocks: [
        {
          t: "p",
          text: "NERA met en œuvre des mesures techniques et organisationnelles adaptées afin de protéger les données personnelles contre la perte, la destruction, l’altération, la divulgation ou l’accès non autorisé. L’accès aux systèmes contenant des données personnelles doit être limité aux personnes qui en ont besoin dans le cadre de leur activité.",
        },
        {
          t: "p",
          text: "Aucun système informatique ou transmission par Internet ne pouvant garantir une sécurité absolue, NERA adapte les mesures de sécurité aux risques et à l’évolution des technologies.",
        },
      ],
    },
    {
      id: "decisions-automatisees",
      num: 18,
      title: "Décisions automatisées et profilage",
      blocks: [
        {
          t: "p",
          text: "NERA ne prend pas de décision individuelle produisant des effets juridiques à l’égard d’une personne exclusivement sur la base d’un traitement automatisé réalisé par le site. Les outils publicitaires de tiers tels que Google ou Meta peuvent effectuer leurs propres opérations de mesure, de rapprochement ou de profilage conformément à leurs conditions et aux choix de l’utilisateur en matière de technologies de suivi.",
        },
      ],
    },
    {
      id: "vos-droits",
      num: 19,
      title: "Vos droits",
      blocks: [
        {
          t: "p",
          text: "Dans les conditions prévues par le droit suisse, vous pouvez notamment demander à savoir si NERA traite des données personnelles vous concernant, obtenir l’accès aux données concernées, demander la rectification de données inexactes, demander la suppression ou la destruction de données lorsque les conditions légales sont réunies, vous opposer à certains traitements et, lorsque les conditions légales sont remplies, demander la remise ou la transmission de certaines données dans un format électronique courant.",
        },
        {
          t: "p",
          text: `Toute demande peut être adressée à ${EMAIL}. NERA peut demander les informations nécessaires pour vérifier l’identité du demandeur.`,
        },
      ],
    },
    {
      id: "modification",
      num: 20,
      title: "Modification de la politique",
      blocks: [
        {
          t: "p",
          text: "NERA peut modifier la présente politique afin de tenir compte d’une évolution de ses services, de ses outils techniques ou du cadre légal. La version publiée sur le site est la version applicable au moment de la consultation.",
        },
      ],
    },
  ],
};

export const cookies: LegalDoc = {
  route: "/cookies",
  shortTitle: "Politique relative aux cookies",
  title: "Politique relative aux cookies et technologies similaires",
  lead: "Gestion des technologies de suivi sur www.nera-ing.ch",
  updated: "3 septembre 2026",
  updatedIso: "2026-09-03",
  meta: {
    title: "Politique relative aux cookies",
    description:
      "Cookies et technologies similaires utilisés sur www.nera-ing.ch : catégories, finalités, durées et gestion de vos choix à tout moment.",
  },
  sections: [
    {
      id: "definition",
      num: 1,
      title: "Que sont les cookies ?",
      blocks: [
        {
          t: "p",
          text: "Les cookies sont de petits fichiers ou informations enregistrés sur le terminal d’un utilisateur ou associés à son navigateur lors de la consultation d’un site Internet. Des technologies similaires peuvent également permettre de mémoriser des informations, de mesurer l’utilisation d’un site ou d’attribuer une action à une campagne publicitaire.",
        },
      ],
    },
    {
      id: "outils",
      num: 2,
      title: "Outils utilisés sur nera-ing.ch",
      blocks: [
        {
          t: "p",
          text: "NERA utilise des technologies strictement nécessaires au fonctionnement du site ainsi que, sous réserve du choix de l’utilisateur, les services suivants :",
        },
        {
          t: "ul",
          items: [
            "Google Analytics 4, pour mesurer l’audience ;",
            "Google Ads, pour mesurer les conversions publicitaires ;",
            "Meta Pixel, pour mesurer les performances des campagnes Meta ;",
            "Google Maps, pour afficher une carte interactive.",
          ],
        },
        {
          t: "p",
          text: "Google Tag Manager est utilisé pour administrer les balises et doit être configuré de manière à respecter les choix effectués dans le gestionnaire de cookies. Le simple lien vers la page LinkedIn de NERA ne constitue pas un plugin LinkedIn et ne déclenche pas de balise LinkedIn sur le site.",
        },
      ],
    },
    {
      id: "necessaires",
      num: 3,
      title: "Cookies strictement nécessaires",
      blocks: [
        {
          t: "p",
          text: "Ces technologies sont nécessaires au fonctionnement, à la sécurité ou à l’enregistrement des préférences du site. Elles ne sont pas utilisées à des fins publicitaires. Lorsque le gestionnaire de cookies utilise un cookie afin de conserver le choix de l’utilisateur, ce cookie appartient à cette catégorie.",
        },
        {
          t: "p",
          text: "Les technologies strictement nécessaires ne peuvent pas être désactivées depuis le gestionnaire lorsqu’elles sont indispensables au fonctionnement du service demandé.",
        },
      ],
    },
    {
      id: "statistiques",
      num: 4,
      title: "Statistiques",
      blocks: [
        {
          t: "p",
          text: "Avec votre accord, Google Analytics 4 permet à NERA de comprendre comment le site est utilisé et d’établir des statistiques de fréquentation. Les principaux cookies GA4 sont les suivants :",
        },
        {
          t: "table",
          head: ["Cookie", "Finalité", "Durée par défaut"],
          rows: [
            ["_ga", "Distinguer les utilisateurs", "2 ans"],
            ["_ga_<identifiant>", "Conserver l’état de la session", "2 ans"],
          ],
        },
        {
          t: "p",
          text: "Les noms exacts peuvent varier en fonction de l’identifiant de la propriété Google Analytics et de la configuration retenue. Les navigateurs peuvent par ailleurs limiter la durée effective de certains cookies.",
        },
        { t: "p", text: "Ces cookies ne sont activés qu’après l’acceptation de la catégorie « Statistiques »." },
      ],
    },
    {
      id: "marketing",
      num: 5,
      title: "Marketing et mesure publicitaire",
      blocks: [
        {
          t: "p",
          text: "Avec votre accord, NERA utilise Google Ads et le Meta Pixel pour mesurer les conversions liées à ses campagnes publicitaires. Ces outils peuvent utiliser des cookies, identifiants et technologies similaires afin d’établir qu’une visite ou une action sur le site est intervenue après l’exposition ou le clic sur une publicité.",
        },
        {
          t: "p",
          text: "Selon la configuration technique retenue, des cookies de mesure publicitaire tels que des cookies de la famille _gcl_* pour Google ou _fbp / _fbc pour Meta peuvent être déposés. Leur nom et leur durée peuvent évoluer selon les paramètres des fournisseurs, les navigateurs et les choix de l’utilisateur.",
        },
        { t: "p", text: "Les technologies de marketing ne sont activées qu’après l’acceptation de la catégorie « Marketing »." },
      ],
    },
    {
      id: "contenus-externes",
      num: 6,
      title: "Contenus externes - Google Maps",
      blocks: [
        {
          t: "p",
          text: "Google Maps constitue un contenu fourni par un tiers. Afin d’éviter qu’une connexion à Google ne soit créée automatiquement lors de l’affichage de la page, la carte doit être remplacée par un emplacement neutre tant que l’utilisateur n’a pas accepté la catégorie « Contenus externes » ou choisi explicitement d’afficher la carte.",
        },
      ],
    },
    {
      id: "gestion-de-vos-choix",
      num: 7,
      title: "Gestion de vos choix",
      blocks: [
        { t: "p", text: "Lors de votre première visite, un gestionnaire de cookies vous permet de :" },
        { t: "ul", items: ["Tout accepter ;", "Tout refuser ;", "Personnaliser les catégories."] },
        {
          t: "p",
          text: "Le refus des technologies non essentielles ne doit pas empêcher l’accès aux pages ordinaires du site. Vous pouvez modifier ultérieurement votre choix depuis le lien « Gérer mes cookies » disponible en permanence dans le pied de page.",
        },
        { t: "consent" },
      ],
    },
    {
      id: "retrait",
      num: 8,
      title: "Retrait et modification du choix",
      blocks: [
        {
          t: "p",
          text: "Lorsque vous retirez votre accord pour une catégorie, les balises correspondantes ne doivent plus être déclenchées pour les visites futures. Certains cookies déjà déposés peuvent devoir être supprimés depuis le navigateur ou par le gestionnaire de cookies, selon la solution technique utilisée.",
        },
      ],
    },
    {
      id: "communication-etranger",
      num: 9,
      title: "Communication de données à l’étranger",
      blocks: [
        {
          t: "p",
          text: "L’utilisation de certains services peut conduire à un traitement de données à l’étranger. Lorsque cela est nécessaire, NERA applique les mécanismes prévus par la LPD pour les communications internationales de données, notamment les décisions d’adéquation ou les garanties contractuelles appropriées selon la situation.",
        },
      ],
    },
    {
      id: "informations-complementaires",
      num: 10,
      title: "Informations complémentaires",
      blocks: [
        {
          t: "p",
          text: "Pour davantage d’informations sur le traitement de vos données personnelles, consultez la [Politique de confidentialité](/confidentialite) de NERA Ingénieurs Conseils Sàrl.",
        },
        {
          t: "p",
          text: "La liste technique des cookies et technologies doit être contrôlée au moment de la mise en ligne puis à intervalles réguliers afin qu’elle corresponde à la configuration réelle du site.",
        },
      ],
    },
  ],
};

/** Les trois documents, dans l'ordre du pied de page. */
export const legalDocs = [mentionsLegales, confidentialite, cookies];
