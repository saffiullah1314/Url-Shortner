const express = require("express");
const { body } = require("express-validator");
const { userSignUp, userSignIn, logout } = require("../controllers/user");
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  userSignUp
);

router.post(
  "/signin",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  userSignIn
);

router.get("/logout", logout);


module.exports = router;
