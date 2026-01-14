import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [recruits, setRecruits] = useState([]);
  const [leads, setLeads] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    load();
  }, [navigate]);

  const load = async () => {
    try {
      const [e, r, l, a] = await Promise.all([
        axios.get("https://ams-backend-yhuh.onrender.com/api/admin/employees"),
        axios.get("https://ams-backend-yhuh.onrender.com/api/joinees"),
        axios.get("https://ams-backend-yhuh.onrender.com/api/join-us"),
        axios.get("https://ams-backend-yhuh.onrender.com/api/attendance/today")
      ]);

      setEmployees(e.data);
      setRecruits(r.data);
      setLeads(l.data);
      setAttendance(a.data);
    } catch (err) {
      console.error("Admin load error", err);
      alert("Some data failed to load, but dashboard will still work");
    } finally {
      setLoading(false);
    }
  };

  const present = attendance.filter(a => a.status === "Present").length;

  if (loading) {
    return (
      <div style={loadingScreen}>
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div style={page}>
      <h1 style={{ color: "#f97316" }}>AMS Admin Dashboard</h1>

      <div style={grid}>
        <Card onClick={() => navigate("/admin/employees")} label="Employees" value={employees.length} icon="👥" />
        <Card onClick={() => navigate("/admin/attendance")} label="Present Today" value={present} icon="🟢" />
        <Card onClick={() => navigate("/admin/recruits")} label="Recruits" value={recruits.length} icon="🧑‍💼" />
        <Card onClick={() => navigate("/admin/leads")} label="Leads" value={leads.length} icon="📥" />
      </div>

      <button style={logout} onClick={() => { localStorage.clear(); navigate("/admin-login"); }}>
        Logout
      </button>
    </div>
  );
}

function Card({ icon, label, value, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      style={card}
    >
      <div style={{ fontSize: 30 }}>{icon}</div>
      <div style={{ fontSize: 26 }}>{value}</div>
      <div style={{ opacity: 0.7 }}>{label}</div>
    </motion.div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#020617,#0f172a)",
  color: "white",
  padding: "40px"
};

const grid = {
  marginTop: "40px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "20px"
};

const card = {
  background: "#0f172a",
  padding: "30px",
  borderRadius: "15px",
  cursor: "pointer",
  textAlign: "center",
  boxShadow: "0 0 30px rgba(249,115,22,0.25)"
};

const logout = {
  marginTop: "40px",
  background: "#f97316",
  padding: "12px 30px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};

const loadingScreen = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24
};

