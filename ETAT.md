# État du projet

Mis à jour le 10 septembre 2026. Tenir ce fichier à jour en fin de session.

## Fait

- Page d'accueil `/` (variante sombre), complète et conforme aux textes client.
- En-tête, méga-menu Prestations, menu sandwich, pied de page, bandeau cookies.
- Pop-up « Devis gratuit » en 4 étapes + page `/devis`.
- Textes juridiques client intégrés : bandeau cookies, mentions sous les deux formulaires.
- Pages légales `/mentions-legales`, `/confidentialite`, `/cookies` : gabarit partagé
  `components/legal/LegalPage.tsx`, contenu dans `content/legal-pages.ts` (texte client mot pour
  mot). Les liens du pied de page et des mentions sous formulaires ne sont plus en 404.
- Accueil, version PC (demandes du client) : logo d'en-tête à 52 px dès `lg` (40 px ailleurs),
  et les paragraphes des sections passent à `lg:text-body-lg` — 18 px sur grand écran au lieu
  de 16. Les étiquettes et les titres sont inchangés.
- Bandeau « Certifications et partenaires » : **fond crème**, et les logos y posent directement.
  Les cinq fichiers de `public/logos/partenaires/` ont été **ré-exportés depuis
  `Assets/Logos officiels` avec un fond transparent** (160 px de haut). Trois originaux avaient
  déjà un canal alpha ; le blanc de Minergie et de REG a été retiré par remplissage depuis les
  bords, méthode qui préserve le blanc *intérieur* — contre-formes du sigle CECB, croix suisse
  de REG — là où un simple « tout le blanc devient transparent » les aurait troués.
  Les tuiles blanches derrière chaque logo ont disparu. Il a aussi quitté le pied de
  page pour devenir une section de l'accueil (`components/home2/PartnerStrip.tsx`), placée
  juste après « Territoire », sur fond crème comme les trois autres emplacements. Il ne figure donc plus au pied des autres pages : `/bureau` a les
  mêmes logos dans « Nos qualifications » et `/references` dans son propre bandeau. Conséquence
  à retenir : `PartnerLogos` n'a plus de fond à lui, **tous ses emplacements doivent rester sur
  fond clair** — sur du marine, ces logos en quadrichromie deviendraient illisibles. Les quatre
  emplacements actuels (deux pieds de page, qualifications, références) sont conformes.
- Méga-menu Prestations : la carte de gauche (logo vertical et lien « Toutes les prestations »)
  a été retirée à la demande du client. Le panneau ne contient plus que les six prestations sur
  deux colonnes, avec des textes plus grands (intitulés 16 px, descriptions 14 px) et un cadre
  d'icône de 44 px. Le lien vers `/prestations` reste dans le menu sandwich et dans les deux
  pieds de page.
- Méga-menu Prestations élargi, une icône Lucide par prestation (`components/ui/PrestationIcon.tsx`,
  table unique alimentée par `content/prestations.ts`), reprise dans le sous-menu mobile.
- Écran de chargement des routes : le logomark se dessine en boucle (`app/loading.tsx`,
  `components/ui/LogoLoader.tsx`, keyframes dans `globals.css`).
- Page d'index `/prestations` : `components/prestations/PrestationsIndexPage.tsx`, contenu
  `prestationsIndex` dans `content/prestation-pages.ts` (lignes 92 à 175 du texte client).
  JSON-LD `BreadcrumbList` + `ItemList`. La route n'est plus en 404 pour le méga-menu, le
  héro clair et `content/navigation.ts`, qui pointaient déjà dessus.
- Liens « Toutes les prestations » vers `/prestations` : dans le menu sandwich
  (`components/home2/MenuOverlay.tsx`) au bas du sous-menu Prestations déroulé, et dans les deux
  variantes de pied de page (`components/home2/FooterDark.tsx` et `components/layout/Footer.tsx`)
  en tête de la colonne Prestations, au même style que les six entrées — le client ne voulait pas
  de CTA fléché en bas de colonne.
- Les six domaines de `/prestations` suivent la direction hestera.ch/nos-services
  (`components/prestations/PrestationsScrolly.tsx`, client) : à gauche, un panneau `sticky`
  qui s'ancre dès la première prestation, reste en place pendant les six et part avec la
  dernière ; à droite, les six sections de texte. La prestation active est la section qui
  traverse l'axe de lecture (IntersectionObserver + calcul au défilement). Repère vertical à
  six points cliquables. Sous `lg`, pas de colonne collante : l'illustration s'affiche en tête
  de chaque section. Respecte `prefers-reduced-motion`. Le dernier bloc ne force pas un écran
  de haut (`lg:last:min-h-0`), sinon un grand vide précède la section suivante ; son padding
  bas est mesuré en JS et vaut deux parts additionnées : la distance bas du panneau collant −
  bas du dessin (lue dans `getScreenCTM()` du SVG et son `viewBox`), **plus la moitié de la
  hauteur du dessin**. La première empêche le panneau de se décrocher alors que le texte est
  encore loin du dessin ; la seconde laisse le dernier bloc monter jusqu'au milieu du visuel au
  lieu de s'arrêter à son bas — demande du client. Une formule CSS ne suffisait pas : le SVG est
  limité en largeur et laisse du vide sous lui dans sa boîte.
  Le `viewBox` de l'illustration est cadré au bas des pastilles pour la même raison.
