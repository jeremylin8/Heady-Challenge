const express = require('express');
const router = express.Router();

const Category = require('../../models/Category');
const Product = require('../../models/Product');

// @route   POST api/category
// @desc    Add a category
// @access  Private
router.post('/', async (req, res) => {
  try {
    let newCategory = {
      name: req.body.name,
    };
    if (req.body.parentId) {
      newCategory.parentId = req.body.parentId;
    }
    newCategory = new Category(newCategory);
    const category = await newCategory.save();
    res.status(201).json({ category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/category
// @desc    Get all categories with all its child categories mapped to it.
// @access  Public
router.get('/', async (req, res) => {
  function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter(
        (cat) => String(cat.parentId) == String(parentId)
      );
    }
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        children_categories: createCategories(categories, cate._id),
      });
    }
    return categoryList;
  }

  try {
    const categories = await Category.find();
    const categoryList = createCategories(categories);
    res.status(200).json({ categoryList });
    // Category.aggregate([
    //   {
    //     $match: {
    //       parentId: null,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       as: 'child_categories',
    //       foreignField: 'parentId',
    //       from: 'categories',
    //       localField: '_id',
    //     },
    //   },
    // ]).then((category) => {
    //   res.status(200).json({ category });
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/category/:cate_id
// @desc    Get all products by a category
// @access  Public
router.get('/:cate_id', async (req, res) => {
  try {
    const products = await Product.find({
      categories: req.params.cate_id,
    });
    if (!products.length)
      return res.status(400).json({ msg: 'Product not found' });

    res.status(200).json({ products });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
