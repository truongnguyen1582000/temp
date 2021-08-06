const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please enter product name'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
