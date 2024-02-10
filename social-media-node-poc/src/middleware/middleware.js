const Jwt = require("jsonwebtoken");
const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY;
const Users = require("../model/users.model");

/**
 * verify token
 */
async function authUser(req, res, next) {
  try {
    let headerToken = req.headers.authorization ?? null;
    if (!headerToken) {
      return RESPONSE.error(res, "Unauthorized user.", 401);
    }
    Jwt.verify(headerToken, JWT_SECURE_KEY, async function (err, decoded) {
      if (err) {
        return RESPONSE.error(res, "Token invalid or expired.", 401);
      }

      const isCheck = await Users.findOne({ _id: decoded.user_id });
      if (!isCheck) {
        return RESPONSE.error(res, "Acount not found.", 404);
      }
      if (!isCheck.isVerified) {
        return RESPONSE.error(res, "Acount not verified.", 402);
      }
      req.user = { user_id: decoded.user_id };
      next();
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

module.exports = { authUser };
