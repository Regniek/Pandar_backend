const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const { Schema } = mongoose

const TouristicSites = new Schema(
  {
    location_name: { type: String, require: false },
    type_location: { type: String, require: false },
    country: { type: String, require: false },
    city: { type: String, require: false },
    latitude: { type: String, require: false },
    length: { type: String, require: false },
    address: { type: String, require: false },
    phone: { type: String, require: false },
    average_price: { type: String, require: false },
    web: { type: String, require: false },
    description: { type: String, require: false },
    category: [String],
    activities: [String],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Touristic_Sites', TouristicSites)
