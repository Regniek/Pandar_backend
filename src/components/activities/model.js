const mongoose = require('mongoose')
const { ObjectId } = require('bson')
const { Schema } = mongoose

const Activities = new Schema({
    activity_name: { type: String, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false },
    id_turistic_site: { type: String, required: false },
    city: { type: String, required: true }
})

module.exports = mongoose.model('Activities', Activities)