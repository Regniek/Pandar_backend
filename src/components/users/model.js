const mongoose = require('mongoose')
const { Schema } = mongoose

const Users = new Schema({
    username: { type: String, required: false },
    password: { type: String, required: false },
    email: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false }
})

module.exports = mongoose.model('Users', Users)