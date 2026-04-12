import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Password strength checker
  function getStrength(pwd) {
    if (!pwd) return null;
    if (pwd.length < 6) return { level: 1, label: "Weak", color: "#ef4444" };
    if (pwd.length < 10) return { level: 2, label: "Fair", color: "#f59e0b" };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd))
      return { level: 4, label: "Strong", color: "#22c55e" };
    return { level: 3, label: "Good", color: "#3b7df8" };
  }

  const strength = getStrength(form.password);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/api/auth/register", form);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (field) => ({
    width: "100%",
    border: `1.5px solid ${focus === field ? "#3b7df8" : "#e5e7eb"}`,
    borderRadius: "8px",
    padding: "0.7rem 1rem",
    fontSize: "0.9rem",
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "0.5rem",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Create account
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            Join ReserveHub today — it's free
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "2.5rem",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >
          {/* Error */}
          {error && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: "0.85rem",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#16a34a",
                fontSize: "0.85rem",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>✅</span> {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full name */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.45rem",
                  letterSpacing: "0.01em",
                }}
              >
                Full name
              </label>
              <input
                type="text"
                required
                placeholder="Enter Full Name"
                style={inputStyle("name")}
                value={form.name}
                onFocus={() => setFocus("name")}
                onBlur={() => setFocus("")}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.45rem",
                  letterSpacing: "0.01em",
                }}
              >
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="Your Email"
                style={inputStyle("email")}
                value={form.email}
                onFocus={() => setFocus("email")}
                onBlur={() => setFocus("")}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.45rem",
                  letterSpacing: "0.01em",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Min. 8 characters"
                  style={{ ...inputStyle("password"), paddingRight: "3rem" }}
                  value={form.password}
                  onFocus={() => setFocus("password")}
                  onBlur={() => setFocus("")}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "0.85rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "#9ca3af",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Password strength bar */}
              {form.password && strength && (
                <div style={{ marginTop: "0.6rem" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: "4px",
                          borderRadius: "99px",
                          backgroundColor:
                            i <= strength.level ? strength.color : "#e5e7eb",
                          transition: "background-color 0.2s",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: strength.color,
                      fontWeight: 500,
                    }}
                  >
                    {strength.label} password
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: loading ? "#93c5fd" : "#3b7df8",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.95rem",
                padding: "0.8rem",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "background-color 0.15s ease",
                letterSpacing: "0.01em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#3b7df8";
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "#ffffff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "1.75rem 0",
            }}
          >
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }}
            />
            <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>OR</span>
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }}
            />
          </div>

          {/* Login link */}
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#3b7df8",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "#9ca3af",
            marginTop: "1.5rem",
          }}
        >
          By creating an account you agree to our{" "}
          <span style={{ color: "#6b7280", cursor: "pointer" }}>
            Terms of Service
          </span>{" "}
          and{" "}
          <span style={{ color: "#6b7280", cursor: "pointer" }}>
            Privacy Policy
          </span>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
