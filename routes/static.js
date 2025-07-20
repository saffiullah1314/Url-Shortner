const express = require("express");
const router = express.Router();
const Url = require("../model/url");

const isAuthenticated = require("../middleware/auth"); // <-- Step 1: Import Middleware

// Controller functions
const {
  handleSignup,
  handleLogin
} = require("../controllers/static");

// Home page route - protected
router.get("/home",isAuthenticated, async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); // latest first

    res.render("home", {
      user: {
        username: req.session.user.username,
      },
      urls,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (error) {
    console.error("❌ Error fetching URLs:", error.message);
    req.flash("error", "Failed to load home page.");
    res.redirect("/");
  }
});

// Signup page route
router.get("/signup", handleSignup);

// Login page route
router.get("/signin", handleLogin);

module.exports = router;
