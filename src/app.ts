import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import uuid from 'uuid'

import config from './config'
import rest from './rest'
import graphQLSchema from './graphql/schema'
import graphQLResolvers from './graphql/resolvers'
import GraphQLBasicLogger from './graphql/utils/logger'

const app = express()

const IS_DEV = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'

/* ******* START MIDDLEWARE ******* */

app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// adds a request ID to all requests to match up with any logs
app.use((req: any, res: express.Response, next: express.NextFunction) : void => {
  // eslint-disable-next-line no-param-reassign
  req.requestId = uuid()
  return next()
})

// associate request ID with morgan logger
morgan.token('requestId', req => req.requestId)

const morganLoggerFormat: string = '[:requestId] [:date[web]] ":method :url" :status :response-time'
const skipLogs = (req: express.Request, res: express.Response) : boolean => {
  // don't skip anything in debug or trace logging mode
  if (config.LOG_LEVEL && (config.LOG_LEVEL.toLowerCase() === 'trace' || config.LOG_LEVEL.toLowerCase() === 'debug')) {
    return false
  }

  // only log errors otherwise
  return res.statusCode < 400
}
app.use(morgan(morganLoggerFormat, { skip: skipLogs, stream: process.stdout }))

/* ******* END MIDDLWARE ******* */

/**
 * Set up GraphQL apollo server with schema, context middleware, and resolvers
 */
const graphQLServer: ApolloServer = new ApolloServer({
  typeDefs: graphQLSchema,
  resolvers: graphQLResolvers,
  // Adds any context information for every
  // api call. You could add a reference to a
  // database here, logging singleton, etc.
  context: ({ req }) => {
    return {
      req
      // db,
      // logger,
      // etc...
    }
  },
  formatError: (err) : Error => {
    console.log(err)
    return err
  },
  extensions: [() => new GraphQLBasicLogger({ isDev: IS_DEV })],
  debug: IS_DEV,
  playground: IS_DEV
})
graphQLServer.applyMiddleware({ app })

// add REST Routes (/health, /metrics, etc)
Object.values(rest).forEach((restRoute) : void => {
  app.use(restRoute.root, restRoute.router)
})

app.use((err, req, res, next) : void => { // eslint-disable-line no-unused-vars
  if (IS_DEV) {
    console.log(err, req.requestId)
    return
  }

  if (!res.headersSent) {
    return res.status(500).send({ message: err.message })
  }
})

export default app
