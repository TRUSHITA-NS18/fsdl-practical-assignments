import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth() {
  const navigate = useNavigate();

  const [view, setView] = useState("selection");
  const [role, setRole] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // ✅ NEW

  const [showPassword, setShowPassword] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);

  const handleCardClick = (selectedRole, mode) => {
    setRole(selectedRole);
    setIsLogin(mode === "login");
    setView("form");

    setEmail("");
    setPassword("");
    setErrorMsg("");
    setSuccessMsg("");
    setJustRegistered(false);
  };

  // 🔒 Password validation
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // ================= PASSWORD VALIDATION =================
    if (!isLogin && !validatePassword(password)) {
      setErrorMsg(
        "Password must be 8+ chars, include 1 uppercase & 1 number"
      );
      setLoading(false);
      return;
    }

    try {
      let userRole = role;

      // ================= LOGIN =================
      if (isLogin) {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Login failed");
        }

        userRole = data.role;

        localStorage.setItem("user", JSON.stringify(data));

        // ✅ CLEAR FIELDS STYLE (remove red)
        setErrorMsg("");

        // 🟢 FIRST TIME USER
        if (!data.hasProfile) {
          navigate("/profile");
          return;
        }
      }

      // ================= REGISTER =================
      else {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.msg);

        // ✅ Switch to login
        setIsLogin(true);
        setJustRegistered(true);

        // ✅ KEEP EMAIL but CLEAR PASSWORD
        setPassword("");

        // ✅ SUCCESS MESSAGE (NOT ERROR)
        setSuccessMsg("Registration successful! Please login.");

        setLoading(false);
        return;
      }

      // ================= REDIRECT =================
      if (userRole === "entrepreneur") {
        navigate("/entrepreneur");
      } else if (userRole === "advisor") {
        navigate("/advisor");
      }

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= VIEW 1 =================
  if (view === "selection") {
    return (
      <div className="auth-container">
        <h1 className="main-title">Join Finance Connect</h1>

        <div className="cards-wrapper">

          <div className="role-card">
            <div>
              <span className="card-badge">Startup</span>
              <h2 className="card-title">For Entrepreneurs</h2>
              <p className="card-desc">
                Get financial guidance and connect with expert advisors.
              </p>
            </div>

            <div>
              <button
                className="black-btn"
                onClick={() => handleCardClick("entrepreneur", "login")}
              >
                Login
              </button>

              <div className="signup-link">
                Don't have an account?{" "}
                <span
                  className="link-text"
                  onClick={() => handleCardClick("entrepreneur", "register")}
                >
                  Sign up
                </span>
              </div>
            </div>
          </div>

          <div className="role-card">
            <div>
              <span className="card-badge">Expert</span>
              <h2 className="card-title">For Advisors</h2>
              <p className="card-desc">
                Help startups grow with your expertise.
              </p>
            </div>

            <div>
              <button
                className="black-btn"
                onClick={() => handleCardClick("advisor", "login")}
              >
                Login
              </button>

              <div className="signup-link">
                Don't have an account?{" "}
                <span
                  className="link-text"
                  onClick={() => handleCardClick("advisor", "register")}
                >
                  Sign up
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ================= VIEW 2 =================
  return (
    <div className="auth-container">
      <div className="role-card form-card">

        <button className="back-btn" onClick={() => setView("selection")}>
          ← Back
        </button>

        <h2 className="card-title">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleAuth} style={{ width: "100%" }}>

          <input
            type="email"
            placeholder="name@email.com"
            className={`input-field ${errorMsg ? "input-error" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg("");
            }}
            required
          />

          {/* PASSWORD */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`input-field ${errorMsg ? "input-error" : ""}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "14px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#6C63FF",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* ❌ ERROR */}
          {errorMsg && <div className="error-text">⚠️ {errorMsg}</div>}

          {/* ✅ SUCCESS */}
          {successMsg && (
            <div style={{ color: "green", marginBottom: "10px" }}>
              ✔ {successMsg}
            </div>
          )}

          <button type="submit" className="black-btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
          </button>

        </form>

        <div className="signup-link" style={{ textAlign: "center" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="link-text"
            onClick={() => {
              setIsLogin(!isLogin);

              // ❌ Clear only if NOT just registered
              if (!justRegistered) {
                setEmail("");
                setPassword("");
              } else {
                setPassword(""); // 🔥 Always clear password
              }

              setErrorMsg("");
              setSuccessMsg("");
            }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </div>

      </div>
    </div>
  );
}