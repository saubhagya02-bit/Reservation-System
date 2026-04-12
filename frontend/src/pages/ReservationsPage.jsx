import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  async function fetchReservations() {
    setFetchLoading(true);
    try {
      const res = await api.get("/api/reservations");
      const data = res.data;
      if (Array.isArray(data)) {
        setReservations(data);
      } else {
        setReservations([]);
        toast.error("Unexpected response from server.");
      }
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.error || err.message || "Unknown error";
      toast.error(
        `Failed to load reservations (${status ?? "network error"}): ${message}`,
      );
      setReservations([]);
    } finally {
      setFetchLoading(false);
    }
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  async function handleCancel(id) {
    if (!window.confirm("Cancel this reservation?")) return;
    const toastId = toast.loading("Cancelling...");
    try {
      await api.delete(`/api/reservations/${id}`);
      toast.success("Reservation cancelled.", { id: toastId });
      fetchReservations();
    } catch (err) {
      toast.error(err.response?.data?.error || "Cancel failed.", {
        id: toastId,
      });
    }
  }

  const SkeletonRow = () => (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: "14px",
            width: "40%",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            marginBottom: "0.6rem",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: "11px",
            width: "60%",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <div
        style={{
          height: "32px",
          width: "72px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: "48rem", margin: "0 auto", padding: "3rem 1.5rem" }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#111827",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            My Bookings
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
            }}
          >
            {fetchLoading
              ? "Loading..."
              : `${reservations.length} reservation${reservations.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {fetchLoading ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {[1, 2, 3].map((i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 0",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>📭</div>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "0.4rem",
              }}
            >
              No bookings yet
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
              Browse available rooms and make your first reservation.
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {reservations.map((r) => (
              <div
                key={r.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 1px 4px rgba(0,0,0,0.05)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: 600,
                          color: "#111827",
                          fontSize: "0.95rem",
                        }}
                      >
                        {r.room?.name ?? "Room"}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          backgroundColor: "#eff6ff",
                          color: "#3b7df8",
                          border: "1px solid #bfdbfe",
                          borderRadius: "999px",
                          padding: "0.15rem 0.55rem",
                        }}
                      >
                        Room {r.room?.number}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1.25rem",
                        flexWrap: "wrap",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                        📅 {r.date}
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                        🕐 {r.timeSlot}
                      </span>
                    </div>
                    {r.payment ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            backgroundColor: "#f0fdf4",
                            color: "#16a34a",
                            border: "1px solid #bbf7d0",
                            borderRadius: "999px",
                            padding: "0.15rem 0.6rem",
                          }}
                        >
                          {r.payment.status}
                        </span>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            color: "#111827",
                          }}
                        >
                          ${r.payment.amount?.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                        No payment info
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleCancel(r.id)}
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#dc2626",
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "8px",
                      padding: "0.45rem 0.9rem",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fee2e2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fef2f2")
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
