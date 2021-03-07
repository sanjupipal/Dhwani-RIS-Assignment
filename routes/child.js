const express = require("express");

const router = express.Router();

const {
  createChild,
  getChild,
  uploadImage,
  updateImage,
} = require("../controller/child");

const { childValidator } = require("../validators/allvalidator");
router.post("/beneficiary/child-profile-create", childValidator, createChild);
router.get("/beneficiary/get-child-profile", getChild);

router.post("/upload-image/s3-upload", uploadImage);
router.put("/upload-image/s3-upload/", updateImage);

module.exports = router;
