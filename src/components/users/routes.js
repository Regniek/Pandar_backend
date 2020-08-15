const express = require('express')
const router = express.Router()
const users = require('./controller')

router.get('/user', users.getUsers)
router.get('/user/:_id', users.getOneUser)
router.post('/user', users.postUser)
router.patch('/user/:_id', users.updateUser)
router.delete('/user/:_id', users.deleteUser)

module.exports = router