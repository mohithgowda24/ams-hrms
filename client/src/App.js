import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Pages */
import Home from "./pages/Home";
import JoinUs from "./JoinUs";
import EmployeeOtpLogin from "./EmployeeOtpLogin";
import EmployeeDashboard from "./EmployeeDashboard";
import Recruit from "./Recruit";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminAttendance from "./AdminAttendance";
import AdminLeads from "./AdminLeads";
import AdminRecruits from "./AdminRecruits";
import AdminEmployees from "./AdminEmployees";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/employee-login" element={<EmployeeOtpLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Employee */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/recruit" element={<Recruit />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/admin/recruits" element={<AdminRecruits />} />
        <Route path="/admin/employees" element={<AdminEmployees />} />

      </Routes>
    </Router>
  );
}

