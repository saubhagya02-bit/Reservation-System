import { useEffect, useState } from "react";
import api from "../api/axios";

const EMPTY = { name: "", number: "", capacity: "", price: "", image: null };

export default function AdminPage() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function fetchRooms() {
    const res = await api.get("/api/rooms");
    setRooms(res.data);
  }

  useEffect(() => { fetchRooms(); }, []);

  function startEdit(room) {
    setEditId(room.id);
    setForm({ name: room.name, number: room.number, capacity: room.capacity, price: room.price, image: null });
    setShowForm(true);
    setMsg({ text: "", type: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditId(null);
    setForm(EMPTY);
    setMsg({ text: "", type: "" });
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: "", type: "" });

    const data = new FormData();
    data.append("name", form.name);
    data.append("number", form.number);
    data.append("capacity", form.capacity);
    data.append("price", form.price);
    if (form.image) data.append("image", form.image);

    try {
      if (editId) {
        await api.put(`/api/rooms/${editId}`, data);
        setMsg({ text: "Room updated successfully.", type: "success" });
      } else {
        await api.post("/api/rooms", data);
        setMsg({ text: "Room added successfully.", type: "success" });
      }
      resetForm();
      fetchRooms();
    } catch (err) {
      setMsg({ text: err.response?.data?.error || "Operation failed.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this room? This cannot be undone.")) return;
    try {
      await api.delete(`/api/rooms/${id}`);
      setMsg({ text: "Room deleted.", type: "success" });
      fetchRooms();
    } catch {
      setMsg({ text: "Delete failed.", type: "error" });
    }
  }

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Manage Rooms
            </h1>
            <p className="text-gray-500 text-sm mt-1">{rooms.length} room{rooms.length !== 1 ? "s" : ""} total</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition flex items-center gap-2"
            >
              <span className="text-lg leading-none">+</span> Add Room
            </button>
          )}
        </div>
        
        {msg.text && !showForm && (
          <div className={`text-sm rounded-lg px-4 py-3 mb-6 border ${
            msg.type === "success"
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-red-600 bg-red-50 border-red-200"
          }`}>
            {msg.text}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                {editId ? "Edit Room" : "Add New Room"}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            {msg.text && (
              <div className={`text-sm rounded-lg px-4 py-3 mb-5 border ${
                msg.type === "success"
                  ? "text-green-700 bg-green-50 border-green-200"
                  : "text-red-600 bg-red-50 border-red-200"
              }`}>
                {msg.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Room name", key: "name", type: "text", placeholder: "e.g. Deluxe Suite" },
                  { label: "Room number", key: "number", type: "number", placeholder: "e.g. 101" },
                  { label: "Capacity (guests)", key: "capacity", type: "number", placeholder: "e.g. 2" },
                  { label: "Price per slot ($)", key: "price", type: "number", placeholder: "e.g. 150" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type={type} required={!editId}
                      placeholder={placeholder}
                      className={inputCls}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room image {editId ? <span className="text-gray-400 font-normal">(leave blank to keep current)</span> : ""}
                </label>
                <input
                  type="file" accept="image/*"
                  className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                  onChange={e => setForm({ ...form, image: e.target.files[0] })}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit" disabled={loading}
                  className="bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition"
                >
                  {loading ? "Saving..." : editId ? "Update Room" : "Add Room"}
                </button>
                <button
                  type="button" onClick={resetForm}
                  className="border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Room list */}
        {rooms.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🏨</div>
            <p className="text-sm">No rooms yet. Add your first room above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rooms.map(room => (
              <div key={room.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {room.imagePath ? (
                  <img
                    src={`http://localhost:8080/api/rooms/image/${room.imagePath}`}
                    alt={room.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-brand-50 flex items-center justify-center text-4xl text-brand-200">
                    🏨
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{room.name}</h3>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Room {room.number} · {room.capacity} guests · <span className="text-brand-600 font-semibold">${room.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => startEdit(room)}
                      className="flex-1 text-sm text-brand-600 hover:text-brand-800 border border-brand-200 hover:border-brand-400 rounded-lg py-2 transition font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="flex-1 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded-lg py-2 transition font-medium"
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
    </div>
  );
}