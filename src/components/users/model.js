const mongoose = require('mongoose')
const { Schema } = mongoose

const Users = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true }
},
{
    timestamps: true
})

module.exports = mongoose.model('Users', Users)