const express = require("express");

const router = express.Router();

const { login, logout } = require("../controller/user");
const { userLoginValidator } = require("../validators/allvalidator");
router.post("/login", userLoginValidator, login);
router.get("/logout", logout);

module.exports = router;
