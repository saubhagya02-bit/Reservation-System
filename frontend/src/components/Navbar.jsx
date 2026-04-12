import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const activeStyle  = { color: "#ffffff", fontWeight: 600, textDecoration: "none", fontSize: "0.875rem" };
  const normalStyle  = { color: "#d1d5db", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.15s" };

  function linkStyle(path) {
    return location.pathname === path ? activeStyle : normalStyle;
  }

  return (
    <nav style={{ backgroundColor: "#1f2937", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
      <Link to="/" style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.25rem", textDecoration: "none", letterSpacing: "-0.01em" }}>
        ReserveHub
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
        {!user ? (
          <>
            <Link to="/"        style={linkStyle("/")}>Home</Link>
            <Link to="/rooms"   style={linkStyle("/rooms")}>Rooms</Link>
            <Link to="/about"   style={linkStyle("/about")}>About</Link>
            <Link to="/contact" style={linkStyle("/contact")}>Contact</Link>
            <Link to="/login"   style={linkStyle("/login")}>Login</Link>
            <Link
              to="/register"
              style={{ color: "#ffffff", border: "1px solid #ffffff", padding: "0.375rem 1rem", borderRadius: "4px", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.color = "#1f2937"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#ffffff"; }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/rooms" style={linkStyle("/rooms")}>Rooms</Link>
            {user.role === "USER"  && <Link to="/reservations" style={linkStyle("/reservations")}>My Bookings</Link>}
            {user.role === "ADMIN" && <Link to="/admin"        style={linkStyle("/admin")}>Manage Rooms</Link>}
            <span style={{
              fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.7rem", borderRadius: "999px",
              backgroundColor: user.role === "ADMIN" ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.12)",
              color: user.role === "ADMIN" ? "#fbbf24" : "#e2e8f0",
              border: `1px solid ${user.role === "ADMIN" ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.2)"}`,
            }}>
              {user.role}
            </span>
            <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>{user.sub}</span>
            <button
              onClick={handleLogout}
              style={{ color: "#d1d5db", background: "none", border: "none", fontSize: "0.875rem", cursor: "pointer" }}
              onMouseEnter={e => e.target.style.color = "#f87171"}
              onMouseLeave={e => e.target.style.color = "#d1d5db"}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}