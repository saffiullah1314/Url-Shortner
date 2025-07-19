const express = require("express");
const {createShortUrl , redirectShortUrl} = require("../controller/url")
const router = express.Router();

router.post('/' ,createShortUrl);
router.get("/:shorturl" , redirectShortUrl);

module.exports = router; 