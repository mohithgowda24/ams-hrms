import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [recruitCount, setRecruitCount] = useState(0);

  useEffect(() => {
    try {
      const token = localStorage.getItem("employeeToken");
      const data = localStorage.getItem("employeeData");

      if (!token || !data) {
        navigate("/employee-login");
        return;
      }

      const emp = JSON.parse(data);
      setEmployee(emp);

      // Fetch how many recruits this employee added
      axios.get(`https://ams-backend-yhuh.onrender.com/api/joinees/${emp._id}`)
        .then(res => setRecruitCount(res.data.length))
        .catch(() => {});
    } catch {
      localStorage.clear();
      navigate("/employee-login");
    }
  }, [navigate]);

  if (!employee) {
    return <div style={{ background: "#020617", color: "white", minHeight: "100vh", padding: 50 }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#020617,#0f172a)", color: "white" }}>
      
      {/* Header */}
      <div style={header}>
        <h2 style={{ color: "#f97316" }}>AMS Employee Portal</h2>
        <button style={logoutBtn} onClick={() => { localStorage.clear(); navigate("/employee-login"); }}>
          Logout
        </button>
      </div>

      {/* Profile */}
      <div style={profileCard}>
        <h2>{employee.name}</h2>
        <p>{employee.email}</p>
        <p>📱 {employee.mobile || "Mobile not set"}</p>
      </div>

      {/* Stats */}
      <div style={grid}>
        <div style={statCard}>
          <h3>Recruits Added</h3>
          <p style={statValue}>{recruitCount}</p>
        </div>

        <div style={statCard}>
          <h3>Attendance</h3>
          <p style={statValue}>22 / 30</p>
        </div>

        <div style={statCard}>
          <h3>Salary (This Month)</h3>
          <p style={statValue}>₹ 18,000</p>
        </div>
      </div>

      {/* Actions */}
      <div style={actions}>
        <button style={primaryBtn} onClick={() => navigate("/recruit")}>
          + Add Recruit
        </button>
        <button style={outlineBtn}>View My Recruits</button>
      </div>

    </div>
  );
}

const header = {
  background: "#020617",
  padding: "20px 50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #1e293b"
};

const logoutBtn = {
  background: "transparent",
  border: "1px solid #f97316",
  color: "#f97316",
  padding: "10px 25px",
  borderRadius: "10px",
  cursor: "pointer"
};

const profileCard = {
  margin: "40px",
  padding: "30px",
  background: "#0f172a",
  borderRadius: "20px",
  boxShadow: "0 0 40px rgba(249,115,22,0.15)"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
  gap: "30px",
  padding: "0 40px"
};

const statCard = {
  background: "#0f172a",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 0 40px rgba(249,115,22,0.1)"
};

const statValue = {
  fontSize: "40px",
  color: "#f97316",
  marginTop: "10px"
};

const actions = {
  display: "flex",
  gap: "20px",
  padding: "40px"
};

const primaryBtn = {
  padding: "15px 40px",
  background: "#f97316",
  border: "none",
  borderRadius: "14px",
  fontSize: "18px",
  cursor: "pointer",
  boxShadow: "0 0 40px rgba(249,115,22,0.5)"
};

const outlineBtn = {
  padding: "15px 40px",
  background: "transparent",
  border: "2px solid #f97316",
  color: "#f97316",
  borderRadius: "14px",
  fontSize: "18px",
  cursor: "pointer"
};
