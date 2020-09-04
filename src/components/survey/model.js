const mongoose = require('mongoose')
const Users = require('../users/model')
const { Schema } = mongoose

const Survey = new Schema(
    {
      user: {type:Schema.ObjectId, ref:'Users'},
      country: { type: String, require: false },
      budget: { type: Number, require: false },
      categories: { type: [String] , require: false },
    },
    {
      timestamps: true,
    }
  )
  
  module.exports = mongoose.model('Survey', Survey)