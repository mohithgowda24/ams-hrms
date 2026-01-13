import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section style={{ background: "linear-gradient(135deg,#fff0e8,#ffffff)", padding: "100px 40px", textAlign: "center" }}>
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "48px", fontWeight: "700" }}>
        Reliable Corporate Manpower Solutions
      </motion.h1>
      <p style={{ fontSize: "18px", margin: "16px auto", maxWidth: "600px" }}>
        Built on Trust. Driven by Quality.
      </p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "16px" }}>
        <a href="/employee/login"><button style={buttonStyle}>Employee Login</button></a>
        <a href="/admin/login"><button style={{ ...buttonStyle, background: "#0f172a" }}>Admin Login</button></a>
      </motion.div>
    </section>
  );
}

const buttonStyle = {
  background: "#f15a29",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer"
};

