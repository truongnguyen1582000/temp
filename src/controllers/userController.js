const bcrypt = require('bcrypt');
const JWT = require('../utils/JWT');
const User = require('../models/User');
const RefToken = require('../models/RefreshToken');
const checkAuthorization = require('../utils/checkAuthorization');

module.exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
    });

    await RefToken.create({
      userId: newUser.id,
      refToken: JWT.getRefreshToken(newUser.id),
    });

    res.status(200).json({
      status: 'success',
      jwt: JWT.getToken(newUser.id),
      refreshToken: JWT.getRefreshToken(newUser.id),
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        msg: `${Object.keys(err.keyPattern)} already exist`,
      });
    }
    res.status(400).json({
      status: 'fail',
      msg: err,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isCorrectPwd = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !isCorrectPwd) {
      return res
        .status(400)
        .json({ msg: 'Your username or password is incorrect!' });
    }

    await RefToken.create({
      userId: user.id,
      refToken: JWT.getRefreshToken(user.id),
    });

    res.status(200).json({
      status: 'success',
      jwt: JWT.getToken(user.id),
      refreshToken: JWT.getRefreshToken(user.id),
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err,
    });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    // check token exits in store and submited token is valid
    const isValidRefToken = refreshToken
      ? await RefToken.findOne({ refToken: refreshToken })
      : false && JWT.verifyToken(refreshToken, process.env.REF_JWT_SECRET);

    if (!isValidRefToken) {
      return res.status(403).json({
        msg: 'Invalid refresh token',
      });
    }

    res.status(200).json({
      status: 'success',
      jwt: JWT.getToken(isValidRefToken.userId),
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err,
    });
  }
};

module.exports.editUser = async (req, res) => {
  try {
    if (!checkAuthorization(req.user.id, req.params.userId)) {
      return res.status(403).json({
        msg: 'Not authorization',
      });
    }

    await User.findByIdAndUpdate(req.params.userId, {
      ...req.body,
    });
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err,
    });
  }
};
