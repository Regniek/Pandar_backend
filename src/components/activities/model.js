const mongoose = require('mongoose')
const { Schema } = mongoose

const Activities = new Schema(
  {
    activity_name: { type: String, required: true },
    description: { type: String, required: true },
    min_age: { type: Number, required: true },
    max_age: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Activities', Activities)
