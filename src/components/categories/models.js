const mongoose = require('mongoose')
const { Schema } = mongoose

const Categories = new Schema(
  {
    categorie_name: { type: String, required: true },
    parent_categorie: {
      type: Schema.ObjectId,
      ref: 'Categories',
    },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Categories', Categories)
