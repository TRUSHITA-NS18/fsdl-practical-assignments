import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Entrepreneur() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [requests, setRequests] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const loadRequests = async () => {
    if (!user) return;

    const res = await fetch(
      `http://localhost:5000/api/request/entrepreneur/${user.userId}`
    );

    const data = await res.json();
    setRequests(Array.isArray(data) ? data : []);
  };

  const findAdvisors = async () => {
    const ai = await fetch("http://localhost:5000/api/ai/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const aiData = await ai.json();

    setKeywords(aiData.keywords || []);

    const res = await fetch(
      "http://localhost:5000/api/dashboard/find-advisors",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: aiData.keywords,
        }),
      }
    );

    const data = await res.json();
    setAdvisors(Array.isArray(data) ? data : []);
  };

  const sendRequest = async (advisorId) => {
    if (!user) return;

    await fetch("http://localhost:5000/api/request/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entrepreneurId: user.userId,
        advisorId,
        requirement: text,
        keywords,
      }),
    });

    loadRequests();
    alert("Request Sent");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    loadRequests();
  }, []);

  return (
    <div className="dash">
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <h1>Entrepreneur Dashboard</h1>

      <div className="card">
        <textarea
          placeholder="Describe advisor help needed..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={findAdvisors}>
          Find Advisors
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="tags">
          {keywords.map((k, i) => (
            <span key={i}>{k}</span>
          ))}
        </div>
      )}

      <div className="grid">
        {advisors.map((a) => (
          <div className="advisor-card" key={a._id}>
            <h3>{a.name}</h3>
            <p>{a.expertise}</p>
            <p>{a.bio}</p>

            <button onClick={() => sendRequest(a._id)}>
              Connect
            </button>
          </div>
        ))}
      </div>

      <h2>Your Requests</h2>

      <div className="grid">
        {requests.length === 0 ? (
          <div className="empty-box">
            No requests yet.
          </div>
        ) : (
          requests.map((r) => (
            <div className="advisor-card" key={r._id}>
              <h3>{r.advisorId?.name}</h3>

              <p>Status: {r.status}</p>

              {r.status === "meet scheduled" && (
                <>
                  <p className="mail-msg">
                    Check your email for meeting details.
                  </p>

                  <a
                    href={r.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="join-btn"
                  >
                    Join Meeting
                  </a>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}