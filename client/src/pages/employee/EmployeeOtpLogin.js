import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeOtpLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await axios.post("https://ams-backend-yhuh.onrender.com/api/employee-register/send-otp", { phone });
      setStep(2);
    } catch {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("https://ams-backend-yhuh.onrender.com/api/employee-register/verify-otp", { phone, otp });
      localStorage.setItem("employeeToken", res.data.token);
      localStorage.setItem("employeeData", JSON.stringify(res.data.employee));
      navigate("/employee/dashboard");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "white", padding: 50 }}>
      <h2>Employee Login</h2>

      {step === 1 && (
        <>
          <input placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <br /><br />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <br /><br />
          <button onClick={verifyOtp}>Verify & Login</button>
        </>
      )}
    </div>
  );
}

