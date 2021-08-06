const bcrypt = require('bcrypt');
const JWT = require('../utils/JWT');
const User = require('../models/userModel');
const RefToken = require('../models/refreshTokenModel');
const checkAuthorization = require('../utils/checkAuthorization');
const sendEmail = require('../utils/sendMail');

module.exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
    });

    await RefToken.create({
      userId: newUser.id,
      refToken: JWT.getRefreshToken(newUser.id),
    });

    await sendEmail({
      email: newUser.email,
      subject: 'Your password',
      message: `${req.body.password} is your password`,
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
      msg: err.message,
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
      msg: err.message,
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
      msg: err.message,
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

    if (req.body.password) {
      const user = await User.findById(req.user.id);
      await sendEmail({
        email: user.email,
        subject: 'Your password',
        message: `${req.body.password} is your password`,
      });
    }

    await User.findByIdAndUpdate(
      req.params.userId,
      {
        ...req.body,
      },
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

// module.exports.sendPassword = async (req, res) => {
//   try {
//     const user = await User.findById(userId);

//     res.status(200).json({
//       msg: 'Send mail success',
//     });
//   } catch (err) {
//     res.status(400).json({
//       msg: 'Send mail error',
//       errors: err,
//     });
//   }
// };
