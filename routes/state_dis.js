const express = require("express");

const router = express.Router();

const {
  getAllState,
  createState,
  getDistrictsByStateId,
  createDistrict,
} = require("../controller/state_dis");

router.get("/master/get-state", getAllState);
router.post("/state/create", createState);
router.get("/get-state/:state_id", getDistrictsByStateId);
router.post("/district/create", createDistrict);

module.exports = router;
