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

module.exports.verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};
