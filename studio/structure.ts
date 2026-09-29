import type {StructureResolver} from 'sanity/structure'
import {CaseIcon} from '@sanity/icons/Case'
import {CogIcon} from '@sanity/icons/Cog'
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
      S.divider(),
      S.documentTypeListItem('redirect').title('Redirections').icon(LinkIcon),
    ])
