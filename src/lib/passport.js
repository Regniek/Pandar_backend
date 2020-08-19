const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/usuarios');


const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('../config')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  async function (username, password, cb) {



    return Usuarios.findOne({

      username: username

    }).then(user => {
      if (user) {

        bcrypt.compare(password, user.password).then(result => {
          if (result) {
            return cb(null, user.toJSON(), { message: 'Logged In Successfully' });
          } else
            return cb(null, false, { message: 'Incorrect email or password.' });
        });
      } else {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

    }).catch(err => cb(err));
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtToken
},
  function (jwtPayload, cb) {
    return Usuarios.findOne({
      _id: jwtPayload._id
    }).then(user => {
      return cb(null, user);
    })
      .catch(err => {
        return cb(err);
      });
  }
));
module.export = passport;
