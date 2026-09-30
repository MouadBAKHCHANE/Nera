import type {StructureResolver} from 'sanity/structure'
import {BarChartIcon} from '@sanity/icons/BarChart'
import {CaseIcon} from '@sanity/icons/Case'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {HomeIcon} from '@sanity/icons/Home'
import {LinkIcon} from '@sanity/icons/Link'
import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {UsersIcon} from '@sanity/icons/Users'
import {WrenchIcon} from '@sanity/icons/Wrench'

/** Les six pages prestation : identifiant `prestation-<slug>`, adresse `/prestations/<slug>`. */
const PRESTATIONS = [
  ['audit-cecb', 'CECB et CECB Plus'],
  ['modelisation-thermique', 'Physique du bâtiment et labels'],
  ['installations-cvc', 'Ingénierie CVC'],
  ['autorisation-de-construire', 'Autorisations de construire'],
  ['subventions', 'Subventions'],
  ['renovation-energetique', 'Rénovation énergétique globale'],
] as const

/** Menu du Studio : réglages en tête, puis le contenu, puis les outils SEO. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Réglages du site')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings').title('Réglages du site')),
      S.listItem()
        .title('Marketing & Analytics')
        .icon(BarChartIcon)
        .child(
          S.document().schemaType('marketingSettings').documentId('marketingSettings').title('Marketing & Analytics'),
        ),
      S.divider(),
      // Pages uniques, dans l'ordre du menu du site.
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items(
              (
                [
                  ['homePage', 'Accueil', HomeIcon],
                  ['bureauPage', 'Le bureau', UsersIcon],
                  ['contactPage', 'Contact', EnvelopeIcon],
                ] as const
              ).map(([id, title, icon]) =>
                S.listItem()
                  .id(id)
                  .title(title)
                  .icon(icon)
                  .child(S.document().schemaType(id).documentId(id).title(title)),
              ),
            ),
        ),
      // Index et six pages à identifiant fixe : l'ordre est celui du menu du site.
      S.listItem()
        .title('Prestations')
        .icon(WrenchIcon)
        .child(
          S.list()
            .title('Prestations')
            .items([
              S.listItem()
                .id('prestationsPage')
                .title('Page Nos prestations')
                .icon(ThLargeIcon)
                .child(S.document().schemaType('prestationsPage').documentId('prestationsPage').title('Nos prestations')),
              S.divider(),
              ...PRESTATIONS.map(([slug, title]) =>
                S.listItem()
                  .id(`prestation-${slug}`)
                  .title(title)
                  .icon(WrenchIcon)
                  .child(S.document().schemaType('prestationPage').documentId(`prestation-${slug}`).title(title)),
              ),
            ]),
        ),
      S.documentTypeListItem('realisation').title('Références').icon(CaseIcon),
      // Trois documents à identifiant fixe, comme les réglages : une entrée chacun.
      S.listItem()
        .title('Pages légales')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Pages légales')
            .items(
              [
                ['legal-mentions-legales', 'Mentions légales'],
                ['legal-confidentialite', 'Politique de confidentialité'],
                ['legal-cookies', 'Politique relative aux cookies'],
              ].map(([id, title]) =>
                S.listItem()
                  .id(id)
                  .title(title)
                  .icon(DocumentTextIcon)
                  .child(S.document().schemaType('legalPage').documentId(id).title(title)),
              ),
            ),
        ),
      S.divider(),
      S.documentTypeListItem('redirect').title('Redirections').icon(LinkIcon),
    ])
