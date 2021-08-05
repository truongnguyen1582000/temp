const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// DB connect
const connectToDB = require('./config/connectToDB');
connectToDB();

// middleware
const authMiddleware = require('./middlewares/auth');
const User = require('./models/User');

app.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ user });
});

// ROUTE
const userRoute = require('./routes/userRouter');
app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
