import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20 text-gray-600">Loading...</div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border p-4 rounded shadow hover:shadow-lg transition duration-200"
          >
            <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
            <Link
              to={`/calendar/${room.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
