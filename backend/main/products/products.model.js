const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema(
  {
    company: [
      {
        type: Schema.Types.ObjectId,
        ref: "companies",
      },
    ],
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "subcategories",
    },
    name: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    tax: {
      type: Schema.Types.ObjectId,
      ref: "taxes",
    },
    unit: {
      type: Schema.Types.ObjectId,
      ref: "units",
    },
    packSize: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    cost: {
      type: Number,
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
    current_stock: {
      type: Number,
      required: true,
      unique: false,
      default: "",
    },
    reorder_stock: {
      type: Number,
      required: true,
      unique: false,
      default: "",
    },
    stockDate: {
      type: String,
      required: true,
      unique: false,
      default: "",
    },
    description: {
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

module.exports = mongoose.model("products", productSchema);
