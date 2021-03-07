const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = District = mongoose.model("district", DistrictSchema);
