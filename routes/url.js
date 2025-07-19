const express = require("express");
const { createShortUrl, redirectShortUrl } = require("../controllers/url");
const { body } = require("express-validator");

const router = express.Router();

// POST / => Create Short URL
router.post(
  "/",
  body("fullUrl")
    .isURL()
    .withMessage("Please enter a valid URL"),
  createShortUrl
);

// GET /:shorturl => Redirect to Original URL
router.get("/:shorturl", redirectShortUrl);

module.exports = router;
