const httpStatus = require('http-status');

const getMatchedService = require('../services/get-matched');

const getMatched = async (req, res, next) => {
  try {
    const user = req.user;
    const email = req.body.email;
    const password = req.body.password;

    const matched = await getMatchedService(user, password);
    return res.status(httpStatus.OK).json({matched});
  } catch (e) {
    console.log(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
};

module.exports = getMatched;
