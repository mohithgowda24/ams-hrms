import { useState } from "react";
import axios from "axios";

export default function JoinUs() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", role: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await axios.post("https://ams-backend-yhuh.onrender.com/api/join-us", form);
      setSuccess(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  if (success) {
    return (
      <div style={successStyle}>
        <h1 style={{ color: "#22c55e" }}>Registration Successful</h1>
        <p style={{ marginTop: 20, fontSize: 18 }}>
          Thank you for registering with <b>Adithya Manpower Services</b>.
        </p>
        <p style={{ color: "#cbd5e1", marginTop: 10 }}>
          Our HR team will contact you within <b>24 hours</b>.
        </p>

        <div style={contactBox}>
          <p>📞 <b>9071688231</b></p>
          <p>🕘 Office Hours: Mon – Sat | 9am – 6pm</p>

          <a
            href="https://wa.me/919071688231"
            target="_blank"
            rel="noreferrer"
            style={whatsappBtn}
          >
            💬 Chat with HR on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <h2 style={{ color: "#f97316" }}>Join Adithya Manpower Services</h2>

      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="phone" placeholder="Mobile Number" onChange={handleChange} />
      <input name="email" placeholder="Email (optional)" onChange={handleChange} />
      <input name="role" placeholder="Job Role" onChange={handleChange} />

      <button onClick={submit} style={btn}>Submit</button>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#020617,#0f172a)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px"
};

const btn = {
  background: "#f97316",
  padding: "12px 40px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer"
};

const successStyle = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#020617,#0f172a)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
};

const contactBox = {
  marginTop: 30,
  padding: 30,
  background: "#0f172a",
  borderRadius: 15
};

const whatsappBtn = {
  display: "inline-block",
  marginTop: 20,
  padding: "12px 30px",
  background: "#22c55e",
  color: "black",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: "bold"
};

