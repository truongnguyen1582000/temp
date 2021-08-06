const Product = require('../models/productModel');

module.exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
    });

    res.status(200).json({
      status: 'success',
      data: { newProduct },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

module.exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'success',
      data: { products },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json({
      status: 'success',
      data: { product },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      req.params.productId,
      { ...req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};
