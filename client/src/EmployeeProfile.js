import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [recruits, setRecruits] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employeeData"));
    setEmployee(data);

    axios.get(`https://ams-backend-yhuh.onrender.com/api/attendance/employee/${data._id}`)
      .then(res => setAttendance(res.data));

    axios.get(`https://ams-backend-yhuh.onrender.com/api/joinees/${data._id}`)
      .then(res => setRecruits(res.data));
  }, []);

  if (!employee) return null;

  return (
    <div style={page}>
      <h2>{employee.name}</h2>
      <p>📞 {employee.phone}</p>
      <p>Status: {employee.status}</p>

      <div style={box}>Attendance: {attendance.filter(a => a.status === "Present").length} days</div>
      <div style={box}>Recruits added: {recruits.length}</div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#020617,#0f172a)",
  color: "white",
  padding: 40
};

const box = {
  background: "#0f172a",
  padding: 20,
  borderRadius: 12,
  marginTop: 20
};

