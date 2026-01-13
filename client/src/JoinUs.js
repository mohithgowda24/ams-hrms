import { useState } from "react";
import axios from "axios";

export default function JoinUs() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.name || !form.phone) {
      alert("Name and phone are required");
      return;
    }

    await axios.post("http://localhost:4000/api/join-us", form);
    setSuccess(true);
    setForm({ name: "", phone: "", email: "", role: "" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#020617,#0f172a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", padding: "50px", borderRadius: "20px", width: "420px", color: "white", boxShadow: "0 0 40px rgba(249,115,22,0.3)" }}>
        <h2 style={{ color: "#f97316", textAlign: "center" }}>Join Adithya Manpower Services</h2>

        {success ? (
          <p style={{ color: "#22c55e", textAlign: "center", marginTop: "30px" }}>
            Thank you! We will contact you soon.
          </p>
        ) : (
          <>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={input} />
            <input name="phone" placeholder="Mobile Number" value={form.phone} onChange={handleChange} style={input} />
            <input name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} style={input} />
            <input name="role" placeholder="Job Role (optional)" value={form.role} onChange={handleChange} style={input} />

            <button onClick={submit} style={btn}>Apply Now</button>
          </>
        )}
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "14px",
  marginTop: "18px",
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: "10px",
  color: "white"
};

const btn = {
  width: "100%",
  marginTop: "30px",
  padding: "14px",
  background: "#f97316",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(249,115,22,0.5)"
};

