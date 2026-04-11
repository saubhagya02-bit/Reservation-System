import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-lg mx-auto">
        <h1
          className="text-4xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Contact us
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Have a question? We'd love to hear from you.
        </p>

        {sent ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-6 text-center text-sm">
            Thanks for reaching out! We'll get back to you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-4">
            {[
              { label: "Your name", type: "text" },
              { label: "Email", type: "email" },
            ].map(({ label, type }) => (
              <div key={label}>
                <label className="block text-sm text-gray-600 mb-1">{label}</label>
                <input type={type} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            ))}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Message</label>
              <textarea rows={4} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
            </div>
            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2.5 text-sm font-medium transition">
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}