import express from 'express'

const healthRouter = express.Router()

healthRouter.get('/health', (req, res) => {
  return res.send('OK')
})

healthRouter.get('/healthz', (req, res) => {
  return res.send('OK')
})

export default { router: healthRouter, root: '' }
