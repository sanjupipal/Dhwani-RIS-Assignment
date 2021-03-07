const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    sex: {
      type: String,
    },
    dob: {
      type: Date,
    },
    father_name: {
      type: String,
    },
    mother_name: {
      type: String,
    },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    photo: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = Child = mongoose.model("child", ChildSchema);