- Fin de `/prestations` : « Une prestation ciblée ou un accompagnement complet » est rendue en
  trois cartes (`outro[].cards` dans `content/prestation-pages.ts`), une par paragraphe client,
  la conclusion en marine ; les titres des cartes reprennent les mots du H2 et du paragraphe.
- Le visuel du panneau est `components/prestations/PrestationIllustration.tsx` : un immeuble
  d'habitation au trait, en projection isométrique calculée (30°, helpers `iso`/`faceX`/`faceY`/
  `faceZ`, aucune coordonnée tapée à la main) — quatre niveaux, balcons sur la façade gauche,
  entrée à marquise, édicule et sorties de ventilation en toiture, dalle de terrain, arbre.
  Palette du site via les utilitaires `fill-nera-*` / `stroke-accent`, sans hex, sans dégradé ni
  ombre. Six états, un par prestation : relevé de l'enveloppe et étiquette A à G ; isolation,
  ponts thermiques aux balcons, stores et soleil ; ventilation en toiture, PAC, panneaux, réseau
  de chaleur enterré ; mode plan (faces vides, cotes, niveaux, pièces du dossier) ; mesures
  subventionnables épinglées ; rénovation globale avec les huit étapes coordonnées.
  Les cartouches de chaque état sont tirés de la page prestation correspondante et aucun titre
  ne se répète d'un état à l'autre (CECB Plus, IDC, EPIQR+ / bilan SIA 380/1, ponts thermiques,
  confort d'été, humidité, Minergie / ventilation, photovoltaïque, PAC, réseau de chaleur /
  APA et DD, autres cantons, projets / mesures subventionnables, identification des aides,
  Programme Bâtiments / état des lieux, concept, AMO énergie, huit étapes). Dans le SVG, ne
  jamais poser `transform` sur un `motion.g` : Framer Motion l'écrase — mettre le `transform`
  sur un `<g>` parent.
  L'étiquette-énergie de l'état CECB suit le **schéma usuel** : sept flèches de A à G, du vert
  au rouge, lettres en blanc (`ENERGY_CLASSES` et `energyBar` dans
  `components/prestations/PrestationIllustration.tsx`). **C'est le seul endroit du site où des
  couleurs sont écrites en dur** ; `DESIGN.md` l'interdit dans un composant, mais cette gamme
  n'appartient pas à la charte NERA : c'est un code couleur normalisé, au même titre que les
  logos officiels. La transposer dans la palette du site rendrait l'étiquette méconnaissable.
  **Règle** : les libellés ne reprennent que des mots du texte client — jamais un chiffre, une
  classe, un montant ni une marque. La version précédente en inventait (Ug, COP, CHF, classe
  F → A, « conforme & validé ») et a été remplacée pour cette raison.
- Les 6 pages prestation : gabarit unique `components/prestations/PrestationPage.tsx`,
  contenu dans `content/prestation-pages.ts` (texte client mot pour mot, lignes 176 à 685
  de `content/source/textes-client.md`), route unique `app/prestations/[slug]/page.tsx`
  avec `generateStaticParams` sur les six slugs du pied de page. Chaque page : Titre SEO et
  méta-description du client, sommaire collant, frises chronologiques, FAQ dépliable,
  JSON-LD `BreadcrumbList` (trois niveaux) + `FAQPage`, CTA « Demander un devis gratuit » en
  bas de page (`ArrowQuoteButton`, pop-up pré-rempli avec la prestation). Le rendu des blocs
  de contenu vit dans `components/prestations/Blocks.tsx`, partagé avec l'index.
- Le bloc « Poursuivre avec » (maillage interne en bas des pages prestation) a été retiré à
  la demande du client. Les six pages ne se lient donc plus entre elles : seuls le méga-menu
  et le pied de page portent ces liens. Le champ `related` de `content/prestation-pages.ts`
  garde le maillage du README, sans consommateur, si l'on veut le rétablir.
- La FAQ des pages prestation est passée sur fond blanc : ce bloc clair séparait la FAQ
  marine du CTA marine, et `DESIGN.md` interdit deux sections marine qui se suivent.
  Alternance des fonds : crème (corps), blanc (FAQ), marine (CTA).
- `HeaderDark` accepte `solidOnScroll` : sur les pages à corps clair, l'en-tête garde son
  fond marine une fois défilé, sinon le logo crème devient illisible. L'accueil est inchangé.
- Boutons flottants (`components/ui/CallButton.tsx`) : « retour en haut » et onglet
  « Devis gratuit » à mi-hauteur du bord droit sont désormais visibles sur tous les formats,
  desktop compris, une fois le héro passé. L'onglet devis passe à 48 px sous `lg`.
