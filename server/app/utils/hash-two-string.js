const crypto = require('crypto');

const hashTwoString = async (a, b) => {
  const hashA = parseInt(crypto.createHash('md5').update(a).digest('hex'), 16);
  const hashB = parseInt(crypto.createHash('md5').update(b).digest('hex'), 16);
  const combined = hashA*hashB + (hashA+hashB);
  return combined.toString();
}

module.exports = hashTwoString;
