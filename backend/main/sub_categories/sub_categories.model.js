const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SubCategoriesSchema = new mongoose.Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    subcategory: {
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

module.exports = mongoose.model("subcategories", SubCategoriesSchema);