- L'enveloppe de l'en-tête (`HeaderDark`) mène à `/contact` et non plus à un `mailto:` : le
  visiteur choisit entre le formulaire, le téléphone et l'e-mail. Le lien `mailto:` direct
  reste offert sur la page contact et dans le pied de page.
- SEO accueil, `sitemap.ts`, `robots.ts`, images OG/Twitter, JSON-LD `ProfessionalService`.
  Le plan du site tire les six routes prestation de `content/prestation-pages.ts`.
- `PrestationsScrolly.tsx` : les sur-titres inventés (« Diagnostic & Audit », « Ingénierie
  Fluides », « Financement Public »…) ont été retirés — seul le numéro et l'icône précèdent le H2,
  conformément à la règle « aucun libellé hors texte client ». Le repère à points est revenu dans
  la palette (`bg-hairline` / `hover:bg-mute` au lieu de `bg-slate-*`).
- Lint : `react-hooks/set-state-in-effect` signale `setActive` dans l'effet d'observation de
  `PrestationsScrolly.tsx` (ligne ~115). Préexistant, sans effet à l'exécution ; à traiter lors du
  nettoyage (point 5).
- Page `/bureau` (À propos) : `components/bureau/BureauPage.tsx`, contenu `content/bureau.ts`
  (texte client mot pour mot, lignes 694 à 772). En-tête sombre sur `bureau-batiment-clair-moderne`,
  sommaire, puis les H2 du client dans l'ordre : équilibre (six « entre… » en médaillons losange),
  mission (sept verbes numérotés), fondateur (cartouche + coordonnées directes, section marine),
  équipe (photo `bureau-equipe-etude.jpg` tirée de `people-having-debate…`), procédures (frise),
  qualifications (quatre cartes + logos officiels), valeurs (cinq colonnes), chiffres, cantons,
  CTA « Demander un devis gratuit ». Alternance crème / blanc / marine sans deux marine consécutives. JSON-LD `BreadcrumbList` +
  `AboutPage` (fondateur, adresse). Pas de portrait du fondateur : aucun fichier client, la
  cartouche texte en tient lieu — à remplacer si le client en fournit un.
  Retirés à la demande du client : le sommaire numéroté des sections, sous l'en-tête, et le
  bouton « Contacter NERA » de la section « Rencontrons-nous autour de votre projet », alors
  que le texte client prévoyait les deux CTA. `bureau.closing` ne porte donc plus que le titre
  et le libellé du devis.
  Les deux premières sections ont échangé leur traitement, à la demande du client : « L'équilibre
  comme principe » porte désormais une icône Lucide plate par ligne (`equilibreIcons` : balance,
  éclair, pièces, thermomètre, immeuble, feuille — dans l'ordre du texte), et « Notre mission »
  reprend les cartes à numéro en losange que portait l'équilibre. Les cartes de la mission sont
  en crème sur la section blanche, l'inverse de la section précédente, sinon elles se
  confondraient avec le fond.
  Écart assumé au texte client, demandé par le client : les quatre listes de la page —
  « L'équilibre comme principe » (six lignes), « Notre mission » (sept), « Une équipe
  spécialisée et complémentaire » (huit) et « Une connaissance concrète des procédures »
  (cinq) — prennent une capitale initiale et perdent leur point-virgule (ou point) final,
  parce qu'elles sont présentées en cartes ou en items numérotés autonomes, non en
  énumération courante. Les mots restent ceux du document. Les phrases d'amorce du client
  (« Cette organisation permet d'aborder conjointement : », « … contribue à : ») sont
  inchangées.
- `Stats` et `Territory` (accueil) acceptent désormais `items` / `title` + `text` et un `id` : le
  bureau les réutilise avec ses propres libellés client (plus longs que ceux de l'accueil).
  L'accueil est inchangé. Le compteur de `Stats` initialise la valeur finale sous
  `prefers-reduced-motion` au lieu d'un `setState` dans l'effet (lint corrigé).
- Page `/references` : `components/references/ReferencesPage.tsx`, contenu
  `content/references.ts`. Le CTA de fin « Vous souhaitez nous confier un projet ? » est sur
  fond marine, à la demande du client. Le client indique « En attente » pour le corps : la page porte le H1,
  les logos officiels, le H2 « Vous souhaitez nous confier un projet ? » et le CTA « Présenter
  mon projet » (pop-up devis). Une grille de projets est prête (`references.projects`, champs
  `title`, `place`, `text`, `image?`) et s'affiche dès qu'elle est remplie. **Tant qu'elle est
  vide, la page est en `noindex, follow` et absente du plan de site** : une page sans contenu
  nuirait au référencement. Remplir le tableau suffit à lever les deux.
- Mise en page de `/bureau` inspirée de hestera.ch/a-propos, relevée dans leur HTML et leur
  feuille de style, hors en-tête, « NERA en chiffres », « Territoire » et « Rencontrons-nous » :
  - **Titre de section** : leur `header.title-w-hr` — H2 puis un filet qui file jusqu'au bord de
    la colonne, alignés au centre. Repris dans `SectionHeading`, l'étiquette verte conservée
    au-dessus. Le filet disparaît sous `md`, où il n'a plus de place utile.
  - **Filigrane** : leur `.fili-right` sort une icône à moitié hors du cadre droit. Le logomark
    au trait déborde de même en haut à droite de « Notre mission », à 6 % d'opacité.
  - **Découverte des images** : leur `.img-onscroll` élargit le cadre de 0 à 100 % en 1 s
    (`cubic-bezier(.5, 0, 0, 1)`). `components/ui/ImageWipe.tsx` fait de même, mais avec un
    rideau à la couleur du fond qui se retire vers la droite : l'image ne se déforme pas.
    Passer au rideau la couleur de la section (`curtain="bg-canvas"`…). Posé par `data-shown`
    depuis l'observateur, pas par un état React. Utilisé sur la photo de l'équipe et des valeurs.
  - **« Nos qualifications »** : titre et logos officiels épinglés à gauche (`lg:sticky`),
    les quatre cartes défilent à droite, une par ligne. `position: sticky` suffit, contrairement
    au panneau de `/prestations` qui demandait un calcul en JS : ici rien n'est mesuré, le bloc
    se décroche seul en fin de colonne. Sous `lg`, tout s'empile dans l'ordre de lecture.
    L'icône est passée en haut à droite de chaque carte, à 36 puis 40 px.
    Les logos officiels sont **centrés sous `lg`** — la colonne occupe alors toute la largeur —
    et alignés sur le titre dès qu'elle devient collante :
    `<PartnerLogos justify="justify-center lg:justify-start" />`. L'alignement passe par la
    propriété `justify` et jamais par `className` : la classe de base du composant n'en contient
    aucun, sinon deux utilitaires `justify-*` sur le même élément se départageraient par l'ordre
    de la feuille de style et non par celui de la chaîne. Les variantes de point de rupture sont
    admises, elles vivent dans des media queries distinctes.
  - **« Nos valeurs »** : la progression de fond des `value-item` de hestera, sur une seule
    bande qui touche les deux bords de l'écran et le bas de la section. Le titre reste dans le
    conteneur, mais la liste en sort : ni gouttière, ni bordure, ni arrondi, et la section n'a
    plus de padding bas. Cinq rectangles du marine foncé au blanc (`valeurPanels`), texte
    centré, en crème sur les deux premiers. Les cellules d'une grille s'étirent à la hauteur de
    la plus haute, donc les cinq restent de même hauteur sans hauteur fixe. Sous `lg`, ils
    s'empilent. Le premier panneau, « Indépendance », est **en vert** à la demande du client :
    `DESIGN.md` proscrit le vert en grand aplat, c'est la seule entorse, et elle impose le
    marine foncé pour le texte (5,4:1 de contraste, contre 2,9:1 pour du blanc et 2,6:1 pour du
    crème, tous deux illisibles sur ce vert). L'apparition a été ralentie à 900 ms, avec 180 ms
    entre panneaux. Les intitulés sont en **capitales espacées** (`tracking-[0.2em]`), comme la
    référence : c'est le seul endroit du site où un titre est en capitales, ce que `DESIGN.md`
    proscrit ailleurs — dérogation demandée par le client. La première version reprenait leur bloc `#values` à deux colonnes avec une photo
    carrée à gauche ; le client a préféré la pleine largeur, la photo
    `bureau-valeurs-nature-suisse.webp` a donc été supprimée (récupérable dans l'historique).
- `components/ui/Reveal.tsx` : l'état d'arrivée ne reprend que les propriétés réellement
  décalées au départ. Il valait `{ opacity: 1, x: 0, y: 0 }` pour tous les effets, si bien qu'un
  simple fondu posait un `transform` sur l'élément — donc un calque de composition et un
  re-tramage du texte. Sur mobile, les cartes de « L'équilibre comme principe » sautaient à
  l'apparition pour cette raison. Un fondu est désormais servi avec `opacity` seule ; les effets
  `fade-right` et `fade-up` gardent leur translation.
- Apparitions calées sur hestera.ch/a-propos, la direction validée avec le client. Les réglages
  relevés dans leur HTML (`data-aos` / `data-aos-duration`, `AOS.init({ once: true })`, aucun
  `data-aos-delay`) vivent dans `components/ui/aos.ts` : `aosBlock` (fade 1000 ms, bloc de
  section), `aosItem` (fade 600 ms, élément répété d'un groupe), `aosCard` (fade-right 600 ms,
  carte empilée à côté d'un texte). S'étaler en `<Reveal {...aosBlock}>`.
  **Les cascades ont disparu** : hestera ne met aucun décalage entre les éléments d'une grille,
  ils apparaissent ensemble. **Une seule exception, demandée par le client** : la bande « Nos
  valeurs » garde 120 ms d'écart entre ses cinq panneaux, qui apparaissent donc de gauche à
  droite (`delay={i * 0.12}`). Ne pas généraliser ce décalage ailleurs. Appliqué à toutes les sections de `/bureau` sauf « NERA en
  chiffres », « Territoire » et « Rencontrons-nous », laissées telles quelles à la demande du
  client, et à `/references` (grille de projets, bandeau de logos) hors en-tête et CTA de fin.
  L'accueil n'est pas touché.
  L'en-tête de `/bureau` ne suit pas ces réglages : le client l'a voulu identique au héro de
  l'accueil (`components/home2/HeroDark.tsx`), soit l'étiquette en fondu, le H1 lettre par
  lettre (`SplitReveal`, départ à 0,2 s, 35 ms entre lettres, 1,4 s de montée), le chapô à
  1,6 s et la règle graduée à 2,4 s. Le fil d'Ariane reste immédiat, c'est un repère de
  navigation. Pas de mot en vert dans ce H1, contrairement à l'accueil : seule l'animation a
  été reprise, colorer une partie du nom de la société n'a pas été demandé.
  Conséquence à connaître : un bloc animé est servi en `opacity: 0` (et le H1 lettres en
  `translateY(150%)`) jusqu'au montage — c'est déjà le cas partout sur le site, mais au-dessus
  de la ligne de flottaison cela se voit davantage. Le H1 reste dans le HTML servi et
  `SplitReveal` en répète le texte complet en `aria-label`, donc ni le référencement ni les
  lecteurs d'écran ne sont touchés ; `prefers-reduced-motion` affiche tout d'emblée.
  Les en-têtes de `/references` et `/contact` n'ont pas été alignés : le client n'a demandé
  que `/bureau`.
- Page `/contact` : `components/contact/ContactPage.tsx`, contenu `content/contact.ts` (texte
  client mot pour mot, lignes 781 à 800). En-tête sombre à deux colonnes : le titre et le chapô
  à gauche, la carte « Nos coordonnées » à droite, en marine translucide sur le fond du héro
  (adresse cliquable vers Google Maps, les deux boutons et le lien LinkedIn du document). Le
  lien fléché vers le pop-up devis a été retiré de cette carte à la demande du client.
  Vient ensuite le formulaire à gauche et une photo à droite (`contact-conseil.webp`, découverte
  par `ImageWipe`). Le client a demandé une photo de quelqu'un au téléphone : il n'en existe
  aucune dans `Assets/Visuels`, c'est donc la scène de conseil la plus proche qui a été retenue,
  à remplacer dès qu'il en fournit une.
  Le titre de ce bloc est passé de « Demandez un devis gratuit » (texte client) à
  « Envoyez-nous un message », à sa demande : le formulaire de cette page est le formulaire de
  contact simple, la demande d'offre détaillée passant par le pop-up. À la demande du client, les boutons portent le numéro et l'adresse e-mail au
  lieu de « Appeler NERA » et « Envoyer un e-mail » ; ces libellés restent en `aria-label`,
  sinon un lecteur d'écran n'annoncerait qu'une suite de chiffres. La ligne « Téléphone : … /
  E-mail : … » qui les précédait a été retirée : elle répétait ce que portent les boutons. JSON-LD `BreadcrumbList` +
  `ContactPage`.
- Les champs du formulaire de contact vivent dans `components/contact/ContactForm.tsx`, avec un
  `tone` clair ou sombre. La mention légale court sous les deux colonnes, alignée sur le bord
  gauche du formulaire, et non plus sous la seule colonne de droite — sur l'accueil comme sur
  `/contact`, puisque le composant est partagé.
  Il est : la section contact de l'accueil et `/contact` partagent le même
  formulaire pour ne pas diverger. Toujours `action="#"` en attendant l'envoi des e-mails.
- « Carte localisation » (`components/contact/ContactMap.tsx`) : **chargée sans condition**,
  à la demande du client, et la catégorie « Google Maps » a quitté le bandeau cookies
  (`content/legal.ts`, `lib/consent.ts`, `CookieBanner`, `CookieChoice`). Le composant est
  redevenu un composant serveur, sans état ni consentement.
  **Contradiction à régler — voir le point 1 d'« À faire » :** les textes juridiques du client
  promettent encore le blocage de la carte tant que le visiteur n'a pas accepté, à trois
  endroits (`content/legal-pages.ts` : « Google Maps » dans la politique de confidentialité,
  « Contenus externes - Google Maps » et la liste des cookies tiers). Ces textes sont du client :
  ils n'ont pas été réécrits ici. Soit il les fait corriger, soit on rétablit le blocage.
  Bande pleine hauteur fixe
  (340 / 420 / 500 px), sans titre visible — le titre du client sert de nom accessible à la
  section (`aria-label`), à fond perdu sur toute la largeur de l'écran.
  La carte interroge Google avec la **raison sociale et l'adresse**, pas avec des coordonnées :
  un `q=<lat>,<lon>` pose une épingle sans fiche, et le clic répond alors « Impossible de
  charger les informations sur le lieu ». Avec la raison sociale, Google retrouve la fiche
  d'établissement et le clic ouvre son panneau, avec le bouton d'itinéraire. **Ne pas repasser
  aux coordonnées dans `q`.** Les coordonnées exactes du 37, chemin J.-Ph.-de-Sauvage
  (`46.214455, 6.104332`, registre fédéral des adresses `api3.geo.admin.ch`) restent dans
  `content/contact.ts` et alimentent le `geo` des données structurées, avec `hasMap` qui pointe
  la fiche Google du client.
  Fournisseur : Google Maps, imposé par les textes juridiques du client, qui le nomment à trois
  endroits et promettent son blocage tant que la catégorie n'est pas acceptée. Ne pas le
  remplacer par OpenStreetMap sans faire corriger ces textes.
  Un « www.google.com's server IP address could not be found » signalé en cours de route venait
  d'une coupure DNS de la machine, pas du site : au retour du réseau, l'URL exacte de l'iframe
  répond 200. L'iframe n'est montée qu'une fois la catégorie `maps` acceptée. Sans consentement, la zone affiche l'adresse,
  la raison, un bouton qui ouvre le gestionnaire de cookies et un lien vers Google Maps. Le
  consentement est lu via `useSyncExternalStore` sur l'évènement `nera:cookie-consent` — pas de
  `setState` dans un effet, que le lint refuse — donc accepter les cartes depuis le bandeau
  affiche la carte sans recharger. **C'est le premier traceur réellement branché sur le
  gestionnaire de cookies** ; GA4, Google Ads et Meta Pixel restent à faire sur le même modèle.
- Page 404 (`app/not-found.tsx`, textes dans `content/not-found.ts`) : écran marine plein
  format, logomark au trait débordant à droite, grille de plan. Le « 404 » est composé avec le
  losange de la charte (`DiamondOutline`) à la place du zéro — motif déjà employé dans le héro
  et pour les cantons, rien d'inventé. Purement décoratif, donc `aria-hidden` : c'est le H1 qui
  porte l'information. À droite, les quatre destinations du menu principal en lignes à filet,
  pour repartir sans passer par l'accueil. `noindex, follow` et titre absolu.
  Les textes sont d'interface, pas du client : le document source n'en prévoit pas.
- Toutes les puces des pages prestation (`content/prestation-pages.ts`, 216 items) suivent la
  règle de `/bureau` : capitale initiale, sans point-virgule ni point final. Les paragraphes
  n'ont pas bougé. Un script parcourt les seuls blocs `t: "ul"` ; ne pas appliquer la règle aux
  `p`, dont la ponctuation est celle du client.
- Version PC des prestations : le bandeau blanc des six prestations passe en 16 px puis 18 px
  (numéros 15 puis 17), et les paragraphes, puces et réponses de FAQ passent à
  `lg:text-body-lg`. Le sommaire collant et les liens passent de 14 à 16 px.
- Pop-up devis, corrections demandées par le client : « Code postal » remplace « Commune »
  (la clé du formulaire est passée de `commune` à `codePostal`, dans `content/devis.ts`,
  `QuoteForm` et `app/api/devis/route.ts`, e-mails compris), « Nom et prénom » remplace
  « Nom », et le sous-titre du pop-up ne mentionne plus Genève.
  **Bug corrigé — envoi automatique sans clic.** La vraie cause n'était pas la touche Entrée
  mais la réconciliation de React : « Suivant » et « Envoyer ma demande » occupaient la même
  position dans le même ternaire, sans `key`. React réutilisait donc le nœud du DOM et se
  contentait d'en changer le `type`. Le clic sur « Suivant » à l'étape « Coordonnées » faisait
  passer à « Synthèse », le bouton sous le curseur devenait `type="submit"`, et l'action par
  défaut du clic en cours soumettait le formulaire : la demande partait et l'écran de
  confirmation s'affichait sans que personne n'ait cliqué sur « Envoyer ma demande ».
  Trois barrières désormais, dans `components/quote/QuoteForm.tsx` :
  1. des `key` distinctes (`"next"` / `"send"`) — React démonte un bouton et en monte un autre,
     le clic ne trouve plus de bouton d'envoi sous lui ; **ne pas les retirer** ;
  2. `submit()` ne fait qu'avancer d'un pas tant qu'on n'est pas à la dernière étape, ce qui
     neutralise aussi la soumission implicite par la touche Entrée ;
  3. un drapeau `sendIntent`, posé par le seul `onClick` du bouton d'envoi : sans lui, rien ne
     part.
  Vérifié par relecture et par `tsc` / `eslint` / `next build` ; pas de test au clic, faute de
  navigateur disponible (le serveur Playwright ne se connecte pas).
  À signaler au client : la politique de confidentialité annonce encore la collecte de la
  « commune et canton » (`content/legal-pages.ts`), alors que le formulaire demande un code
  postal.
- Page `/bureau`, série de corrections client : « Fondé à Genève en 2025 » retiré du chapô ;
  point plutôt que deux-points après « d'aborder les projets » ; « Notre mission » perd
  « Traduire leurs objectifs dans un projet cohérent » et « Intégrer les exigences
  réglementaires » remonte avant « Comparer les variantes » ; le portrait du fondateur reçoit le
  texte enrichi fourni (Bachelor HES-SO à HEPIA, REG B, Prix OCEN 2022) en lieu et place de
  « Son parcours… ». Sa première phrase et sa dernière disent toutes deux la fondation de NERA :
  le client a demandé de garder les deux.
- « NERA en chiffres » de `/bureau` reprend les chiffres **et** les libellés de l'accueil :
  `<Stats id={bureau.chiffres.id} />` sans `items`. Les libellés plus longs propres à la page
  ont été supprimés de `content/bureau.ts`.
- Deux relais « Demander un devis gratuit » ont été posés dans le corps de `/bureau`, sous
  « Notre mission » et sous « Nos qualifications » : le bouton « Devis gratuit » de l'en-tête
  disparaît dès que la page défile, et il n'y avait plus aucun moyen de demander une offre
  depuis cette page avant son pied.
- Sélection du texte dans le bloc « fondateur » : signalée comme impossible par le client,
  **non reproduite** — rien dans le code ne la bloque (`select-none` n'est utilisé que sur
  l'illustration des prestations, aucune surcouche sans `pointer-events-none`). Par précaution,
  les deux logomarks décoratifs de la page passent en `-z-10` : ils ne peuvent plus passer
  devant le texte. Le correctif de `Reveal` (plus de `transform` sur un simple fondu) pourrait
  aussi y contribuer. À revérifier sur le site déployé.
- Déployé sur Vercel : https://nera-roan.vercel.app/

## À faire

Par ordre de priorité.

1. **Textes juridiques et carte** — faire corriger par le client les trois passages qui
   promettent le blocage de Google Maps jusqu'au consentement, puisque la carte s'affiche
   désormais d'emblée et que la catégorie a quitté le bandeau. À défaut, rétablir le blocage.
   Tant que ce n'est pas tranché, le site contredit sa propre politique de cookies.
2. **Références** — obtenir du client la liste des projets (titre, lieu, une phrase, photo)
   pour remplir `references.projects` ; vérifier ensuite que `/references` sort du noindex.
   Un portrait du fondateur, s'il existe, pour la section `#fondateur` de `/bureau`.
3. **Envoi des e-mails** — passer de Resend à Microsoft Graph (`sendMail`). En attente du
   tenant ID, client ID et client secret ; à recevoir par canal sécurisé, pas par e-mail.
4. **DNS chez Infomaniak** — A `128.65.195.180` → `76.76.21.21`, www A → CNAME
   `cname.vercel-dns.com`. Ne pas toucher NS/MX/SPF/DKIM/DMARC/autodiscover (Microsoft 365).
5. **Nettoyage** — supprimer `/home-2` et `components/sections/` une fois la variante validée.
   Attention : `components/layout/` n'est pas mort, `app/devis/page.tsx` s'en sert et
   `HeaderDark` importe son `PrestationsMenu`. Puis soumettre le site à la Search Console.

## Largeurs et rythme vertical

Deux gabarits coexistent, portés par `components/ui/Container.tsx` :

- **Par défaut** : conteneur centré de 76 rem (`max-w-site`), gouttières 24 / 40 px. C'est le
  gabarit de l'accueil, des prestations, du contact, des références et des pages légales.
- **`wide`** : pleine largeur sans maximum, gouttières 24 / 40 / **120 px**. C'est celui des
  sections « NERA en chiffres » et « Territoire », écrites avant le composant.

**Toutes les pages sont en `wide`**, à la demande du client : toutes ses sections s'alignent
sur l'accueil, y compris les en-têtes : prestations et pages prestation, bureau, contact,
références, devis, pages légales et 404. Sur `/bureau`, le rythme vertical suit aussi
« NERA en chiffres » (`py-20 lg:py-28` au lieu de `py-section-sm lg:py-section`).
Les blocs de prose qui portaient un `max-w-3xl` (pages légales, FAQ des prestations, devis)
gardent leur largeur de lecture : on leur a ajouté `mx-auto`, que `wide` ne fournit pas.
Le conteneur centré par défaut n'a plus d'utilisateur en dehors de `components/sections/`,
qui ne sert qu'à `/home-2` — à supprimer avec lui (point 5 d'« À faire »). Ne pas mélanger les deux gabarits
sur une même page : le décalage se voit au défilement.

Reste en dehors : l'en-tête du site garde `lg:px-12`, plus serré que les 120 px des sections.
C'était déjà le cas sur l'accueil ; le corriger toucherait toutes les pages.

## Photos

Les fichiers de `public/img/` sont des ré-exports des originaux de `../Assets/Visuels/`, jamais
des fichiers retouchés à la main.

**Règle d'export, à appliquer à toute nouvelle image :**

- **Format WebP**, sans exception. Demande du client : garder la qualité en allégeant le
  chargement. Le passage du JPEG au WebP a divisé le poids des masters par deux à qualité
  identique (8 Mo → 3 Mo).
- Toujours encoder **depuis l'original**, jamais depuis un export déjà compressé : convertir un
  JPEG en WebP empile deux compressions avec perte sur une image déjà dégradée.
- Plus grand côté à **2560 px** au maximum (la plus grande valeur de `deviceSizes` dans
  `next.config.ts`), jamais d'agrandissement. Plafonner le plus grand côté et non la largeur :
  une image en portrait exportée à 2560 px de large pèse trois fois plus pour rien.
- **Qualité 90, `method=6`** (l'encodeur cherche plus longtemps, pour un fichier plus petit à
  qualité égale).

```python
im = ImageOps.exif_transpose(Image.open(original)).convert("RGB")
r = 2560 / max(im.size)
if r < 1:
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
im.save(sortie, format="WEBP", quality=90, method=6)
```

Ces fichiers ne sont que les masters : `next/image` les ré-encode en AVIF à la volée. C'est donc
l'attribut `quality` des composants qui décide de la qualité livrée — il est à **90** partout, et
90 doit rester dans `images.qualities` de `next.config.ts`, sinon Next refuse la valeur. Le héro
pleine largeur est servi en AVIF 2560 px pour environ 93 Ko.

Les premiers exports plafonnaient à 1400 px en qualité 82 : sur un écran large ou à densité
double, il ne restait plus de pixels à servir et les photos paraissaient floues à côté des
originaux.

Correspondance master → original (vérifiée par comparaison d'images, à conserver pour tout
ré-export) :

| `public/img/`                             | `Assets/Visuels/`                 |
| ----------------------------------------- | --------------------------------- |
| `hero-immeuble-geneve-soleil.webp`        | Immeuble ville soleil.jpg         |
| `bureau-batiment-clair-moderne.webp`      | Batiment clair moderne.jpg        |
| `bureau-equipe-etude.webp`                | Etude plans 2.jpg                 |
| `references-immeubles-modernes.webp`      | Immeubles modernes ciel bleu.jpg  |
| `process-panneaux-solaires-immeuble.webp` | Panneaux solaires immeuble 2.png  |
| `prestation-diagnostic-energetique.webp`  | Diagnostic énergétique.jpg        |
| `prestation-enveloppe-facade-vitree.webp` | Batiment vitré moderne.jpg        |
| `prestation-plans-autorisation.webp`      | Plans construction.png            |
| `prestation-pompe-a-chaleur.webp`         | Pompe à chaleur.jpg               |
| `prestation-renovation-batiment.webp`     | Rénovation bâtiment.jpg           |
| `prestation-subventions-plans.webp`       | Plans maison écologie.jpg         |

Les noms de fichiers du client sont en Unicode décomposé (NFD) : un script qui les ouvre par
nom littéral échoue en `FileNotFoundError`. Comparer sur `unicodedata.normalize("NFC", nom)`.

Les logos partenaires de `public/logos/partenaires/` restent en PNG : ce sont les fichiers
officiels de leurs propriétaires, ils pèsent moins de 30 Ko et `next/image` les sert déjà
ré-encodés. Les logos NERA sont en SVG.

## Serveur de développement

**Ne jamais lancer `next build` pendant que `next dev` tourne** : les deux écrivent dans `.next`
et le serveur de développement finit par répondre 500 avec « Jest worker encountered 2 child
process exceptions ». Le code n'est pas en cause. Remède : arrêter le serveur, supprimer
`.next/dev`, relancer `npm run dev`. Pour vérifier une modification, interroger le serveur de
développement ; ne construire qu'après l'avoir arrêté.

## Défilement entre pages

`app/globals.css` pose `scroll-behavior: smooth` pour les ancres internes. Next 16 ne
neutralise plus ce réglage pendant les transitions de route sans l'attribut
`data-scroll-behavior="smooth"` sur `<html>` : sans lui, un lien du pied de page ouvrait la
page suivante en bas. L'attribut est posé dans `app/layout.tsx` — ne pas le retirer.

## Gestionnaire de cookies

Le choix vit en localStorage sous `nera-cookie-consent`. `lib/consent.ts` est la source unique
de la clé, du type et des deux évènements : `nera:cookie-consent` (choix enregistré) et
`nera:open-cookie-preferences` (demande d'ouverture, que le bandeau annule pour signaler qu'il a
répondu). Le rappel de choix de `/cookies` et le lien « Gérer mes cookies » du pied de page
passent tous deux par là. La carte de `/contact` n'y est plus soumise (voir plus haut) et la
catégorie a été retirée ; GA4, Google Ads et Meta Pixel restent à brancher sur les leurs.

## Décisions ouvertes

- Le plan de site client ne mentionne aucune page Actualités, alors que le module CMS
  (Sanity) est au devis. À trancher avec le client.
- Le formulaire de contact (accueil et `/contact`, même composant) n'est pas encore relié
  (`action="#"`) ; il le sera avec le point 2 de « À faire », l'envoi des e-mails.
- Sur `/references` et `/contact`, le CTA de fin et l'en-tête gardent leurs apparitions
  d'origine, par cohérence avec les quatre sections que le client a voulu laisser telles
  quelles sur `/bureau`. À confirmer avec lui s'il souhaite les aligner aussi.
