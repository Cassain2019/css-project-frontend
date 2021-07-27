const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var QuotationSchema = new mongoose.Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    invoiceNo: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    invoiceDate: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "dealers",
    },
    transaction: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    quote: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    products: {
      type: Array,
      required: true,
      unique: false,
      default: "",
    },
    remarks: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    status: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    approvedBy: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quotations", QuotationSchema);
