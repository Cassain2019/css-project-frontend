const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TaxSchema = new mongoose.Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    percentage: {
      type: Number,
      required: true,
      unique: false,
      default: "",
    },
    details: {
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

module.exports = mongoose.model("taxes", TaxSchema);
