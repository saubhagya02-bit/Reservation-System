import { useState } from "react";

const contactDetails = [
  {
    icon: "📍",
    title: "Our Address",
    lines: ["123 Reserve Street", "Colombo 03, Sri Lanka"],
  },
  {
    icon: "📞",
    title: "Phone",
    lines: ["+94 11 234 5678", "+94 77 890 1234"],
  },
  {
    icon: "✉️",
    title: "Email",
    lines: ["hello@reservehub.com", "support@reservehub.com"],
  },
  {
    icon: "🕐",
    title: "Working Hours",
    lines: ["Monday – Friday: 9am – 6pm", "Saturday: 10am – 4pm"],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "5rem 1.5rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Page heading */}
        <div style={{ marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "0.5rem",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Contact us
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
            Have a question? We'd love to hear from you.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* LEFT — Contact details */}
          <div
            style={{
              backgroundColor: "#1f2937",
              borderRadius: "16px",
              padding: "2.5rem 2rem",
              color: "#ffffff",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "0.5rem",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Get in touch
            </h2>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.875rem",
                marginBottom: "2.5rem",
                lineHeight: 1.6,
              }}
            >
              Reach out to us through any of the channels below and we'll get
              back to you as soon as possible.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
              }}
            >
              {contactDetails.map(({ icon, title, lines }) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(59,125,248,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                        marginBottom: "0.25rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {title}
                    </p>
                    {lines.map((line) => (
                      <p
                        key={line}
                        style={{
                          fontSize: "0.875rem",
                          color: "#f3f4f6",
                          lineHeight: 1.6,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                margin: "2.5rem 0 1.5rem",
              }}
            />

            {/* Social links */}
            <p
              style={{
                fontSize: "0.75rem",
                color: "#9ca3af",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Follow us
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["𝕏", "in", "f"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                    color: "#d1d5db",
                    cursor: "pointer",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(59,125,248,0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.08)")
                  }
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Contact form */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "2.5rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message sent!
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  style={{
                    marginTop: "1.5rem",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.6rem 1.5rem",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "0.25rem",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Send a message
                </h2>
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    marginBottom: "2rem",
                  }}
                >
                  Fill in the form below and we'll respond promptly.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Name + Email row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "#374151",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Your name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        style={inputStyle("name")}
                        value={form.name}
                        onFocus={() => setFocus("name")}
                        onBlur={() => setFocus("")}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "#374151",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Email <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        style={inputStyle("email")}
                        value={form.email}
                        onFocus={() => setFocus("email")}
                        onBlur={() => setFocus("")}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Subject <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help?"
                      style={inputStyle("subject")}
                      value={form.subject}
                      onFocus={() => setFocus("subject")}
                      onBlur={() => setFocus("")}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "#374151",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Message <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      style={{
                        ...inputStyle("message"),
                        resize: "vertical",
                        lineHeight: 1.6,
                      }}
                      value={form.message}
                      onFocus={() => setFocus("message")}
                      onBlur={() => setFocus("")}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      backgroundColor: "#3b7df8",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      padding: "0.8rem",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      transition: "background-color 0.15s ease",
                      letterSpacing: "0.01em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#2563eb")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#3b7df8")
                    }
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
