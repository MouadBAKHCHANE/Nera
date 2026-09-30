import type {StructureResolver} from 'sanity/structure'
import {CaseIcon} from '@sanity/icons/Case'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {LinkIcon} from '@sanity/icons/Link'

/** Menu du Studio : réglages en tête, puis le contenu, puis les outils SEO. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Réglages du site')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings').title('Réglages du site')),
      S.divider(),
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
