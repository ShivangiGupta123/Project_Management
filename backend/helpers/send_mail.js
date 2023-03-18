var nodemailer = require("nodemailer");
/**
 * 
 * @param {*} email 
 * @param {*} subject 
 * @param {*} text 
 */
const sendEmail = (email, subject, text) => {
  return new Promise((resolve,reject)=> {
    //creating SMTP server for connection
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      // port 465 and 587 are both valid ports for a mail submission agent (MSA)
      port: 465,
      secure: true,

      auth: {
        user: process.env.EMAIL_IDENTITY,
        pass: process.env.PASSWORD_IDENTITY,
        // user: "gshivangi106@gmail.com",
        // pass: 'qzuwhqsfswgowvda',
      },
    });

    // fixed for mailoption which is always there
    var mailOptions = {
      from: process.env.EMAIL_IDENTITY,
      to: email,
      subject: subject,
      text: text,
    };
    //send mail through sendMail method
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error)
      } else {
        console.log("Email sent successfully " + info.response);
        resolve(info.response)
      }
    });
  })
};

module.exports = sendEmail;