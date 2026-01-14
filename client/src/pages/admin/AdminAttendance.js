import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAttendance() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    axios.get("https://ams-backend-yhuh.onrender.com/api/admin/employees")
      .then(res => setEmployees(res.data));

    axios.get("https://ams-backend-yhuh.onrender.com/api/attendance/today")
      .then(res => setAttendance(res.data));
  }, [navigate]);

  const mark = async (employeeId, status) => {
    await axios.post("https://ams-backend-yhuh.onrender.com/api/attendance/mark", {
      employeeId,
      status
    });

    const res = await axios.get("https://ams-backend-yhuh.onrender.com/api/attendance/today");
    setAttendance(res.data);
  };

  const getStatus = (id) => {
    const rec = attendance.find(a => a.employeeId === id);
    return rec ? rec.status : "Not marked";
  };

  return (
    <div style={page}>
      <h1 style={{ color: "#f97316" }}>Mark Attendance</h1>

      {employees.map(emp => (
        <div key={emp._id} style={row}>
          <div>
            <b>{emp.name}</b><br />
            <span>{emp.phone}</span>
          </div>

          <div>
            <button
              style={getStatus(emp._id) === "Present" ? presentBtn : btn}
              onClick={() => mark(emp._id, "Present")}
            >
              Present
            </button>

            <button
              style={getStatus(emp._id) === "Absent" ? absentBtn : btn}
              onClick={() => mark(emp._id, "Absent")}
            >
              Absent
            </button>
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

const row = {
  background: "#0f172a",
  marginTop: "15px",
  padding: "20px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const btn = {
  marginLeft: 10,
  padding: "8px 20px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
};

const presentBtn = {
  ...btn,
  background: "#22c55e",
  color: "black"
};

const absentBtn = {
  ...btn,
  background: "#ef4444",
  color: "white"
};

