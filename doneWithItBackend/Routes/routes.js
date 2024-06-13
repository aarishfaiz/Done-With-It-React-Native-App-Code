const express = require("express");
const router = express.Router();
const postListingItem = require("../Controllers/postListingItem");
const test = require('./test');

// Route to handle /api
router.get("/", (req, res) => {
  res.send("Inside Routes");
});

router.use("/test", test);
router.use("/listing", postListingItem);

module.exports = router;
