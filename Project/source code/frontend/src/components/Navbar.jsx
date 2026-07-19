import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("hero-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById("hero-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#6C63FF] text-white shadow-md fixed w-full top-0 z-50">

      {/* LOGO */}
      <h2
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Finance Connect
      </h2>

      {/* MENU */}
      <div className="flex items-center gap-6 text-sm font-medium">

        <button onClick={() => navigate("/")}>
          Home
        </button>

        <button onClick={() => navigate("/about")}>
          About Us
        </button>

        <button onClick={() => navigate("/contact")}>
          Contact Us
        </button>

        {/* ✅ FIXED BUTTON */}
        <button
          onClick={handleGetStarted}
          className="bg-white text-[#6C63FF] px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
        >
          Get Started
        </button>

      </div>
    </nav>
  );
}