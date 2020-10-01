const { Schema, model, ObjectId } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentId: {
      ref: 'Category',
      type: ObjectId,
    },
    products: {
      ref: 'Product',
      type: ObjectId,
    },
  },
  { collection: 'categories', timestamps: true }
);

module.exports = Category = model('category', CategorySchema);
