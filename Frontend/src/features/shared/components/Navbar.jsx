import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const MoonIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const { handleLogout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : "?";

    const onLogout = async () => {
        await handleLogout();
    };

    return (
        <header
            style={{
                background: "var(--bg-card)",
                borderBottom: "1px solid var(--border)",
                position: "sticky",
                top: 0,
                zIndex: 40,
                backdropFilter: "blur(12px)",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 24px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                        style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "10px",
                            background: "var(--primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </div>
                    <span
                        className="font-display"
                        style={{
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "var(--text-primary)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Inkwell
                    </span>
                </div>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            border: "1.5px solid var(--border)",
                            background: "var(--bg-input)",
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--primary)";
                            e.currentTarget.style.color = "var(--primary)";
                            e.currentTarget.style.background = "var(--primary-glow)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.color = "var(--text-secondary)";
                            e.currentTarget.style.background = "var(--bg-input)";
                        }}
                    >
                        {theme === "light" ? <MoonIcon /> : <SunIcon />}
                    </button>

                    {/* User avatar + name */}
                    {user && (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "5px 12px 5px 5px",
                                    borderRadius: "10px",
                                    background: "var(--bg-input)",
                                    border: "1.5px solid var(--border)",
                                }}
                            >
                                <div
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "8px",
                                        background: "var(--primary)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "11px",
                                        fontWeight: "800",
                                        color: "#fff",
                                        letterSpacing: "0.05em",
                                        flexShrink: 0,
                                    }}
                                >
                                    {initials}
                                </div>
                                <span
                                    style={{
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        color: "var(--text-primary)",
                                        maxWidth: "100px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {user.username}
                                </span>
                            </div>

                            {/* Logout button */}
                            <button
                                onClick={onLogout}
                                title="Sign out"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    padding: "8px 14px",
                                    borderRadius: "10px",
                                    border: "1.5px solid var(--border)",
                                    background: "transparent",
                                    color: "var(--text-secondary)",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    flexShrink: 0,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "#E05252";
                                    e.currentTarget.style.color = "#E05252";
                                    e.currentTarget.style.background = "rgba(224,82,82,0.08)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "var(--border)";
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                <LogoutIcon />
                                <span style={{ display: "inline" }}>Sign out</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;