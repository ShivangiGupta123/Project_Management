var CryptoJS = require("crypto-js");
const encrypt_data_crypto = (data) => {
  var crypto_encrypt = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.CRYPTO_SECRET_KEY
  ).toString();
  return crypto_encrypt;
};

module.exports = encrypt_data_crypto;
