const httpStatus = require('http-status');
const User = require('../models/user');
const crushService = require('../services/crush');
const relationshipService = require('../services/relationship');

const getMatchedService = require('../services/get-matched');


const removeCrush = async (req, res, next) => {
  try {
    const user = req.user;
    const email = req.body.email;
    const password = req.body.password;
    const crush = await User.findOne({email: req.body.crushEmail}).exec();

    if (!crush) {
      return res.status(httpStatus.NOT_FOUND).json({message: 'Crush Not Found'});
    }
    
    await crushService.removeCrush(email, password, crush.email);
    await relationshipService.unsign(user, crush, password);

    return res.status(httpStatus.OK).json({message: 'Uncrushed'});
  } catch (e) {
    console.log(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
};

module.exports = removeCrush;
