const express = require('express')
const router = express.Router()
const dataCsv = require('./index')

router.get('/data', dataCsv.getData)

module.exports = router
