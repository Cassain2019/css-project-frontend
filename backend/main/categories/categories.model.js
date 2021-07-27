const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema(
  {
    company: [
      {
        type: Schema.Types.ObjectId,
        ref: "companies"
      }
    ],
    category: {
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

module.exports = mongoose.model("categories", CategorySchema);
