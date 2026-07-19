const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    entrepreneurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    advisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    requirement: {
      type: String,
      required: true,
    },

    keywords: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    meetLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ConnectionRequest",
  requestSchema
);