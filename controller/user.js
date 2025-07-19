const User  = require("../model/user")
const bcryptjs = require("bcryptjs")


const userSignUp = async (req, res) => {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
        email
    });

    await newUser.save();
    res.json({ message: "Registered successfully" });
    res.render("signin");
};


const userSignIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    req.session.userID = user._id;
    res.redirect("/");
};


const logout = (req ,res) => {
  req.session.destroy(()=>{
    res.redirect("/login");
  });
};

module.exports = {
    userSignUp,
    userSignIn,
    logout
}