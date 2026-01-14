import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("employeeToken");
    const data = localStorage.getItem("employeeData");

    if (!token || !data) {
      navigate("/employee-login");
      return;
    }

    const emp = JSON.parse(data);
    setEmployee(emp);

    axios.get(`https://ams-backend-yhuh.onrender.com/api/attendance/employee/${emp._id}`)
      .then(res => setAttendance(res.data));
  }, [navigate]);

  if (!employee) return <div style={{ color: "white", padding: 50 }}>Loading...</div>;

  return (
    <div style={page}>
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h2 style={{ color: "#f97316" }}>Welcome, {employee.name}</h2>
        <p>{employee.phone}</p>
      </motion.div>

      <div style={grid}>
        <motion.div whileHover={{ scale: 1.05 }} style={card}>
          <h3>Attendance</h3>
          <p>{attendance.filter(a => a.status === "Present").length} days present</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} style={card} onClick={() => navigate("/recruit")}>
          <h3>My Recruits</h3>
          <p>View & Add Candidates</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} style={card}>
          <h3>Status</h3>
          <p>{employee.status}</p>
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        style={logout}
        onClick={() => { localStorage.clear(); navigate("/employee-login"); }}
      >
        Logout
      </motion.button>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#020617,#0f172a)",
  color: "white",
  padding: 40
};

const grid = {
  marginTop: 40,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: 30
};

const card = {
  background: "#0f172a",
  padding: 30,
  borderRadius: 20,
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(249,115,22,0.15)"
};

const logout = {
  marginTop: 40,
  background: "#f97316",
  padding: "12px 30px",
  border: "none",
  borderRadius: 12,
  cursor: "pointer"
};
