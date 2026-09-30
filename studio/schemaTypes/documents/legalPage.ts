import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {DocumentSheetIcon} from '@sanity/icons/DocumentSheet'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {LockIcon} from '@sanity/icons/Lock'

/**
 * Pages légales : mentions légales, confidentialité, cookies.
 * Trois documents à identifiant fixe (voir `structure.ts`), ni créables ni supprimables :
 * leurs adresses sur le site sont fixes. Texte du client, repris mot pour mot à la migration.
 */

/** Lien : adresse interne (/…), e-mail (mailto:), téléphone (tel:) ou site externe (https://). */
const link = defineArrayMember({
  name: 'link',
  title: 'Lien',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      title: 'Adresse',
      description: '/cookies, mailto:info@nera-ing.ch, tel:+41223137354 ou https://…',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .custom((value?: string) =>
            !value || /^(\/|#|mailto:|tel:|https:\/\/)/.test(value)
              ? true
              : 'Doit commencer par /, #, mailto:, tel: ou https://',
          ),
    }),
  ],
})

/** Texte riche d'une section : paragraphes, blocs d'adresse, listes, liens, gras. */
const body = defineField({
  name: 'body',
  title: 'Texte',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraphe', value: 'normal'},
        // Une entrée par ligne : Maj + Entrée pour passer à la ligne suivante.
        {title: 'Bloc d’adresse (lignes)', value: 'lines'},
      ],
      lists: [{title: 'Liste à puces', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
        ],
        annotations: [link],
      },
    }),
    defineArrayMember({
      name: 'legalTable',
      title: 'Tableau',
      type: 'object',
      icon: DocumentSheetIcon,
      fields: [
        defineField({
          name: 'head',
          title: 'En-têtes des colonnes',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'rows',
          title: 'Lignes',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'row',
              title: 'Ligne',
              type: 'object',
              fields: [
                defineField({
                  name: 'cells',
                  title: 'Cellules',
                  description: 'Une cellule par colonne, dans l’ordre des en-têtes.',
                  type: 'array',
                  of: [defineArrayMember({type: 'string'})],
                }),
              ],
              preview: {
                select: {cells: 'cells'},
                prepare: ({cells}) => ({title: (cells ?? []).join(' · ')}),
              },
            }),
          ],
        }),
      ],
      preview: {
        select: {head: 'head', rows: 'rows'},
        prepare: ({head, rows}) => ({
          title: `Tableau : ${(head ?? []).join(', ')}`,
          subtitle: `${(rows ?? []).length} ligne(s)`,
        }),
      },
    }),
    defineArrayMember({
      name: 'legalNote',
      title: 'Encadré',
      type: 'object',
      icon: InfoOutlineIcon,
      fields: [
        defineField({name: 'title', title: 'Titre', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'body',
          title: 'Texte',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{title: 'Paragraphe', value: 'normal'}],
              lists: [],
              marks: {decorators: [{title: 'Gras', value: 'strong'}], annotations: [link]},
            }),
          ],
        }),
      ],
      preview: {select: {title: 'title'}, prepare: ({title}) => ({title: `Encadré : ${title ?? ''}`})},
    }),
    defineArrayMember({
      name: 'consentReminder',
      title: 'Rappel du choix de cookies',
      description: 'Affiche le choix actuel du visiteur et le bouton « Gérer mes cookies ».',
      type: 'object',
      icon: LockIcon,
      fields: [
        defineField({
          name: 'label',
          title: 'Emplacement',
          type: 'string',
          readOnly: true,
          initialValue: 'Rappel du choix de cookies et bouton « Gérer mes cookies »',
        }),
      ],
      preview: {prepare: () => ({title: 'Rappel du choix de cookies et bouton « Gérer mes cookies »'})},
    }),
  ],
})

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Page légale',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'contenu', title: 'Contenu', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'route',
      title: 'Adresse sur le site',
      type: 'string',
      readOnly: true,
      group: 'contenu',
    }),
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      group: 'contenu',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Titre court',
      description: 'Fil d’Ariane et onglet du navigateur.',
      type: 'string',
      group: 'contenu',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'lead', title: 'Sous-titre', type: 'text', rows: 2, group: 'contenu'}),
    defineField({
      name: 'updatedAt',
      title: 'Date de dernière mise à jour',
      description: 'À changer à chaque modification du texte : elle s’affiche en tête de page.',
      type: 'date',
      group: 'contenu',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Chaque section apparaît dans le sommaire en tête de page.',
      type: 'array',
      group: 'contenu',
      of: [
        defineArrayMember({
          name: 'legalSection',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Numéro',
              description: 'Laisser vide pour une section non numérotée.',
              type: 'number',
              validation: (rule) => rule.integer().min(1),
            }),
            defineField({name: 'title', title: 'Titre', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'anchor',
              title: 'Ancre',
              description: 'Identifiant du lien du sommaire, par exemple « hebergement ». Minuscules et tirets.',
              type: 'string',
              validation: (rule) =>
                rule.required().regex(/^[a-z0-9-]+$/, {name: 'minuscules, chiffres et tirets'}),
            }),
            body,
          ],
          preview: {
            select: {number: 'number', title: 'title'},
            prepare: ({number, title}) => ({title: number ? `${number}. ${title}` : title}),
          },
        }),
      ],
    }),
    defineField({name: 'seo', title: 'Référencement (SEO)', type: 'seo', group: 'seo'}),
  ],
  preview: {select: {title: 'shortTitle', subtitle: 'route'}},
})
