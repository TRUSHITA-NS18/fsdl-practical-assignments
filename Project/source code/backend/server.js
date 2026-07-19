const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ROUTES
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const requestRoutes = require("./routes/requestRoutes");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/request", requestRoutes);

// ROOT
app.get("/", (req, res) => {
  res.send("Finance Connect API Running");
});

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("✅ MongoDB Connected")
  )
  .catch((err) =>
    console.log(err.message)
  );

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server ${PORT}`)
);