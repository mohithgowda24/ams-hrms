import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function Home() {
  const navigate = useNavigate();

  const clients = [
    "Bill Forge",
    "Vector NDT",
    "Flowell Pumps",
    "Michell Bearings",
    "Ametronics",
    "United Packaging",
    "Lakshmi Tools",
    "GCI Casting"
  ];

  return (
    <div
      style={{
        backgroundColor: "#f6f5f2",
        color: "#1c1c1c",
        overflowX: "hidden"
      }}
    >
      {/* WhatsApp */}
      <FloatingWhatsApp
        phoneNumber="919945311633"
        accountName="Adithya Manpower Services"
        chatMessage="Hello 👋 How can we help you?"
      />

      {/* ================= HERO ================= */}
      <section
        style={{
          minHeight: "100vh",
          padding: "0 10%",
          background: "#f6f5f2",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{ maxWidth: 780 }}>
          {/* COMPANY NAME (VERY IMPORTANT) */}
          <p
            style={{
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#c9a24d",
              marginBottom: 12
            }}
          >
            ADITHYA MANPOWER SERVICES
          </p>

          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(44px,6vw,72px)",
              lineHeight: 1.05
            }}
          >
            Powering Industries with
            <br />
            Intelligent Manpower
          </h1>

          <p
            style={{
              marginTop: 24,
              fontSize: 18,
              color: "#5f6368",
              maxWidth: 640
            }}
          >
            Delivering reliable, compliant, and scalable manpower solutions
            trusted by manufacturing and industrial leaders since 2010.
          </p>

          <button
            onClick={() => navigate("/join-us")}
            style={ctaBtn}
          >
            Join Our Workforce
          </button>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section style={lightSection}>
        <h2 style={sectionTitle}>Our Services</h2>
        <p style={sectionDesc}>
          End-to-end manpower solutions for manufacturing and industrial
          operations.
        </p>

        <div style={servicesGrid}>
          {[
            "Industrial Manpower Supply",
            "Skilled & Unskilled Workforce",
            "Contract Staffing",
            "Payroll & PF / ESI Compliance",
            "Factory & Warehouse Staff",
            "On-demand Workforce Deployment"
          ].map((s) => (
            <div key={s} style={serviceCard}>{s}</div>
          ))}
        </div>
      </section>

      {/* ================= TRUSTED BY ================= */}
      <section style={lightSection}>
        <h2 style={sectionTitle}>Trusted by Leading Industries</h2>

        <div style={marqueeGrid}>
          <div style={marqueeCol}>
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            >
              {clients.concat(clients).map((c, i) => (
                <div key={`l-${i}`} style={companyPill}>{c}</div>
              ))}
            </motion.div>
          </div>

          <div style={marqueeCol}>
            <motion.div
              animate={{ y: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            >
              {clients.concat(clients).map((c, i) => (
                <div key={`r-${i}`} style={companyPill}>{c}</div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT US ================= */}
      <section style={{ ...lightSection, textAlign: "center" }}>
        <h2 style={sectionTitle}>Contact Us</h2>

        <div style={contactCard}>
          <p>📞 +91 99453 11633</p>
          <p>📧 adithyamanpowerservice@gmail.com</p>
          <p>📍 Anekal, Bangalore – 560105</p>
        </div>
      </section>

      {/* ================= FOUNDERS ================= */}
      <section style={lightSection}>
        <h2 style={sectionTitle}>Founded with Purpose</h2>

        <div style={foundersGrid}>
          <div>
            <h3 style={founderName}>Adithya — Founder</h3>
            <p style={founderText}>
              Over a decade of experience in manpower operations, compliance, and
              workforce deployment across industrial sectors.
            </p>
          </div>

          <div>
            <h3 style={founderName}>Operations & Compliance</h3>
            <p style={founderText}>
              Ensuring statutory compliance, workforce safety, and consistent
              service quality.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={footer}>
        © 2010–2026 Adithya Manpower Services · Bangalore
        <div style={{ marginTop: 12 }}>
          <a href="/employee/login" style={footerLink}>Employee Login</a>
          <a href="/admin/login" style={footerLink}>Admin Login</a>
        </div>
      </footer>
    </div>
  );
}

/* ================= STYLES ================= */

const lightSection = {
  padding: "120px 10%",
  background: "#f6f5f2"
};

const ctaBtn = {
  marginTop: 40,
  padding: "18px 54px",
  borderRadius: 999,
  background: "#c9a24d",
  color: "#1c1c1c",
  fontSize: 16,
  fontWeight: 600,
  border: "none",
  cursor: "pointer"
};

const sectionTitle = {
  fontFamily: "Playfair Display, serif",
  fontSize: 40,
  marginBottom: 20
};

const sectionDesc = {
  color: "#5f6368",
  maxWidth: 600
};

const servicesGrid = {
  marginTop: 60,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: 32
};

const serviceCard = {
  padding: 30,
  borderRadius: 14,
  background: "#ffffff",
  border: "1px solid #e6e3dc"
};

const marqueeGrid = {
  marginTop: 60,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 40,
  maxWidth: 700
};

const marqueeCol = {
  height: 260,
  overflow: "hidden"
};

const companyPill = {
  padding: "14px 22px",
  marginBottom: 14,
  borderRadius: 999,
  background: "#ffffff",
  border: "1px solid #e6e3dc",
  textAlign: "center"
};

const contactCard = {
  maxWidth: 420,
  margin: "40px auto 0",
  padding: 30,
  background: "#ffffff",
  borderRadius: 16,
  border: "1px solid #e6e3dc",
  lineHeight: 1.8
};

const foundersGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: 60,
  marginTop: 50,
  maxWidth: 900
};

const founderName = {
  fontSize: 20,
  fontWeight: 600
};

const founderText = {
  marginTop: 12,
  color: "#5f6368",
  lineHeight: 1.7
};

const footer = {
  padding: 40,
  textAlign: "center",
  color: "#5f6368",
  fontSize: 14
};

const footerLink = {
  marginRight: 16,
  fontSize: 13,
  color: "#5f6368",
  textDecoration: "none"
};

