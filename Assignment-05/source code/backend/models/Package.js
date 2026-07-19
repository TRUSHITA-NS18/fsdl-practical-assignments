const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: String,
  duration: String,
  image: String,
  description: String
});

module.exports = mongoose.model("Package", PackageSchema);
