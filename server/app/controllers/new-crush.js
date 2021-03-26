const httpStatus = require('http-status');
const aes = require('../utils/aes');
const crypto = require('crypto');
const User = require('../models/user');
const crushService = require('../services/crush');
const relationshipService = require('../services/relationship');


const newCrush = async (req, res, next) => {
  try {
    const user = req.user;
    const email = req.body.email;
    const password = req.body.password;
    const crushEmail = req.body.crushEmail;

    if (crushEmail === email) {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'YOU CANNOT CRUSH YOURSELF!'});
    }
    const crush = await User.findOne({email: crushEmail}).exec();
    if (!crush) {
      return res.status(httpStatus.NOT_FOUND).json({message: 'Crush Not Found'});
    }
    if (crush.matched !== '0') {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'Crush are Already IN RELATIONSHIP'});
    }
    if (user.matched !== '0') {
      return res.status(httpStatus.BAD_REQUEST).json({message: 'You are Already IN RELATIONSHIP'});
    }

    await crushService.addNewCrush(email, password, crushEmail);
    await relationshipService.sign(user, crush, password);

    return res.status(httpStatus.OK).json({message: 'New crush added'});
  } catch (e) {
    console.log(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
}

module.exports = newCrush;
