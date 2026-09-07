---
version: 1.0
name: NERA-Ingenieurs-Conseils
description: Système de design du site nera-ing.ch. Bureau d'ingénieurs conseils B2B à Genève. Minimalisme suisse, crème et bleu marine avec un seul accent vert, Clash Display pour les titres, Satoshi pour le texte. Calme, précis, indépendant. Rien de décoratif qui ne serve la lecture.

colors:
  green: "#28AC75"
  cream: "#F4F3EF"
  ink: "#222222"
  navy: "#0F3557"
  green-deep: "#1F8A5E"
  green-soft: "#E3F4EC"
  navy-deep: "#0A2440"
  navy-soft: "#E6EBF0"
  cream-deep: "#E9E7E0"
  body: "#4A4F55"
  mute: "#7A8087"
  hairline: "#DCDAD3"
  white: "#FFFFFF"
  canvas: "{colors.cream}"
  canvas-alt: "{colors.white}"
  surface-dark: "{colors.navy}"
  accent: "{colors.green}"

typography:
  display-xl:
    fontFamily: Clash Display, Helvetica Neue, Arial, sans-serif
    fontSize: 64px
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Clash Display, Helvetica Neue, Arial, sans-serif
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.015em
  display-md:
    fontFamily: Clash Display, Helvetica Neue, Arial, sans-serif
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.15
  display-sm:
    fontFamily: Clash Display, Helvetica Neue, Arial, sans-serif
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.25
  body-lg:
    fontFamily: Satoshi, Helvetica Neue, Arial, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Satoshi, Helvetica Neue, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Satoshi, Helvetica Neue, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  eyebrow:
    fontFamily: Satoshi, Helvetica Neue, Arial, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.14em
    textTransform: uppercase
  button:
    fontFamily: Satoshi, Helvetica Neue, Arial, sans-serif
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px

spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  section: 112px
  section-sm: 72px
  container: 1216px
  gutter: 24px

components:
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.navy}"
    typography: "{typography.body-sm}"
    height: 72px
    borderBottom: 1px solid {colors.hairline}
  nav-link:
    textColor: "{colors.body}"
    hoverTextColor: "{colors.navy}"
    typography: "{typography.body-sm}"
    padding: "8px 12px"
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.cream}"
    hoverBackgroundColor: "{colors.navy-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: 48px
  button-accent:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    hoverBackgroundColor: "{colors.green-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: 48px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.navy}"
    borderColor: "{colors.navy}"
    hoverBackgroundColor: "{colors.navy-soft}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: 48px
  card-service:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
    hoverBorderColor: "{colors.green}"
  section-dark:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.cream}"
    headingColor: "{colors.cream}"
    accentColor: "{colors.green}"
  form-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    focusBorderColor: "{colors.green}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: 48px
  eyebrow-label:
    textColor: "{colors.green}"
    typography: "{typography.eyebrow}"
---

# NERA Ingénieurs Conseils — DESIGN.md

## Thème visuel

Site B2B pour un bureau d'ingénieurs conseils genevois (énergie, physique du bâtiment, CVC). Le lecteur est un architecte, un promoteur, une régie ou un service cantonal : il cherche un interlocuteur fiable, pas un spectacle. Le site doit donner l'impression d'un dossier technique bien tenu : marges généreuses, grille stricte, une typographie qui fait le travail, une seule couleur d'accent utilisée avec parcimonie.

Le nom NERA vient de l'idée d'équilibre. Le design le traduit par la symétrie, l'alignement et le calme, jamais par des effets.

