import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">India Tours</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/packages">Packages</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
}
