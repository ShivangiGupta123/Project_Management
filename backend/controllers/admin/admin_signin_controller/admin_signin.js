const admin_schema = require("../../../models/admin/admin_schema");
const decrypt_data_by_crypto = require("../../../helpers/crypto_decrypt");
const encrypt_data_by_crypto = require("../../../helpers/crypto_encrypt");
const sendEmail = require("../../../helpers/send_mail");
const jwt = require("jsonwebtoken");

/**
 1. check user exist or not if not it means user is not registered 
 2. if user exist then  decrypt password 
 3. check password is matched or not 
 4. generate token using jwt
 5  double encryption for token 
 6. create link for sending mail through nodemailer concept 
 7. then login 
 */
const admin_signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing_admin = await admin_schema.findOne({ email: email });
    if (!existing_admin) {
      return res.status(400).json({ message: "Not registered" });
    }
    const decrypt_password = decrypt_data_by_crypto(existing_admin.password);
    console.log("decrypt_password", decrypt_password);
    if (password === decrypt_password) {
      console.log("matched", password === decrypt_password);
      const token = jwt.sign(
        { email: existing_admin.email, password: existing_admin.password },
        process.env.SECRET_KEY,
        {
          expiresIn: "1m",
        }
      );
      const double_encryption_token = encrypt_data_by_crypto(token);
      const link = `${
        process.env.FRONTEND_BASE_URL
      }/verifiedsignin?token=${encodeURIComponent(double_encryption_token)}`;
      await sendEmail(existing_admin.email, "verifying it's you", link);
      return res.status(200).json({
        message:
          "login successfully check in your mail for accessing the website",
        output: existing_admin,
      });
    } else {
      return res.status(400).json({ message: "password is not matched" });
    }
  } catch (err) {
    console.log(err);
  }
};

const verified_signin = async (req, res) => {
  try {
    const verify_the_token = decodeURIComponent(req.query.token);

    const decrypt_token_by_crypto = decrypt_data_by_crypto(verify_the_token);
    console.log("decrypt_token_by_crypto ", decrypt_token_by_crypto);
    const decrypt_token_by_jwt = jwt.decode(decrypt_token_by_crypto);
    console.log("decrypt_token_by_jwt", decrypt_token_by_jwt);
    return res.status(200).json({
      message: "you can access dashboard when you click on login button",
      data: decrypt_token_by_jwt,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};
module.exports = { admin_signin, verified_signin };
