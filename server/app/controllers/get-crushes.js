
const httpStatus = require('http-status');
const crushService = require('../services/crush');

const getCrush = async (req, res, next) => {
  try {
    const allCrushes = await crushService.getAllCrushes(req.body.email, req.body.password);
    if (allCrushes.length === 0) {
      return res.status(httpStatus.OK).json({ message: 'You have no crush', crush: [] });
    }
    return res.status(httpStatus.OK).json({ message: 'Crush list loaded', crush: allCrushes });
  } catch (e) {
    console.log(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
};

module.exports = getCrush;
