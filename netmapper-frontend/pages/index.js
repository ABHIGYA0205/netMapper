export default function Home() {
  return (
    <div className="page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">NetMapper</div>

        <div className="nav-links">



          <button onClick={() => (window.location.href = "/login")}>
            Login
          </button>
          <button onClick={() => (window.location.href = "/signup")}>
            Signup
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Network Scanning. Reimagined.</h1>
        <p>
          Run lightning-fast scans, analyze open ports, detect services, and
          manage results — all in one clean dashboard.
        </p>

        <button
          className="cta"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Get Started 
        </button>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <h2>Powerful Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Fast Port Scanning</h3>
            <p>
              Perform optimized TCP scans with real-time results stored securely
              in the cloud.
            </p>
          </div>

          <div className="feature-card">
            <h3>Smart Dashboard</h3>
            <p>
              Search, filter, sort, and manage your scans with a clean UI
              built for efficiency.
            </p>
          </div>

          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>
              JWT-based protected API ensures only you can view and manage
              your scan data.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Enter an IP or domain to scan.</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>NetMapper runs a safe Nmap scan (optimized for cloud).</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>View results in your dashboard instantly.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <h2>Built for Cybersecurity Enthusiasts</h2>
        <br/>
        <p>
          NetMapper is a lightweight network reconnaissance tool designed for
          students, researchers, and security testers.  
          It brings together <b>Nmap power</b> + a <b>beautiful dashboard</b>.
        </p>
      </section>


      <footer>
        <p>© {new Date().getFullYear()} NetMapper • Open Source Tool</p>
        <a
          href="https://github.com/ABHIGYA0205/netMapper"
          target="_blank"
        >
          GitHub Repo →
        </a>
      </footer>

      {/* CSS */}
      <style jsx>{`
      
        .page {
          background: #0a0a0a;
          color: #e5ffe5;
          font-family: monospace;
        }

        /* NAVBAR */
        .navbar {
          display: flex;
          justify-content: space-between;
          padding: 20px 40px;
          background: #0f0f0f;
          border-bottom: 1px solid #0a8f52;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #00ff88;
        }
        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .nav-links a {
          text-decoration: none;
          color: #aaffdd;
          font-size: 16px;
        }
        .nav-links button {
          padding: 8px 16px;
          background: #00ff88;
          border: none;
          color: black;
          cursor: pointer;
          font-weight: bold;
        }

        /* HERO */
        .hero {
          text-align: center;
          padding: 120px 20px;
          background: linear-gradient(180deg, #0d0d0d, #0a2217);
        }
        .hero h1 {
          font-size: 48px;
          color: #00ff88;
          text-shadow: 0 0 8px #00ff88;
        }
        .hero p {
          max-width: 600px;
          margin: 20px auto;
          font-size: 20px;
          opacity: 0.8;
        }
        .cta {
          margin-top: 20px;
          padding: 14px 30px;
          background: #00ff88;
          border: none;
          color: black;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          border-radius:10px
        }

        /* FEATURES */
        .features {
          padding: 80px 40px;
          text-align: center;
        }
        .features h2 {
          font-size: 36px;
          color: #00ff88;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-top: 40px;
        }
        .feature-card {
          padding: 20px;
          background: #101010;
          border: 1px solid #0a8f52;
        }

        /* HOW */
        .how {
          padding: 80px 40px;
          text-align: center;
          background: #0c0c0c;
        }
        .steps {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 30px;
        }
        .step {
          text-align: center;
        }
        .step span {
          font-size: 30px;
          background: #00ff88;
          color: black;
          padding: 10px 18px;
          border-radius: 50%;
          display: inline-block;
          margin-bottom: 10px;
        }

        /* ABOUT */
        .about {
          padding: 80px 40px;
          text-align: center;
        }
        .about p {
          max-width: 700px;
          margin: auto;
          opacity: 0.8;
        }

        /* FOOTER */
        footer {
          padding: 30px;
          text-align: center;
          border-top: 1px solid #0a8f52;
          margin-top: 40px;
          background: #0f0f0f;
        }
        footer a {
          color: #00ff88;
        }
      `}</style>
    </div>
  );
}
