import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Slider from "react-slick";

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

  const sliderSettings = {
    infinite: true,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 4,
    arrows: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <div style={{ backgroundColor: "#020617", minHeight: "100vh", color: "white" }}>
      
      {/* WhatsApp */}
      <FloatingWhatsApp
        phoneNumber="919945311633"
        accountName="Adithya Manpower Services"
        statusMessage="We typically reply within minutes"
        chatMessage="Hello 👋 How can we help you?"
      />

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          height: "100vh",
          background: "linear-gradient(135deg,#020617,#0f172a)",
          padding: "80px 10%",
          position: "relative"
        }}
      >
        {/* Top Right Buttons */}
        <div style={{ position: "absolute", top: "30px", right: "60px", display: "flex", gap: "20px" }}>
          <button
            onClick={() => navigate("/employee-login")}
            className="btn-outline"
          >
            Employee Login
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="btn-primary"
          >
            Admin Login
          </button>
        </div>

        {/* Hero Content */}
        <div style={{ maxWidth: "700px", marginTop: "120px" }}>
          <h1 style={{ fontSize: "64px", color: "#f97316", lineHeight: "1.1" }}>
            Adithya Manpower Services
          </h1>

          <p style={{ color: "#cbd5e1", marginTop: "25px", fontSize: "18px" }}>
            Teamwork & Intelligence Implementation for your Business.  
            Delivering skilled and reliable manpower solutions since 2010.
          </p>

          <button
            onClick={() => navigate("/join-us")}
            style={{
              marginTop: "40px",
              padding: "20px 70px",
              background: "#f97316",
              border: "none",
              borderRadius: "14px",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#020617",
              cursor: "pointer",
              boxShadow: "0 0 50px rgba(249,115,22,0.7)"
            }}
          >
            Join Our Workforce
          </button>
        </div>

        {/* Contact Block */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "60px",
            background: "#0f172a",
            padding: "30px 40px",
            borderRadius: "20px",
            border: "1px solid #1e293b",
            maxWidth: "300px"
          }}
        >
          <h3 style={{ color: "#f97316", marginBottom: "10px" }}>Contact Us</h3>
          <p style={{ color: "#cbd5e1", fontSize: "15px" }}>
            📞 +91 99453 11633<br />
            📧 adithyamanpowerservice@gmail.com<br />
            📍 Anekal, Bangalore – 560105
          </p>
        </div>
      </motion.section>

      {/* SERVICES */}
      <section style={{ padding: "80px 10%", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", color: "#f97316" }}>Our Services</h2>
        <div style={{ display: "flex", gap: "30px", marginTop: "40px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            "Manpower Supply",
            "Payroll Management",
            "PF & ESI Compliance",
            "Staff Outsourcing",
            "Skilled & Unskilled Workforce",
            "Industrial Staffing"
          ].map((s) => (
            <div
              key={s}
              style={{
                background: "#0f172a",
                padding: "30px",
                width: "260px",
                borderRadius: "12px",
                boxShadow: "0 0 25px rgba(249,115,22,0.2)"
              }}
            >
              <h3 style={{ color: "#f97316" }}>{s}</h3>
              <p style={{ color: "#cbd5e1" }}>
                Professional HR services for fast-growing industries.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section style={{ padding: "80px 10%", background: "#020617", textAlign: "center" }}>
        <h2 style={{ color: "#f97316", fontSize: "32px" }}>Trusted By</h2>
        <div style={{ marginTop: "40px" }}>
          <Slider {...sliderSettings}>
            {clients.map((c, i) => (
              <div key={i}>
                <div
                  style={{
                    margin: "10px",
                    background: "#0f172a",
                    padding: "30px",
                    borderRadius: "10px",
                    color: "#cbd5e1",
                    fontWeight: "bold"
                  }}
                >
                  {c}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "30px", textAlign: "center", background: "#020617", color: "#64748b" }}>
        © 2010–2026 Adithya Manpower Services, Bangalore.
      </footer>
    </div>
  );
}
