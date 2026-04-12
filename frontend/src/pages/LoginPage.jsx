import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const toastId = toast.loading("Signing in...");
    try {
      const res = await api.post("/api/auth/login", form);
      login(res.data.token);
      const decoded = jwtDecode(res.data.token);
      toast.success("Welcome back!", { id: toastId });
      navigate(decoded.role === "ADMIN" ? "/admin" : "/rooms");
    } catch (err) {
      const message = err.response?.data?.error || "Invalid email or password.";
      toast.error(message, { id: toastId });
      setError(message);
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
      <div style={{ width: "100%", maxWidth: "440px" }}>
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
            Welcome back
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            Sign in to your ReserveHub account
          </p>
        </div>

        {/* Card */}
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

          <form onSubmit={handleSubmit}>
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
                placeholder="you@example.com"
                style={inputStyle("email")}
                value={form.email}
                onFocus={() => setFocus("email")}
                onBlur={() => setFocus("")}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.45rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#374151",
                    letterSpacing: "0.01em",
                  }}
                >
                  Password
                </label>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#3b7df8",
                    cursor: "pointer",
                  }}
                >
                  Forgot password?
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Enter your password"
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
            </div>

            {/* Sign in button */}
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
                  Signing in...
                </>
              ) : (
                "Sign in"
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

          {/* Register link */}
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#3b7df8",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Create one for free
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
          By signing in you agree to our{" "}
          <span style={{ color: "#6b7280", cursor: "pointer" }}>
            Terms of Service
          </span>{" "}
          and{" "}
          <span style={{ color: "#6b7280", cursor: "pointer" }}>
            Privacy Policy
          </span>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear,
        input[type="password"]::-webkit-credentials-auto-fill-button,
        input[type="password"]::-webkit-textfield-decoration-container { display: none !important; }
        input::-webkit-contacts-auto-fill-button,
        input::-webkit-credentials-auto-fill-button { visibility: hidden; pointer-events: none; }
    `}</style>
    </div>
  );
}
