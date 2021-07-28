const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Accounts = new mongoose.Schema(
  {
    company: [{
      type: Schema.Types.ObjectId,
      ref: "companies"
    }],
    code: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    accountType: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    name: {
      type: String,
      required: true,
      unique: false,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("accountsClasses", Accounts);
