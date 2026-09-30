import {defineArrayMember, defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons/Wrench'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'

/**
 * Les six pages prestation. Documents à identifiant fixe (`prestation-<slug>`, voir
 * `structure.ts`), ni créables ni supprimables : leurs adresses, le menu, les icônes et la liste
 * du formulaire de devis sont liés au code. Texte du client, repris mot pour mot à la migration
 * (`scripts/import-prestations.ts`).
 */

export const prestationPage = defineType({
  name: 'prestationPage',
  title: 'Page prestation',
  type: 'document',
  icon: WrenchIcon,
  groups: [
    {name: 'entete', title: 'En-tête', default: true},
    {name: 'contenu', title: 'Contenu'},
    {name: 'faq', title: 'FAQ et fin de page'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'route',
      title: 'Adresse sur le site',
      type: 'string',
      readOnly: true,
      group: 'entete',
    }),
    defineField({
      name: 'shortTitle',
      title: 'Titre court',
      description:
        'Fil d’Ariane et données pour Google. Le menu du site et la liste du formulaire de devis gardent leur libellé.',
      type: 'string',
      group: 'entete',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'h1',
      title: 'Titre de la page',
      type: 'string',
      group: 'entete',
      validation: (rule) => rule.required(),
    }),
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
      description: 'Ouvre le formulaire de devis, prestation déjà choisie.',
      type: 'string',
      group: 'entete',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo d’en-tête',
      description:
        'Décorative, derrière le titre. Choisir le point focal (bouton de recadrage) pour garder l’essentiel visible sur mobile.',
      type: 'image',
      options: {hotspot: true},
      group: 'entete',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'acronyms',
      title: 'Sigles',
      description: 'Affichés sous le sommaire, dans la colonne de gauche. Laisser vide s’il n’y en a pas.',
      type: 'array',
      group: 'entete',
      of: [
        defineArrayMember({
          name: 'acronym',
          title: 'Sigle',
          type: 'object',
          fields: [
            defineField({name: 'short', title: 'Sigle', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'long', title: 'Signification', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'short', subtitle: 'long'}},
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Chaque section apparaît dans le sommaire « Sur cette page ».',
      type: 'array',
      group: 'contenu',
      of: [
        defineArrayMember({
          name: 'prestationSection',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titre', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'anchor',
              title: 'Ancre',
              description: 'Identifiant du lien du sommaire, par exemple « quest-ce-que-le-cecb ».',
              type: 'string',
              validation: (rule) =>
                rule.required().regex(/^[a-z0-9-]+$/, {name: 'minuscules, chiffres et tirets'}),
            }),
            defineField({name: 'body', title: 'Texte', type: 'prestationBody'}),
          ],
          preview: {select: {title: 'title', subtitle: 'anchor'}},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'faq',
      title: 'Questions fréquentes',
      description: 'Aussi transmises à Google, qui peut les afficher dans ses résultats.',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          name: 'faqItem',
          title: 'Question',
          type: 'object',
          icon: HelpCircleIcon,
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'answer', title: 'Réponse', type: 'text', rows: 4, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),
    defineField({
      name: 'band',
      title: 'Photo à côté de la FAQ',
      description: 'Décorative. Une photo différente par page.',
      type: 'image',
      options: {hotspot: true},
      group: 'faq',
    }),
    defineField({
      name: 'closing',
      title: 'Titre de fin de page',
      description: 'Au-dessus du bouton « Demander un devis gratuit », sur fond marine.',
      type: 'string',
      group: 'faq',
      validation: (rule) => rule.required(),
    }),
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
  preview: {select: {title: 'shortTitle', subtitle: 'route', media: 'image'}},
})
