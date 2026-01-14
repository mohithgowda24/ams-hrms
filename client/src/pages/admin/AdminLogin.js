import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("https://ams-backend-yhuh.onrender.com/api/admin/login", {
        email,
        password
      });

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminData", JSON.stringify(res.data.admin));

      navigate("/admin-dashboard");
    } catch {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#020617,#0f172a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", padding: "50px", borderRadius: "20px", width: "380px" }}>
        <h2 style={{ color: "#f97316", textAlign: "center" }}>AMS Admin Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={input} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={input} />

        <button onClick={login} style={btn}>Login</button>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: "10px",
  color: "white"
};

const btn = {
  width: "100%",
  marginTop: "30px",
  padding: "14px",
  background: "#f97316",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer"
};

