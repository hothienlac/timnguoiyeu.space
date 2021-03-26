const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

const emailPasswordCheckMiddleware = require('./email-password-check.middleware');

router.post('/register-verify-email', controllers.registerVerifyEmail);
router.post('/register', controllers.register);

router.post('/check-password', emailPasswordCheckMiddleware, controllers.checkPassword);

router.post('/get-crushes', emailPasswordCheckMiddleware, controllers.getCrushes);
router.post('/new-crush', emailPasswordCheckMiddleware, controllers.newCrush);
router.post('/remove-crush', emailPasswordCheckMiddleware, controllers.removeCrush);
router.post('/get-matched', emailPasswordCheckMiddleware, controllers.getMatched);


module.exports = router;
