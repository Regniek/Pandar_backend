const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt')
const { config } = require('../config/index')
const Users = require('../components/users/model')

/* POST login. */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, config.jwtToken);
      return res.json({ user, token });
    });
  })(req, res);
});

router.post('/register', async (req, res) => {
  try {
    let password = await bcrypt.hash(req.body.password, 10)
    const user = new Users({
      email: req.body.email,
      password: password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      country: req.body.country,
      city: req.body.city,
    });
    await user.save();
    res.json({
      status: 201,
      message: 'registered user',
      body: user
    });
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;
