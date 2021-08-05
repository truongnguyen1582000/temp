const jwt = require('jsonwebtoken');

module.exports.getToken = (userId) => {
  const user = {
    id: userId,
  };
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  return token;
};

module.exports.getRefreshToken = (userId) => {
  const user = {
    id: userId,
  };
  const token = jwt.sign({ user }, process.env.REF_JWT_SECRET, {
    expiresIn: '48h',
  });

  return token;
};

module.exports.verifyToken = (jwt, secretKey) => {};
