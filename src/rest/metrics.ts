import express from 'express'

const metricsRouter = express.Router()

metricsRouter.get('/metrics', (req, res) => {
  // PROMETHEUS METRICS ENDPOINT...

  return res.status(200).json({})
})

export default { router: metricsRouter, root: '' }
