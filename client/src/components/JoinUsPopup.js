import { useState } from "react";
import axios from "axios";

export default function JoinUsPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const submit = async () => {
    await axios.post("https://ams-backend-yhuh.onrender.com/api/join-us", form);
    alert("We will contact you soon");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#f15a29",
          color: "white",
          padding: "14px 20px",
          borderRadius: "50px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Join Us
      </button>

      {open && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ background: "white", padding: 30, borderRadius: 12 }}>
            <h3>Join AMS</h3>
            <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} /><br/>
            <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} /><br/>
            <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} /><br/>
            <button onClick={submit}>Submit</button>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

