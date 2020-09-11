require('dotenv').config()

const config = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'http://localhost',
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  jwtToken: process.env.TOKEN_KEY,
  tripAdvisorHost: process.env.TRIP_ADVISOR_HOST,
  tripAdvisorKey: process.env.TRIP_ADVISOR_KEY
}

module.exports = { config }
