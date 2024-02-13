const express = require("express");
const { register, login, getMe } = require("../controllers/auth-controller");
const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validate");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", authenticate, getMe); // auth

module.exports = router;
