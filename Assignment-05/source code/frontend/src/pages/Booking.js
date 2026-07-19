import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Booking.css";

export default function Booking() {
  const { title } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);

  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: ""
  });

  /* ===== FETCH SELECTED PACKAGE DETAILS ===== */
  useEffect(() => {
    axios.get("http://localhost:5000/api/packages")
      .then(res => {
        const selected = res.data.find(p => p.title === title);
        setPkg(selected);
      });
  }, [title]);

  /* ===== SUBMIT BOOKING ===== */
  const submitBooking = () => {
    if (form.phone.length !== 10) {
      alert("📱 Contact number must be exactly 10 digits");
      return;
    }

    axios.post("http://localhost:5000/api/bookings", {
      packageName: pkg.title,
      location: pkg.location,
      duration: pkg.duration,
      price: pkg.price,
      userName: form.userName,
      email: form.email,
      phone: form.phone
    }).then(() => {
      alert("✅ Booking Confirmed!");
      navigate("/packages");   // ✅ REDIRECT HERE
    });
  };

  if (!pkg) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div
      className="booking-page"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${pkg.image})`
      }}
    >
      <div className="booking-card">

        <h2>{pkg.title}</h2>

        <p><b>Location:</b> {pkg.location}</p>
        <p><b>Duration:</b> {pkg.duration}</p>
        <p><b>Cost:</b> ₹{pkg.price}</p>

        <hr />

        <h3>Traveller Details</h3>

        <input
          type="text"
          placeholder="Your Name"
          value={form.userName}
          onChange={e => setForm({ ...form, userName: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Contact Number"
          value={form.phone}
          maxLength="10"
          pattern="[0-9]{10}"
          onChange={e => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              setForm({ ...form, phone: value });
            }
          }}
        />

        <button onClick={submitBooking}>Confirm Booking</button>

      </div>
    </div>
  );
}
