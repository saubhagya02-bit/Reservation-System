import { Link } from "react-router-dom";

const features = [
  {
    icon: "⚡",
    title: "Easy Booking",
    desc: "Reserve your room quickly with a few simple clicks.",
  },
  {
    icon: "📅",
    title: "Real-time Availability",
    desc: "See available rooms instantly and make reservations anytime.",
  },
  {
    icon: "✅",
    title: "Instant Confirmation",
    desc: "Receive immediate confirmation after booking your room with secure processing.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <section
        style={{
          backgroundColor: "#3b7df8",
          padding: "8rem 1.5rem",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          Welcome to ReserveHub
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.90)",
            fontSize: "1.125rem",
            maxWidth: "38rem",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Book rooms easily and manage your reservations with our simple and
          secure reservation system.
        </p>
        <Link
          to="/rooms"
          style={{
            display: "inline-block",
            backgroundColor: "#ffffff",
            color: "#2563eb",
            fontWeight: 600,
            fontSize: "1rem",
            padding: "0.75rem 2.5rem",
            borderRadius: "6px",
            textDecoration: "none",
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          }}
        >
          Browse Rooms
        </Link>
      </section>

      <section style={{ backgroundColor: "#f3f4f6", padding: "5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "64rem",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "0.5rem",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white py-16 px-6 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ready to get started?
        </h2>
        <p className="text-white/60 mb-8 text-sm">
          Create an account and book your first room in minutes.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/register"
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-7 py-3 rounded-md transition text-sm"
          >
            Create account
          </Link>
          <Link
            to="/login"
            className="border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-md transition text-sm"
          >
            Sign in
          </Link>
        </div>
      </section>
    </div>
  );
}
