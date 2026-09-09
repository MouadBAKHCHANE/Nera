# Sources client extraites

Textes fournis par NERA, extraits une fois des documents `../../../Assets/`.
**Travailler à partir de ces fichiers, pas des .docx/.pdf** : la ré-extraction est
coûteuse et les dossiers `Documents légaux` portent des accents décomposés qui
cassent `cd` sous bash (utiliser un glob : `Assets/Documents*/`).

| Fichier | Source | Contenu |
|---|---|---|
| `textes-client.md` | `Textes site NERA.docx` | Copie éditoriale des 11 pages |
| `legal-mentions-legales.md` | `Documents légaux/Mentions légales_NERA.pdf` | |
| `legal-confidentialite.md` | `Documents légaux/Politique de confidnetialité_NERA.pdf` | (typo dans le nom source) |
| `legal-cookies.md` | `Documents légaux/Politique cookies_NERA.pdf` | |

Les libellés courts déjà intégrés (bandeau cookies, mentions sous formulaires)
vivent dans `content/legal.ts` — ne pas les reformuler.

## Index de `textes-client.md`

Chaque page commence par `Page <nom>` puis `Données SEO` (expression principale,
expressions secondaires, Titre SEO, Méta-description), puis H1/H2/H3 et CTA.

| Ligne | Page | Route |
|---|---|---|
| 22 | Accueil | `/` |
| 92 | Nos prestations | `/prestations` |
| 176 | CECB et CECB Plus | `/prestations/audit-cecb` |
| 282 | Physique du bâtiment et labels énergétiques | `/prestations/modelisation-thermique` |
| 372 | Ingénierie CVC et énergies renouvelables | `/prestations/installations-cvc` |
| 445 | Autorisations de construire | `/prestations/autorisation-de-construire` |
| 522 | Subventions | `/prestations/subventions` |
| 599 | Rénovation énergétique globale | `/prestations/renovation-energetique` |
| 686 | Nos références | `/references` |
| 694 | À propos | `/bureau` |
| 781 | Contact | `/contact` |

Lire une page seule : `sed -n '176,281p' content/source/textes-client.md`.
Ne jamais charger le fichier entier.

## Maillage interne

Source : `Assets/Maillage interne/Suggestion maillage interne.docx`.

| Depuis | Vers |
|---|---|
| Accueil | les 6 prestations + À propos + Contact |
| Nos prestations | les 6 pages prestation |
| CECB | Subventions, Rénovation, Physique du bâtiment |
| Physique du bâtiment | Autorisations, CVC, Rénovation |
| CVC | Physique du bâtiment, Autorisations, Subventions, Rénovation |
| Autorisations | Physique du bâtiment, CVC, Subventions |
| Subventions | CECB, Rénovation, Autorisations |
| Rénovation | les 5 autres prestations |
| À propos | Prestations, Contact |
| Références | la prestation correspondante |

## Identité légale

IDE **CHE-336.972.907** · RC **CH-660.8.224.025-9** · Registre du commerce de Genève
Siège : Vernier (GE) · Gérant : Akram Draidj, signature individuelle
Hébergeur déclaré : Vercel Inc. · Documents datés du 3 septembre 2026
