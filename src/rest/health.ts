import express from 'express'

const healthRouter = express.Router()

healthRouter.get('/health', (req: express.Request, res: express.Response) : express.Response => {
  return res.send('OK')
})

healthRouter.get('/healthz', (req: express.Request, res: express.Response) : express.Response => {
  return res.send('OK')
})

export default { router: healthRouter, root: '' }