Références de direction : forfuture.webflow.io/homepage/home-b (structure de l'accueil : header en trois cellules, héro clair centré puis photo pleine largeur, liste de prestations sur fond sombre, mission centrée, processus numéroté), hestera.ch et arkey.ch (retenue suisse). On réplique la direction, jamais les fichiers.

## Palette

Quatre couleurs de charte, rien d'autre :

- **Crème `#F4F3EF`** : fond de page par défaut. Le site est crème, pas blanc.
- **Bleu marine `#0F3557`** : titres, boutons primaires, sections sombres, logo. C'est la couleur de l'autorité.
- **Vert `#28AC75`** : accent unique. Eyebrows, icônes, soulignements, bouton d'action principal (contact), logomark. Jamais en texte courant sur crème (contraste insuffisant), jamais en grand aplat.
- **Noir `#222222`** : texte courant. Les dérivés `body #4A4F55` et `mute #7A8087` servent aux paragraphes et légendes.

Blanc `#FFFFFF` uniquement pour les cartes et champs posés sur le crème. Les tons « soft » et « deep » sont des dérivés de calcul, pas de nouvelles teintes : ne pas en inventer d'autres.

Ratio d'usage indicatif sur une page : 70 % crème/blanc, 20 % marine, 5 % vert, 5 % noir/gris.

## Typographie

- **Clash Display** (Medium 500, Semibold 600 exceptionnel) : H1, H2, H3, chiffres clés. Jamais en dessous de 22 px, jamais en corps de texte.
- **Satoshi** (Regular 400, Medium 500, Bold 700) : tout le reste. Boutons et labels en Medium.
- Eyebrow : Satoshi Medium 12 px, capitales, interlettrage 0.14em, vert.
- Les titres sont en marine, en casse normale (jamais tout en capitales), sans point final.
- Auto-hébergées (`next/font/local`, woff2), pas de Google Fonts.

## Layout

- Conteneur 1216 px, gouttières 24 px, grille 12 colonnes.
- Sections : 112 px de padding vertical sur desktop, 72 px sur mobile. Une idée par section.
- Alternance des fonds : crème, marine, crème, marine (photo assombrie), blanc, crème. Jamais deux sections marine qui se suivent.
- Titres de section centrés avec une étiquette pilule au-dessus (direction For Future). Le contenu sous le titre est aligné à gauche : listes en lignes, grilles de cartes, deux colonnes.
- Titre de section = eyebrow vert + H2 marine + un paragraphe body-lg, largeur max 640 px.
- Prestations sur l'accueil : liste en lignes sur fond marine, filets crème à 15 %, icône dans un carré à filet, flèche en bout de ligne. Sur les pages intérieures : cartes blanches à bordure hairline, bordure verte au survol.

## Profondeur et surfaces

Plat. Aucune ombre portée. La hiérarchie vient des fonds (crème/blanc/marine) et des bordures hairline `#DCDAD3`. Rayons de 4 à 6 px maximum, avec une seule exception : les étiquettes de section (eyebrow) sont des pilules à filet, direction For Future home-b. Pas de verre, pas de flou, pas de dégradé.

## Motion

Discrète. Reveal au scroll : opacité 0 → 1 et translation 16 px, 320 ms, easing out-quart, décalage 60 ms entre éléments d'une même grille. Hover sur les liens : couleur uniquement. Hover sur les cartes : bordure. Respecter `prefers-reduced-motion`. Framer Motion uniquement, pas de GSAP, pas de Lenis, pas de parallaxe.

## Imagerie

Photos réelles fournies par le client (bâtiments, chantiers, fondateur). À défaut, photographie d'architecture suisse sobre, lumière naturelle, pas de personnes qui se serrent la main. Traitement : légère désaturation, jamais de filtre coloré. Icônes : Lucide, trait 1.5 px, couleur vert ou marine, 24 px.

Logos partenaires (CECB Expert, Minergie Partenaire spécialiste) : fichiers officiels uniquement, en monochrome marine ou tels quels selon leurs règles d'usage, alignés sur une ligne à hauteur fixe.

## Voix

Français de Suisse romande, vouvoiement, phrases courtes, vocabulaire technique exact (CECB, CVC, Minergie, THPE, Programme Bâtiments). Pas de superlatifs, pas de « solutions innovantes ». Chiffres seulement s'ils sont fournis par le client.

## À faire / À ne pas faire

**Faire**
- Un seul H1 par page, avec le mot-clé et la ville.
- Boutons : primaire marine, accent vert réservé au contact, secondaire contour marine.
- Texte courant en `#222222` ou `#4A4F55` sur crème/blanc.
- Sections marine : titres et texte en crème, accent vert.
- Largeur de lecture max 680 px.

**Ne pas faire**
- Dégradés, ombres portées, verre dépoli, coins très arrondis, effets néon.
- Cartes imbriquées dans des cartes.
- Vert en texte courant ou en grand aplat de fond.
- Texte gris clair sur fond coloré.
- Emoji, illustrations 3D isométriques, visages générés par IA.
- Chiffres inventés (projets réalisés, années d'expérience de la société).
- Polices supplémentaires, Google Fonts, Inter.
- Plus de deux graisses de Clash Display sur une page.

## Responsive

- Points de rupture Tailwind par défaut (sm 640, md 768, lg 1024, xl 1280).
- Mobile 390 px : H1 en 40 px, sections 72 px, grilles en 1 colonne, menu burger en SVG inline (jamais des barres CSS).
- Pas de débordement horizontal : `scrollWidth <= innerWidth` vérifié à chaque page.
- Cibles tactiles 44 px minimum.

## Prompts agent

- « Use ./DESIGN.md for every page. Never deviate from its palette and type scale. »
- « Build the [section] using tokens from app/globals.css only. No hard-coded hex. »
- « Reference direction: arkey.ch / hestera.ch. Replicate the direction, use NERA content and palette. »
- « If a block looks busy, run /impeccable quieter before adding anything. »
