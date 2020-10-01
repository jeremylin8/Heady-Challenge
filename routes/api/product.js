const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');
const Category = require('../../models/Category');

// @route   POST api/product
// @desc    Add a product
// @access  Private
router.post('/', async (req, res) => {
  const { name, price, quantity, description, categories } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      quantity,
      description,
      categories,
    });

    const product = await newProduct.save();
    res.status(201).json({ product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/product
// @desc    Update product details
// @access  Private
router.put('/:pId', async (req, res) => {
  const { name, price, quantity, description, categories } = req.body;
  const newProduct = { name, price, quantity, description, categories };

  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.pId },
      { $set: newProduct },
      { new: true }
    );
    if (!product) res.status(400).json({ msg: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
