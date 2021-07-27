const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UnitSchema = new mongoose.Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    unit: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("units", UnitSchema);
