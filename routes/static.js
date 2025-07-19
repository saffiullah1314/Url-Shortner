const express = require("express");
const router = express.Router();
const url = require("../model/url");


router.get("/" , async (req , res) =>{
    if(!req.session.userID) return res.redirect("/signin");
    const allurl = await url.find();
    return res.render("home" , {
       urls: allurl
    });
})

router.get("/signup" , async (req , res) =>{
    return res.render("signup");
})
router.get("/signin" , async (req , res) =>{
    return res.render("signin");
})


module.exports = router;