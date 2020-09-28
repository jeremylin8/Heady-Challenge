const { Schema, model, ObjectId } = require('mongoose');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: Number,
    required: true,
  },
  categories: {
    ref: 'Category',
    type: ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = model('product', ProductSchema);
