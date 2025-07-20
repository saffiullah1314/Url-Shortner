const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");


const userSignUp = async (req, res) => {
  const { username, password, email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(), // send array of validation errors
    });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).render("signup", {
        errors: [{ msg: "Username already exists" }],
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    req.flash("success", "Registered successfully. Please login.");
res.redirect("/signin");

  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).render("signup", {
      errors: [{ msg: "Server error during signup" }],
    });
  }
};

const userSignIn = async (req, res) => {
  const { username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array().map(err => err.msg).join(", "));
    return res.redirect("/user/signin");
  }

  try {
    // ✅ Find user and include password
    const user = await User.findOne({ username }).select("+password");

    if (!user || !user.password) {
      req.flash("error", "Invalid credentials.");
      return res.redirect("/user/signin");
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    console.log(isMatch)

    if (!isMatch) {
      req.flash("error", "Invalid credentials.");
      return res.redirect("/user/signin");
    }

    // ✅ Store whole user object (or relevant parts) in session
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email, // if available
    };

    req.flash("success", "Login successful!");
    console.log("success")
    return res.redirect("/home");
  } catch (err) {
    console.error("❌ Signin error:", err.message);
    req.flash("error", "Server error during signin.");
    return res.redirect("/user/signin");
  }
};


const logout = (req, res) => {
  const username = req.session?.user?.username; // Optional: just for log
  const redirectURL = "/signin?message=logout"; // ✅ Passing info via query string

  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.redirect("/home");
    } else {
      res.clearCookie("connect.sid");
      console.log(`User ${username} logged out.`);
      return res.redirect(redirectURL);
    }
  });
};

module.exports = {
  userSignUp,
  userSignIn,
  logout,
};
