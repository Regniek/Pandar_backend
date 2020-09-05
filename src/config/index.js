require('dotenv').config()

const config = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'http://localhost',
  dbUser: process.env.DB_USER || 'admin_db_bits',
  dbPassword: process.env.DB_PASSWORD || 'Xa6n0NGc2r1lsgVk',
  dbHost: process.env.DB_HOST || 'test-cluster.hj7vc.gcp.mongodb.net',
  dbName: process.env.DB_NAME || 'db_bits',
  jwtToken: process.env.TOKEN_KEY || 'TokenAuth'
}

module.exports = { config }
