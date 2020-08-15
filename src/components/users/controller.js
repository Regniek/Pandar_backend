const mongoose = require('mongoose')
const Users = require('./model')
const usersController = {}

usersController.getUsers = (req, res) => {
    try {
        const users = Users.find()
        res.json(users)
        console.log(users)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = usersController