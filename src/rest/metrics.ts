import express from 'express'

const metricsRouter = express.Router()

metricsRouter.get('/metrics', (req: express.Request, res: express.Response) : express.Response => {
  // PROMETHEUS METRICS ENDPOINT...

  return res.status(200).json({})
})

export default { router: metricsRouter, root: '' }
