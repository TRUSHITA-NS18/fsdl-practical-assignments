import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileFields } from "../data/profileFields";
import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [docName, setDocName] = useState("");
  const [progress, setProgress] = useState(0);

  // 🔒 ROUTE GUARD
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/");
      return;
    }

    // 🚀 if already complete → go dashboard
    if (storedUser.isProfileComplete) {
      navigate(
        storedUser.role === "entrepreneur"
          ? "/entrepreneur"
          : "/advisor"
      );
      return;
    }

    setUser(storedUser);
  }, []);

  // 📊 PROGRESS
  useEffect(() => {
    if (!user) return;

    const fields = [
      ...profileFields.common,
      ...(user.role === "entrepreneur"
        ? profileFields.entrepreneur
        : profileFields.advisor),
    ];

    let filled = 0;

    fields.forEach((f) => {
      if (form[f.name] && !errors[f.name]) filled++;
    });

    if (docName) filled++;

    setProgress(Math.round((filled / (fields.length + 1)) * 100));
  }, [form, errors, docName, user]);

  // ✅ VALIDATION
  const validateField = (name, value) => {
    if (!value) return "Required";

    if (name === "phone" && !/^\d{10}$/.test(value)) {
      return "Phone must be exactly 10 digits";
    }

    if (name === "experience" && !/^\d*$/.test(value)) {
      return "Only numbers allowed";
    }

    if (name === "address" && value.length > 100) {
      return "Max 100 characters";
    }

    return "";
  };

  // 🔁 INPUT HANDLER (FIXED)
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "experience") {
      newValue = value.replace(/\D/g, "");
    }

    if (name === "address") {
      newValue = value.slice(0, 100);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setDocName(file.name);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    const newErrors = {};

    const fields = [
      ...profileFields.common,
      ...(user.role === "entrepreneur"
        ? profileFields.entrepreneur
        : profileFields.advisor),
    ];

    fields.forEach((f) => {
      const err = validateField(f.name, form[f.name]);
      if (err) newErrors[f.name] = err;
    });

    if (!docName) {
      alert("Upload document");
      return;
    }

    if (Object.keys(newErrors).length > 0 || progress < 100) {
      setErrors(newErrors);
      alert("Complete all fields properly");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.userId,
        ...form,
        document: docName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg);
      return;
    }

    // ✅ IMPORTANT: SAVE COMPLETE USER STATE
    const updatedUser = {
      ...user,
      isProfileComplete: true,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    // 🚀 REDIRECT
    navigate(
      user.role === "entrepreneur"
        ? "/entrepreneur"
        : "/advisor"
    );
  };

  if (!user) return null;

  const fields = [
    ...profileFields.common,
    ...(user.role === "entrepreneur"
      ? profileFields.entrepreneur
      : profileFields.advisor),
  ];

  return (
    <div className="auth-container">

      {/* Logout */}
      <div className="logout-bar">
        <button className="black-btn small-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Card */}
      <div className="role-card form-card">

        <h2 className="card-title">Complete Your Profile</h2>

        {/* Progress */}
        <div style={{ width: "100%", marginBottom: "20px" }}>
          <div className="progress-bar">
            <div
              style={{
                width: `${progress}%`,
                height: "8px",
                background: "#6c63ff",
                borderRadius: "10px",
              }}
            />
          </div>
          <p>{progress}% Completed</p>
        </div>

        {/* Inputs */}
        {fields.map((f) => (
          <div key={f.name}>
            <input
              name={f.name}
              placeholder={f.label}
              value={form[f.name] || ""}
              className={`input-field ${
                errors[f.name]
                  ? "input-error"
                  : form[f.name]
                  ? "input-success"
                  : ""
              }`}
              onChange={handleChange}
            />

            {errors[f.name] && (
              <p className="error-text">{errors[f.name]}</p>
            )}
          </div>
        ))}

        {/* File */}
        <input type="file" onChange={handleFile} />
        {docName && <p>Uploaded: {docName}</p>}

        {/* Submit */}
        <button className="black-btn" onClick={handleSubmit}>
          Submit Profile
        </button>

      </div>
    </div>
  );
}