require("dotenv").config();
const express = require("express");
const session = require("express-session"); // ✅ keep only this once
const flash = require("connect-flash");
const mongoStore = require("connect-mongo");
const path = require("path");

const connectDb = require("./config/db");
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/static");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.DB_URL || "mongodb://localhost:27017/Url_shortner",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.use(flash());

// Global variables (for EJS access)
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/user", userRouter);
app.use("/url", urlRouter);
app.use("/", staticRouter);
app.get("/", (req, res) => {
  res.redirect("/user/signin");
});
app.use("/", urlRouter); // fallback for short url

// Connect DB & Start server
connectDb(process.env.DB_URL || "mongodb://localhost:27017/Url_shortner")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
