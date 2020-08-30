const mongoose = require('mongoose')
const { Schema } = mongoose

const Users = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: {
      type: String,
      required: true,
      useCreateIndex: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Users', Users)
