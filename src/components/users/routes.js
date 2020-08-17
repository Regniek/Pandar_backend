const express = require('express')
const router = express.Router()
const users = require('./controller')
const middleware = require('./middleware')

router.get('/user', users.getUsers)
router.get('/user/:id', users.getOneUser)
router.patch('/user/:id', users.updateUser)
router.delete('/user/:id', users.deleteUser)

// Login
router.post('/authRegister', users.postUser)
router.post('/authLogin', users.loginUser)
router.use(middleware.checkToken)
router.get('/mainUser', users.getUserById)


module.exports = router