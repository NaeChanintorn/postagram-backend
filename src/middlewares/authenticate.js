const { verify } = require("../services/jwt-service");
const { findUserById } = require("../services/user-service");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const authenticate = catchError(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    createError("Invalid autholization header", 401);
  }
  const token = authorization.split(" ")[1];
  const decodedPayload = verify(token);

  const user = await findUserById(decodedPayload.userId);
  if (!user) {
    createError("User was not found", 401);
  }
  delete user.password;
  req.user = user;
  next();
});

module.exports = authenticate;
