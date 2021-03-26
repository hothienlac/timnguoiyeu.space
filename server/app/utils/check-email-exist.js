const User = require('../models/user');

const checkEmailExist = async (email) => {
  const user = await User.findOne({email}).exec();
  return !!user;
}

module.exports = checkEmailExist;
