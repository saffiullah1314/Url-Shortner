// controllers/static.js
exports.handleSignup = (req, res) => {
  res.render("signup"); // views/signup.ejs file honi chahiye
};

exports.handleLogin = (req, res) => {
  res.render("signin"); // views/login.ejs file honi chahiye
};
