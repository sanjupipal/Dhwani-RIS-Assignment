const { check, validationResult } = require("express-validator");

exports.childValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("dob").isEmail().withMessage("Date of Birth is required"),
];

exports.userLoginValidator = [
  check("username").not().isEmpty().withMessage("Name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 digit"),
];
