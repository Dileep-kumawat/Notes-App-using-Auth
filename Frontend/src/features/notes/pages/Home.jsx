import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import Navbar from "../../shared/components/Navbar";
import NoteCard from "../components/NoteCard";
import CreateNoteModal from "../components/CreateNoteModal";
import UpdateNoteModal from "../components/UpdateNoteModal";

const PlusIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const EmptyState = ({ onNew }) => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            gap: "16px",
            textAlign: "center",
            padding: "40px 20px",
        }}
    >
        <div
            className="float-anim"
            style={{
                width: "80px",
                height: "80px",
                borderRadius: "24px",
                background: "var(--primary-glow)",
                border: "2px dashed var(--primary-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
        </div>
        <div>
            <h3
                className="font-display"
                style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "6px" }}
            >
                No notes yet
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "280px" }}>
                Capture your first thought. Click the button below to get started.
            </p>
        </div>
        <button
            onClick={onNew}
            className="btn-primary"
            style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}
        >
            <PlusIcon />
            New Note
        </button>
    </div>
);

const SkeletonCard = () => (
    <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="shimmer" style={{ height: "20px", width: "70%", borderRadius: "6px" }} />
        <div className="shimmer" style={{ height: "13px", width: "100%", borderRadius: "6px" }} />
        <div className="shimmer" style={{ height: "13px", width: "85%", borderRadius: "6px" }} />
        <div className="shimmer" style={{ height: "13px", width: "60%", borderRadius: "6px" }} />
    </div>
);

const Home = () => {
    const navigate = useNavigate();
    const [showCreate, setShowCreate] = useState(false);
    const [editNote, setEditNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const user = useSelector((state) => state.auth.user);
    const notes = useSelector((state) => state.notes.notes);
    const authLoading = useSelector((state) => state.auth.loading);
    const notesLoading = useSelector((state) => state.notes.loading);

    const { handleGetNotes, handleDeleteNote } = useNotes();

    useEffect(() => {
        if (!authLoading && !user) navigate("/login");
    }, [navigate, user, authLoading]);

    useEffect(() => {
        if (user) handleGetNotes();
    }, [user]);

    const filteredNotes = notes.filter((n) => {
        const q = searchQuery.toLowerCase();
        return (
            (n.title || "").toLowerCase().includes(q) ||
            (n.description || "").toLowerCase().includes(q)
        );
    });

    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    if (authLoading) {
        return (
            <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
                <Navbar />
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
                        {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
            <Navbar />

            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 100px" }}>
                {/* Page Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "16px",
                        flexWrap: "wrap",
                        marginBottom: "28px",
                    }}
                >
                    <div>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "600", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                            {greeting()}, {user?.username}
                        </p>
                        <h1
                            className="font-display"
                            style={{
                                fontSize: "clamp(28px, 4vw, 38px)",
                                fontWeight: "700",
                                color: "var(--text-primary)",
                                lineHeight: "1.2",
                                marginTop: "2px",
                            }}
                        >
                            Your Notes
                        </h1>
                        {notes.length > 0 && (
                            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                                {notes.length} note{notes.length !== 1 ? "s" : ""} saved
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => setShowCreate(true)}
                        className="btn-primary"
                        style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
                    >
                        <PlusIcon />
                        New Note
                    </button>
                </div>

                {/* Search */}
                {notes.length > 0 && (
                    <div style={{ position: "relative", marginBottom: "24px", maxWidth: "400px" }}>
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--text-muted)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ paddingLeft: "38px" }}
                        />
                    </div>
                )}

                {/* Notes grid / empty */}
                {notesLoading && notes.length === 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
                        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filteredNotes.length === 0 && searchQuery ? (
                    <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: "12px", opacity: 0.5 }}>
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <p style={{ fontSize: "15px", fontWeight: "600" }}>No results for &ldquo;{searchQuery}&rdquo;</p>
                        <p style={{ fontSize: "13px", marginTop: "4px" }}>Try a different search term</p>
                    </div>
                ) : notes.length === 0 ? (
                    <EmptyState onNew={() => setShowCreate(true)} />
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "18px",
                        }}
                    >
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={(n) => setEditNote(n)}
                                onDelete={handleDeleteNote}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Floating Action Button */}
            <button className="fab" onClick={() => setShowCreate(true)} title="Create new note">
                <PlusIcon />
            </button>

            {/* Modals */}
            {showCreate && <CreateNoteModal onClose={() => setShowCreate(false)} />}
            {editNote && <UpdateNoteModal note={editNote} onClose={() => setEditNote(null)} />}
        </div>
    );
};

export default Home;