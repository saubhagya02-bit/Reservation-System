import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const TIME_SLOTS = [
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
  "18:00-20:00",
];

export default function RoomsPage() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ date: "", timeSlot: "" });
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    api
      .get("/api/rooms")
      .then((res) => setRooms(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        const status = err.response?.status;
        toast.error(`Failed to load rooms (${status ?? "network error"})`);
        setRooms([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  async function handleBook(e) {
    e.preventDefault();
    setBooking(true);
    const toastId = toast.loading("Confirming booking...");
    try {
      await api.post("/api/reservations/book", {
        roomId: selected.id,
        date: form.date,
        timeSlot: form.timeSlot,
        amount: selected.price,
      });
      toast.success("Room booked successfully!", { id: toastId });
      setSelected(null);
      setForm({ date: "", timeSlot: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Booking failed.", {
        id: toastId,
      });
    } finally {
      setBooking(false);
    }
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3f4f6",
          textAlign: "center",
          padding: "2rem",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "0.5rem",
          }}
        >
          Sign in to browse rooms
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            marginBottom: "1.5rem",
          }}
        >
          Create a free account or log in to view and book available rooms.
        </p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link
            to="/login"
            style={{
              backgroundColor: "#3b7df8",
              color: "#ffffff",
              fontWeight: 600,
              padding: "0.625rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "0.875rem",
            }}
          >
            Sign in
          </Link>
          <Link
            to="/register"
            style={{
              backgroundColor: "#ffffff",
              color: "#374151",
              fontWeight: 600,
              padding: "0.625rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "0.875rem",
              border: "1px solid #e5e7eb",
            }}
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: "72rem", margin: "0 auto", padding: "3rem 1.5rem" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#111827",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Available Rooms
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              Choose a room and pick your time slot
            </p>
          </div>
          {user.role === "USER" && (
            <Link
              to="/reservations"
              style={{
                color: "#3b7df8",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              View my bookings →
            </Link>
          )}
        </div>

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  height: "280px",
                  border: "1px solid #e5e7eb",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            No rooms available at the moment.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {rooms.map((room) => (
              <div
                key={room.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.10)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 1px 4px rgba(0,0,0,0.06)")
                }
              >
                {room.imagePath ? (
                  <img
                    src={`http://localhost:8080/api/rooms/image/${room.imagePath}`}
                    alt={room.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "180px",
                      backgroundColor: "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                    }}
                  >
                    🏨
                  </div>
                )}
                <div style={{ padding: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.35rem",
                    }}
                  >
                    <h2
                      style={{
                        fontWeight: 600,
                        color: "#111827",
                        fontSize: "1rem",
                      }}
                    >
                      {room.name}
                    </h2>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#3b7df8",
                        fontSize: "0.9rem",
                      }}
                    >
                      ${room.price}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.78rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Room {room.number} · {room.capacity} guests
                  </p>
                  {user.role === "USER" ? (
                    <button
                      onClick={() => {
                        setSelected(room);
                        setForm({ date: "", timeSlot: "" });
                      }}
                      style={{
                        width: "100%",
                        backgroundColor: "#3b7df8",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        padding: "0.6rem",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2563eb")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3b7df8")
                      }
                    >
                      Book this room
                    </button>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                      }}
                    ></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "2rem",
              width: "100%",
              maxWidth: "440px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Book: {selected.name}
              </h2>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
            <form
              onSubmit={handleBook}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.4rem",
                  }}
                >
                  Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  style={{
                    width: "100%",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "0.65rem 0.9rem",
                    fontSize: "0.875rem",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    boxSizing: "border-box",
                  }}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.4rem",
                  }}
                >
                  Time slot
                </label>
                <select
                  required
                  style={{
                    width: "100%",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "0.65rem 0.9rem",
                    fontSize: "0.875rem",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                  }}
                  value={form.timeSlot}
                  onChange={(e) =>
                    setForm({ ...form, timeSlot: e.target.value })
                  }
                >
                  <option value="">Select a time slot</option>
                  {TIME_SLOTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  Total payment
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#3b7df8",
                  }}
                >
                  ${selected.price}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  style={{
                    flex: 1,
                    border: "1.5px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                    color: "#374151",
                    borderRadius: "8px",
                    padding: "0.7rem",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={booking}
                  style={{
                    flex: 1,
                    backgroundColor: booking ? "#93c5fd" : "#3b7df8",
                    color: "#ffffff",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.7rem",
                    fontSize: "0.875rem",
                    cursor: booking ? "not-allowed" : "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!booking)
                      e.currentTarget.style.backgroundColor = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    if (!booking)
                      e.currentTarget.style.backgroundColor = "#3b7df8";
                  }}
                >
                  {booking ? "Confirming..." : "Confirm & Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
