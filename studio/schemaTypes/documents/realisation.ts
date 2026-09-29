import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

/**
 * Une référence (projet réalisé), affichée sur la page « Nos références ».
 * Nommé « realisation » et non « reference » : `reference` est un type réservé de Sanity.
 */

/** Les prestations du site : mêmes intitulés et mêmes adresses que `content/prestations.ts`. */
const prestations = [
  {title: 'Audits énergétiques CECB et CECB Plus', value: 'audit-cecb'},
  {title: 'Modélisation thermique des bâtiments', value: 'modelisation-thermique'},
  {title: 'Études et conception d’installations CVC', value: 'installations-cvc'},
  {title: 'Conception et suivi de rénovations énergétiques', value: 'renovation-energetique'},
  {title: 'Labels et standards de performance', value: 'labels-minergie-hpe-thpe'},
  {title: 'Dépôt d’autorisations de construire', value: 'autorisation-de-construire'},
  {title: 'Montage et gestion des subventions', value: 'subventions'},
]

export const realisation = defineType({
  name: 'realisation',
  title: 'Référence',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
      description: 'Par exemple « Rénovation d’un immeuble de 24 logements ».',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'place',
      title: 'Lieu',
      description: 'Commune, et canton si utile. Par exemple « Carouge (GE) ».',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: 'prestations',
      title: 'Prestations réalisées',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {list: prestations, layout: 'grid'},
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'text',
      title: 'Description',
      description: 'Une ou deux phrases : le contexte et ce que NERA a apporté.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300).warning('Restez court : la carte affiche environ 300 caractères.'),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Description de la photo',
          description: 'Ce que montre la photo, pour Google et les lecteurs d’écran.',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as {asset?: unknown} | undefined
              return !parent?.asset || alt ? true : 'Décrivez la photo en quelques mots.'
            }),
        }),
      ],
    }),
  ],
  orderings: [
    {title: 'Année, récentes d’abord', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]},
    {title: 'Titre', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', place: 'place', year: 'year', media: 'image'},
    prepare: ({title, place, year, media}) => ({
      title,
      subtitle: [place, year].filter(Boolean).join(' · '),
      media,
    }),
  },
})
