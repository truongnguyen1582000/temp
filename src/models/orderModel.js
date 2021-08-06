const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please enter customer name'],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'Please enter phone number'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      validate: [validator.isEmail, 'Email is invalid'],
    },
    products: [
      {
        productName: {
          type: String,
          required: [true, 'Please enter product name'],
        },
        price: {
          type: Number,
          default: 0,
          required: [true, 'Please enter product price'],
        },
        amount: {
          type: Number,
          default: 0,
          required: [true, 'Please enter number of product'],
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'new',
      emun: ['new', 'completed'],
    },
  },
  { timestamps: true }
);

orderSchema.pre('save', function (next) {
  this.totalPrice = this.products.reduce(
    (a, b) => (a += b.price * b.amount),
    0
  );
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
