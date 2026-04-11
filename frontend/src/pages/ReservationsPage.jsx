import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: "", type: "" });

  async function fetchReservations() {
    try {
      const res = await api.get("/api/reservations");
      setReservations(res.data);
    } catch {
      setMsg({ text: "Failed to load reservations.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchReservations(); }, []);

  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await api.delete(`/api/reservations/${id}`);
      setMsg({ text: "Reservation cancelled successfully.", type: "success" });
      fetchReservations();
    } catch (err) {
      setMsg({ text: err.response?.data?.error || "Cancel failed.", type: "error" });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            My Bookings
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your reservations and payments</p>
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
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-24 animate-pulse border border-gray-200" />
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No bookings yet</h2>
            <p className="text-gray-400 text-sm">Browse available rooms and make your first reservation.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map(r => (
              <div key={r.id} className="bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {r.room?.name ?? "Room"}
                      </h3>
                      <span className="text-xs bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded-full">
                        Room {r.room?.number}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                      <span className="flex items-center gap-1">
                        📅 <span>{r.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        🕐 <span>{r.timeSlot}</span>
                      </span>
                    </div>

                    {/* Payment info */}
                    <div className="mt-3 flex items-center gap-3">
                      {r.payment ? (
                        <>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                            {r.payment.status}
                          </span>
                          <span className="text-sm font-semibold text-gray-700">
                            ${r.payment.amount?.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">Payment info unavailable</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancel(r.id)}
                    className="text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded-lg px-4 py-2 transition whitespace-nowrap flex-shrink-0"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}