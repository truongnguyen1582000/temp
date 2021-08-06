module.export = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.role === 'manager';
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};
