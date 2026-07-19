const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 🔒 Strong Password Validation
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
      return res.status(400).json({
        msg: "Password must be 8+ chars, include 1 uppercase & 1 number",
      });
    }

    // ❌ Existing user check
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        msg: "User already exists. Please login.",
      });
    }

    // 🔐 Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Create user
    await User.create({
      email,
      password: hashed,
      role,
    });

    return res.status(200).json({
      msg: "Registration successful. Please login.",
    });

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 🔍 Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User not registered. Please sign up first.",
      });
    }

    // 🔴 Role validation
    if (user.role !== role) {
      return res.status(400).json({
        msg: `Registered as ${user.role.toUpperCase()}, not ${role.toUpperCase()}`,
      });
    }

    // 🔑 Password match
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }

    // 🔐 Token
    const token = jwt.sign(
      { id: user._id },
      "secret",
      { expiresIn: "1d" }
    );

    // ✅ UPDATED: use isProfileComplete
    return res.status(200).json({
      token,
      role: user.role,
      userId: user._id,
      hasProfile: user.isProfileComplete, // 🔥 FIXED
    });

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
});


// ================= SAVE PROFILE =================
// ================= SAVE PROFILE =================
router.post("/profile", async (req, res) => {
  try {
    const {
      id,
      name,
      phone,
      bio,
      address, // ✅ FIXED
      startupName,
      startupStage,
      industry,
      expertise,
      experience,
      document,
    } = req.body;

    // 🔴 BASIC VALIDATION
    if (!name || !phone || !bio || !address || !document) {
      return res.status(400).json({
        msg: "Please fill all required fields and upload document",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 🔴 ROLE BASED VALIDATION
    if (user.role === "entrepreneur") {
      if (!startupName || !startupStage || !industry) {
        return res.status(400).json({
          msg: "Please complete all startup details",
        });
      }
    }

    if (user.role === "advisor") {
      if (!expertise || !experience) {
        return res.status(400).json({
          msg: "Please complete all advisor details",
        });
      }
    }

    // ✅ UPDATE USER
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        bio,
        address, // ✅ FIXED
        startupName,
        startupStage,
        industry,
        expertise,
        experience,
        document,
        isProfileComplete: true,
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Profile completed successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error(err); // 🔍 helps debug
    return res.status(500).json({
      msg: err.message,
    });
  }
});
module.exports = router;