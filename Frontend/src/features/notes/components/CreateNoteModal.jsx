import { useState, useEffect, useRef } from "react";
import { useNotes } from "../hooks/useNotes";
import { useSelector } from "react-redux";

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const CreateNoteModal = ({ onClose }) => {
    const [formData, setFormData] = useState({ title: "", description: "" });
    const { handleCreateNote } = useNotes();
    const loading = useSelector((state) => state.notes.loading);
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current?.focus();

        // Close on Escape
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;
        const res = await handleCreateNote(formData);
        if (res.success) onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-box">
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "22px 24px 0",
                    }}
                >
                    <div>
                        <h2
                            className="font-display"
                            style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)" }}
                        >
                            New Note
                        </h2>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
                            Capture your thoughts
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "9px",
                            border: "1.5px solid var(--border)",
                            background: "var(--bg-input)",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.15s",
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
                        <CloseIcon />
                    </button>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "var(--border)", margin: "18px 0 0" }} />

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: "12px",
                                fontWeight: "700",
                                color: "var(--text-muted)",
                                letterSpacing: "0.07em",
                                textTransform: "uppercase",
                                marginBottom: "6px",
                            }}
                        >
                            Title
                        </label>
                        <input
                            ref={titleRef}
                            className="input-field"
                            type="text"
                            placeholder="Give your note a title..."
                            value={formData.title}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, title: e.target.value }))
                            }
                        />
                    </div>

                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: "12px",
                                fontWeight: "700",
                                color: "var(--text-muted)",
                                letterSpacing: "0.07em",
                                textTransform: "uppercase",
                                marginBottom: "6px",
                            }}
                        >
                            Description
                        </label>
                        <textarea
                            className="input-field"
                            placeholder="Write something meaningful..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, description: e.target.value }))
                            }
                            style={{
                                resize: "vertical",
                                minHeight: "120px",
                                lineHeight: "1.6",
                            }}
                        />
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "4px" }}>
                        <button type="button" onClick={onClose} className="btn-ghost">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading || !formData.title.trim()}
                            style={{
                                opacity: loading || !formData.title.trim() ? 0.6 : 1,
                                cursor: loading || !formData.title.trim() ? "not-allowed" : "pointer",
                                minWidth: "110px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                            }}
                        >
                            {loading ? (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                        <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round">
                                            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.7s" repeatCount="indefinite" />
                                        </path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    Create Note
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNoteModal;