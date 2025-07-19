const mongoose = require("mongoose");
const { nanoid } = require("nanoid"); // ✅ Recommended over shortid

const urlSchema = new mongoose.Schema({
  originalurl: {
    type: String,
    required: true,
    match: [
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
      "Please enter a valid URL",
    ],
  },
  shorturl: {
    type: String,
    default: () => nanoid(8), // 🔐 secure + customizable length
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
}, { timestamps: true }); // ✅ createdAt + updatedAt

module.exports = mongoose.model("Url", urlSchema);
