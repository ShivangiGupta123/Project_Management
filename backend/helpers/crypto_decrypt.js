var CryptoJS = require("crypto-js");

const decrypt_data_crypto = (data) => {
  const crypto_decrypt_bytes = CryptoJS.AES.decrypt(
    data.toString(),
    process.env.CRYPTO_SECRET_KEY
  );
  const crypto_decrypt_data = JSON.parse(
    crypto_decrypt_bytes.toString(CryptoJS.enc.Utf8)
  );
  return crypto_decrypt_data;
};
module.exports = decrypt_data_crypto;
