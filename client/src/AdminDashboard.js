import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [recruits, setRecruits] = useState([]);
  const [leads, setLeads] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));

  const fetchAll = useCallback(async () => {
    const [r, l, e] = await Promise.all([
      axios.get("https://ams-backend-yhuh.onrender.com/api/joinees"),
      axios.get("https://ams-backend-yhuh.onrender.com/api/join-us"),
      axios.get("https://ams-backend-yhuh.onrender.com/api/admin/employees")
    ]);

    setRecruits(r.data);
    setLeads(l.data);
    setEmployees(e.data);
  }, []);

  const fetchAttendance = useCallback(async () => {
    const res = await axios.get(`https://ams-backend-yhuh.onrender.com/api/attendance/${date}`);
    setAttendance(res.data);
  }, [date]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const data = localStorage.getItem("adminData");

    if (!token || !data) {
      navigate("/admin-login");
      return;
    }

    setAdmin(JSON.parse(data));
    fetchAll();
    fetchAttendance();
  }, [navigate, fetchAll, fetchAttendance]);

  const approve = async (id) => {
    await axios.put(`https://ams-backend-yhuh.onrender.com/api/admin/employees/approve/${id}`);
    fetchAll();
  };

  const block = async (id) => {
    await axios.put(`https://ams-backend-yhuh.onrender.com/api/admin/employees/block/${id}`);
    fetchAll();
  };

  const markAttendance = async (employeeId, status) => {
    await axios.post("https://ams-backend-yhuh.onrender.com/api/attendance", {
      employeeId,
      date,
      status
    });
    fetchAttendance();
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(120deg,#020617,#0f172a)", color:"white" }}>
      
      <div style={header}>
        <h2 style={{ color:"#f97316" }}>AMS Admin</h2>
        <button style={logout} onClick={() => { localStorage.clear(); navigate("/admin-login"); }}>
          Logout
        </button>
      </div>

      <div style={{ padding:40 }}>
        <h3>Welcome, {admin?.name}</h3>

        {/* EMPLOYEES */}
        <h2 style={title}>Employees</h2>
        <div style={grid}>
          {employees.map(e => (
            <div key={e._id} style={card}>
              <h4>{e.name}</h4>
              <p>{e.phone}</p>
              <p>Status: <b>{e.status}</b></p>

              {e.status === "Pending" && <button onClick={() => approve(e._id)}>Approve</button>}
              {e.status === "Active" && <button onClick={() => block(e._id)}>Block</button>}
            </div>
          ))}
        </div>

        {/* ATTENDANCE */}
        <h2 style={title}>Attendance</h2>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />

        <div style={grid}>
          {attendance.map(a => (
            <div key={a.employeeId} style={card}>
              <h4>{a.name}</h4>
              <p>{a.status}</p>
              <button onClick={() => markAttendance(a.employeeId,"Present")}>Present</button>
              <button onClick={() => markAttendance(a.employeeId,"Absent")}>Absent</button>
            </div>
          ))}
        </div>

        {/* JOIN US */}
        <h2 style={title}>Join Us Leads</h2>
        <div style={grid}>
          {leads.map(l => (
            <div key={l._id} style={card}>
              <h4>{l.name}</h4>
              <p>{l.phone}</p>
            </div>
          ))}
        </div>

        {/* RECRUITS */}
        <h2 style={title}>Employee Recruits</h2>
        <div style={grid}>
          {recruits.map(r => (
            <div key={r._id} style={card}>
              <h4>{r.name}</h4>
              <p>{r.phone}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const header = { padding:20, display:"flex", justifyContent:"space-between" };
const logout = { background:"#f97316", border:"none", padding:10 };
const grid = { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:20 };
const card = { background:"#0f172a", padding:20, borderRadius:10 };
const title = { color:"#f97316", marginTop:40 };
