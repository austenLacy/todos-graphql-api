import app from './app'
import config from './config'

// load in local .env file if running in a non-production ENV
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('dotenv').config({ path: `${__dirname}/.env` })
}

app.listen(config.HTTP_PORT, () : void => {
  console.log(`Listening on port ${config.HTTP_PORT}`)
})
