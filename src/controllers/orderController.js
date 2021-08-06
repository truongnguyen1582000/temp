const Order = require('../models/orderModel');

module.exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(200).json({
      status: 'success',
      newOrder,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

module.exports.getOrder = async (req, res) => {
  try {
    //search
    const queryObj = { ...req.query };
    const excludedFields = ['sort', 'limit', 'page'];
    excludedFields.forEach((el) => delete queryObj[el]);
    let query = Order.find(queryObj);

    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy).sort('-createdAt');
    }

    // pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // execute query
    const orders = await query;

    res.status(200).json({
      status: 'success',
      numberOfOrder: orders.length,
      orders,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (
      !checkAuthorization(req.user.id, order.user) ||
      !isManager(order.user)
    ) {
      return res.status(403).json({
        msg: 'Not authorization',
      });
    }

    res.json('ok');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};