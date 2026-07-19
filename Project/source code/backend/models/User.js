const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // 🔐 AUTH
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["entrepreneur", "advisor"],
      required: true,
    },

    // 🔽 COMMON PROFILE
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      match: /^\d{10}$/, // ✅ exactly 10 digits
    },
    bio: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      maxlength: 100, // ✅ max 100 chars
      trim: true,
    },

    // 🔽 ENTREPRENEUR FIELDS
    startupName: {
      type: String,
      trim: true,
    },
    startupStage: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },

    // 🔽 ADVISOR FIELDS
    expertise: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number, // ✅ better than string (numeric validation)
    },

    // 📄 DOCUMENT
    document: {
      type: String, // storing filename or URL
    },

    // ✅ PROFILE COMPLETION FLAG (CRITICAL)
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // optional but useful
  }
);

module.exports = mongoose.model("User", userSchema);