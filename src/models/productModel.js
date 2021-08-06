const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please enter product name'],
  },
});
