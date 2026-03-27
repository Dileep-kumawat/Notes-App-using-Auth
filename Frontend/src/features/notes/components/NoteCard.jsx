import { useState } from "react";

const EditIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const TrashIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
);

const NoteCard = ({ note, onEdit, onDelete }) => {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        await onDelete(note._id);
        setDeleting(false);
    };

    // Format date
    const dateStr = note.createdAt
        ? new Date(note.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : null;

    return (
        <div
            className="card"
            style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Top accent line */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "20px",
                    right: "20px",
                    height: "2px",
                    background: "linear-gradient(90deg, var(--primary), transparent)",
                    borderRadius: "0 0 2px 2px",
                    opacity: 0.5,
                }}
            />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                <h3
                    className="font-display"
                    style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "var(--text-primary)",
                        lineHeight: "1.3",
                        flex: 1,
                        wordBreak: "break-word",
                    }}
                >
                    {note.title || "Untitled"}
                </h3>

                {/* Actions */}
                <div style={{ display: "flex", gap: "6px", flexShrink: 0, marginTop: "2px" }}>
                    <button
                        onClick={() => onEdit(note)}
                        title="Edit note"
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "8px",
                            border: "1.5px solid var(--border)",
                            background: "var(--bg-input)",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.18s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--primary)";
                            e.currentTarget.style.color = "var(--primary)";
                            e.currentTarget.style.background = "var(--primary-glow)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.color = "var(--text-muted)";
                            e.currentTarget.style.background = "var(--bg-input)";
                        }}
                    >
                        <EditIcon />
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        title="Delete note"
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "8px",
                            border: "1.5px solid var(--border)",
                            background: "var(--bg-input)",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: deleting ? "not-allowed" : "pointer",
                            transition: "all 0.18s",
                            opacity: deleting ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!deleting) {
                                e.currentTarget.style.borderColor = "#E05252";
                                e.currentTarget.style.color = "#E05252";
                                e.currentTarget.style.background = "rgba(224,82,82,0.08)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.color = "var(--text-muted)";
                            e.currentTarget.style.background = "var(--bg-input)";
                        }}
                    >
                        {deleting ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="9" opacity="0.3" />
                                <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round">
                                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                                </path>
                            </svg>
                        ) : (
                            <TrashIcon />
                        )}
                    </button>
                </div>
            </div>

            {/* Description */}
            {note.description && (
                <p
                    style={{
                        fontSize: "13.5px",
                        color: "var(--text-secondary)",
                        lineHeight: "1.6",
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {note.description}
                </p>
            )}

            {/* Footer */}
            {dateStr && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                        paddingTop: "10px",
                        borderTop: "1px solid var(--border)",
                    }}
                >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>
                        {dateStr}
                    </span>
                </div>
            )}
        </div>
    );
};

export default NoteCard;