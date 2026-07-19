const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());

const URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(URL);

app.get("/api/traffic", async (req, res) => {
  const city = req.query.city;

  try {
    await client.connect();
    const db = client.db("smart_city");

    const result = await db
      .collection("traffic")
      .find({ location: city })
      .toArray();

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🚦 Backend running on http://localhost:3000");
});
