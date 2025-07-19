// controllers/static.js

exports.handleHome = (req, res) => {
   return res.render("home", {
  user: req.session.user,
  success: "Short URL generated successfully!",
  shortUrl, 
});
};

exports.handleSignup = (req, res) => {
  res.render("signup"); // views/signup.ejs file honi chahiye
};

exports.handleLogin = (req, res) => {
  res.render("signin"); // views/login.ejs file honi chahiye
};
