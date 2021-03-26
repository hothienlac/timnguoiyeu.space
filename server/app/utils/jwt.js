const jwt = require('jsonwebtoken');


const sign = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_secret, {
    expiresIn: `${process.env.JWT_expire}m`,
  });
  return token;
};


const verify = (token) => new Promise(
    (resolve, reject) => {
      jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    },
);


module.exports = {
  sign,
  verify,
};
