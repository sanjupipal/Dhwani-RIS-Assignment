const State = require("../model/State");
const District = require("../model/District");
const jwt = require("jsonwebtoken");

exports.getAllState = async (req, res) => {
  try {
    state = await State.find({ user: userId }).select({
      _id: 1,
      name: 1,
    });
    return res.json({
      message: "State Detail",
      status: 200,
      success: true,
      state,
    });
  } catch (error) {
    console.error(error.message);
    res.send("Server error");
  }
};

exports.createState = async (req, res) => {
  try {
    const oldState = await State.findOne({ name: req.body.state_name });
    if (oldState) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "This State is already exist",
      });
    }
    const newState = new State({
      name: req.body.state_name,
      user: userId,
    });
    await newState.save();
    return res.json({
      message: "State Detail",
      status: 200,
      success: true,
      newState,
    });
  } catch (error) {
    console.error(error.message);
    res.send("Server error");
  }
};

exports.getDistrictsByStateId = async (req, res) => {
  try {
    const state = await State.findOne({
      _id: req.params.state_id,
      user: userId,
    });
    if (!state) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "State Name is invalid.",
      });
    }

    const districts = await District.find({
      state_id: req.params.state_id,
    }).select({ name: 1, _id: 1 });
    return res.json({
      message: "State Detail",
      status: 200,
      success: true,
      district: districts,
    });
  } catch (error) {
    console.error(error.message);
    res.send("Server error");
  }
};

exports.createDistrict = async (req, res) => {
  try {
    const state = await State.findOne({ _id: req.body.state_id });
    if (!state) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "State Name is invalid.",
      });
    }
    const oldDistrict = await District.findOne({
      name: req.body.district_name,
    });

    if (oldDistrict) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "This District is already exist",
      });
    }
    const newDistrict = new District({
      name: req.body.district_name,
      state_id: req.body.state_id,
      user: userId,
    });
    await newDistrict.save();
    return res.json({
      message: "Operation performed successfully",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    res.send("Server error");
  }
};
