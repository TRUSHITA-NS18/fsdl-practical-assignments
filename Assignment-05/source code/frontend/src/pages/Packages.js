import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Packages.css";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /* ===== FETCH PACKAGES WITH SEARCH ===== */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/packages?search=${search}`)
      .then(res => setPackages(res.data));
  }, [search]);

  return (
    <div className="packages-page">

      <center><h2 className="page-title" >Explore Our Packages</h2></center>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by destination or location..."
        className="search-bar"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="packages-grid">
        {packages.map(pkg => (
          <div className="package-card" key={pkg._id}>
            <img src={pkg.image} alt={pkg.title} />
            <h3>{pkg.title}</h3>
            <p><b>Location:</b> {pkg.location}</p>
            <p><b>Duration:</b> {pkg.duration}</p>
            <p><b>Cost:</b> ₹{pkg.price}</p>

            <button onClick={() => navigate(`/book/${pkg.title}`)}>
              Book Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
