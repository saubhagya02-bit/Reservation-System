import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center text-center py-24 bg-blue-500 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to ReserveHub</h1>

        <p className="text-lg mb-6 max-w-xl">
          Book rooms easily and manage your reservations with our simple and
          secure reservation system.
        </p>

        <Link
          to="/rooms"
          className="bg-white text-blue-500 font-semibold px-6 py-3 rounded hover:bg-gray-200"
        >
          Browse Rooms
        </Link>
      </div>

      <div className="py-16 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-2 hover:shadow-xl text-center">
          <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
          <p>Reserve your room quickly with a few simple clicks.</p>
        </div>

        <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-2 hover:shadow-xl text-center">
          <h3 className="text-xl font-bold mb-2">Real-time Availability</h3>
          <p>See available rooms instantly and make reservations anytime.</p>
        </div>

        <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-2 hover:shadow-xl text-center">
          <h3 className="text-xl font-bold mb-2">Instant Confirmation</h3>
          <p>
            Receive immediate confirmation after booking your room with secure
            processing.
          </p>
        </div>
      </div>
    </div>
  );
}
