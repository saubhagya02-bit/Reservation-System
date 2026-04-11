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

  const linkCls = (path) =>
    `text-sm font-medium transition-colors duration-150 ${
      location.pathname === path
        ? "text-white"
        : "text-white/70 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-900 border-b border-white/10 px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
        ReserveHub
      </Link>

      <div className="flex items-center gap-6">
        {!user ? (
          <>
            <Link to="/" className={linkCls("/")}>Home</Link>
            <Link to="/rooms" className={linkCls("/rooms")}>Rooms</Link>
            <Link to="/about" className={linkCls("/about")}>About</Link>
            <Link to="/contact" className={linkCls("/contact")}>Contact</Link>
            <Link to="/login" className={linkCls("/login")}>Login</Link>
            <Link
              to="/register"
              className="text-sm font-medium bg-transparent border border-white text-white px-4 py-1.5 rounded-md hover:bg-white hover:text-gray-900 transition-all duration-150"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/rooms" className={linkCls("/rooms")}>Rooms</Link>

            {user.role === "USER" && (
              <Link to="/reservations" className={linkCls("/reservations")}>
                My Bookings
              </Link>
            )}
            {user.role === "ADMIN" && (
              <Link to="/admin" className={linkCls("/admin")}>
                Manage Rooms
              </Link>
            )}

            <span className="text-white/50 text-sm hidden md:block">{user.sub}</span>

            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              user.role === "ADMIN"
                ? "bg-amber-500/20 text-amber-400"
                : "bg-brand-500/20 text-brand-300"
            }`}>
              {user.role}
            </span>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-white/70 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}