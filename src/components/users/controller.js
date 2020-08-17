const mongoose = require('mongoose')
const Users = require('./model')
const moment = require('moment')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const { config } = require('../../config/index')
const usersController = {}

usersController.getUsers = async (req, res) => {
  try {
    const users = await Users.find()
    res.json({
      status: 200,
      message: 'Users listed',
      body: users
    })
  } catch (error) {
    next(error)
  }
}

usersController.getOneUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id)
    res.json({
      status: 200,
      message: 'User listed',
      body: user
    })
  } catch (error) {
    next(error)
  }
}


usersController.postUser = async (req, res) => {
  try {
    const user = new Users({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password = bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      country: req.body.country,
      city: req.body.city
    });
    await user.save();
    res.json({
      status: 201,
      message: 'User created',
      body: user
    });
  } catch (error) {
    next(error)
  }
}

usersController.updateUser = async (req, res, next) => {
  try {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city
    }
    await Users.findByIdAndUpdate(req.params.id, { $set: user }, { omitUndefined: true, new: true })
    res.json({
      status: 200,
      message: `User ${req.params.id} updated`,
      body: user
    })
  } catch (error) {
    next(error)
  }
}

usersController.deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id)
    res.json({
      status: 200,
      message: `User ${req.params.id} deleted`
    })
  } catch (error) {
    next(error)
  }
}

// Login
const createToken = (user) => {
  const payload = {
    userId: user._id,
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix()
  }
  return jwt.encode(payload, config.tokenKey)
}

usersController.loginUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email }).exec()
    if(user === undefined){
      res.json({
        error: 'Error, email or password not found'
      })
    } else {
      const equals = await bcrypt.compare(req.body.password, user.password)
      if(!equals){
        res.json({
          error: 'Error, email or password not found'
        })
      } else {
        res.json({
          state: 200,
          done: 'Login correct',
          succesfull: createToken(user)
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

usersController.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.userId)
    res.json({
      state: 200,
      message: 'User with token listed',
      body: user
    })
  } catch (error) {
    next(error)
  }
}




module.exports = usersController