const Users = require("../../model/users.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const mailService = require("../../service/nodemailer");

const config = require("../../config/config");
const Jwt = require("jsonwebtoken");
const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY;

/**
 * get version
 */
async function getVersion(req, res) {
  try {
    return res.send({ success: true, version: config.version });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * signup
 */
async function signup(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }

    // check mail and username exist
    const { firstname, lastname, username, email, password } = req.body;
    if (await Users.findOne({ email })) {
      return RESPONSE.error(res, "Email is already exist.", 403);
    }
    if (await Users.findOne({ username })) {
      return RESPONSE.error(res, "Username already taken.", 403);
    }
    const createUser = new Users({
      firstname,
      lastname,
      username,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      isVerified: true, // remove this, when you want to make live
    });
    // const createUser = await Users.create({firstname, lastname, username, email, password:bcrypt.hashSync(password, 10)});
    // const sendMail = await mailService.sendSignupMail({targetEmail:"sanket.webosmotic@gmail.com", userId:createUser._id});
    // if(!sendMail.success){
    //     return RESPONSE.error(res, "Signup failed", 403);
    // }
    await createUser.save();
    return res.status(201).send({ success: true, email });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * login
 */
async function login(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }

    const { email, password } = req.body;
    const isExist = await Users.findOne({ email });
    if (!isExist) {
      return RESPONSE.error(res, "User not found.", 404);
    }
    if (!isExist.isVerified) {
      return RESPONSE.error(res, "Your account is not verified.", 401);
    }
    if (!bcrypt.compareSync(password, isExist.password)) {
      return RESPONSE.error(res, "Email or password does not match.", 403);
    }
    userJson = isExist.toJSON();
    delete userJson.password;
    userJson.token = Jwt.sign({ user_id: isExist._id }, JWT_SECURE_KEY, {
      expiresIn: "24h",
    });
    return res.send({ success: true, data: userJson });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * verify otp
 */
async function verifyOtp(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      email: Joi.string().required().email(),
      otp: Joi.string().min(6).required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }
    const { email, otp } = req.body;
    const isCheck = await Users.findOne({ email });
    if (!isCheck) {
      return RESPONSE.error(res, "Account not found.", 404);
    }
    if (isCheck.optExpiredAt < Date.now()) {
      return RESPONSE.error(res, "OTP expired.", 406);
    }
    if (isCheck.otp != otp) {
      return RESPONSE.error(res, "Invalid OTP.", 406);
    }
    await Users.updateOne({ email }, { isVerified: true });
    return res.send({ success: true });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * send mail for otp verification
 */
async function sendVerificationMail(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      email: Joi.string().required().email(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }
    const { email } = req.body;
    const findEmail = await Users.findOne({ email });
    if (!findEmail) {
      return RESPONSE.error(res, "User not found.", 404);
    }

    // const sendMail = await mailService.sendSignupMail({targetEmail:email});
    const sendMail = await mailService.sendSignupMail({
      targetEmail: email,
    });
    if (!sendMail) {
      return RESPONSE.error(
        res,
        "Email not sent, please try after some time.",
        403
      );
    }
    await Users.updateOne(
      { email },
      { otp: sendMail.otp, optExpiredAt: Date.now() + 10 * 60 * 1000 }
    );
    return res.send({ success: true });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * verify email
 */
async function verifyEmail(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      email: Joi.string().required().email(),
      token: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.query);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }
    const { token } = req.query;
    Jwt.verify(token, JWT_SECURE_KEY, async function (err, decoded) {
      if (err) {
        return RESPONSE.error(res, "Token invalid or expired.", 401);
      }
      const findEmail = await Users.findOne({ _id: decoded.user_id });
      // if(email != findEmail.email){
      //     return RESPONSE.error(res, "Email verification failed.", 402);
      // }
      if (findEmail?.isVerified) {
        return res.status(400).send({ success: true });
      }
      await Users.updateOne({ _id: decoded.user_id }, { isVerified: true });
      return res.send({ success: true });
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

module.exports = {
  signup,
  login,
  verifyOtp,
  sendVerificationMail,
  verifyEmail,
  getVersion,
};
