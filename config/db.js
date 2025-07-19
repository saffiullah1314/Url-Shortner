const mongoose = require("mongoose");

const connectDb = async (url) => {
  try {
    await mongoose.connect(url); // ⚠️ Deprecated options removed

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // 🔴 Forcefully stop app if DB not connected
  }
};

module.exports = connectDb;
