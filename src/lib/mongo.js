const mongoose = require('mongoose')
const { config } = require('../config/index')
const e = require('express')

const DB_USER = encodeURIComponent(config.dbUser)
const DB_PASSWORD = encodeURIComponent(config.dbPassword)
const DB_HOST = encodeURIComponent(config.dbHost)
const DB_NAME = encodeURIComponent(config.dbName)

const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL, {
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(console.log('MongoDB Connected'))
.catch(error => console.error('No se conecto a la base de datos' + error))

module.exports = mongoose