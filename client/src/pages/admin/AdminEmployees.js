import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminEmployees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    axios.get("https://ams-backend-yhuh.onrender.com/api/admin/employees")
      .then(res => setEmployees(res.data));
  }, [navigate]);

  return (
    <div style={page}>
      <h1 style={{ color: "#f97316" }}>Employees</h1>

      {employees.map(e => (
        <div key={e._id} style={card}>
          <b>{e.name}</b><br/>
          📞 {e.phone}<br/>
          📧 {e.email}<br/>
          Status: {e.status}
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

