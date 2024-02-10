const router = require("express").Router();
const Auth = require("../controller/auth/auth.controller");

router.get("/get-version", Auth.getVersion);
router.post("/signup", Auth.signup);
router.post("/login", Auth.login);
router.post("/send-verification-otp", Auth.sendVerificationMail);
router.post("/verify-otp", Auth.verifyOtp);
router.get("/verify-email", Auth.verifyEmail);

module.exports = router;
