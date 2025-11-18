import { useEffect, useState } from "react";
import axios from "axios";

export default function NewScan() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("⏳ Scanning... Please wait.");

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://netmapper.onrender.com/api/scans/run",
        { target },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Scan completed! Redirecting...");
      
      setTimeout(() => {
        window.location.href = "/scans";
      }, 1500);

    } catch (err) {
      setMessage("❌ Scan failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h1>Run New Scan</h1>
        <div>
          <button onClick={() => (window.location.href = "/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => (window.location.href = "/scans")}>
            All Scans
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h2>Nmap Scanner</h2>
        <p>Enter an IP or domain to run an Nmap scan.</p>

        {/* Form */}
        <form onSubmit={handleScan} className="auth-box" style={{ margin: "40px auto", maxWidth: "400px" }}>
          <input
            type="text"
            placeholder="e.g. scanme.nmap.org"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Scanning..." : "Run Scan"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p style={{ marginTop: "20px", fontSize: "18px", textAlign: "center" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
