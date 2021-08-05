const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL.replace('<password>', process.env.DB_PWD),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDB;
