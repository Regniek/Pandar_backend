const mongoose = require('mongoose')
const { Schema } = mongoose

const Activities = new Schema({
    activity_name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    _id_turistic_site: { type: String, required: true },
},
{
    timestamps: true
})

module.exports = mongoose.model('Activities', Activities)