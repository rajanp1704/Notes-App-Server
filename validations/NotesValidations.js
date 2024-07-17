const handleResponse = require("../helpers/handleResponse");
const { body, validationResult, param } = require("express-validator");

exports.AddNotes = [
  body("title")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .trim()
    .isString()
    .withMessage("Title must contain characters only")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Title must be at most 50 characters long"),
  body("content")
    .notEmpty()
    .withMessage("Content cannot be empty")
    .trim()
    .isString()
    .withMessage("Content must contain characters only")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long")
    .isLength({ max: 500 })
    .withMessage("Content must be at most 500 characters long"),
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
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .trim()
    .isString()
    .withMessage("Title must contain characters only")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Title must be at most 50 characters long"),
  body("content")
    .optional()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .trim()
    .isString()
    .withMessage("Content must contain characters only")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long")
    .isLength({ max: 500 })
    .withMessage("Content must be at most 500 characters long"),
  param("id")
    .notEmpty()
    .withMessage("ID cannot be empty")
    .isMongoId()
    .withMessage("Invalid ID"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse.validationError(
        res,
        "Validation Error",
        errors.array()
      );
    }
    const allowedUpdates = ["title", "content"];
    const isAllowedUpdates = Object.keys(req?.body).every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isAllowedUpdates) {
      return handleResponse.validationError(res, "Fields not allowed");
    }
    next();
  },
];
exports.Delete = [
  param("id")
    .notEmpty()
    .withMessage("ID cannot be empty")
    .isMongoId()
    .withMessage("Invalid ID"),

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
