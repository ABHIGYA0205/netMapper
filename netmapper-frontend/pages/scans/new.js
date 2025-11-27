import { useEffect, useState } from "react";
import axios from "axios";

export default function NewScan() {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("quick");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const API = "https://netmapper-production.up.railway.app";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("⏳ Running scan…");

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/api/scans/run`,
        { target, scanType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Scan completed! Redirecting…");

      setTimeout(() => {
        window.location.href = "/scans";
      }, 1200);

    } catch (err) {
      console.error(err);
      setMessage("❌ Scan failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h1>Nmap Scanner</h1>
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
        <h2>Run a Network Scan</h2>
        <p>Select the scan type and enter a target to begin scanning.</p>

        <form
          onSubmit={handleScan}
          className="auth-box"
          style={{
            margin: "40px auto",
            maxWidth: "450px",
            textAlign: "center",
            padding: "25px",
            background: "#0f0f0fdd",
            borderRadius: "12px",
            border: "1px solid #00ff8899",
          }}
        >
          {/* Target input */}
          <input
            type="text"
            placeholder="Enter IP or Domain"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
            style={{ marginBottom: "20px" }}
          />

          {/* Scan Type dropdown */}
          <select
            value={scanType}
            onChange={(e) => setScanType(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "6px",
            }}
          >
            <option value="quick">⚡ Quick Scan (fastest)</option>
            <option value="full">📡 Full TCP Scan (all ports)</option>
            <option value="service">🧪 Service Detection</option>
            <option value="detailed">🔍 Detailed Scan</option>
          </select>

          {/* Scan descriptions */}
          <div
            style={{
              background: "#111",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "left",
              color: "#ccc",
              fontSize: "14px",
            }}
          >
            {scanType === "quick" && (
              <p>Fast top-50 TCP ports scan. Good for quick checks.</p>
            )}
            {scanType === "full" && (
              <p>Scans all 65,535 TCP ports. Takes longer.</p>
            )}
            {scanType === "service" && (
              <p>Detects open ports + service versions.</p>
            )}
            {scanType === "detailed" && (
              <p>
                Version detection + scripts + traceroute.  
                <br />*May take longer on Railway*
              </p>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Running Scan..." : "Run Scan"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              textAlign: "center",
              color: message.startsWith("❌") ? "#ff4444" : "#00ff88",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
