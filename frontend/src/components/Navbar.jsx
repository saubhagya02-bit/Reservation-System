import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
    setOpen(false);
  }

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      style={{
        fontSize: "0.9rem",
        textDecoration: "none",
        transition: "color 0.15s",
        color: location.pathname === to ? "#ffffff" : "rgba(255,255,255,0.7)",
        fontWeight: location.pathname === to ? 600 : 400,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color =
          location.pathname === to ? "#ffffff" : "rgba(255,255,255,0.7)")
      }
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav
        style={{
          backgroundColor: "#1f2937",
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.2rem",
            textDecoration: "none",
            fontFamily: "'Playfair Display', serif",
            flexShrink: 0,
          }}
        >
          ReserveHub
        </Link>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
          className="desktop-nav"
        >
          {!user ? (
            <>
              {navLink("/", "Home")}
              {navLink("/rooms", "Rooms")}
              {navLink("/about", "About")}
              {navLink("/contact", "Contact")}
              {navLink("/login", "Login")}
              <Link
                to="/register"
                style={{
                  fontSize: "0.875rem",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.5)",
                  padding: "0.35rem 1rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = "#1f2937";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {navLink("/rooms", "Rooms")}
              {user.role === "USER" && navLink("/reservations", "My Bookings")}
              {user.role === "ADMIN" && navLink("/admin", "Manage Rooms")}
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.sub}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px",
                  backgroundColor:
                    user.role === "ADMIN"
                      ? "rgba(245,158,11,0.15)"
                      : "rgba(255,255,255,0.12)",
                  color: user.role === "ADMIN" ? "#fbbf24" : "#e2e8f0",
                  border: `1px solid ${user.role === "ADMIN" ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.2)"}`,
                }}
              >
                {user.role}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="hamburger"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                transition: "all 0.2s",
                transform: open
                  ? i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : i === 2
                      ? "rotate(-45deg) translate(5px,-5px)"
                      : "opacity 0"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="mobile-menu"
          style={{
            backgroundColor: "#111827",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            zIndex: 99,
          }}
        >
          {!user ? (
            <>
              {["/", "/rooms", "/about", "/contact", "/login"].map(
                (path, i) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      padding: "0.4rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {["Home", "Rooms", "About", "Contact", "Login"][i]}
                  </Link>
                ),
              )}
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                style={{
                  color: "#ffffff",
                  backgroundColor: "#3b7df8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/rooms"
                onClick={() => setOpen(false)}
                style={{
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  padding: "0.4rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                Rooms
              </Link>
              {user.role === "USER" && (
                <Link
                  to="/reservations"
                  onClick={() => setOpen(false)}
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    padding: "0.4rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  My Bookings
                </Link>
              )}
              {user.role === "ADMIN" && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    padding: "0.4rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  Manage Rooms
                </Link>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "0.25rem",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                  {user.sub}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    backgroundColor:
                      user.role === "ADMIN"
                        ? "rgba(245,158,11,0.15)"
                        : "rgba(255,255,255,0.12)",
                    color: user.role === "ADMIN" ? "#fbbf24" : "#e2e8f0",
                    border: `1px solid ${user.role === "ADMIN" ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.2)"}`,
                  }}
                >
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "1px solid rgba(239,68,68,0.4)",
                  color: "#f87171",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  padding: "0.6rem",
                  borderRadius: "8px",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  );
}
