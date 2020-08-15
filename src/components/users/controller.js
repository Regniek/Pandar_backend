const mongoose = require('mongoose')
const Users = require('./model')
const usersController = {}

usersController.getUsers = async (req, res) => {
  try {
    const users = await Users.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

usersController.getOneUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params._id)
    res.json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


usersController.postUser = async (req, res) => {
  try {
    const user = new Users({
      username: req.body.username,
      email: req.body.email
    });
    await user.save();
    res.json({
      status: 201,
      body: user

    });

  } catch (error) {
  }
}

usersController.updateUser = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      email: req.body.email
    }
    await Users.findByIdAndUpdate(req.params._id, {
      $set: user
    },
      {
        new: true
      }
    );
    res.json({
      status: 200,
      body: user
    })
  } catch (error) {
    console.log(error)
  }
}

usersController.deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params._id)
    res.json({
      status: 200,
      body: `Usuario con ${req.params._id} Eliminado`
    })
  } catch (error) {
    console.log(error)
  }
}


module.exports = usersController