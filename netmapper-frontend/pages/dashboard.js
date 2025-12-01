import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }


    axios
      .get("https://netmapper-production.up.railway.app/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });


    axios
      .get("https://netmapper-production.up.railway.app/api/scans/count", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setScanCount(res.data.count))
      .catch(() => setScanCount(0));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  function Loader() {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <p style={{ marginTop: "10px", color: "#00ff88", fontSize: "18px" }}>
        Loading your Dashboard...
      </p>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "5px solid #111",
    borderTop: "5px solid #00ff88",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};


if (!user) return <Loader />;


  return (
    <>

      <div className="animated-bg">
        <div className="blob "></div>
      </div>


      <div className="dashboard-container">


        <nav className="navbar">
          <h1>NetMapper Dashboard</h1>
          <div>
            <button onClick={() => (window.location.href = "/")}>
              Home
            </button>
            <button onClick={() => (window.location.href = "/scans")}>
              Scans
            </button>
          <button onClick={() => window.location.href = "/profile"}>
            Edit Profile
          </button>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>


        <div className="dashboard-content">
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>

          <div className="stats">
            <div className="card">
              <h3>Total Scans</h3>
              <p>{scanCount}</p>
            </div>

            <div className="card">
              <h3>Last Login</h3>
              <p>{new Date(user.lastLogin).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
