import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLeads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    axios.get("https://ams-backend-yhuh.onrender.com/api/join-us")
      .then(res => setLeads(res.data));
  }, [navigate]);

  return (
    <div style={page}>
      <h1 style={{ color: "#f97316" }}>Join-Us Leads</h1>

      {leads.map(l => (
        <div key={l._id} style={card}>
          <b>{l.name}</b><br/>
          📞 {l.phone}<br/>
          📧 {l.email || "—"}<br/>
          🎯 {l.role || "—"}
        </div>
      ))}
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#020617,#0f172a)",
  color: "white",
  padding: 40
};

const card = {
  background: "#0f172a",
  padding: 20,
  borderRadius: 12,
  marginTop: 15
};

