const mongoose = require('mongoose');

const orderSchema = mongoose.model({});

const Order = mongoose.model('User', orderSchema);
module.exports = Order;
