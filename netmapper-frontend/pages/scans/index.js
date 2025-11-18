import { useEffect, useState } from "react";
import axios from "axios";

export default function ScanList() {
  const [scans, setScans] = useState([]);
  const [modalScan, setModalScan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (scan) => {
    setModalScan(scan);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setModalScan(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://netmapper.onrender.com/api/scans", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setScans(res.data.scans);
      })
      .catch((err) => {
        console.error("Error loading scans", err);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Your Scans</h1>
        <div>
          <button onClick={() => (window.location.href = "/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => (window.location.href = "/scans/new")}>
            New Scan
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h2>Scan History</h2>

        {scans.length === 0 ? (
          <p>No scans yet.</p>
        ) : (
          <div className="stats scans-grid">
            {scans.map((scan) => (
              <div key={scan.id} className="card">
                <h3>{scan.target}</h3>
                <p>{new Date(scan.createdAt).toLocaleString()}</p>

                <button onClick={() => openModal(scan)}>View Result</button>
              </div>
            ))}
          </div>
        )}
      </div>


      {showModal && modalScan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#00ff88" }}>
              Scan Result: {modalScan.target}
            </h2>

            <pre className="modal-output">{modalScan.result}</pre>

            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
