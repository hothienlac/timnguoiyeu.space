const httpStatus = require('http-status');


const checkPassword = async (req, res, next) => {
  return res.status(httpStatus.OK).json({message: 'Signed In!'});  
};

module.exports = checkPassword;
