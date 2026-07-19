import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

async function start() {
  await client.connect();

  const db = client.db("fsdl");
  const feedback = db.collection("feedback");

  // GET
  app.get("/api/feedback", async (req, res) => {
    const data = await feedback.find().sort({ createdAt: -1 }).toArray();
    res.json(data);
  });

  // POST
  app.post("/api/feedback", async (req, res) => {
    const { student, email, rating, comment } = req.body;

    if (!student || !rating) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await feedback.insertOne({
      student,
      email,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    });

    res.json({ ok: true });
  });

  // DELETE
  app.delete("/api/feedback/:id", async (req, res) => {
    await feedback.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ ok: true });
  });

  app.listen(3001, () =>
    console.log("Server running on http://localhost:3001")
  );
}

start();