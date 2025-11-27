import { useEffect, useState } from "react";
import axios from "axios";

export default function ScanList() {
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [modalScan, setModalScan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API = "https://netmapper-production.up.railway.app";

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
      .get(`${API}/api/scans`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setScans(res.data.scans);
        setFilteredScans(res.data.scans);
      })
      .catch((err) => console.error("Error loading scans", err));
  }, []);

  useEffect(() => {
    let list = [...scans];

    list = list.filter((scan) =>
      scan.target.toLowerCase().includes(search.toLowerCase())
    );

    if (sortType === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortType === "oldest") {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    if (sortType === "az") {
      list.sort((a, b) => a.target.localeCompare(b.target));
    }
    if (sortType === "za") {
      list.sort((a, b) => b.target.localeCompare(a.target));
    }

    setFilteredScans(list);
  }, [search, sortType, scans]);

  const deleteScan = async (id) => {
    if (!confirm("Delete this scan?")) return;

    const token = localStorage.getItem("token");

    await axios.delete(`${API}/api/scans/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setScans((prev) => prev.filter((s) => s.id !== id));
  };

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

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search target..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>

        <h2>Scan History</h2>

        {filteredScans.length === 0 ? (
          <p>No scans found.</p>
        ) : (
          <div className="stats scans-grid">
            {filteredScans.map((scan) => (
              <div key={scan.id} className="card terminal-card">
                <h3>➜ {scan.target}</h3>
                <p>{new Date(scan.createdAt).toLocaleString()}</p>

                <div className="card-btns">
                  <button onClick={() => openModal(scan)}>View</button>
                  <button className="del" onClick={() => deleteScan(scan.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && modalScan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: "#00ff88" }}>
              Scan Result: {modalScan.target}
            </h2>

            <pre className="modal-output">{modalScan.result}</pre>

            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .filter-bar {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .filter-bar input,
        .filter-bar select {
          padding: 10px;
          border: 1px solid #00ff88;
          background: black;
          color: #00ff88;
        }

        .terminal-card {
          background: #0c0c0c;
          border: 1px solid #00ff88;
          padding: 15px;
          transition: 0.2s;
          box-shadow: none;
        }

        .terminal-card:hover {
          box-shadow: 0 0 8px #00ff88;
        }

        .card-btns {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }

        .card-btns button {
          padding: 6px 12px;
          cursor: pointer;
          border: none;
        }

        .del {
          background: #ff0044;
          color: white;
        }
      `}</style>
    </div>
  );
}
