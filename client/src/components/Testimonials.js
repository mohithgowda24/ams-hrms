import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const data = [
    { name: "Bill Forge", text: "Reliable staffing partner." },
    { name: "Vector NDT", text: "Professional and fast service." },
    { name: "Flowell", text: "Excellent workforce quality." }
  ];

  return (
    <div style={{ padding: "80px 40px", textAlign: "center" }}>
      <h2>What Clients Say</h2>
      <Slider autoplay dots arrows={false}>
        {data.map((t, i) => (
          <div key={i}>
            <div style={{ background: "white", padding: "40px", borderRadius: "16px", maxWidth: "600px", margin: "auto" }}>
              <p>"{t.text}"</p>
              <b>{t.name}</b>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}


