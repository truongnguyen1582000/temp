const mongoose = require('mongoose');

const refreshToken = mongoose.Schema({
  refToken: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
});

const RefreshToken = mongoose.model('RefreshTokens', refreshToken);

module.exports = RefreshToken;
