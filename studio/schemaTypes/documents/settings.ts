import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

/**
 * Réglages du site : document unique (singleton, ID fixe « settings », imposé par la
 * structure du Studio). Coordonnées, réseaux, chiffres clés et SEO par défaut.
 */
export const settings = defineType({
  name: 'settings',
  title: 'Réglages du site',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'coordonnees', title: 'Coordonnées', default: true},
    {name: 'reseaux', title: 'Réseaux sociaux'},
    {name: 'chiffres', title: 'Chiffres clés'},
    {name: 'seo', title: 'SEO par défaut'},
  ],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Raison sociale',
      type: 'string',
      group: 'coordonnees',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Nom affiché',
      description: 'Utilisé dans les signatures d’e-mail et les accroches.',
      type: 'string',
      group: 'coordonnees',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      description: 'Format international, par exemple +41 22 313 73 54.',
      type: 'string',
      group: 'coordonnees',
      validation: (rule) => rule.required().regex(/^\+?[0-9 ]{8,20}$/, {name: 'numéro de téléphone'}),
    }),
    defineField({
      name: 'email',
      title: 'E-mail de contact',
      type: 'string',
      group: 'coordonnees',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'street',
      title: 'Rue et numéro',
      type: 'string',
      group: 'coordonnees',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'zip', title: 'NPA', type: 'string', group: 'coordonnees', validation: (rule) => rule.required()}),
    defineField({
      name: 'city',
      title: 'Localité',
      type: 'string',
      group: 'coordonnees',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'canton', title: 'Canton', type: 'string', group: 'coordonnees'}),
    defineField({name: 'linkedin', title: 'LinkedIn', type: 'url', group: 'reseaux'}),
    defineField({name: 'facebook', title: 'Facebook', type: 'url', group: 'reseaux'}),
    defineField({name: 'instagram', title: 'Instagram', type: 'url', group: 'reseaux'}),
    defineField({name: 'googleBusiness', title: 'Fiche Google', type: 'url', group: 'reseaux'}),
    defineField({
      name: 'stats',
      title: 'NERA en chiffres',
      description: 'Affichés sur l’accueil et sur la page Le bureau. Cinq chiffres au plus.',
      type: 'array',
      group: 'chiffres',
      validation: (rule) => rule.max(5),
      of: [
        defineArrayMember({
          name: 'stat',
          title: 'Chiffre',
          type: 'object',
          fields: [
            defineField({name: 'prefix', title: 'Avant le chiffre', description: 'Par exemple « + ».', type: 'string'}),
            defineField({
              name: 'value',
              title: 'Chiffre',
              type: 'number',
              validation: (rule) => rule.required().integer().min(0),
            }),
            defineField({name: 'suffix', title: 'Après le chiffre', description: 'Par exemple « ans ».', type: 'string'}),
            defineField({name: 'label', title: 'Libellé', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {
            select: {prefix: 'prefix', value: 'value', suffix: 'suffix', label: 'label'},
            prepare: ({prefix, value, suffix, label}) => ({
              title: `${prefix ?? ''}${value ?? ''}${suffix ? ` ${String(suffix).trim()}` : ''}`,
              subtitle: label,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'defaultSeoTitle',
      title: 'Titre par défaut pour Google',
      description: 'Utilisé quand une page n’a pas son propre titre SEO.',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.max(70).warning('Google coupe les titres au-delà d’environ 60 caractères.'),
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Description par défaut pour Google',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(170).warning('Google coupe les descriptions au-delà d’environ 160 caractères.'),
    }),
    defineField({
      name: 'defaultShareImage',
      title: 'Image de partage par défaut',
      description: 'Format conseillé : 1200 × 630.',
      type: 'image',
      group: 'seo',
      options: {hotspot: true},
    }),
  ],
  preview: {prepare: () => ({title: 'Réglages du site'})},
})
