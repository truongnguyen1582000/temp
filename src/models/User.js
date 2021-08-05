const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide user name'],
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'Please provide email'],
    validate: [validator.isEmail, 'Email is invalid'],
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
