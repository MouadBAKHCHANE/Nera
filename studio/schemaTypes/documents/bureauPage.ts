import {defineArrayMember, defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'
import {
  accentField,
  imageField,
  keywordsField,
  listField,
  paragraphsField,
  stringField,
  textField,
  titleField,
} from '../objects/fields'

/**
 * Page « Le bureau » (/bureau). Document unique, identifiant `bureauPage`. Un onglet par section,
 * dans l'ordre de la page. Restent dans le code : les surtitres, les ancres, les icônes, les
 * logos des qualifications ; les coordonnées du fondateur et les chiffres sont dans les réglages.
 */
const section = (name: string, title: string, group: string, fields: ReturnType<typeof defineField>[]) =>
  defineField({name, title, type: 'object', group, options: {collapsible: false}, fields})

export const bureauPage = defineType({
  name: 'bureauPage',
  title: 'Page Le bureau',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'entete', title: 'En-tête', default: true},
    {name: 'principe', title: 'Principe'},
    {name: 'mission', title: 'Mission'},
    {name: 'fondateur', title: 'Fondateur'},
    {name: 'equipe', title: 'Équipe'},
    {name: 'procedures', title: 'Procédures'},
    {name: 'qualifications', title: 'Qualifications'},
    {name: 'valeurs', title: 'Valeurs'},
    {name: 'fin', title: 'Cantons et fin'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'h1', title: 'Titre de la page', type: 'string', group: 'entete', validation: (rule) => rule.required()}),
    defineField({...paragraphsField('lead', 'Chapô'), group: 'entete'}),
    defineField({...imageField('image', 'Photo d’en-tête', 'Décorative, derrière le titre.'), group: 'entete'}),
    section('equilibre', 'L’équilibre comme principe', 'principe', [
      titleField(),
      textField('intro', 'Introduction'),
      listField('items', 'Cartes', 'Une icône par carte, dans l’ordre : six icônes prévues.'),
    ]),
    section('mission', 'Notre mission', 'mission', [
      titleField(),
      textField('intro', 'Introduction'),
      stringField('lead', 'Phrase avant la liste'),
      listField('items', 'Liste'),
    ]),
    section('fondateur', 'Fondateur', 'fondateur', [
      titleField(),
      defineField({
        name: 'card',
        title: 'Cartouche',
        description: 'Quatre lignes à gauche du texte. Téléphone et e-mail : dans « Réglages du site ».',
        type: 'object',
        options: {collapsible: false},
        fields: [
          stringField('name', 'Nom'),
          stringField('role', 'Fonction'),
          stringField('titles', 'Titres'),
          stringField('field', 'Domaine'),
        ],
      }),
      paragraphsField(),
      stringField('phoneLabel', 'Libellé du téléphone'),
      stringField('emailLabel', 'Libellé de l’e-mail'),
    ]),
    section('equipe', 'Équipe', 'equipe', [
      titleField(),
      textField('intro', 'Introduction'),
      stringField('lead', 'Phrase avant la liste'),
      listField('items', 'Liste'),
      textField('outro', 'Conclusion', 'Encadrée d’un filet vert.'),
      imageField('image', 'Photo'),
      stringField('imageAlt', 'Description de la photo', 'Lue par les lecteurs d’écran et par Google.'),
    ]),
    section('procedures', 'Procédures', 'procedures', [
      titleField(),
      textField('intro', 'Introduction', undefined, 3),
      listField('items', 'Liste'),
    ]),
    section('qualifications', 'Qualifications', 'qualifications', [
      titleField(),
      defineField({
        name: 'items',
        title: 'Qualifications',
        description: 'Une icône par qualification, dans l’ordre : CECB, Minergie, REG B, MPQ.',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'qualification',
            title: 'Qualification',
            type: 'object',
            fields: [titleField(), paragraphsField('text', 'Texte')],
            preview: {select: {title: 'title'}},
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
    ]),
    section('valeurs', 'Valeurs', 'valeurs', [
      titleField(),
      defineField({
        name: 'items',
        title: 'Valeurs',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'valeur',
            title: 'Valeur',
            type: 'object',
            fields: [titleField(), stringField('text', 'Texte')],
            preview: {select: {title: 'title', subtitle: 'text'}},
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
    ]),
    section('cantons', 'Cantons', 'fin', [titleField(), accentField(), textField('text', 'Texte', undefined, 3)]),
    section('closing', 'Fin de page', 'fin', [
      titleField(),
      stringField('secondary', 'Libellé du bouton', 'Ouvre le formulaire de devis.'),
    ]),
    defineField({name: 'seo', title: 'Référencement (SEO)', type: 'seo', group: 'seo'}),
    keywordsField(),
  ],
  preview: {prepare: () => ({title: 'Le bureau', subtitle: '/bureau'})},
})
