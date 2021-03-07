const express = require("express");

const router = express.Router();

const { register } = require("../controller/reg");
router.post("/register", register);

module.exports = router;
