const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    validate: [validator.isEmail, 'Email is invalid'],
  },
  username: {
    type: String,
    required: [true, 'Please provide user name'],
  },

  password: {
    type: String,
    required: true,
    minLength: [6, 'Password must be at least 6 characters'],
  },
  roll: {
    type: String,
    enum: ['manager', 'employee'],
    default: 'employee',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
