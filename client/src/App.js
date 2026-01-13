import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import EmployeeLogin from "./EmployeeLogin";
import EmployeeDashboard from "./EmployeeDashboard";
import Recruit from "./Recruit";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import JoinUs from "./JoinUs";
import EmployeeRegister from "./EmployeeRegister";
import EmployeeOtpLogin from "./EmployeeOtpLogin";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Employee */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/recruit" element={<Recruit />} />
         <Route path="/employee-login" element={<EmployeeOtpLogin />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />


        {/* Redirect old broken routes */}
        <Route path="/employee/login" element={<Navigate to="/employee-login" />} />
        <Route path="/employee/dashboard" element={<Navigate to="/employee-dashboard" />} />
         <Route path="/join-us" element={<JoinUs />} />
         <Route path="/employee-register" element={<EmployeeRegister />} />
         <Route path="/employee-login" element={<EmployeeOtpLogin />} />




        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
