import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Recruit() {
  const navigate = useNavigate();

  const employee = JSON.parse(localStorage.getItem("employeeData"));
  const employeeId = localStorage.getItem("employeeId");

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    nominee: "",
    phone: "",
    aadhar: "",
    pan: "",
    esic: "",
    uan: "",
    accountNo: "",
    presentAddress: "",
    permanentAddress: ""
  });

  const [joinees, setJoinees] = useState([]);

  const fetchJoinees = useCallback(async () => {
    if (!employeeId) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/joinees/${employeeId}`);
      setJoinees(res.data);
    } catch {}
  }, [employeeId]);

  useEffect(() => {
    if (!employee || !employeeId) {
      navigate("/employee-login");
      return;
    }
    fetchJoinees();
  }, [employee, employeeId, fetchJoinees, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitJoinee = async () => {
    try {
      await axios.post("http://localhost:4000/api/joinees", {
        ...form,
        employeeId
      });

      alert("Recruit added successfully");

      setForm({
        name: "",
        fatherName: "",
        motherName: "",
        nominee: "",
        phone: "",
        aadhar: "",
        pan: "",
        esic: "",
        uan: "",
        accountNo: "",
        presentAddress: "",
        permanentAddress: ""
      });

      fetchJoinees();
    } catch {
      alert("Failed to add recruit");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#020617,#0f172a)", color: "white", padding: "40px" }}>
      
      <h2 style={{ color: "#f97316" }}>Employee Recruit Portal</h2>
      <p style={{ color: "#94a3b8" }}>Logged in as {employee?.name}</p>

      <div style={formBox}>
        {Object.keys(form).map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            style={input}
          />
        ))}

        <button onClick={submitJoinee} style={btn}>
          Add Recruit
        </button>
      </div>

      <h3 style={{ marginTop: "50px", color: "#f97316" }}>My Recruits</h3>

      <div style={grid}>
        {joinees.map((j) => (
          <div key={j._id} style={card}>
            <h4 style={{ color: "#f97316" }}>{j.name}</h4>
            <p>📱 {j.phone}</p>
            <p>🆔 Aadhar: {j.aadhar}</p>
            <p>🏦 Account: {j.accountNo}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

const formBox = {
  background: "#0f172a",
  padding: "40px",
  borderRadius: "20px",
  maxWidth: "900px",
  marginTop: "30px",
  boxShadow: "0 0 40px rgba(249,115,22,0.25)"
};

const input = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  color: "white",
  fontSize: "15px"
};

const btn = {
  marginTop: "30px",
  padding: "15px 50px",
  background: "#f97316",
  border: "none",
  borderRadius: "14px",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(249,115,22,0.5)"
};

const grid = {
  marginTop: "30px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
  gap: "25px"
};

const card = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "18px",
  boxShadow: "0 0 30px rgba(249,115,22,0.15)"
};

