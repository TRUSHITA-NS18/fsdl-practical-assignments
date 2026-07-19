import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Advisor() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [requests, setRequests] = useState([]);
  const [links, setLinks] = useState({});

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const loadRequests = async () => {
    if (!user) return;

    const res = await fetch(
      `http://localhost:5000/api/request/advisor/${user.userId}`
    );

    const data = await res.json();
    setRequests(Array.isArray(data) ? data : []);
  };

  const accept = async (id) => {
    await fetch(
      `http://localhost:5000/api/request/accept/${id}`,
      { method: "PUT" }
    );

    loadRequests();
  };

  const saveLink = async (id) => {
    const meetLink = links[id];

    if (!meetLink) {
      alert("Paste meet link first");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/request/meeting/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetLink,
        }),
      }
    );

    const data = await res.json();

    alert("Meeting saved");
    loadRequests();
  };

  useEffect(() => {
    if (!user) navigate("/");
    else loadRequests();
  }, []);

  return (
    <div className="dash">
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <h1>Advisor Dashboard</h1>

      <div className="grid">
        {requests.map((r) => (
          <div className="advisor-card" key={r._id}>
            <h3>{r.entrepreneurId?.name}</h3>

            <p>{r.requirement}</p>

            <p>Status: {r.status}</p>

            {r.status === "pending" && (
              <button onClick={() => accept(r._id)}>
                Accept Request
              </button>
            )}

            {r.status === "accepted" && (
              <>
                <div className="meet-note">
                  Create meeting and paste real
                  Google Meet link.
                </div>

                <a
                  href="https://meet.google.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="small-btn"
                >
                  Create Meet
                </a>

                <input
                  className="input-field"
                  placeholder="Paste actual meet link"
                  value={links[r._id] || ""}
                  onChange={(e) =>
                    setLinks({
                      ...links,
                      [r._id]: e.target.value,
                    })
                  }
                />

                <button
                  className="force-btn"
                  onClick={() => saveLink(r._id)}
                >
                  Save Link
                </button>
              </>
            )}

            {r.status === "meet scheduled" && (
              <>
                <a
                  href={r.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="join-btn"
                >
                  Join Meeting
                </a>

                <a
                  className="small-btn"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${r.entrepreneurId?.email}&su=Meeting Scheduled&body=Hello ${r.entrepreneurId?.name},

Your meeting is scheduled.

Link:
${r.meetLink}`}
                >
                  Send Gmail
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}