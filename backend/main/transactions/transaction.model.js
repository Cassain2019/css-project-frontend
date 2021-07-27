const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TransactionSchema = new mongoose.Schema(
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
    dueDate: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    dealer: {
      type: Schema.Types.ObjectId,
      ref: "dealers",
    },
    transaction: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    refNo: {
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
    invtotal: {
      type: Number,
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
    type: {
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
    paidBy: {
      type: Array,
      required: false,
      unique: false,
      default: "",
    },
    recevied: {
      type: Array,
      required: false,
      unique: false,
      default: "",
    },
    paymentType: {
      type: Array,
      required: false,
      unique: false,
      default: "",
    },
    paymentDetails: {
      type: Array,
      required: false,
      unique: false,
      default: "",
    },
    paymentDate: {
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

module.exports = mongoose.model("transactions", TransactionSchema);
