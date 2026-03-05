import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded shadow">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h1>

        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Welcome to our Reservation System. Our platform is designed to make
          booking rooms simple, fast and secure. Users can easily check room
          availability, make reservations and manage their bookings from
          anywhere.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-2 hover:shadow-xl text-center">
            <h3 className="text-xl font-bold mb-2 text-blue-600">
              Our Mission
            </h3>
            <p className="text-gray-600">
                Our mission is to provide a seamless booking experience for users
                while helping organizations manage their rooms efficiently. The
                system is built using modern technologies to ensure performance,
                security and reliability.
            </p>
            </div>

        <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-2 hover:shadow-xl text-center">
            <h3 className="text-xl font-bold mb-2 text-blue-600">
              What We Do
            </h3>
            <p className="text-gray-600">
              We provide a platform where users can browse available rooms,
              check availability in real time and manage reservations
              efficiently.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
