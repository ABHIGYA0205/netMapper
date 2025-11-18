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
      .get("https://netmapper.onrender.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });


    axios
      .get("https://netmapper.onrender.com/api/scans/count", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setScanCount(res.data.count))
      .catch(() => setScanCount(0));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>

      <div className="animated-bg">
        <div className="blob "></div>
      </div>


      <div className="dashboard-container">


        <nav className="navbar">
          <h1>NetMapper Dashboard</h1>
          <div>
            <button onClick={() => (window.location.href = "/dashboard")}>
              Home
            </button>
            <button onClick={() => (window.location.href = "/scans")}>
              Scans
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
