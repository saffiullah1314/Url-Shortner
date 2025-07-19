const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // 🔐 Prevents password from being returned in queries
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"], // ✅ regex validation
  },
}, { timestamps: true }); // ✅ createdAt and updatedAt

module.exports = mongoose.model("User", userSchema);
