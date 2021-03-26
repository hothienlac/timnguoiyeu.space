const mongoose = require('mongoose');

module.exports.connect = async () => {
  mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      keepAlive: 1,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
    },
    (err) => {
      if (err) console.error(err);
    },
  );
  return mongoose.connection;
};
