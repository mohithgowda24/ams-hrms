import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JoinUs from "./pages/JoinUs";
import EmployeeOtpLogin from "./EmployeeOtpLogin";
import EmployeeDashboard from "./EmployeeDashboard";
import Recruit from "./Recruit";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join-us" element={<JoinUs />} />

        {/* Employee OTP Login ONLY */}
        <Route path="/employee-login" element={<EmployeeOtpLogin />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/recruit" element={<Recruit />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

