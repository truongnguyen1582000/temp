const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// DB connect
const connectToDB = require('./config/connectToDB');
connectToDB();

app.get('/', async (req, res) => {
  res.json('GUDBYE WORLD');
});

// ROUTE
const userRoute = require('./routes/userRouter');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');

app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/product', productRoute);

// handle undefined url
app.all('*', (req, res, next) => {
  res.status(404).json({
    msg: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
