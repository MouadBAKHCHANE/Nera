import {defineField, defineType} from 'sanity'
import {BarChartIcon} from '@sanity/icons/BarChart'

/**
 * Marketing & Analytics : identifiants des outils de mesure, document unique.
 *
 * Seuls les outils cités par la politique de cookies y figurent : Google Tag Manager, Google
 * Analytics 4, Google Ads et le Meta Pixel. Aucun champ de script libre, volontairement :
 * n'importe quel accès au Studio pourrait sinon injecter du code dans le site. Le site charge
 * chaque outil lui-même, et seulement après le consentement correspondant (« Mesure
 * d'audience » ou « Publicité »). Un champ vide : l'outil n'est pas chargé.
 *
 * Google Tag Manager fait exception à l'absence de script libre : le conteneur peut charger
 * n'importe quelle balise. Son contenu relève de qui administre le compte GTM, pas du Studio.
 */

const pattern = (re: RegExp, message: string) => (value?: string) =>
  !value || re.test(value.trim()) ? true : message

export const marketingSettings = defineType({
  name: 'marketingSettings',
  title: 'Marketing & Analytics',
  type: 'document',
  icon: BarChartIcon,
  groups: [
    {name: 'balises', title: 'Tag Manager', default: true},
    {name: 'audience', title: 'Mesure d’audience'},
    {name: 'publicite', title: 'Publicité'},
    {name: 'verifications', title: 'Vérifications'},
  ],
  fields: [
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager : ID du conteneur',
      description:
        'Commence par « GTM- ». Chargé seulement si le visiteur accepte « Mesure d’audience » ou « Publicité ». Si Google Analytics, Google Ads ou le Meta Pixel sont installés dans GTM, laisser leurs champs vides dans cette page : sinon, tout serait compté deux fois.',
      type: 'string',
      group: 'balises',
      validation: (rule) => [
        rule.custom(pattern(/^GTM-[A-Z0-9]{4,12}$/, 'Format attendu : GTM-XXXXXXX')),
        rule
          .custom((value, {document}) =>
            value && (document?.googleAnalyticsId || document?.googleAdsId || document?.metaPixelId)
              ? 'Tag Manager et un autre outil sont remplis : vérifier que cet outil n’est pas aussi installé dans GTM (double comptage).'
              : true,
          )
          .warning(),
      ],
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics 4 : ID de mesure',
      description:
        'Commence par « G- ». Dans Google Analytics : Administration > Flux de données > le flux du site. Chargé seulement si le visiteur accepte « Mesure d’audience ».',
      type: 'string',
      group: 'audience',
      validation: (rule) => rule.custom(pattern(/^G-[A-Z0-9]{4,20}$/, 'Format attendu : G-XXXXXXXXXX')),
    }),
    defineField({
      name: 'googleAdsId',
      title: 'Google Ads : ID de conversion',
      description:
        'Commence par « AW- ». Chargé seulement si le visiteur accepte « Publicité ». À laisser vide si NERA ne fait pas de campagnes Google Ads.',
      type: 'string',
      group: 'publicite',
      validation: (rule) => rule.custom(pattern(/^AW-\d{6,15}$/, 'Format attendu : AW-123456789')),
    }),
    defineField({
      name: 'googleAdsQuoteLabel',
      title: 'Google Ads : libellé de conversion « Demande de devis »',
      description: 'La partie après la barre oblique dans « AW-123456789/AbC-dEfGhIj ».',
      type: 'string',
      group: 'publicite',
      hidden: ({document}) => !document?.googleAdsId,
      validation: (rule) => rule.custom(pattern(/^[A-Za-z0-9_-]{4,40}$/, 'Lettres, chiffres, tirets')),
    }),
    defineField({
      name: 'googleAdsContactLabel',
      title: 'Google Ads : libellé de conversion « Message de contact »',
      type: 'string',
      group: 'publicite',
      hidden: ({document}) => !document?.googleAdsId,
      validation: (rule) => rule.custom(pattern(/^[A-Za-z0-9_-]{4,40}$/, 'Lettres, chiffres, tirets')),
    }),
    defineField({
      name: 'metaPixelId',
      title: 'Meta Pixel : ID',
      description:
        'Une suite de chiffres, dans le Gestionnaire d’événements de Meta. Chargé seulement si le visiteur accepte « Publicité ». À laisser vide si NERA ne fait pas de campagnes Facebook ou Instagram.',
      type: 'string',
      group: 'publicite',
      validation: (rule) => rule.custom(pattern(/^\d{8,20}$/, 'Chiffres uniquement')),
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Search Console : code de vérification',
      description:
        'Méthode « Balise HTML » de la Search Console. Collez la balise entière ou seulement la valeur de content="…" : le site garde la valeur.',
      type: 'string',
      group: 'verifications',
    }),
    defineField({
      name: 'metaDomainVerification',
      title: 'Meta : vérification du domaine',
      description: 'Balise « facebook-domain-verification » du Business Manager : balise entière ou seulement sa valeur.',
      type: 'string',
      group: 'verifications',
    }),
  ],
  preview: {prepare: () => ({title: 'Marketing & Analytics'})},
})
