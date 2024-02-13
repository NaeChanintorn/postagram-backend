const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "5d6s9dw1d6s499w6fs69f";
const EXPIRE_IN = process.env.JWT_EXPIRE || 30;

exports.sign = (payload) =>
  jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRE_IN });

exports.verify = (token) => jwt.verify(token, SECRET_KEY);
