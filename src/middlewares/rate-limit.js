const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1000 * 60 * 5,
  limit: 250,
  message: { message: "Too many request please wait for a moment" },
});
