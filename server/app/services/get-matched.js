const aes = require('../utils/aes');
const crypto = require('crypto');
const User = require('../models/user');
const Relationship = require('../models/relationship');
const crushService = require('./crush');
const relationshipService = require('./relationship');

const getMatched = async (user, password) => {
  try {
    if (user.matched === '0') {
      return '0';
    }

    const diffieHellman = crypto.createDiffieHellman(
        process.env.DIFFIE_HELLMAN_PRIME,
        process.env.DIFFIE_HELLMAN_GENERATOR,
    );
    diffieHellman.setPrivateKey(Buffer.from(await aes.decrypt(user.diffieHellmanPrivateKey, password), 'hex'));

    const crushList = await crushService.getAllCrushes(user.email, password);
    for (const crushEmail of crushList) {
      const crush = await User.findOne({email: crushEmail}).exec();
      const {
        hashedUserEmail,
        hashedCrushEmail,
        hashedRelationshipId,
        relationshipID,
        diffieHellmanKey,
      } = await relationshipService.getRelationship(user, crush, password);
      if (await aes.decrypt(user.matched, diffieHellmanKey) === crush.email) {
        return crush.email
      }
    }
    return user.matched;
  } catch (e) {
    throw e;
  }
};

module.exports = getMatched;
