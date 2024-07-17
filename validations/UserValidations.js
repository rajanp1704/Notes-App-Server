const handleResponse = require("../helpers/handleResponse");
const { body, validationResult } = require("express-validator");

exports.Register = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .trim()
    .isString()
    .withMessage("Name must conatin characters only")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .trim()
    .isEmail()
    .withMessage("Email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .trim()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*()\-_=+?/]/)
    .withMessage("Password must contain at least one special character"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse.validationError(
        res,
        "Validation Error",
        errors.array()
      );
    }
    next();
  },
];

exports.Login = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .trim()
    .isEmail()
    .withMessage("Email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .trim()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*()\-_=+?/]/)
    .withMessage("Password must contain at least one special character"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse.validationError(
        res,
        "Validation Error",
        errors.array()
      );
    }
    next();
  },
];

exports.Update = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .trim()
    .isString()
    .withMessage("Name must contain characters only")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .trim()
    .isEmail()
    .withMessage("Email is invalid"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .trim()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*()\-_=+?/]/)
    .withMessage("Password must contain at least one special character"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse.validationError(
        res,
        "Validation Error",
        errors.array()
      );
    }
    const allowedUpdates = ["name", "email", "password"];
    const isAllowedUpdates = Object.keys(req?.body).every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isAllowedUpdates) {
      return handleResponse.validationError(res, "Fields not allowed");
    }
    next();
  },
];
