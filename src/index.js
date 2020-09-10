const express = require('express')
const { config } = require('./config/index')
/* eslint-disable */
const { mongoose } = require('./lib/mongo')
/* eslint-enable */
const morgan = require('morgan')
const app = express()
//const passport = require('passport')
const cors = require('cors')
//require('./lib/passport')
const path = require('path')
const fs = require('fs')
const CronJob = require('cron').CronJob;

const authRoutes = require('./components/auth/auth')
const usersRoutes = require('./components/users/routes')
const touristicSitesRoutes = require('./components/touristic-sites/routes')
const tripAdvisorRoutes = require('./components/tripadvisor/routes')
const surveysRoutes = require('./components/survey/routes')
const categoriesRoutes = require('./components/categories/routes')

// Body Parser
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))



// Routes
//app.get('/public', express.static(path.join(__dirname, './public/data.csv')))


app.use('/', require('./components/data/routes'))
app.use('/', authRoutes)
app.use('/', usersRoutes)
app.use('/', touristicSitesRoutes)
app.use('/', tripAdvisorRoutes)
app.use('/', surveysRoutes)
app.use('/', categoriesRoutes)
// passport.authenticate('jwt', { session: false }),


// Server
app.listen(config.port, () => {
  console.log(`Server listening at ${config.host}:${config.port}`)
})




// var job = new CronJob('*/10 * * * * *', function() {
//   const turisticSitesData = require('./components/data/index')
//   turisticSitesData.addData()
// }, null, true, 'America/Bogota');
// job.start();