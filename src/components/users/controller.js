const Users = require('./model')
const bcrypt = require('bcrypt')
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
    let password = await bcrypt.hash(req.body.password, 10)
    const user = new Users({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: password,
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
    let password = await bcrypt.hash(req.body.password, 10)
    const user = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: password,
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