const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // min, second, milisecond minutes
  max: 150, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  // message:{
  //     status:false,
  //     message:'Too many requests, please try again later.',
  // },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = apiLimiter;
