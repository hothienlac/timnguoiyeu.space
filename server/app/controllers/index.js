const registerVerifyEmail = require('./register-verify-email');
const register = require('./register');
const checkPassword = require('./check-password');
const getCrushes = require('./get-crushes');
const newCrush = require('./new-crush');
const removeCrush = require('./remove-crush');
const getMatched = require('./get-matched');


module.exports = {
  registerVerifyEmail,
  register,
  checkPassword,
  getCrushes,
  newCrush,
  removeCrush,
  getMatched,
}
