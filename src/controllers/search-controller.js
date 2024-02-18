const { searchUserByUserName } = require("../services/search-service");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

exports.searchUser = catchError(async (req, res, next) => {
  const { userName } = req.body;

  const user = await searchUserByUserName(userName);

  if (user.length < 1) {
    createError("User not found", 400);
  }

  res.status(200).json(user);
});
