import express from 'express'

import health from './health'
import metrics from './metrics'

const app = express.Router({ mergeParams: true })

app.get('/', (req: express.Request, res: express.Response) : express.Response => {
  return res.status(200).send('Todos GraphQL API')
})

const appWrapper = { router: app, root: '' }

const routes = {
  appWrapper,
  health,
  metrics
}

export default routes

