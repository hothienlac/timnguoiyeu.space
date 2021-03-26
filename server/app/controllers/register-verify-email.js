const User = require('../models/user');
const httpStatus = require('http-status');
const aes = require('../utils/aes');
const jwt = require('../utils/jwt');
const crypto = require('crypto');
const checkEmailExist = require('../utils/check-email-exist');


const registerVerifyEmail = async (req, res, next) => {
  try {
    const password = req.body.password;
    if (!password) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'password is needed!'});
    }
    const token = req.body.token;
    if (!token) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'token is needed!'});
    }
    const decoded = await jwt.verify(token);
    if (!decoded || !decoded.email || !decoded.verifyPassword) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'token is invalid or malformed!'});
    }
    const email = decoded.email;
    const verifyPassword = decoded.verifyPassword;
    const decryptedVerifyPassword = await aes.decrypt(decoded.verifyPassword, password);
    if (process.env.VERIFY_PASSWORD_IDENTITY !== decryptedVerifyPassword){
      return res.status(httpStatus.BAD_REQUEST).json({message: 'password not match!'});
    }
    if (await checkEmailExist(decoded.email)) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'Activation Link can only used once!'});
    }


    const diffieHellman = crypto.createDiffieHellman(
        process.env.DIFFIE_HELLMAN_PRIME,
        process.env.DIFFIE_HELLMAN_GENERATOR,
    );
    diffieHellman.generateKeys();
    const diffieHellmanPrivateKey = await aes.encrypt(diffieHellman.getPrivateKey().toString('hex'), password);
    const diffieHellmanPublicKey = diffieHellman.getPublicKey();
    await User.create({
      email,
      matched: '0',
      verifyPassword,
      diffieHellmanPrivateKey,
      diffieHellmanPublicKey: diffieHellmanPublicKey.toString('hex'),
      initialized: true,
    });
    return res.status(httpStatus.CREATED).json({message: 'User is created'});
  } catch (e) {
    console.log(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
}

module.exports = registerVerifyEmail;


