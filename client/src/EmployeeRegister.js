import { useState } from "react";
import axios from "axios";

export default function EmployeeRegister() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    accountNo: "",
    otp: ""
  });

  const sendOTP = async () => {
    if (!form.phone) {
      alert("Enter mobile number");
      return;
    }

    await axios.post("http://localhost:4000/api/employee-register/send-otp", {
      phone: form.phone
    });

    alert("OTP sent (check backend terminal)");
    setStep(2);
  };

  const verifyOTP = async () => {
    await axios.post("http://localhost:4000/api/employee-register/verify-otp", form);
    alert("Registration complete. Await admin approval.");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#020617,#0f172a)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "#0f172a", padding: 40, borderRadius: 20, color: "white", width: 400 }}>
        <h2 style={{ color: "#f97316" }}>Employee Registration</h2>

        {step === 1 && (
          <>
            <input placeholder="Full Name" onChange={e => setForm({ ...form, name: e.target.value })} style={input} />
            <input placeholder="Mobile Number" onChange={e => setForm({ ...form, phone: e.target.value })} style={input} />
            <input placeholder="Bank Account" onChange={e => setForm({ ...form, accountNo: e.target.value })} style={input} />
            <button style={btn} onClick={sendOTP}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input placeholder="Enter OTP" onChange={e => setForm({ ...form, otp: e.target.value })} style={input} />
            <button style={btn} onClick={verifyOTP}>Verify OTP</button>
          </>
        )}
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: "10px",
  color: "white"
};

const btn = {
  width: "100%",
  marginTop: "25px",
  padding: "12px",
  background: "#f97316",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer"
};

