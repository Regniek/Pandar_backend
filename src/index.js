const express = require('express')
const { config } = require('./config/index')
/* eslint-disable */
const { mongoose } = require('./lib/mongo')
/* eslint-enable */
const morgan = require('morgan')
const app = express()
const passport = require('passport')
require('./lib/passport')

const authRoutes = require('./components/auth/auth')
const usersRoutes = require('./components/users/routes')
const touristicSitesRoutes = require('./components/touristic-sites/routes')
const tripAdvisorRoutes = require('./components/tripadvisor/routes')
const surveysRoutes = require('./components/survey/routes')
const categoriesRoutes = require('./components/categories/routes')

// Body Parser
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.use('/', authRoutes)
app.use('/', usersRoutes)
app.use('/', touristicSitesRoutes)
app.use('/', tripAdvisorRoutes)
app.use('/', surveysRoutes)
app.use('/', passport.authenticate('jwt', { session: false }), categoriesRoutes)

// Server
app.listen(config.port, () => {
  console.log(`Server listening at ${config.host}:${config.port}`)
})
