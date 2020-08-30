const express = require('express')
const { config } = require('./config/index')
const { mongoose } = require('./lib/mongo')
const morgan = require('morgan')
const app = express()
const passport = require('passport')
require('./lib/passport')

// Body Parser
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.use('/', require('./routes/auth'))
app.use(
  '/',
  require('./components/users/routes')
)
app.use(
  '/',
  passport.authenticate('jwt', { session: false }),
  require('./components/touristic-sites/routes')
)
app.use(
  '/',
  require('./components/tripadvisor/routes')
)
app.use(
  '/',
  passport.authenticate('jwt', { session: false }),
  require('./components/categories/routes')
)

// Server
const server = app.listen(config.port, () => {
  console.log(`Server listening at ${config.host}:${config.port}`)
})
