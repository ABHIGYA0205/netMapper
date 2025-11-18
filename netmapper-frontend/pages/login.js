import { useState ,useEffect} from "react";
import axios from "axios";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
    useEffect(() => {
    const script = document.createElement("script");
    script.src = "/matrix.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://netmapper.onrender.com/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setMessage(" Login successful! Redirecting...");
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>

      <div className="animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>
      <canvas id="matrix"></canvas>


      <div className="auth-container">
        <div className="auth-box">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
}
