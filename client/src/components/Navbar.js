export default function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 40px",
      background: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color: "#f15a29" }}>Adithya Manpower Services</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/">Home</a>
        <a href="/employee/login">Employee</a>
        <a href="/admin/login">Admin</a>
      </div>
    </div>
  );
}

