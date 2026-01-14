import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ================= PUBLIC PAGES =================
import Home from "./pages/public/Home";
import JoinUs from "./pages/public/JoinUs";
import Recruit from "./pages/public/Recruit";

// ================= EMPLOYEE PAGES =================
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeOtpLogin from "./pages/employee/EmployeeOtpLogin";
import EmployeeRegister from "./pages/employee/EmployeeRegister";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeProfile from "./pages/employee/EmployeeProfile";

// ================= ADMIN PAGES =================
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminRecruits from "./pages/admin/AdminRecruits";
import AdminAttendance from "./pages/admin/AdminAttendance";

// ================= COMMON COMPONENTS =================
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      {/* Navbar (can be conditionally hidden later if needed) */}
      <Navbar />

      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<Home />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/recruit" element={<Recruit />} />

        {/* ========== EMPLOYEE ROUTES ========== */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/otp" element={<EmployeeOtpLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<EmployeeProfile />} />

        {/* ========== ADMIN ROUTES ========== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<AdminEmployees />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/admin/recruits" element={<AdminRecruits />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />

        {/* ========== FALLBACK ROUTE ========== */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

