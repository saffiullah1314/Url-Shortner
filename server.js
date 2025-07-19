const connectDb = require("./configer/db");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const urlrouter = require("./routes/url");
const userRouter = require("./routes/user");
const staticrouter = require("./routes/static");

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views") );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: "hiiamthere",
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: "mongodb://localhost:27017/Url_shortner" }),
    cookie: { maxAge: 1000 * 60 * 60 },
}));


app.use("/url" , urlrouter);
app.use("/user" ,userRouter);
app.use("/" ,staticrouter);


app.listen(PORT , () => console.log(`connected succeffuly on PORT ${PORT}`) )
connectDb('mongodb://localhost:27017/Url_shortner');