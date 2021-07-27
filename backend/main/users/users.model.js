const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    o_id: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
    firstName: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    lastName: {
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
    password: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    contact: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    gender: {
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
    image: {
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
    type: {
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

module.exports = mongoose.model("users", UserSchema);
