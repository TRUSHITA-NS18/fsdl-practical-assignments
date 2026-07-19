import axios from "axios";
import { useEffect, useState } from "react";
import "./Admin.css";

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [pkg, setPkg] = useState({});
  const [packages, setPackages] = useState([]);

  /* ================= LOGIN ================= */
  const login = () => {
    axios.post("http://localhost:5000/api/admin/login", loginData)
      .then(res => {
        if (res.data.success) {
          setLoggedIn(true);
          setLoginData({ username: "", password: "" });
          fetchPackages();
        } else {
          alert("Invalid Admin Credentials");
        }
      });
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setLoggedIn(false);
    setPkg({});
    setPackages([]);
  };

  /* ================= FETCH PACKAGES ================= */
  const fetchPackages = () => {
    axios.get("http://localhost:5000/api/packages")
      .then(res => setPackages(res.data));
  };

  useEffect(() => {
    if (loggedIn) fetchPackages();
  }, [loggedIn]);

  /* ================= ADD PACKAGE ================= */
  const addPackage = () => {
    axios.post("http://localhost:5000/api/packages/add", pkg)
      .then(() => {
        alert("Package Added Successfully");
        setPkg({});
        fetchPackages();
      });
  };

  /* ================= DELETE PACKAGE ================= */
  const deletePackage = (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    axios.delete(`http://localhost:5000/api/packages/${id}`)
      .then(() => {
        alert("Package Deleted");
        fetchPackages();
      });
  };

  /* ================= LOGIN UI ================= */
  if (!loggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>

        <input
          placeholder="Username"
          value={loginData.username}
          onChange={e => setLoginData({ ...loginData, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={e => setLoginData({ ...loginData, password: e.target.value })}
        />

        <button onClick={login}>Login</button>
      </div>
    );
  }

  /* ================= ADMIN PANEL ================= */
  return (
    <div className="admin-panel">

      {/* ===== HEADER WITH LOGOUT ===== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Add New Package</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <input placeholder="Title"
        value={pkg.title || ""}
        onChange={e => setPkg({ ...pkg, title: e.target.value })} />

      <input placeholder="Location"
        value={pkg.location || ""}
        onChange={e => setPkg({ ...pkg, location: e.target.value })} />

      <input placeholder="Price"
        value={pkg.price || ""}
        onChange={e => setPkg({ ...pkg, price: e.target.value })} />

      <input placeholder="Duration"
        value={pkg.duration || ""}
        onChange={e => setPkg({ ...pkg, duration: e.target.value })} />

      <input placeholder="Image URL"
        value={pkg.image || ""}
        onChange={e => setPkg({ ...pkg, image: e.target.value })} />

      <textarea placeholder="Description"
        value={pkg.description || ""}
        onChange={e => setPkg({ ...pkg, description: e.target.value })} />

      <button onClick={addPackage}>Add Package</button>

      {/* ===== EXISTING PACKAGES ===== */}
      <h3>Existing Packages</h3>

      <div className="admin-package-list">
        {packages.map(p => (
          <div className="admin-package-card" key={p._id}>
            <img src={p.image} alt={p.title} />
            <h4>{p.title}</h4>
            <p><b>Location:</b> {p.location}</p>
            <p><b>Duration:</b> {p.duration}</p>
            <p><b>Cost:</b> ₹{p.price}</p>

            <button
              className="delete-btn"
              onClick={() => deletePackage(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
