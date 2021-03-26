const crypto = require('crypto');

const hashAlgorithm = 'sha256';
const cipherAlgorithm = 'aes-256-cbc';

const encrypt = async (message, password) => {
  const iv = crypto.randomBytes(16);
  const hashSecret = crypto.randomBytes(16);
  const hash = crypto.createHmac(hashAlgorithm, hashSecret).update(password).digest('hex');
  const cipher = crypto.createCipheriv(cipherAlgorithm, Buffer.from(hash, 'hex'), iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const result = {
    hashSecret: hashSecret.toString('hex'),
    iv: iv.toString('hex'),  
    encryptedMessage: encrypted,
  };

  return JSON.stringify(result);
};


const decrypt = async (encrypted, password) => {
  encrypted = JSON.parse(encrypted);
  const iv = Buffer.from(encrypted.iv, 'hex');
  const hashSecret = Buffer.from(encrypted.hashSecret, 'hex');
  const hash = crypto.createHmac(hashAlgorithm, hashSecret).update(password).digest('hex');
  const decipher = crypto.createDecipheriv(cipherAlgorithm, Buffer.from(hash, 'hex'), iv);
  let decrypted = decipher.update(encrypted.encryptedMessage, 'hex', 'utf8');
  
  try {
    decrypted += decipher.final('utf8');
  } catch (e) {}

  return decrypted;
}


module.exports = {
  encrypt,
  decrypt,
};
