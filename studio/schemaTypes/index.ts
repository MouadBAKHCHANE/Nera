import {realisation} from './documents/realisation'
import {redirect} from './documents/redirect'
import {settings} from './documents/settings'
import {seo} from './objects/seo'

export const schemaTypes = [settings, realisation, redirect, seo]

/** Types à document unique : exclus du menu « Créer » et des actions Dupliquer et Supprimer. */
export const singletonTypes = new Set(['settings'])
