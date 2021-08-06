const User = require('../models/userModel');
module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'manager') {
      return res.status(403).json({
        status: 'fail',
        msg: 'Not authorization',
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};
