const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  packageName: String,
  userName: String,
  email: String,
  phone: String
});

module.exports = mongoose.model("Booking", BookingSchema);
