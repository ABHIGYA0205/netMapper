import { useEffect, useState } from "react";
import axios from "axios";

export default function ScanList() {
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [modalScan, setModalScan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 8; // scans per page


  const API = "https://netmapper-production.up.railway.app";
  // const API = "http://localhost:7002";

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

  const fetchScans = () => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `${API}/api/scans?page=${page}&limit=${limit}&search=${search}&sort=${sortType}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setScans(res.data.scans);
        setPages(res.data.pages);
      })
      .catch((err) => console.error("Error loading scans", err));
  };


  useEffect(() => {
    fetchScans();
  }, [page, search, sortType]);

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
const editScan = async (id) => {
  const newTarget = prompt("Enter new name for this scan:");

  if (!newTarget) return;

  const token = localStorage.getItem("token");

  const res = await axios.put(`${API}/api/scans/${id}`, 
    { newTarget },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setScans(prev => prev.map(s => s.id === id ? res.data.scan : s));
};


  const deleteAll = async () => {
  if (!confirm("Delete ALL scans? This cannot be undone.")) return;

  const token = localStorage.getItem("token");

  await axios.delete(`${API}/api/scans/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  setScans([]);
  setFilteredScans([]);
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


          <button className="deleteAllBtn" onClick={deleteAll}>
          Delete All
        </button>
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
                  <button className="del" onClick={() => deleteScan(scan.id)}>Delete</button>
                  <button className="edit" onClick={() => editScan(scan.id)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
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
          padding: 11px;
          border: 1px solid #00ff88;
          background: black;
          color: #00ff88;
        }

        .terminal-card {
          background: #0c0c0c;
          border: 1px solid #00ff88;
          padding: 20px;
          transition: 0.2s;
          box-shadow: none;
        }

        .terminal-card:hover {
          box-shadow: 0 0 8px #00ff88;
        }

        .card-btns {
          margin-top: 10px;
          display: flex;
          justify-content:center;
          gap: 8px;
        }

        .card-btns button {
          padding: 6px 12px;
          cursor: pointer;
          border: none;
          border-radius:10px
        }

        .del {
          background: #ff0044;
          color: white;
        }
          .deleteAllBtn {
          background: #ff0033;
          border: none;
          padding: 10px 15px;
          color: white;
          cursor: pointer;
          border-radius: 8px;
  }
           .pagination {
          margin-top: 20px;
          display: flex;
          gap: 20px;
          justify-content: center;
          color: #00ff88;
        }
      `}</style>
    </div>
  );
}
