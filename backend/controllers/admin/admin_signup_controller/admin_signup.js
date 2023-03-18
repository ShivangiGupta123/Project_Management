const admin_schema = require("../../../models/admin/admin_schema");
const sendEmail = require("../../../helpers/send_mail");
const encrypt_data_by_crypto = require("../../../helpers/crypto_encrypt");
const decrypt_data_by_crypto = require("../../../helpers/crypto_decrypt");
const validation = require("./admin_validation");
const jwt = require("jsonwebtoken");

/***
 Signup process 
  1. checking email id is already exist or not 
  2. encrypt password by crypto-js
  3. validating all the information using joi
  4. generating token through jwt
  5. double encrypt by crypto-js
  6. using third party api nodemailer concept send mail as an link

 */

const admin_signup = async (req, res) => {
  const { name, email, password, mobile, company_name, website_url } = req.body;

  try {
    const existing_admin = await admin_schema.findOne({ email: email });
    if (existing_admin)
      return res.status(401).json({ message: "already exist this mail id " });
    var hashed_password = encrypt_data_by_crypto(password);

    const valid = await validation.validateAsync(req.body);
    if (valid) {
      const result = {
        name: name,
        email: email,
        password: hashed_password,
        mobile: mobile,
        company_name: company_name,
        website_url: website_url,
      };

      const token = jwt.sign(result, process.env.SECRET_KEY, {
        expiresIn: "1m",
      });
      var double_encryption_token = encrypt_data_by_crypto(token);
      result.token = double_encryption_token;
      // result.expiredAt = Date.now() + 1000 * 60 * 5;

      const link = `${
        process.env.FRONTEND_BASE_URL
      }/verifiedsignup?token=${encodeURIComponent(double_encryption_token)}`;

      await sendEmail(result.email, "Verifying it's you", link);

      return res.status(200).json({
        message:
          "register successfully check in your mail for accessing the website",
        token: result.token,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid information", error: error });
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * Verifify signup process
 * @param {Object} req
 * @param {Object} res
 * @returns
  1. using decodeURIComponent for removing special character from the token 
  2. decode token through crypto js
  3. again decode token through jwt 
  4. store data in database from create function (create is used to create a new record by providing all required field at one time .)
  5. generate token through jwt 
  6. double encrypt through crypto-js
 */

const verified_signup = async (req, res) => {
  try {
    const token_to_be_verify = decodeURIComponent(req.query.token);

    const double_decrypt_token = decrypt_data_by_crypto(token_to_be_verify);

    const user = jwt.decode(double_decrypt_token);
    console.log("user", user);

    const result = await admin_schema.create({
      ...user,
    });

    const token = jwt.sign({ ...user }, process.env.SECRET_KEY);

    var encrypData = encrypt_data_by_crypto(token);

    // result.expired_at = Date.now() + 1000 * 60 * 5;

    return res.status(201).json({
      success: true,
      message: " you can access dashboard when you click on login button",
      response_body: result,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: err, message: "Something went wrong" });
  }
};

module.exports = { admin_signup, verified_signup };

// const jwt_decode = require('jwt-decode')
// const user = jwt.verify(double_decrypt_token , process.env.SECRET_KEY);

// const admin_schema = require("../../../models/admin/admin_schema");
// const sendEmail = require("../../../helpers/send_mail");
// const validation = require("./admin_validation");
// const jwt = require("jsonwebtoken");
// var CryptoJS = require("crypto-js");
// // const jwt_decode = require('jwt-decode')

// const admin_signup = async (req, res) => {
//   const { name, email, password, mobile, company_name, website_url } = req.body;

//   try {
//     const existing_admin = await admin_schema.findOne({ email: email });
//     if (existing_admin)
//       return res.status(401).json({ message: "already exist this mail id " });

//     var hashed_password = CryptoJS.AES.encrypt(
//       JSON.stringify(password),
//       process.env.CRYPTO_SECRET_KEY
//     ).toString();

//     const valid = await validation.validateAsync(req.body);
//     if (valid) {
//       const result = {
//         name: name,
//         email: email,
//         password: hashed_password,
//         mobile: mobile,
//         company_name: company_name,
//         website_url: website_url,
//       };

//       // console.log("result ", result);
//       const token = jwt.sign(result, process.env.SECRET_KEY);
//       var double_encryption_token = CryptoJS.AES.encrypt(
//         JSON.stringify(token),
//         process.env.CRYPTO_SECRET_KEY
//       ).toString();
//       result.token = double_encryption_token;
//       result.expiredAt = Date.now() + 1000 * 60 * 5;

//       // console.log("result >>>>", result);

//       // console.log("result.email", result.email);
//       const link = `${
//         process.env.FRONTEND_BASE_URL
//       }/verifiedsignup?token=${encodeURIComponent(double_encryption_token)}`;

//       // console.log("hello>>> ####")
//       await sendEmail(result.email, "Verifying it's you", link);
//       // console.log("hello>>>")
//       // console.log("hello>>>")
//       return res
//         .status(200)
//         .json({ message: "verifying  its you ", token: result.token });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Invalid information", error: error });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// /**
//  * Verifify signup process
//  * @param {Object} req
//  * @param {Object} res
//  * @returns
//  */

// const verified_signup = async (req, res) => {
//   try {
//     const token_to_be_verify = decodeURIComponent(req.query.token);

//     const token_bytes = CryptoJS.AES.decrypt(
//       token_to_be_verify.toString(),
//       process.env.CRYPTO_SECRET_KEY
//     );
//     const double_decrypt_token = JSON.parse(
//       token_bytes.toString(CryptoJS.enc.Utf8)
//     );

//     const user = jwt.decode(double_decrypt_token);
//     // const user = jwt.verify(double_decrypt_token , process.env.SECRET_KEY);

//     const result = await admin_schema.create({
//       ...user,
//     });

//     const token = jwt.sign({ ...user }, process.env.SECRET_KEY);

//     var encrypData = CryptoJS.AES.encrypt(
//       JSON.stringify(token),
//       process.env.CRYPTO_SECRET_KEY
//     ).toString();
//     result.token = encrypData;
//     result.expired_at = Date.now() + 1000 * 60 * 5;
//     result.is_logged_in = true;
//     console.log("result ", result);
//     return res.status(201).json({
//       success: true,
//       message: "Login successfully",
//       response_body: result,
//     });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json({ error: err, message: "Something went wrong" });
//   }
// };

// module.exports = { admin_signup, verified_signup };

// const admin_schema = require("../../collections/admin/admin_schema");
// const sendEmail = require("../../utils/send_mail");
// // const bcrypt = require("bcrypt");
// const validation = require("../../middleware/admin_validation");
// const jwt = require("jsonwebtoken");
// var CryptoJS = require("crypto-js");
// // const jwt_decode = require('jwt-decode')

// const admin_signup = async (req, res) => {
//   const { name, email, password, mobile, company_name, website_url } = req.body;
//   // console.log("req.body  = ", req.body);

//   try {
//     const existing_admin = await admin_schema.findOne({ email: email });
//     if (existing_admin)
//       return res.status(401).json({ message: "already exist this mail id " });
//     var hashed_password = CryptoJS.AES.encrypt(
//       JSON.stringify(password),
//       process.env.CRYPTO_SECRET_KEY
//     ).toString();
//     // const hashed_password = await bcrypt.hash(password, 10);
//     const valid = await validation.validateAsync(req.body);
//     if (valid) {
//       const result = {
//         name: name,
//         email: email,
//         password: hashed_password,
//         mobile: mobile,
//         company_name: company_name,
//         website_url: website_url,
//       };

//       // console.log("result ", result);
//       const token = jwt.sign(
//         result,
//         process.env.SECRET_KEY
//       );
//       var double_encryption_token = CryptoJS.AES.encrypt(
//         JSON.stringify(token),
//         process.env.CRYPTO_SECRET_KEY
//       ).toString();
//       result.token = double_encryption_token;
//       result.expiredAt = Date.now() + 1000 * 60 * 5;

//       // console.log("result >>>>", result);

//       // console.log("result.email", result.email);
//       const link = `${process.env.FRONTEND_BASE_URL}/verifiedsignup?token=${encodeURIComponent(double_encryption_token)}`;

//       // console.log("hello>>> ####")
//       await sendEmail(result.email, "Verifying it's you", link);
//       // console.log("hello>>>")
//       // console.log("hello>>>")
//       res
//         .status(200)
//         .json({ message: "verifying  its you ", token: result.token });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Invalid information", error: error });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// /**
//  * Verifify signup process
//  * @param {Object} req
//  * @param {Object} res
//  * @returns
//  */

// const verified_signup = async (req, res) => {

//   try {
//     const token_to_be_verify=decodeURIComponent(req.query.token)

//     // console.log("token_to_be_verify" , token_to_be_verify)
//     const token_bytes = CryptoJS.AES.decrypt(token_to_be_verify.toString(),process.env.CRYPTO_SECRET_KEY);
//     const double_decrypt_token= JSON.parse(token_bytes.toString(CryptoJS.enc.Utf8));
//     // console.log("--------------------------")

//     // console.log("double_decrypt_token" , double_decrypt_token)
//     // console.log("--------------------------")

//     const user = jwt.decode(double_decrypt_token);

//     // console.log(user);

//     const result = await admin_schema.create({
//      ...user
//     });
//   //  console.log("result" , result)

//     const token = jwt.sign(
//       { ...user },
//       process.env.SECRET_KEY
//     );
//     // console.log("token",token)
//     var encrypData = CryptoJS.AES.encrypt(
//       JSON.stringify(token),
//       process.env.CRYPTO_SECRET_KEY
//     ).toString();
//     result.token = encrypData;
//     result.expired_at = Date.now() + 1000 * 60 * 5;
//     result.is_logged_in=true
//     return res
//       .status(201)
//       .json({
//         success: true,
//         message: "Login successfully",
//         response_body: result,
//       });

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: err });
//   }
// };

// module.exports = { admin_signup, verified_signup };
