import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const TIME_SLOTS = [
  "08:00-10:00", "10:00-12:00", "12:00-14:00",
  "14:00-16:00", "16:00-18:00", "18:00-20:00",
];

export default function RoomsPage() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ date: "", timeSlot: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    
    if (!user) { setLoading(false); return; }
    api.get("/api/rooms")
      .then(res => setRooms(res.data))
      .finally(() => setLoading(false));
  }, [user]);

  async function handleBook(e) {
    e.preventDefault();
    setBooking(true);
    setMsg({ text: "", type: "" });
    try {
      await api.post("/api/reservations/book", {
        roomId: selected.id,
        date: form.date,
        timeSlot: form.timeSlot,
        amount: selected.price,
      });
      setMsg({ text: "Room booked successfully!", type: "success" });
      setSelected(null);
      setForm({ date: "", timeSlot: "" });
    } catch (err) {
      setMsg({ text: err.response?.data?.error || "Booking failed.", type: "error" });
    } finally {
      setBooking(false);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Sign in to browse rooms
        </h2>
        <p className="text-gray-500 text-sm mb-6">Create a free account or log in to view and book available rooms.</p>
        <div className="flex gap-3">
          <Link to="/login" className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-sm transition">
            Sign in
          </Link>
          <Link to="/register" className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-sm transition">
            Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Available Rooms
            </h1>
            <p className="text-gray-500 text-sm mt-1">Choose a room and pick your time slot</p>
          </div>
          {user.role === "USER" && (
            <Link to="/reservations" className="text-sm text-brand-600 hover:underline font-medium">
              View my bookings →
            </Link>
          )}
        </div>

        {msg.text && (
          <div className={`text-sm rounded-lg px-4 py-3 mb-6 border ${
            msg.type === "success"
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-red-600 bg-red-50 border-red-200"
          }`}>
            {msg.text}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-200" />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <p className="text-gray-500 text-sm">No rooms available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => (
              <div key={room.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                {room.imagePath ? (
                  <img
                    src={`http://localhost:8080/api/rooms/image/${room.imagePath}`}
                    alt={room.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-44 bg-brand-50 flex items-center justify-center text-4xl text-brand-300">
                    🏨
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <h2 className="font-semibold text-gray-900 text-base">{room.name}</h2>
                    <span className="text-brand-600 font-bold text-sm">${room.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-4">
                    Room {room.number} · Capacity: {room.capacity} guests
                  </p>
                  {user.role === "USER" ? (
                    <button
                      onClick={() => { setSelected(room); setMsg({ text: "", type: "" }); }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium transition"
                    >
                      Book this room
                    </button>
                  ) : (
                    <span className="block w-full text-center text-xs text-gray-400 py-2">
                      
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Book: {selected.name}
              </h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date" required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time slot</label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={form.timeSlot}
                  onChange={e => setForm({ ...form, timeSlot: e.target.value })}
                >
                  <option value="">Select a time slot</option>
                  {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">Total payment</span>
                <span className="text-lg font-bold text-brand-600">${selected.price}</span>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button" onClick={() => setSelected(null)}
                  className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2.5 text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={booking}
                  className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2.5 text-sm hover:bg-gray-50 transition"
                >
                  {booking ? "Confirming..." : "Confirm & Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}