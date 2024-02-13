const validate = require("./validator");
const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    "string.empty": "firstname is required",
    "any.required": "firstname is required",
  }),
  lastName: Joi.string().required().trim().messages({
    "string.empty": "lastname is required",
    "any.required": "lastname is required",
  }),
  mobileOrEmail: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/), // ขึ้นต้นด้วย 0-9 มี 10 ตัว ลงท้ายด้วยอะไรก็ได้
  ])
    .required()
    .messages({
      "alternatives.match": "Invalid mobile number or email address",
      "any.required": "Mobile number or email address is required",
    })
    .strip(),
  userName: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .lowercase()
    .trim()
    .messages({
      "string.empty": "username is required",
      "any.required": "username is required",
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.empty": "password is required",
      "any.required": "password is required",
      "string.pattern.base":
        "password fails to match the required pattern and must be atleast 6 characters",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "confirm password is required",
      "any.required": "confirm password is required",
      "any.only": "confirm password must be match with password",
    })
    .strip(),
  email: Joi.forbidden().when("mobileOrEmail", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("mobileOrEmail")),
  }),
  mobile: Joi.forbidden().when("mobileOrEmail", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("mobileOrEmail")),
  }),
});

exports.validateRegister = validate(registerSchema);

const loginSchema = Joi.object({
  mobileOrEmailOrUserName: Joi.string().required().messages({
    "string.empty": "Email or Mobile or Username is required",
    "any.required": "Email or Mobile or Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  email: Joi.forbidden().when("mobileOrEmailOrUserName", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("mobileOrEmailOrUserName")),
  }),
  mobile: Joi.forbidden().when("mobileOrEmailOrUserName", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("mobileOrEmailOrUserName")),
  }),
  userName: Joi.forbidden().when("mobileOrEmailOrUserName", {
    is: Joi.string()
      .lowercase()
      .trim()
      .pattern(/^[a-zA-Z0-9]{3,30}$/),
    then: Joi.string().default(Joi.ref("mobileOrEmailOrUserName")),
  }),
});

exports.validateLogin = validate(loginSchema);
