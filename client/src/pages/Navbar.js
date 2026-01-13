export default function Navbar() {
  return (
    <nav style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", background: "#fff" }}>
      <h1 style={{ fontSize: "24px", color: "#f15a29", fontWeight: "700" }}>Adithya Manpower Services</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/">Home</a>
        <a href="/employee/login">Employee Login</a>
        <a href="/admin/login">Admin Login</a>
      </div>
    </nav>
  );
}

