
const httpStatus = require('http-status');
const User = require('./models/user');
const aes = require('./utils/aes');
const getMatchedService = require('./services/get-matched');
const relationshipService = require('./services/relationship');
const crushService = require('./services/crush');

const emailPasswordCheckMiddleware = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'email is needed!'});
    }
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email.match(emailPattern)) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'email is invalid!'});
    }
    const password = req.body.password;
    if (!password) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'password is needed!'});
    }
    const user = await User.findOne({email}).exec();
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'email are not registered!'});
    }
    const decryptedVerifyPassword = await aes.decrypt(user.verifyPassword, password);
    if (process.env.VERIFY_PASSWORD_IDENTITY !== decryptedVerifyPassword){
      return res.status(httpStatus.BAD_REQUEST).json({message: 'password not match!'});
    }
    if (!user.initialized) {
      // INITIALIZE
      const allCrushes = await crushService.getAllCrushes(req.body.email, req.body.password);
      for (const crushEmail of allCrushes) {
        const crush = await User.findOne({email: crushEmail}).exec();
        await relationshipService.sign(user, crush, password);
      }
      const matched = await getMatchedService(user, password);
      if (matched && matched !== '0') {
        const crush = await User.findOne({email: matched}).exec();
        relationshipService.forceMatch(user, crush, password);
      }
    }
    req.user = user;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
};

module.exports = emailPasswordCheckMiddleware;
