import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'
import {
  accentField,
  imageField,
  keywordsField,
  paragraphsField,
  stringField,
  textField,
  titleField,
} from '../objects/fields'

/**
 * Page d'accueil. Document unique, identifiant `homePage`. Un onglet par section, dans l'ordre de
 * la page. Restent dans le code : les surtitres de section, le médaillon « De A à Z », les
 * numéros, la liste des cantons, et les chiffres (dans « Réglages du site »).
 */
const section = (name: string, title: string, group: string, fields: ReturnType<typeof defineField>[]) =>
  defineField({name, title, type: 'object', group, options: {collapsible: false}, fields})

export const homePage = defineType({
  name: 'homePage',
  title: 'Page d’accueil',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'En-tête', default: true},
    {name: 'prestations', title: 'Prestations'},
    {name: 'renovation', title: 'Rénovation de A à Z'},
    {name: 'clients', title: 'Nos clients'},
    {name: 'approche', title: 'Approche'},
    {name: 'territoire', title: 'Territoire'},
    {name: 'contact', title: 'Contact'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    section('hero', 'En-tête', 'hero', [
      stringField('eyebrow', 'Surtitre', 'Au-dessus du titre, en petites capitales.'),
      defineField({name: 'h1', title: 'Titre de la page', type: 'string', validation: (rule) => rule.required()}),
      accentField('h1'),
      paragraphsField('lead', 'Chapô', 'Un paragraphe par entrée. Sur mobile, seul le premier s’affiche.'),
      imageField('image', 'Photo d’en-tête', 'Plein écran, derrière le titre.'),
    ]),
    section('services', 'Prestations', 'prestations', [
      titleField(),
      accentField(),
      paragraphsField('intro', 'Introduction'),
      defineField({
        name: 'cards',
        title: 'Cartes',
        description: 'Numérotées dans l’ordre, trois par ligne sur ordinateur. Photos en portrait (format 4:5).',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'homeCard',
            title: 'Carte',
            type: 'object',
            fields: [
              defineField({
                name: 'prestation',
                title: 'Page prestation',
                description: 'Cible du lien de la carte.',
                type: 'reference',
                to: [{type: 'prestationPage'}],
                options: {disableNew: true},
                validation: (rule) => rule.required(),
              }),
              titleField(),
              textField('text', 'Texte', undefined, 3),
              stringField('cta', 'Libellé du lien'),
              imageField('image', 'Photo'),
            ],
            preview: {select: {title: 'title', subtitle: 'cta', media: 'image'}},
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
    ]),
    section('renovation', 'Rénovation de A à Z', 'renovation', [
      titleField(),
      accentField(),
      paragraphsField(),
      stringField('cta', 'Libellé du lien', 'Le lien mène à la page « Rénovation énergétique globale ».'),
      imageField('image', 'Photo'),
      stringField('imageAlt', 'Description de la photo', 'Lue par les lecteurs d’écran et par Google.'),
    ]),
    section('audiences', 'Nos clients', 'clients', [
      titleField(),
      defineField({
        name: 'items',
        title: 'Publics',
        description: 'Colonnes numérotées I, II, III…',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'audience',
            title: 'Public',
            type: 'object',
            fields: [titleField(), paragraphsField()],
            preview: {select: {title: 'title'}},
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
    ]),
    section('approach', 'Approche', 'approche', [
      titleField(),
      accentField(),
      paragraphsField(),
      stringField('cta', 'Libellé du lien', 'Le lien mène à la page « Le bureau ».'),
    ]),
    section('territory', 'Territoire', 'territoire', [
      titleField(),
      accentField(),
      textField('text', 'Texte', 'À côté des losanges des cantons.', 3),
    ]),
    section('contact', 'Contact', 'contact', [
      titleField(),
      paragraphsField(),
      stringField('coordinatesTitle', 'Titre des coordonnées'),
      stringField('formTitle', 'Titre du formulaire'),
    ]),
    defineField({name: 'seo', title: 'Référencement (SEO)', type: 'seo', group: 'seo'}),
    keywordsField(),
  ],
  preview: {prepare: () => ({title: 'Page d’accueil', subtitle: '/'})},
})
