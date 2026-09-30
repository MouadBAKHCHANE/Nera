import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {keywordsField, paragraphsField, stringField, textField} from '../objects/fields'

/**
 * Page « Contact » (/contact). Document unique, identifiant `contactPage`. Les coordonnées
 * elles-mêmes (adresse, téléphone, e-mail, réseaux) sont dans « Réglages du site ».
 */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Page Contact',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'contenu', title: 'Contenu', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'h1', title: 'Titre de la page', type: 'string', group: 'contenu', validation: (rule) => rule.required()}),
    defineField({...paragraphsField('lead', 'Chapô'), group: 'contenu'}),
    defineField({...stringField('coordinatesTitle', 'Titre des coordonnées'), group: 'contenu'}),
    defineField({...stringField('formTitle', 'Titre du formulaire'), group: 'contenu'}),
    defineField({...textField('formText', 'Texte sous le titre du formulaire'), group: 'contenu'}),
    defineField({name: 'seo', title: 'Référencement (SEO)', type: 'seo', group: 'seo'}),
    keywordsField(),
  ],
  preview: {prepare: () => ({title: 'Contact', subtitle: '/contact'})},
})
