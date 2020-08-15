require('dotenv').config()


const config = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'http://localhost'

}

module.exports = { config }