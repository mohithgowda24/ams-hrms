import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
      <video autoPlay muted loop playsInline
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}>
        <source src="https://cdn.coverr.co/videos/coverr-people-working-in-an-office-1879/1080p.mp4" type="video/mp4"/>
      </video>

      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }}></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ position: "relative", color: "white", padding: "120px 40px" }}
      >
        <h1 style={{ fontSize: "48px" }}>Adithya Manpower Services</h1>
        <p>Built on Trust. Driven by Quality.</p>

        <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
          <a href="/employee/login"><button style={btn}>Employee Login</button></a>
          <a href="/admin/login"><button style={btn}>Admin Login</button></a>
        </div>
      </motion.div>
    </div>
  );
}

const btn = {
  background: "#f15a29",
  color: "white",
  padding: "12px 24px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer"
};

