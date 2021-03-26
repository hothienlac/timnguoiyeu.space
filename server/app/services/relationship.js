
const crypto = require('crypto');
const Relationship = require('../models/relationship');
const hashTwoString = require('../utils/hash-two-string');
const aes = require('../utils/aes');

const hashAlgorithm = 'sha256';


const hasher = (secret) => (message) => crypto.createHmac(
    hashAlgorithm,
    secret,
).update(message).digest('hex');


const getRelationship = async (user, crush, password) => {
  const diffieHellman = crypto.createDiffieHellman(
      process.env.DIFFIE_HELLMAN_PRIME,
      process.env.DIFFIE_HELLMAN_GENERATOR,
  );
  diffieHellman.setPrivateKey(Buffer.from(await aes.decrypt(user.diffieHellmanPrivateKey, password), 'hex'));
  const diffieHellmanKey = diffieHellman.computeSecret(Buffer.from(crush.diffieHellmanPublicKey, 'hex'));

  const hashedDiffieHellmanKey = hasher(process.env.RELATIONSHIP_IDENTITY_HASH_SECRET)(diffieHellmanKey)
  const relationshipHash = await hashTwoString(user.email, crush.email);
  
  const dfHasher = hasher(hashedDiffieHellmanKey)
  const relationshipID = dfHasher(relationshipHash);
  const hashedUserEmail = dfHasher(user.email);
  const hashedCrushEmail = dfHasher(crush.email);
  const hashedRelationshipId = dfHasher(relationshipID);

  return {
    hashedUserEmail,
    hashedCrushEmail,
    hashedRelationshipId,
    relationshipID,
    diffieHellmanKey,
  };
};


const sign = async (user, crush, password) => {
  const {
    hashedUserEmail,
    hashedCrushEmail,
    hashedRelationshipId,
    relationshipID,
    diffieHellmanKey,
  } = await getRelationship(user, crush, password);

  const relationship = await Relationship.findOne({relationshipID}).exec();

  if (!relationship) {
    await Relationship.create({
      relationshipID,
      signer: hashedUserEmail,
    });
    return;
  }

  if (relationship.signer === hashedUserEmail) {
    return;
  }

  if (relationship.signer === hashedRelationshipId) {
    return;
  }

  if (relationship.signer === hashedCrushEmail) {
    relationship.signer = hashedRelationshipId;
    user.matched = await aes.encrypt(crush.email, diffieHellmanKey);
    crush.matched = await aes.encrypt(user.email, diffieHellmanKey);
    await relationship.save();
    await user.save();
    await crush.save();
    return;
  }

  relationship.signer = hashedUserEmail;
  await relationship.save();
  return;
};


const unsign = async (user, crush, password) => {
  const {
    hashedUserEmail,
    hashedCrushEmail,
    hashedRelationshipId,
    relationshipID,
  } = await getRelationship(user, crush, password);

  const relationship = await Relationship.findOne({relationshipID}).exec();

  if (!relationship) {
    return;
  }

  if (relationship.signer === hashedUserEmail) {
    await relationship.remove();
    return;
  }

  if (relationship.signer === hashedRelationshipId) {
    relationship.signer = hashedCrushEmail;
    user.matched = '0';
    crush.matched = '0';
    await relationship.save();
    await user.save();
    await crush.save();
    return;
  }
};


const forceMatch = async (user, crush, password) => {
  const {
    hashedRelationshipId,
    relationshipID,
  } = await getRelationship(user, crush, password);

  const relationship = await Relationship.findOne({relationshipID}).exec();

  if (!relationship) {
    await Relationship.create({
      relationshipID,
      signer: hashedRelationshipId,
    });
    return;
  }

  relationship.signer = hashedRelationshipId;
  await relationship.save();
  return;

};


module.exports = {
  getRelationship,
  sign,
  unsign,
  forceMatch,
}
