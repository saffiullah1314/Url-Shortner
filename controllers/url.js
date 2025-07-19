const Url = require("../model/url");

const { validationResult } = require("express-validator");

const createShortUrl = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors.array()[0].msg;
    req.flash("error", errorMsg);
    return res.redirect("/home");
  }

  const { fullUrl } = req.body;
  console.log("✅ Received fullUrl:", fullUrl);

  try {
    // Save new URL in DB
    const newUrl = await Url.create({ originalurl: fullUrl });

    console.log("✅ URL saved in DB:", newUrl.shorturl);

    // Get all URLs for table display
    const urls = await Url.find().sort({ createdAt: -1 });

    return res.render("home", {
      user: {
        username: req.session.username,
      },
      shortUrl: `${req.protocol}://${req.get("host")}/${newUrl.shorturl}`,
      urls,
      success: "Short URL generated successfully!",
      error: null,
    });

  } catch (error) {
    console.error("❌ Error saving short URL:", error.message);
    req.flash("error", "Failed to generate short URL.");
    return res.redirect("/home");
  }
};


const redirectShortUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shorturl: req.params.shorturl });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    // ✅ Increment click count
    url.clicks++;
    await url.save();

    return res.redirect(url.originalurl);
  } catch (err) {
    console.error("❌ Error redirecting:", err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  createShortUrl,
  redirectShortUrl,
};
