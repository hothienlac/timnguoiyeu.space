const Crush = require('../models/crush');
const aes = require('../utils/aes');
const crypto = require('crypto');

const hashAlgorithm = 'sha256';

const getHasher = async (password) => {
  return async (x) => {
    return crypto.createHmac(
        hashAlgorithm,
        password,
    ).update(x).digest('hex');
  }
};


const getAllCrushes = async (email, password) => {
  const hasher = await getHasher(password);
  const crushList = [];
  let currentHash = await hasher(email);
  while (1) {
    const crush = await Crush.findOne({ hash: currentHash }).exec();
    if (!crush) break;
    const crushEmail = await aes.decrypt(crush.email, password);
    crushList.push(crushEmail);
    currentHash = await hasher(currentHash);
  };

  return crushList;
};


const addNewCrush = async (email, password, crushEmail) => {
  const hasher = await getHasher(password);
  let currentHash = await hasher(email);
  while (1) {
    const crush = await Crush.findOne({ hash: currentHash }).exec();
    if (!crush) break;
    if (await aes.decrypt(crush.email, password) === crushEmail) return;
    currentHash = await hasher(currentHash);
  };
  await Crush.create({hash: currentHash, email: await aes.encrypt(crushEmail, password)});
  return;
};


const removeCrush = async (email, password, crushEmail) => {
  const hasher = await getHasher(password);
  let currentHash = await hasher(email);
  while (1) {
    let currentCrush = await Crush.findOne({ hash: currentHash }).exec();
    if (!currentCrush) return;
    const currentCrushEmail = await aes.decrypt(currentCrush.email, password);
    if (currentCrushEmail === crushEmail) {
      let nextHash = await hasher(currentHash);
      while (1) {
        const nextCrush = await Crush.findOne({ hash: nextHash }).exec();
        if (!nextCrush) {
          await currentCrush.remove();
          return;
        }
        currentCrush.email = nextCrush.email;
        await currentCrush.save();
        currentCrush = nextCrush;
        nextHash = await hasher(nextHash);
      }
    }
    currentHash = await hasher(currentHash);
  };
};

module.exports = {
  getAllCrushes,
  addNewCrush,
  removeCrush,
}
