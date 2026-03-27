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

const CheckItem = ({ text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div
      style={{
        width: "20px", height: "20px", borderRadius: "6px",
        background: "rgba(255,255,255,0.2)", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.82)" }}>{text}</span>
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.length > 0 && formData.password.length > 0 && formData.username.length > 0) {
      const res = await handleRegister(formData);
      if (res.success) navigate("/");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

      {/* Right: form panel (first on mobile) */}
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
          order: 1,
        }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            position: "absolute", top: "24px", right: "24px",
            width: "38px", height: "38px", borderRadius: "10px",
            border: "1.5px solid var(--border)", background: "var(--bg-input)",
            color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>

        <div style={{ width: "100%", maxWidth: "380px" }}>
          {/* Brand */}
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

          <h1 className="font-display" style={{ fontSize: "32px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "6px" }}>
            Create account
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "28px" }}>
            Already have one?{" "}
            <Link
              to="/login"
              style={{ color: "var(--primary)", fontWeight: "700", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Sign in
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "10px 14px", borderRadius: "10px",
                background: "rgba(224,82,82,0.1)", border: "1.5px solid rgba(224,82,82,0.3)",
                color: "#E05252", fontSize: "13px", fontWeight: "600",
                marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px",
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
            {/* Username */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>
                Username
              </label>
              <input
                className="input-field"
                type="text"
                placeholder="Pick a username"
                value={formData.username}
                required
                onChange={(e) => setFormData((p) => ({ ...p, username: e.target.value }))}
              />
            </div>

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
                  placeholder="Create a strong password"
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
                    color: "var(--text-muted)", display: "flex", alignItems: "center", transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <EyeIcon show={showPass} />
                </button>
              </div>

              {/* Password strength bar */}
              {formData.password.length > 0 && (
                <div style={{ marginTop: "8px" }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1, height: "3px", borderRadius: "2px",
                          background: formData.password.length >= i * 3
                            ? i <= 1 ? "#E05252" : i <= 2 ? "#E8A642" : i <= 3 ? "#6BCB77" : "var(--primary)"
                            : "var(--border)",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                    {formData.password.length < 4 ? "Weak" : formData.password.length < 7 ? "Fair" : formData.password.length < 10 ? "Good" : "Strong"} password
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%", padding: "13px", fontSize: "15px", marginTop: "4px",
                opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.7s" repeatCount="indefinite" />
                    </path>
                  </svg>
                  Creating account...
                </>
              ) : "Create account"}
            </button>
          </form>

          <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginTop: "20px" }}>
            By creating an account, you agree to our{" "}
            <span style={{ color: "var(--primary)", cursor: "pointer" }}>Terms of Service</span>
          </p>
        </div>
      </div>

      {/* Left decorative panel */}
      <div
        className="auth-panel"
        style={{
          flex: "1",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px",
          position: "relative",
          minWidth: "420px",
          order: 2,
          display: "none",
        }}
        ref={(el) => {
          if (el) el.style.display = window.innerWidth >= 900 ? "flex" : "none";
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 2 }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
            Start today
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "700", color: "#fff", lineHeight: "1.15", marginBottom: "24px" }}
          >
            Every great journey<br />starts with a note.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <CheckItem text="Capture ideas instantly" />
            <CheckItem text="Organise everything in one place" />
            <CheckItem text="Access from anywhere, anytime" />
            <CheckItem text="Your data stays private and safe" />
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            position: "relative", zIndex: 2,
            display: "flex", gap: "24px",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "24px",
          }}
        >
          {[["∞", "Notes"], ["🔒", "Private"], ["⚡", "Fast"]].map(([val, label]) => (
            <div key={label}>
              <p style={{ fontSize: "22px", fontWeight: "700", color: "#fff" }}>{val}</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "2px" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;