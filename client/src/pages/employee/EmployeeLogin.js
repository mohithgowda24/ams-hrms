import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:4000/api/employee-auth/login",
        { email, password }
      );

      localStorage.clear();
      localStorage.setItem("employeeToken", res.data.token);
      localStorage.setItem("employeeId", res.data.employee._id);
      localStorage.setItem("employeeData", JSON.stringify(res.data.employee));

      navigate("/employee-dashboard");   // ✅ CORRECT ROUTE
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg,#020617,#0f172a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#0f172a",
          padding: "50px",
          borderRadius: "20px",
          width: "380px",
          boxShadow: "0 0 60px rgba(249,115,22,0.4)"
        }}
      >
        <h2 style={{ color: "#f97316", textAlign: "center" }}>
          AMS Employee Login
        </h2>

        {error && <p style={{ color: "#ef4444", textAlign: "center" }}>{error}</p>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={login} style={btn}>
          Login
        </button>
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
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(249,115,22,0.6)"
};
