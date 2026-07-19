const express = require("express");
const router = express.Router();
const Package = require("../models/Package");

/* ======================================================
   GET ALL PACKAGES + SEARCH (by title or location)
   Example:
   /api/packages
   /api/packages?search=goa
====================================================== */
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const packages = await Package.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ]
    });

    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ======================================================
   ADD NEW PACKAGE
====================================================== */
router.post("/add", async (req, res) => {
  try {
    const newPackage = new Package({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      duration: req.body.duration,
      image: req.body.image,
      description: req.body.description
    });

    await newPackage.save();
    res.json({ message: "Package Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ======================================================
   DELETE PACKAGE BY ID
   /api/packages/:id
====================================================== */
router.delete("/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
