import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          ReserveHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>

          <Link to="/rooms" className="hover:text-blue-400 transition">
            Rooms
          </Link>

          <Link to="/about" className="hover:text-blue-400 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 pb-4 space-y-3">

          <Link
            to="/"
            className="block hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/rooms"
            className="block hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Rooms
          </Link>

          <Link
            to="/about"
            className="block hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="block hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="block bg-blue-500 px-3 py-1 rounded text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block border border-white px-3 py-1 rounded text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="block w-full bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}