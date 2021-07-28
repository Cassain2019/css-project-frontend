const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DealerSchema = new mongoose.Schema(
  {
    company: [
      {
        type: Schema.Types.ObjectId,
        ref: "companies",
      },
    ],
    name: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    ntn: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    gst: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    notes: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    category: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    type: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    address: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    creditTerms: {
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

module.exports = mongoose.model("dealers", DealerSchema);
