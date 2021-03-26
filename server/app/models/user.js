const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    matched: {
      type: String,
      default: '0',
      required: true,
      index: false,
    },
    verifyPassword: {
      type: String,
      required: true,
      index: false,
    },
    diffieHellmanPrivateKey: {
      type: String,
      required: true,
      index: false,
    },
    diffieHellmanPublicKey: {
      type: String,
      required: true,
      index: false,
    },
    initialized : {
      type: Boolean,
      required: true,
      index: true,
    },
  },
  {
    timestamps: false,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
