const express = require('express')
const passport = require('passport')
const router = express.Router()
const { config } = require('../config/index')
const jwt = require('passport-jwt')

router.post('/login', (req, res) => {
  console.log(req.body);
  // passport.authenticate('local', { session: false }, (err, user, info) => {
  //   if (err || !user) {
  //     return res.status(500).json({
  //       message: 'algo salio mal',
  //       user: user
  //     })
  //   }
  //   req.login(user, { session: false }, (err) => {
  //     if (err) {
  //       console.log(err)
  //       res.send(err)
  //     }
  //     //const token = jwt.sing(user, config.jwtToken)
  //     return res.json({ res, token })
  //   })
  // })(req, res)
})

module.exports = router