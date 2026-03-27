import { useState, useEffect, useRef } from "react";
import { useNotes } from "../hooks/useNotes";
import { useSelector } from "react-redux";

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const UpdateNoteModal = ({ note, onClose }) => {
    const [formData, setFormData] = useState({
        title: note?.title || "",
        description: note?.description || "",
    });
    const { handleUpdateNote } = useNotes();
    const loading = useSelector((state) => state.notes.loading);
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current?.focus();
        titleRef.current?.select();

        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;
        const res = await handleUpdateNote(note._id, formData);
        if (res.success) onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const hasChanged =
        formData.title !== (note?.title || "") ||
        formData.description !== (note?.description || "");

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
                            Edit Note
                        </h2>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
                            Refine your thoughts
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

                {/* Accent bar showing original title */}
                <div
                    style={{
                        margin: "14px 24px 0",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: "var(--primary-glow)",
                        borderLeft: "3px solid var(--primary)",
                    }}
                >
                    <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "600" }}>
                        Editing: &ldquo;{note?.title || "Untitled"}&rdquo;
                    </span>
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
                            placeholder="Note title..."
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
                            placeholder="Your note content..."
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
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading || !formData.title.trim() || !hasChanged}
                            style={{
                                opacity: loading || !formData.title.trim() || !hasChanged ? 0.6 : 1,
                                cursor: loading || !formData.title.trim() || !hasChanged ? "not-allowed" : "pointer",
                                minWidth: "120px",
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
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                        <polyline points="7 3 7 8 15 8" />
                                    </svg>
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNoteModal;