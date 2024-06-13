const express = require("express");
const router = express.Router();
const ListingItem = require("../models/ListingItem");
const cloudinary = require("../Cloudinary");
const upload = require("../Multer");

// POST request to create a new listing item with image upload
router.post("/",
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, price } = req.body;

      // Validate request body
      if (!title || !description || !price) {
        return res.status(400).json({ message: "Title, description, and price are required." });
      }

      // Check if an image is provided
      if (!req.file) {
        return res.status(400).json({ message: "Image is required." });
      }

      // Upload the image to Cloudinary and get the URL
      const result = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = result.secure_url;

      // Create a new listing item
      const newListingItem = new ListingItem({
        title,
        description,
        price,
        image: imageUrl,
      });

      // Save the listing item to the database
      await newListingItem.save();

      // Respond with the created listing item
      res.status(201).json(newListingItem);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the listing item." });
    }
  }
);

// GET request to fetch all listing items
router.get("/", async (req, res) => {
  try {
    const listingItems = await ListingItem.find();

    // Respond with the list of listing items
    res.status(200).json(listingItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the listing items." });
  }
});

module.exports = router;
