const nodemailer = require("nodemailer");
const Jwt = require("jsonwebtoken");
const mailTemplate = require("./mailTemplet");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.EMAIL_REFRESH_TOKEN;
const userEmail = process.env.NODEMAILER_EMAIL;

const OAuth2_client = new OAuth2(clientId, clientSecret);
OAuth2_client.setCredentials({ refresh_token: refreshToken });
const accessToken = OAuth2_client.getAccessToken();

/**
 * send mail function for all
 */
async function sendMailFunction(mailOptions) {
  var success = false;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: userEmail,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });
  await transporter
    .sendMail(mailOptions)
    .then((info) => {
      success = true;
    })
    .catch((error) => {
      console.log("errror:", error);
      success = false;
    });
  return success;
}

/**
 * send mail for signup otp verification
 */
async function sendSignupOtpMail({ targetEmail }) {
  try {
    const otp = Math.floor(Math.random() * 1000000 + 1);
    let signupTemplate = mailTemplate.signupMailTemplate(otp);
    var mailOptions = {
      from: userEmail,
      to: targetEmail,
      subject: signupTemplate.subject,
      text: signupTemplate.text,
      html: signupTemplate.html,
    };
    return { success: await sendMailFunction(mailOptions), otp: otp };
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * send verification mail
 */
async function sendSignupMail({ targetEmail, userId }) {
  try {
    const token = Jwt.sign({ user_id: userId }, process.env.JWT_SECURE_KEY, {
      expiresIn: "1h",
    });
    let signupTemplate = mailTemplate.signupMailTemplate(targetEmail, token);
    var mailOptions = {
      from: userEmail,
      to: targetEmail,
      subject: signupTemplate.subject,
      text: signupTemplate.text,
      html: signupTemplate.html,
    };
    return { success: await sendMailFunction(mailOptions) };
  } catch (error) {
    console.log("error:", error);
    return { success: false };
  }
}

module.exports = {
  sendSignupOtpMail,
  sendSignupMail,
};
