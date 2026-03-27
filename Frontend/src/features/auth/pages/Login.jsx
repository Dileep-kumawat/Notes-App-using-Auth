import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../../shared/context/ThemeContext";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const EyeIcon = ({ show }) =>
  show ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.length > 0 && formData.password.length > 0) {
      const res = await handleLogin(formData);
      if (res.success) navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* Left decorative panel */}
      <div
        className="auth-panel"
        style={{
          flex: "1",
          display: "none",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px",
          position: "relative",
          minWidth: "420px",
        }}
        // Shown via media query workaround using inline style + JS
        ref={(el) => {
          if (el) {
            el.style.display = window.innerWidth >= 900 ? "flex" : "none";
          }
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 2 }}>
          <div
            style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <span className="font-display" style={{ fontSize: "24px", fontWeight: "700", color: "#fff" }}>
            Inkwell
          </span>
        </div>

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Welcome back
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "700", color: "#fff", lineHeight: "1.15", marginBottom: "20px" }}
          >
            Your thoughts,<br />beautifully kept.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", maxWidth: "340px" }}>
            A quiet place to capture ideas, reflect on your day, and organise everything that matters to you.
          </p>

          {/* Decorative dots */}
          <div style={{ display: "flex", gap: "8px", marginTop: "32px" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 1 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: i === 1 ? "#fff" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "24px" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", fontStyle: "italic" }}>
            &ldquo;The palest ink is better than the best memory.&rdquo;
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}>— Chinese Proverb</p>
        </div>
      </div>

      {/* Right: form panel */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Theme toggle (top right) */}
        <button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            width: "38px", height: "38px",
            borderRadius: "10px",
            border: "1.5px solid var(--border)",
            background: "var(--bg-input)",
            color: "var(--text-muted)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.color = "var(--primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>

        <div style={{ width: "100%", maxWidth: "380px" }}>
          {/* Mobile brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <span className="font-display" style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>
              Inkwell
            </span>
          </div>

          <h1
            className="font-display"
            style={{ fontSize: "32px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "6px" }}
          >
            Sign in
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "28px" }}>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--primary)", fontWeight: "700", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Create one
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                background: "rgba(224,82,82,0.1)",
                border: "1.5px solid rgba(224,82,82,0.3)",
                color: "#E05252",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>
                Email
              </label>
              <input
                className="input-field"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                required
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className="input-field"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  required
                  onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                  style={{ paddingRight: "44px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  style={{
                    position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-muted)", display: "flex", alignItems: "center",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <EyeIcon show={showPass} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                fontSize: "15px",
                marginTop: "4px",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.7s" repeatCount="indefinite" />
                    </path>
                  </svg>
                  Signing in...
                </>
              ) : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <Link
            to="/register"
            style={{ display: "block", textDecoration: "none" }}
          >
            <button
              className="btn-ghost"
              style={{ width: "100%", padding: "12px", fontSize: "14px" }}
            >
              Create a new account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;