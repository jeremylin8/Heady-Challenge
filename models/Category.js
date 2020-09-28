const { Schema, model, ObjectId } = require('mongoose');

const CategorySchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Category = model('category', CategorySchema);
