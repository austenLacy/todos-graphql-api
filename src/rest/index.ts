import express from 'express'

import health from 'rest/health'
import metrics from 'rest/metrics'

const app = express.Router({ mergeParams: true })

app.get('/', (req, res) => {
  res.status(200).send('Todos GraphQL API')
})

const appWrapper = { router: app, root: '' }

const routes = {
  appWrapper,
  health,
  metrics
}

export default routes

