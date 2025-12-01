import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const API = "https://netmapper-production.up.railway.app";
  // const API = "http://localhost:7002";

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
      })
      .catch(() => {
        setMsg("Failed to load profile.");
      });
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${API}/api/users/update`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg("✅ Profile updated successfully!");
    } catch (err) {
      setMsg("❌ Update failed.");
    }
  };

  return (
<div className="profile-wrapper">  
      <nav className="navbar">
        <h1>Profile Settings</h1>
        <div>
          <button onClick={() => (window.location.href = "/dashboard")}>
            Dashboard
          </button>
        </div>
      </nav>

      <div className="profile-box">
        <h2>Edit Profile</h2>

        <form onSubmit={updateProfile}>
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Your Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Update</button>
        </form>

        {msg && <p className="msg">{msg}</p>}
      </div>

      <style jsx>{`
        .profile-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 20px;
          background: #000;
          color: #00ff88;
          font-family: "Courier New", monospace;
        }
        .profile-page {
          padding: 40px;
          color: #00ff88;
          font-family: "Courier New", monospace;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .navbar button {
          background: #00ff88;
          padding: 8px 15px;
          border: none;
          cursor: pointer;
          border-radius: 6px;
        }

        .profile-box {
          width: 25vw;

          margin: auto;
          background: #0d0d0d;
          border: 1px solid #00ff88;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 10px #00ff88;
        }

        .profile-box h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;

          gap: 15px;
        }

        input {
          padding: 10px;
          background: black;
          border: 1px solid #00ff88;
          color: #00ff88;
          border-radius: 6px;
        }

        button {
          background: #00ff88;
          color: black;
          padding: 10px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        .msg {
          margin-top: 15px;
          text-align: center;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
