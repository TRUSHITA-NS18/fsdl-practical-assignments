import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbar";
import Entrepreneur from "./pages/Entrepreneur";
import Advisor from "./pages/Advisor";

function App() {
  return (
    <Router>

      {/* ✅ Navbar stays constant across all pages */}
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Flow */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />

        {/* Dashboards */}
         <Route path="/entrepreneur" element={<Entrepreneur />} />
<Route path="/advisor" element={<Advisor />} />
      </Routes>

    </Router>
  );
}

export default App;