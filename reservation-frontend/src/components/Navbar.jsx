import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold tracking-wide">
            Bookify
          </Link>

          {/* Right Side Links */}
          <div className="flex items-center space-x-8">
            
            {/* Public Links */}
            <Link
              to="/about"
              className="text-white hover:text-gray-200 transition"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="text-white hover:text-gray-200 transition"
            >
              Contact Us
            </Link>

            {/* Auth Section */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}