const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = State = mongoose.model("state", StateSchema);
