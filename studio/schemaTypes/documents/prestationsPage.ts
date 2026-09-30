import {defineArrayMember, defineField, defineType} from 'sanity'
import {ThLargeIcon} from '@sanity/icons/ThLarge'

/**
 * Page « Nos prestations » (/prestations). Document unique, identifiant `prestationsPage`.
 * Chaque bloc renvoie vers une page prestation : son lien, sa photo, son icône et son
 * illustration viennent de cette page.
 */
export const prestationsPage = defineType({
  name: 'prestationsPage',
  title: 'Page Nos prestations',
  type: 'document',
  icon: ThLargeIcon,
  groups: [
    {name: 'entete', title: 'En-tête', default: true},
    {name: 'contenu', title: 'Prestations'},
    {name: 'fin', title: 'Fin de page'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'h1', title: 'Titre de la page', type: 'string', group: 'entete', validation: (rule) => rule.required()}),
    defineField({
      name: 'lead',
      title: 'Chapô',
      description: 'Texte sous le titre, un paragraphe par entrée.',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
      group: 'entete',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'heroCta',
      title: 'Bouton de l’en-tête',
      description: 'Ouvre le formulaire de devis.',
      type: 'string',
      group: 'entete',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo d’en-tête',
      description: 'Décorative, derrière le titre. Choisir le point focal pour le mobile.',
      type: 'image',
      options: {hotspot: true},
      group: 'entete',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'entries',
      title: 'Blocs des prestations',
      description: 'Un bloc par prestation, dans l’ordre d’affichage. La photo du bloc est celle de la page prestation.',
      type: 'array',
      group: 'contenu',
      of: [
        defineArrayMember({
          name: 'prestationEntry',
          title: 'Prestation',
          type: 'object',
          fields: [
            defineField({
              name: 'prestation',
              title: 'Page prestation',
              description: 'Cible du lien « Découvrir… ».',
              type: 'reference',
              to: [{type: 'prestationPage'}],
              options: {disableNew: true},
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', title: 'Titre', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'subtitle', title: 'Sous-titre', type: 'string'}),
            defineField({name: 'body', title: 'Texte', type: 'prestationBody'}),
            defineField({name: 'cta', title: 'Libellé du lien', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'subtitle', media: 'prestation.image'}},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'outro',
      title: 'Sections en cartes',
      description: 'Sous les prestations : un titre et des cartes, la carte « mise en avant » sur fond marine.',
      type: 'array',
      group: 'fin',
      of: [
        defineArrayMember({
          name: 'outroSection',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titre', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'anchor',
              title: 'Ancre',
              type: 'string',
              validation: (rule) =>
                rule.required().regex(/^[a-z0-9-]+$/, {name: 'minuscules, chiffres et tirets'}),
            }),
            defineField({
              name: 'cards',
              title: 'Cartes',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'outroCard',
                  title: 'Carte',
                  type: 'object',
                  fields: [
                    defineField({name: 'title', title: 'Titre', type: 'string', validation: (rule) => rule.required()}),
                    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3, validation: (rule) => rule.required()}),
                    defineField({
                      name: 'highlight',
                      title: 'Mise en avant',
                      description: 'Carte sur fond marine.',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {select: {title: 'title', subtitle: 'text'}},
                }),
              ],
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({
      name: 'closingTitle',
      title: 'Titre de fin de page',
      description: 'Sur fond marine, au-dessus du bouton « Demander un devis gratuit ».',
      type: 'string',
      group: 'fin',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'closingText', title: 'Texte de fin de page', type: 'text', rows: 2, group: 'fin'}),
    defineField({name: 'seo', title: 'Référencement (SEO)', type: 'seo', group: 'seo'}),
    defineField({
      name: 'keywords',
      title: 'Expressions visées',
      description: 'Repère de rédaction : l’expression principale en tête. Google ne s’en sert pas pour le classement.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      group: 'seo',
    }),
  ],
  preview: {prepare: () => ({title: 'Nos prestations', subtitle: '/prestations'})},
})
