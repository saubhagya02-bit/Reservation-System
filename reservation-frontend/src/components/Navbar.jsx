import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

  return (
    <nav className='bg-gray-800 text-white p-4 flex justify-between'>
        <div className='space-x-4'>
            <Link to="/rooms">Rooms</Link>
            <Link to="/my-reservations">My Reservations</Link>
        </div>

        {token ? (
            <button onClick={logout} className='bg-red-500 px-3 py-1 rounded'>
                Logout
            </button>
        ) : (
            <Link to="/login">Login</Link>
        )}
    </nav>
  );
}
