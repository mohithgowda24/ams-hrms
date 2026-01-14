import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminRecruits() {
  const navigate = useNavigate();
  const [recruits, setRecruits] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetchRecruits();
  }, [navigate]);

  const fetchRecruits = async () => {
    const res = await axios.get("https://ams-backend-yhuh.onrender.com/api/joinees");
    setRecruits(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `https://ams-backend-yhuh.onrender.com/api/joinees/${id}/status`,
      { status }
    );
    fetchRecruits();
  };

  return (
    <div style={page}>
      <h1 style={{ color: "#f97316" }}>Employee Recruits</h1>

      {recruits.map(r => (
        <div key={r._id} style={card}>
          <h3 style={{ color: "#38bdf8" }}>{r.name}</h3>

          <div style={grid}>
            <div>📞 Phone: {r.phone}</div>
            <div>🧑 Father: {r.fatherName}</div>
            <div>👩 Mother: {r.motherName}</div>
            <div>👨‍👩‍👧 Nominee: {r.nominee}</div>
            <div>🏠 Present: {r.presentAddress}</div>
            <div>🏡 Permanent: {r.permanentAddress}</div>
            <div>🆔 Aadhar: {r.aadhar}</div>
            <div>💳 PAN: {r.pan}</div>
            <div>🏥 ESIC: {r.esic}</div>
            <div>📄 UAN: {r.uan}</div>
            <div>🏦 Account: {r.accountNo}</div>
            <div>👨‍💼 Added by employee: {r.employeeId?.name || r.employeeId}</div>
          </div>

          <div style={{ marginTop: 20 }}>
            <b>Status:</b>{" "}
            <select
              value={r.status || "Pending"}
              onChange={e => updateStatus(r._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Joined">Joined</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#020617,#0f172a)",
  color: "white",
  padding: "40px"
};

const card = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "15px",
  marginBottom: "25px",
  boxShadow: "0 0 30px rgba(56,189,248,0.15)"
};

const grid = {
  marginTop: "15px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "10px",
  color: "#cbd5e1"
};

