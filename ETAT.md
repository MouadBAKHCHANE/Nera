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
  bas est mesuré en JS (bas du panneau collant − bas du dessin, lu dans `getScreenCTM()` du
  SVG et son `viewBox`), pour que le panneau se décroche exactement quand le CTA « Découvrir
  notre accompagnement global » arrive au niveau du bas des pastilles — pas avant. Une formule
  CSS ne suffisait pas : le SVG est limité en largeur et laisse du vide sous lui dans sa boîte.
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
- Bouton « retour en haut » (`components/ui/CallButton.tsx`) désormais visible aussi sur
  desktop. Le bouton devis latéral reste téléphone et tablette.
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
  `content/references.ts`. Le client indique « En attente » pour le corps : la page porte le H1,
  les logos officiels, le H2 « Vous souhaitez nous confier un projet ? » et le CTA « Présenter
  mon projet » (pop-up devis). Une grille de projets est prête (`references.projects`, champs
  `title`, `place`, `text`, `image?`) et s'affiche dès qu'elle est remplie. **Tant qu'elle est
  vide, la page est en `noindex, follow` et absente du plan de site** : une page sans contenu
  nuirait au référencement. Remplir le tableau suffit à lever les deux.
- Déployé sur Vercel : https://nera-roan.vercel.app/

## À faire

Par ordre de priorité.

1. **Références** — obtenir du client la liste des projets (titre, lieu, une phrase, photo)
   pour remplir `references.projects` ; vérifier ensuite que `/references` sort du noindex.
   Un portrait du fondateur, s'il existe, pour la section `#fondateur` de `/bureau`.
2. **`/contact`** — le formulaire simple, identique à la section contact de l'accueil.
3. **Envoi des e-mails** — passer de Resend à Microsoft Graph (`sendMail`). En attente du
   tenant ID, client ID et client secret ; à recevoir par canal sécurisé, pas par e-mail.
4. **DNS chez Infomaniak** — A `128.65.195.180` → `76.76.21.21`, www A → CNAME
   `cname.vercel-dns.com`. Ne pas toucher NS/MX/SPF/DKIM/DMARC/autodiscover (Microsoft 365).
5. **Nettoyage** — supprimer `/home-2` et les composants clairs une fois la variante validée,
   ajouter la page 404, soumettre à la Search Console.

## Photos

Les fichiers de `public/img/` sont des ré-exports des originaux de `../Assets/Visuels/`, jamais
des fichiers retouchés à la main. **Règle d'export** : plus grand côté à 2560 px au maximum (la
plus grande valeur de `deviceSizes` dans `next.config.ts`), jamais d'agrandissement, qualité JPEG
92 sans sous-échantillonnage de la chrominance (`subsampling=0`), progressif. Plafonner le plus
grand côté et non la largeur : une image en portrait exportée à 2560 px de large pèse trois fois
plus pour rien.

Ces fichiers ne sont que les masters : `next/image` les ré-encode en AVIF à la volée. C'est donc
l'attribut `quality` des composants qui décide de la qualité livrée — il est à **90** partout, et
90 doit rester dans `images.qualities` de `next.config.ts`, sinon Next refuse la valeur.

Les premiers exports plafonnaient à 1400 px en qualité 82 : sur un écran large ou à densité
double, il ne restait plus de pixels à servir et les photos paraissaient floues à côté des
originaux. Total actuel : environ 8 Mo de masters, une page d'accueil servie en AVIF autour de
100 Ko pour le héro pleine largeur.

Correspondance master → original (vérifiée par comparaison d'images, à conserver pour tout
ré-export) :

| `public/img/`                            | `Assets/Visuels/`                 |
| ---------------------------------------- | --------------------------------- |
| `hero-immeuble-geneve-soleil.jpg`        | Immeuble ville soleil.jpg         |
| `bureau-batiment-clair-moderne.jpg`      | Batiment clair moderne.jpg        |
| `bureau-equipe-etude.jpg`                | Etude plans 2.jpg                 |
| `references-immeubles-modernes.jpg`      | Immeubles modernes ciel bleu.jpg  |
| `process-panneaux-solaires-immeuble.jpg` | Panneaux solaires immeuble 2.png  |
| `prestation-diagnostic-energetique.jpg`  | Diagnostic énergétique.jpg        |
| `prestation-enveloppe-facade-vitree.jpg` | Batiment vitré moderne.jpg        |
| `prestation-plans-autorisation.jpg`      | Plans construction.png            |
| `prestation-pompe-a-chaleur.jpg`         | Pompe à chaleur.jpg               |
| `prestation-renovation-batiment.jpg`     | Rénovation bâtiment.jpg           |
| `prestation-subventions-plans.jpg`       | Plans maison écologie.jpg         |

Les noms de fichiers du client sont en Unicode décomposé (NFD) : un script qui les ouvre par
nom littéral échoue en `FileNotFoundError`. Comparer sur `unicodedata.normalize("NFC", nom)`.

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
passent tous deux par là. Aucun traceur n'est encore chargé : GA4, Google Ads, Meta Pixel et
Google Maps restent à brancher sur ces catégories.

## Décisions ouvertes

- Le plan de site client ne mentionne aucune page Actualités, alors que le module CMS
  (Sanity) est au devis. À trancher avec le client.
- Le formulaire de la section contact n'est pas encore relié (`action="#"`) ; il le sera
  avec le point 2.
