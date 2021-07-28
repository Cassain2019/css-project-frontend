const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var CompanySchema = new mongoose.Schema(
  {
    o_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    type: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    address: {
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
    strn: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    pstrn: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    status: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    invoiceFormat: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    FormatDetails: {
      type: Boolean,
      required: false,
      unique: false,
      default: false,
    },
    notes: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    tagLine: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    logo: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    country: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    state: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    city: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    zip: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    currency: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    currSymbol: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    dial_code: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    invoiceTaxes: {
      type: Array,
      required: false,
      unique: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("companies", CompanySchema);
