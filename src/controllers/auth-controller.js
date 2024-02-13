const { hash, compare } = require("../services/hash-service");
const { sign } = require("../services/jwt-service");
const {
  findUserByUserName,
  createUser,
  findUserByMobileOrEmail,
  findUserByMobileOrEmailOrUserName,
} = require("../services/user-service");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

exports.register = catchError(async (req, res, next) => {
  const allUsersByMobileOrEmail = await findUserByMobileOrEmail(
    req.body.email || req.body.mobile
  );

  if (allUsersByMobileOrEmail) {
    createError("Email or Mobile is used", 400);
  }

  const allUserByUserName = await findUserByUserName(req.body.userName);

  if (allUserByUserName) {
    createError("Username is used", 400);
  }

  req.body.password = await hash(req.body.password);

  const newUser = await createUser(req.body);
  const payload = { userId: newUser.id };
  const accessToken = sign(payload);
  delete newUser.password;

  res.status(200).json({ accessToken, newUser });
});

exports.login = catchError(async (req, res, next) => {
  const allUsersByMobileOrEmailOrUserName =
    await findUserByMobileOrEmailOrUserName(
      req.body.email || req.body.mobile || req.body.userName
    );

  if (!allUsersByMobileOrEmailOrUserName) {
    createError("invalid credentials", 400);
  }

  // Check password with mobile or email or username

  const isMatch = await compare(
    req.body.password,
    allUsersByMobileOrEmailOrUserName.password
  );

  if (!isMatch) {
    createError("invalid credentials", 400);
  }

  const payload = { userId: allUsersByMobileOrEmailOrUserName.id };
  const accessToken = sign(payload);
  delete allUsersByMobileOrEmailOrUserName.password;

  res
    .status(200)
    .json({ accessToken, user: allUsersByMobileOrEmailOrUserName });
});

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
