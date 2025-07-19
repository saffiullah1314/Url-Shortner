// middleware/auth.js

const isAuthenticated = (req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    req.flash("error", "Please login first.");
    res.redirect("/signin");
  }
};


module.exports = isAuthenticated;
