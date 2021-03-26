const httpStatus = require('http-status');
const emailService = require('../services/email');
const checkEmailExist = require('../utils/check-email-exist');
const aes = require('../utils/aes');
const jwt = require('../utils/jwt');

const register = async (req, res, next) => {
  try {
    const email = req.body.email;
  
    if (!email) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'email is needed!'});
    }
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email.match(emailPattern)) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'email is invalid!'});
    }
    if (await checkEmailExist(email)) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'email has been registered!'});
    }
  
    const password = req.body.password;
    if (!password) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'password is needed!'});
    }
  
    const verifyPassword = await aes.encrypt(process.env.VERIFY_PASSWORD_IDENTITY, password);
    const token = await jwt.sign({
      email,
      verifyPassword,
    });
    const link = `${process.env.FRONT_END_URL}/register-verify-email?token=${token}`;
    const template = await emailService.loadTemplate('verify-email', {link});
    const sentEmail = await emailService.sendEmail(email, template);
    return res.status(httpStatus.OK).json({message: `Email Sent!`});
  } catch (e) {
    return next(e);
  }
}

module.exports = register;
