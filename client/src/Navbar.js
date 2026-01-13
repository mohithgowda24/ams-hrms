import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "20px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(2,6,23,0.9)",
        backdropFilter: "blur(10px)",
        zIndex: 1000
      }}
    >
      <h2 style={{ color: "#f97316", cursor: "pointer" }} onClick={() => navigate("/")}>
        AMS
      </h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <button className="btn-outline" onClick={() => navigate("/employee-login")}>
          Employee Login
        </button>
        <button className="btn-primary" onClick={() => navigate("/admin-login")}>
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;

