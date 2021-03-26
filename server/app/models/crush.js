const mongoose = require('mongoose');

const crushSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      index: false,
    },
  },
  {
    timestamps: false,
  },
);

const Crush = mongoose.model('crush', crushSchema);

module.exports = Crush;

