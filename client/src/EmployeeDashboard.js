import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);

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
    } catch {
      localStorage.clear();
      navigate("/employee-login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!employee) return;

    axios
      .get(`http://localhost:4000/api/attendance/employee/${employee._id}`)
      .then(res => setAttendance(res.data))
      .catch(() => {});
  }, [employee]);

  if (!employee) {
    return (
      <div style={{ background: "#020617", color: "white", minHeight: "100vh", padding: 50 }}>
        Loading dashboard...
      </div>
    );
  }

  const presentDays = attendance.filter(a => a.status === "Present").length;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#020617,#0f172a)", color: "white" }}>
      
      <div style={header}>
        <h2 style={{ color: "#f97316" }}>AMS Employee Portal</h2>
        <button style={logoutBtn} onClick={() => { localStorage.clear(); navigate("/employee-login"); }}>
          Logout
        </button>
      </div>

      <div style={{ padding: "50px" }}>
        <h2>Welcome, {employee.name}</h2>
        <p style={{ color: "#94a3b8" }}>{employee.email || employee.phone}</p>

        <div style={grid}>
          
          {/* ADD RECRUIT */}
          <div style={card}>
            <h3>Add Recruit</h3>
            <p>Add candidates you bring.</p>
            <button style={btnPrimary} onClick={() => navigate("/recruit")}>
              + Add Candidate
            </button>
          </div>

          {/* ATTENDANCE */}
          <div style={card}>
            <h3>Attendance</h3>
            <p>{presentDays} days Present</p>
            <p>Total Records: {attendance.length}</p>
          </div>

          {/* PROFILE */}
          <div style={card}>
            <h3>My Profile</h3>
            <p><b>Name:</b> {employee.name}</p>
            <p><b>Phone:</b> {employee.phone}</p>
            <p><b>Account:</b> {employee.accountNo}</p>
            <p><b>Status:</b> Active</p>
          </div>

        </div>

        {/* Attendance History */}
        <h3 style={{ marginTop: "50px", color: "#f97316" }}>Attendance History</h3>
        {attendance.map(a => (
          <div key={a._id} style={{ marginTop: 10 }}>
            {a.date} — {a.status}
          </div>
        ))}

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

const grid = {
  marginTop: "40px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
  gap: "30px"
};

const card = {
  background: "#0f172a",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 0 40px rgba(249,115,22,0.15)"
};

const btnPrimary = {
  marginTop: "20px",
  padding: "12px 30px",
  background: "#f97316",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};
