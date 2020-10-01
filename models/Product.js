const { Schema, model, ObjectId } = require('mongoose');

const ProductSchema = new Schema(
  {
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
      type: String,
    },
    categories: {
      ref: 'Category',
      type: [ObjectId],
    },
  },
  { collection: 'products', timestamps: true }
);

module.exports = Product = model('product', ProductSchema);
