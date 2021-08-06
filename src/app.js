const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// DB connect
const connectToDB = require('./config/connectToDB');
connectToDB();

// middleware / test
const authMiddleware = require('./middlewares/auth');
const User = require('./models/userModel');

app.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ user });
});

// ROUTE
const userRoute = require('./routes/userRouter');
const orderRoute = require('./routes/orderRoute');
app.use('/user', userRoute);
app.use('/order', orderRoute);

// handle undefined url
app.all('*', (req, res, next) => {
  res.status(404).json({
    msg: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
