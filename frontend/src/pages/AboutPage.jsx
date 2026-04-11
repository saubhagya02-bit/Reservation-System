export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1
          className="text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          About ReserveHub
        </h1>
        <p className="text-gray-500 leading-relaxed text-base">
          ReserveHub is a modern room reservation platform designed to make
          booking fast, transparent, and stress-free. Whether you need a meeting
          room, event space, or private suite — we've got you covered.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { stat: "500+", label: "Rooms available" },
            { stat: "10k+", label: "Happy guests" },
            { stat: "99%", label: "Uptime guarantee" },
          ].map(({ stat, label }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-brand-600" style={{ fontFamily: "'Playfair Display', serif" }}>{stat}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}