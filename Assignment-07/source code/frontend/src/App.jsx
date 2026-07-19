import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3001/api/feedback";

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    student: "",
    email: "",
    rating: 5,
    comment: "",
  });

  const ratingsText = ["Bad", "Okay", "Good", "Very Good", "Amazing"];

  async function load() {
    const res = await fetch(API);
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ student: "", email: "", rating: 5, comment: "" });
    load();
  }

  async function del(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="layout">

      {/* SIDEBAR (LEFT) */}
      <div className="sidebar">
        <h2>Feedback List</h2>

        {items.map((f) => (
          <div key={f._id} className="appointment-item">
            <b>{f.student}</b> ({f.rating}/5)
            <p>{f.comment}</p>
            <button onClick={() => del(f._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="form-container">
          <h1>Student Feedback</h1>

          <form onSubmit={submit}>

            <label>Name</label>
            <input
              value={form.student}
              onChange={(e) =>
                setForm({ ...form, student: e.target.value })
              }
              required
            />

            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <label>Rating</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={form.rating >= n ? "star active" : "star"}
                  onClick={() => setForm({ ...form, rating: n })}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="ratingText">
              {ratingsText[form.rating - 1]}
            </div>

            <label>Message</label>
            <textarea
              value={form.comment}
              onChange={(e) =>
                setForm({ ...form, comment: e.target.value })
              }
            />

            <button type="submit">Submit</button>

          </form>
        </div>
      </div>

    </div>
  );
}