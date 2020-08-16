const mongoose = require('mongoose')
const { Schema } = mongoose

const TouristicSites = new Schema({
    site_name: { type: String, require: false },
    location: { type: String, require: false },
    phone: { type: String, require: false },
    address: { type: String, require: false },
    country: { type: String, require: false },
    city: { type: String, require: false },
    average_price: { type: String, require: false },
    category: { type: String, require: false },
    rate: { type: String, require: false },
    description: { type: String, require: false },
    type: { type: String, require: false }
},
{
    timestamps: true
})

module.exports = mongoose.model('Touristic_Sites', TouristicSites)