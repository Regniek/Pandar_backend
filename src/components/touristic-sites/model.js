const mongoose = require('mongoose')
const { Double } = require('mongodb')
const { Schema } = mongoose

const TouristicSites = new Schema(
  {
    location_name: { type: String, require: false },
    country: { type: String, require: false },
    city: { type: String, require: false },
    latitude: { type: String, require: false },
    length: { type: String, require: false },
    rating: { type: Number, require: false  },
    address: { type: String, require: false },
    average_price: { type: String, require: false },
    phone: { type: String, require: false },
    web: { type: String, require: false },
    image: { type:String, require: false },
    categories: [],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Touristic_Sites', TouristicSites)
