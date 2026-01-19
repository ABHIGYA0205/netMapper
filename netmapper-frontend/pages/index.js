export default function Home() {
  return (
    <div className="page">
      <nav className="navbar">
        <div className="brand">
          <div className="logo">NetMapper</div>
          <div className="tag">Inspect • Analyze • Visualize</div>
        </div>

        <div className="nav-actions">
          <button className="ghost" onClick={() => (window.location.href = "/login")}>Login</button>
          <button className="primary" onClick={() => (window.location.href = "/signup")}>Signup</button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Network Scanning, Reimagined</h1>
            <p>Run lightning-fast scans, analyze open ports and services, and manage results in a modern, secure dashboard.</p>
            <div className="hero-ctas">
              <button className="primary large" onClick={() => (window.location.href = "/dashboard")}>Get Started</button>
              <button className="ghost" onClick={() => (window.location.href = "#features")}>See Features</button>
            </div>
          </div>

          <div className="hero-card">
            <div className="pill">Live Scan</div>
            <div className="card-body">
              <div className="stat">
                <div className="num">4.2s</div>
                <div className="lbl">Avg scan time</div>
              </div>
              <div className="stat">
                <div className="num">128</div>
                <div className="lbl">Open ports</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="features" className="features">
          <h2>Powerful Features</h2>
          <div className="feature-grid">
            <article className="glass feature-card">
              <h3>Fast Port Scanning</h3>
              <p>Optimized TCP scans with live updates and secure cloud storage.</p>
            </article>
            <article className="glass feature-card">
              <h3>Smart Dashboard</h3>
              <p>Search, filter, and visualize results with intuitive controls.</p>
            </article>
            <article className="glass feature-card">
              <h3>Secure Auth</h3>
              <p>JWT-protected APIs and per-user isolation for your data.</p>
            </article>
          </div>
        </section>

        <section id="how" className="how">
          <div className="glass-panel">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="num">1</div>
                <p>Enter an IP or domain to scan.</p>
              </div>
              <div className="step">
                <div className="num">2</div>
                <p>NetMapper runs a safe, cloud-optimized scan.</p>
              </div>
              <div className="step">
                <div className="num">3</div>
                <p>View results and export reports instantly.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="glass-panel about-inner">
            <h2>Built for Cybersecurity Enthusiasts</h2>
            <p>NetMapper is a lightweight reconnaissance tool for students, researchers, and testers — combining Nmap power with a beautiful dashboard.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner glass-panel">
          <p>© {new Date().getFullYear()} NetMapper • Open Source</p>
          <a href="https://github.com/ABHIGYA0205/netMapper" target="_blank" rel="noreferrer">GitHub Repo →</a>
        </div>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page{
          min-height:100vh;
          background: 
            radial-gradient(1200px circle at 20% 30%, rgba(57, 255, 20, 0.03), transparent),
            radial-gradient(1400px circle at 80% 70%, rgba(57, 255, 20, 0.02), transparent),
            linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
          color: #39ff14;
          font-family: 'Courier New', 'Monaco', monospace;
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
        }

        .navbar{
          display:flex;align-items:center;justify-content:space-between;
          padding:18px 36px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(57, 255, 20, 0.15);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .brand{display:flex;flex-direction:column}
        .logo{font-weight:700;font-size:20px;color:#39ff14;letter-spacing:0.6px;text-shadow: 0 0 10px rgba(57,255,20,0.5)}
        .tag{font-size:12px;color:rgba(57,255,20,0.7);margin-top:4px}

        .nav-actions{display:flex;gap:12px;align-items:center}
        .nav-actions button{
          border-radius:12px;
          padding:10px 16px;
          border:1px solid transparent;
          cursor:pointer;
          font-weight:600;
          transition:all 0.3s ease;
          font-size: 14px;
        }
        .nav-actions .ghost{
          background:rgba(0,0,0,0.6);
          color:rgba(57,255,20,0.9);
          border:1px solid rgba(57,255,20,0.15);
          backdrop-filter: blur(10px);
        }
        .nav-actions .ghost:hover{
          background:rgba(57,255,20,0.1);
          border-color:rgba(57,255,20,0.3);
          transform: translateY(-1px);
          box-shadow: 0 0 15px rgba(57,255,20,0.3);
        }
        .nav-actions .primary{
          background:linear-gradient(135deg,#39ff14 0%,#00ff00 100%);
          color:#000000;
          border: none;
        }
        .nav-actions .primary:hover{
          transform:translateY(-1px);
          box-shadow:0 8px 25px rgba(57,255,20,0.6);
          background:linear-gradient(135deg,#39ff14 0%,#00ff00 100%);
        }

        .hero{padding:80px 24px}
        .hero-inner{max-width:1200px;margin:0 auto;display:flex;gap:40px;align-items:center}
        .hero-copy{flex:1}
        .hero-copy h1{
          font-size:48px;
          margin:0 0 20px;
          background: linear-gradient(135deg, #39ff14 0%, #00ff00 50%, #32cd32 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          line-height: 1.1;
          text-shadow: 0 0 20px rgba(57,255,20,0.3);
        }
        .hero-copy p{color:rgba(57,255,20,0.8);max-width:600px;font-size:18px;line-height:1.6}
        .hero-ctas{margin-top:30px;display:flex;gap:16px}
        .primary.large{
          padding:16px 32px;
          font-size:16px;
          border-radius:12px;
          transition:all 0.3s ease;
          background:linear-gradient(135deg,#39ff14 0%,#00ff00 100%);
          color:#000000;
          border:none;
          font-weight:600;
        }
        .primary.large:hover{
          transform:translateY(-2px);
          box-shadow:0 10px 30px rgba(57,255,20,0.6);
        }
        .ghost{
          transition:all 0.3s ease;
          background:rgba(0,0,0,0.6);
          color:rgba(57,255,20,0.9);
          border:1px solid rgba(57,255,20,0.15);
          backdrop-filter: blur(10px);
          padding:16px 32px;
          border-radius:12px;
          font-weight:600;
        }
        .ghost:hover{
          background:rgba(57,255,20,0.1);
          border:1px solid rgba(57,255,20,0.3);
          transform: translateY(-1px);
          box-shadow: 0 0 15px rgba(57,255,20,0.3);
        }

        .hero-card{
          width:350px;
          background: rgba(0, 0, 0, 0.7);
          border-radius:20px;
          padding:24px;
          backdrop-filter: blur(20px);
          border:1px solid rgba(57,255,20,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.8);
        }
        .pill{
          display:inline-block;
          background:linear-gradient(135deg,#39ff14 0%,#00ff00 100%);
          color:#000000;
          padding:8px 16px;
          border-radius:20px;
          font-weight:700;
          font-size:12px;
        }
        .card-body{display:flex;gap:20px;margin-top:20px;justify-content:space-around}
        .stat{text-align:center}
        .stat .num{font-weight:800;color:#39ff14;font-size:24px;display:block;text-shadow: 0 0 10px rgba(57,255,20,0.5)}
        .stat .lbl{font-size:12px;color:rgba(57,255,20,0.6);margin-top:4px}

        .features{padding:80px 24px;text-align:center}
        .features h2{font-size:36px;margin:0 0 50px;color:#39ff14;font-weight:700;text-shadow: 0 0 15px rgba(57,255,20,0.5)}
        .feature-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
          gap:24px;
          max-width:1200px;
          margin:0 auto;
        }
        .feature-card{
          padding:32px 24px;
          border-radius:16px;
          min-height:180px;
          text-align:center;
          transition: all 0.3s ease;
        }
        .feature-card h3{
          color:#39ff14;
          margin:0 0 16px;
          font-size:20px;
          font-weight:600;
          text-shadow: 0 0 10px rgba(57,255,20,0.3);
        }
        .feature-card p{
          color:rgba(57,255,20,0.7);
          line-height:1.6;
          margin:0;
        }
        .glass{
          background: rgba(0, 0, 0, 0.6);
          border:1px solid rgba(57,255,20,0.15);
          backdrop-filter:blur(20px);
          box-shadow:0 8px 32px rgba(0,0,0,0.8);
        }
        .glass:hover{
          transform:translateY(-5px);
          background: rgba(0, 0, 0, 0.8);
          box-shadow:0 20px 40px rgba(57,255,20,0.2);
          border:1px solid rgba(57,255,20,0.3);
        }

        .how{padding:80px 24px;text-align:center}
        .glass-panel{
          padding:40px;
          border-radius:20px;
          background: rgba(0, 0, 0, 0.7);
          border:1px solid rgba(57,255,20,0.15);
          backdrop-filter:blur(20px);
          box-shadow:0 8px 32px rgba(0,0,0,0.8);
          max-width:1200px;
          margin:0 auto;
        }
        .glass-panel h2{
          color:#39ff14;
          font-size:36px;
          margin:0 0 40px;
          font-weight:700;
          text-shadow: 0 0 15px rgba(57,255,20,0.5);
        }
        .steps{display:flex;gap:40px;justify-content:center;margin-top:20px;flex-wrap:wrap}
        .step{flex:1;text-align:center;min-width:200px}
        .step .num{
          width:60px;
          height:60px;
          border-radius:50%;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(135deg,#39ff14 0%,#00ff00 100%);
          color:#000000;
          font-weight:800;
          margin-bottom:16px;
          font-size:20px;
        }
        .step p{
          color:rgba(57,255,20,0.7);
          margin:0;
          font-size:16px;
        }

        .about{padding:80px 24px}
        .about-inner{max-width:1000px;margin:0 auto;text-align:center}
        .about-inner h2{
          color:#39ff14;
          font-size:36px;
          margin:0 0 24px;
          font-weight:700;
          text-shadow: 0 0 15px rgba(57,255,20,0.5);
        }
        .about-inner p{
          color:rgba(57,255,20,0.7);
          font-size:18px;
          line-height:1.6;
          margin:0;
        }

        .footer{padding:40px 24px;margin-top:80px}
        .footer-inner{
          display:flex;
          justify-content:space-between;
          align-items:center;
          max-width:1200px;
          margin:0 auto;
          color:rgba(57,255,20,0.6);
        }
        .footer-inner a{
          color:#39ff14;
          font-weight:600;
          text-decoration:none;
          transition: all 0.3s ease;
          text-shadow: 0 0 5px rgba(57,255,20,0.3);
        }
        .footer-inner a:hover{
          color:#00ff00;
          text-shadow: 0 0 10px rgba(57,255,20,0.6);
        }

        /* Responsive */
        @media (max-width:900px){
          .hero-inner{flex-direction:column;gap:40px}
          .hero-card{width:100%;max-width:350px}
          .feature-grid{grid-template-columns:1fr}
          .footer-inner{flex-direction:column;gap:16px}
          .steps{flex-direction:column;align-items:center;gap:30px}
          .hero-copy h1{font-size:36px}
          .hero-ctas{flex-direction:column;width:100%}
        }
      `}</style>
    </div>
  )
}
