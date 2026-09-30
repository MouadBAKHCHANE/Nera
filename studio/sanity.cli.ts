import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId} from './env'

export default defineCliConfig({
  api: {projectId, dataset},
  // Studio hébergé par Sanity, séparé du site : ses mises à jour ne passent pas par Vercel.
  // Studio hébergé à https://nera-ing.sanity.studio, déployé le 30 septembre 2026.
  deployment: {appId: 'cew5at82rqad5aywf34w7oge', autoUpdates: true},
})
