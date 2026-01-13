export default function Services() {
  const list = ["Manpower Supply", "Outsourcing", "Compliance", "Industry Staffing"];

  return (
    <div style={{ padding: "80px 40px", background: "#f9fafb", textAlign: "center" }}>
      <h2>Our Services</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "30px" }}>
        {list.map(s => (
          <div key={s} style={{ background: "white", padding: "30px", borderRadius: "16px", width: "250px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
            <h3>{s}</h3>
            <p>Professional workforce solutions.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

