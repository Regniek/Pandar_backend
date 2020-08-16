const express = require('express')
const router = express.Router()
const users = require('./controller')

router.get('/user', users.getUsers)
router.get('/user/:id', users.getOneUser)
router.post('/user', users.postUser)
router.patch('/user/:id', users.updateUser)
router.delete('/user/:id', users.deleteUser)

module.exports = router