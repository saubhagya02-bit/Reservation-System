import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

const EMPTY = { name: "", number: "", capacity: "", price: "", image: null };

export default function AdminPage() {
  const [rooms, setRooms] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState("");

  async function fetchRooms() {
    setFetchLoading(true);
    try {
      const res = await api.get("/api/rooms");
      const data = res.data;
      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        setRooms([]);
        toast.error("Unexpected response from server.");
      }
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.error || err.message || "Unknown error";
      toast.error(
        `Failed to load rooms (${status ?? "network error"}): ${message}`,
      );
      setRooms([]);
    } finally {
      setFetchLoading(false);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  function startEdit(room) {
    setEditId(room.id);
    setForm({
      name: room.name,
      number: room.number,
      capacity: room.capacity,
      price: room.price,
      image: null,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditId(null);
    setForm(EMPTY);
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("name", form.name);
    data.append("number", form.number);
    data.append("capacity", form.capacity);
    data.append("price", form.price);
    if (form.image) data.append("image", form.image);
    try {
      if (editId) {
        await api.put(`/api/rooms/${editId}`, data);
        toast.success("Room updated successfully.");
      } else {
        await api.post("/api/rooms", data);
        toast.success("Room added successfully.");
      }
      resetForm();
      fetchRooms();
    } catch (err) {
      toast.error(err.response?.data?.error || "Operation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this room? This cannot be undone.")) return;
    const toastId = toast.loading("Deleting room...");
    try {
      await api.delete(`/api/rooms/${id}`);
      toast.success("Room deleted.", { id: toastId });
      fetchRooms();
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed.", {
        id: toastId,
      });
    }
  }

  const inputStyle = (field) => ({
    width: "100%",
    border: `1.5px solid ${focus === field ? "#3b7df8" : "#e5e7eb"}`,
    borderRadius: "8px",
    padding: "0.65rem 0.9rem",
    fontSize: "0.875rem",
    color: "#111827",
    backgroundColor: "#ffffff",
    outline: "none",
    transition: "border-color 0.15s ease",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
  });

  const SkeletonCard = () => (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "160px",
          backgroundColor: "#f3f4f6",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div style={{ padding: "1.25rem" }}>
        <div
          style={{
            height: "14px",
            width: "60%",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            marginBottom: "0.6rem",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: "11px",
            width: "80%",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
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
              Manage Rooms
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
                : `${rooms.length} room${rooms.length !== 1 ? "s" : ""} total`}
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition flex items-center gap-2"
            >
              <span className="text-lg leading-none">+</span> Add Room
            </button>
          )}
        </div>

        {showForm && (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "2rem",
              marginBottom: "2rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {editId ? "Edit Room" : "Add New Room"}
              </h2>
              <button
                onClick={resetForm}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#374151")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {[
                  {
                    label: "Room name",
                    key: "name",
                    type: "text",
                    placeholder: "e.g. Deluxe Suite",
                  },
                  {
                    label: "Room number",
                    key: "number",
                    type: "number",
                    placeholder: "e.g. 101",
                  },
                  {
                    label: "Capacity (guests)",
                    key: "capacity",
                    type: "number",
                    placeholder: "e.g. 2",
                  },
                  {
                    label: "Price per slot ($)",
                    key: "price",
                    type: "number",
                    placeholder: "e.g. 150",
                  },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {label} <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type={type}
                      required={!editId}
                      placeholder={placeholder}
                      style={inputStyle(key)}
                      value={form[key]}
                      onFocus={() => setFocus(key)}
                      onBlur={() => setFocus("")}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "1.75rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.4rem",
                  }}
                >
                  Room image{" "}
                  {editId && (
                    <span style={{ color: "#9ca3af", fontWeight: 400 }}>
                      (leave blank to keep current)
                    </span>
                  )}
                </label>
                <div
                  style={{
                    border: "1.5px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>🖼️</span>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{
                        fontSize: "0.8rem",
                        color: "#374151",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onChange={(e) =>
                        setForm({ ...form, image: e.target.files[0] })
                      }
                    />
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "#9ca3af",
                        marginTop: "0.2rem",
                      }}
                    >
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? "#93c5fd" : "#3b7df8",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    padding: "0.7rem 1.75rem",
                    border: "none",
                    borderRadius: "8px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading)
                      e.currentTarget.style.backgroundColor = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading)
                      e.currentTarget.style.backgroundColor = "#3b7df8";
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: "15px",
                          height: "15px",
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderTopColor: "#ffffff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Saving...
                    </>
                  ) : editId ? (
                    "💾 Save Changes"
                  ) : (
                    "➕ Add Room"
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#374151",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    padding: "0.7rem 1.25rem",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ffffff")
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {fetchLoading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 0",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🏨</div>
            <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
              No rooms yet. Add your first room above.
            </p>
          </div>
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
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "160px",
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
                  <h3
                    style={{
                      fontWeight: 600,
                      color: "#111827",
                      fontSize: "1rem",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {room.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        backgroundColor: "#eff6ff",
                        color: "#3b7df8",
                        border: "1px solid #bfdbfe",
                        borderRadius: "999px",
                        padding: "0.2rem 0.6rem",
                        fontWeight: 500,
                      }}
                    >
                      Room {room.number}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        backgroundColor: "#f0fdf4",
                        color: "#16a34a",
                        border: "1px solid #bbf7d0",
                        borderRadius: "999px",
                        padding: "0.2rem 0.6rem",
                        fontWeight: 500,
                      }}
                    >
                      {room.capacity} guests
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        backgroundColor: "#fefce8",
                        color: "#ca8a04",
                        border: "1px solid #fde68a",
                        borderRadius: "999px",
                        padding: "0.2rem 0.6rem",
                        fontWeight: 500,
                      }}
                    >
                      ${room.price}/slot
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => startEdit(room)}
                      style={{
                        flex: 1,
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#3b7df8",
                        backgroundColor: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        borderRadius: "8px",
                        padding: "0.5rem",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#dbeafe")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#eff6ff")
                      }
                    >
                       Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      style={{
                        flex: 1,
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#dc2626",
                        backgroundColor: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: "8px",
                        padding: "0.5rem",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fee2e2")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fef2f2")
                      }
                    >
                       Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}
