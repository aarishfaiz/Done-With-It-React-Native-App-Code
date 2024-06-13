const mongoose = require("mongoose");

const ListingItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  }
});

module.exports = mongoose.model("ListingItem", ListingItem);
