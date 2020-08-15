const express = require('express')
const router = express.Router()
const users = require('./controller')

router.get('/user', users.getUsers)

module.exports = router