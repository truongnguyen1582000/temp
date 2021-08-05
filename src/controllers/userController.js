const User = require('../models/User');
const bcrypt = require('bcrypt');
const JWT = require('../utils/JWT');

module.exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
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
        msg: 'User name already exist',
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
    const refreshToken = req.body;
    if (refreshToken && refreshToken in tokenList) {
    }
  } catch (err) {}
};
