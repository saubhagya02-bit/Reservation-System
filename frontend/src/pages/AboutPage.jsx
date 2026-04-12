export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "5rem 1.5rem", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "42rem", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>
          About ReserveHub
        </h1>
        <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "1rem", marginBottom: "3rem" }}>
          ReserveHub is a modern room reservation platform designed to make booking
          fast, transparent, and stress-free.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1.5rem",
        }}>
          {[
            { stat: "500+", label: "Rooms available" },
            { stat: "10k+", label: "Happy guests" },
            { stat: "99%",  label: "Uptime guarantee" },
          ].map(({ stat, label }) => (
            <div
              key={label}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1.5rem",
                textAlign: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
              }}
            >
              <p style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#3b7df8",
                marginBottom: "0.25rem",
                fontFamily: "'Playfair Display', serif",
              }}>
                {stat}
              </p>
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}