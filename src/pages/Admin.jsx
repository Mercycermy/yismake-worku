import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import MediaRenderer from "../components/MediaRenderer";

const NEWS_API = "/api/news";
const BOOKS_API = "/api/books";
const ADMIN_KEY = "author-admin-2026";
const VERIFY_BASE = window.location.origin + "/verify?code=";

async function readApiResponse(res) {
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await res.json()
        : { error: (await res.text()).trim() };

    if (!res.ok) {
        throw new Error(data.error || `Server returned HTTP ${res.status}`);
    }
    return data;
}

export default function Admin() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [tab, setTab] = useState("news"); // "news" | "books"

    /* ─── News State ─── */
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        title: "", excerpt: "", body: "", category: "News", image: "", gallery: []
    });
    const [uploading, setUploading] = useState(false);

    /* ─── Book Codes State ─── */
    const [bookCodes, setBookCodes] = useState([]);
    const [genForm, setGenForm] = useState({ bookTitle: "", quantity: 1 });
    const [qrModal, setQrModal] = useState(null); // code string to show
    const qrRef = useRef(null);

    // Advanced filtering & selection states
    const [selectedCodes, setSelectedCodes] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [timeFilter, setTimeFilter] = useState("all");

    const headers = {
        "Content-Type": "application/json",
        "x-admin-key": ADMIN_KEY,
    };

    /* ═══ NEWS LOGIC ═══ */
    const fetchNews = () => {
        fetch(NEWS_API)
            .then((r) => r.json())
            .then(setItems)
            .catch(() => setItems([]));
    };

    const resetForm = () => {
        setForm({ title: "", excerpt: "", body: "", category: "News", image: "", gallery: [] });
        setEditing(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date().toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
        });
        try {
            const url = editing ? `${NEWS_API}/${editing}` : NEWS_API;
            const method = editing ? "PUT" : "POST";
            const res = await fetch(url, {
                method, headers, body: JSON.stringify({ ...form, date }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            resetForm();
            fetchNews();
        } catch (err) {
            alert("Failed to save post: " + err.message);
        }
    };

    const handleEdit = (item) => {
        setEditing(item.id);
        setForm({
            title: item.title, excerpt: item.excerpt,
            body: item.body || "", category: item.category,
            image: item.image || "",
            gallery: item.gallery || []
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDeleteNews = async (id) => {
        if (!confirm("Delete this post?")) return;
        try {
            const res = await fetch(`${NEWS_API}/${id}`, { method: "DELETE", headers });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            fetchNews();
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    const handleDeleteAllNews = async () => {
        if (!confirm("Are you sure you want to delete ALL posts? This cannot be undone.")) return;
        try {
            const res = await fetch(NEWS_API, { method: "DELETE", headers });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            fetchNews();
        } catch (err) {
            alert("Delete all failed: " + err.message);
        }
    };

    const onChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    /* ═══ BOOK CODES LOGIC ═══ */
    const fetchBooks = () => {
        fetch(BOOKS_API, { headers })
            .then((r) => r.json())
            .then((data) => {
                setBookCodes(data);
                setSelectedCodes([]);
            })
            .catch(() => setBookCodes([]));
    };

    const downloadBlob = (blob, filename) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    const downloadSelectedZIP = async () => {
        const validSelection = selectedCodes.filter((id) => bookCodes.some((b) => b.id === id));
        if (validSelection.length === 0) return alert("Please select at least one code to download.");
        const selectedBookCodes = bookCodes
            .filter((book) => validSelection.includes(book.id))
            .map((book) => book.code);
        try {
            const res = await fetch(`${BOOKS_API}/download-selected`, {
                method: "POST",
                headers,
                body: JSON.stringify({ ids: selectedBookCodes })
            });
            if (!res.ok) {
                let message = "ZIP generation for selection failed";
                try {
                    const data = await res.json();
                    if (data.error) message = data.error;
                } catch {
                    // Keep the generic message when the server did not return JSON.
                }
                throw new Error(message);
            }
            const blob = await res.blob();
            downloadBlob(blob, `QR-Codes-Selected-${new Date().toISOString().split('T')[0]}.zip`);
        } catch (err) {
            alert("Download failed: " + err.message);
        }
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!genForm.bookTitle.trim()) return alert("Please enter a book title.");
        try {
            const res = await fetch(`${BOOKS_API}/generate`, {
                method: "POST", headers,
                body: JSON.stringify(genForm),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            alert(`Generated ${data.count} code(s) successfully!`);
            setGenForm({ bookTitle: "", quantity: 1 });
            fetchBooks();
        } catch (err) {
            alert("Generate failed: " + err.message);
        }
    };

    const handleDeleteCode = async (id) => {
        if (!confirm("Delete this code?")) return;
        try {
            const res = await fetch(`${BOOKS_API}/${id}`, { method: "DELETE", headers });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            fetchBooks();
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    const handleDeleteAllCodes = async () => {
        if (!confirm("Are you sure you want to delete ALL book codes? This cannot be undone.")) return;
        try {
            const res = await fetch(BOOKS_API, { method: "DELETE", headers });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            fetchBooks();
        } catch (err) {
            alert("Delete all failed: " + err.message);
        }
    };

    const downloadCSV = () => {
        const targetCodes = selectedCodes.length > 0
            ? bookCodes.filter(b => selectedCodes.includes(b.id))
            : getFilteredCodes();

        if (targetCodes.length === 0) return alert("No codes to download.");
        const headers = ["ID", "Code", "Book Title", "Status", "Scans", "Verification Link"];
        const rows = targetCodes.map(b => [
            b.id, b.code, b.bookTitle, b.status, b.scans, VERIFY_BASE + b.code
        ]);
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
        const isSelection = selectedCodes.length > 0;
        const isFiltered = getFilteredCodes().length < bookCodes.length;
        const prefix = isSelection ? "selected_" : isFiltered ? "filtered_" : "";
        downloadBlob(blob, `book_codes_${prefix}${new Date().toISOString().split('T')[0]}.csv`);
    };

    const downloadZIP = async () => {
        const visibleCodes = getFilteredCodes();
        if (visibleCodes.length === 0) return alert("No codes to download.");
        try {
            const res = await fetch(`${BOOKS_API}/download-selected`, {
                method: "POST",
                headers,
                body: JSON.stringify({ ids: visibleCodes.map(b => b.code) })
            });
            if (!res.ok) throw new Error("ZIP generation failed");
            const blob = await res.blob();
            const isFiltered = visibleCodes.length < bookCodes.length;
            const filename = isFiltered 
                ? `QR-Codes-Filtered-${new Date().toISOString().split('T')[0]}.zip`
                : `QR-Codes-${new Date().toISOString().split('T')[0]}.zip`;
            downloadBlob(blob, filename);
        } catch (err) {
            alert("Download failed: " + err.message);
        }
    };

    const downloadQR = (code) => {
        const svg = document.getElementById("qr-download-" + code);
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, 300, 300);
            ctx.drawImage(img, 0, 0, 300, 300);
            const a = document.createElement("a");
            a.download = `QR-${code}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    /* ═══ EFFECTS ═══ */
    useEffect(() => {
        if (loggedIn) {
            fetchNews();
            fetchBooks();
        }
    }, [loggedIn]);

    const statusColor = (s) => {
        if (s === "verified") return "#34d399";
        if (s === "suspicious") return "#ef4444";
        return "var(--gold)";
    };

    /* ═══ LOGIN ═══ */
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_KEY) setLoggedIn(true);
        else alert("Invalid password");
    };

    const getFilteredCodes = () => {
        return bookCodes.filter(b => {
            if (statusFilter !== "all" && b.status !== statusFilter) return false;
            if (timeFilter !== "all") {
                const created = new Date(b.createdAt);
                const now = new Date();
                const diffTime = Math.abs(now - created);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (timeFilter === "today") {
                    const isToday = created.getDate() === now.getDate() &&
                                    created.getMonth() === now.getMonth() &&
                                    created.getFullYear() === now.getFullYear();
                    if (!isToday) return false;
                } else if (timeFilter === "week") {
                    if (diffDays > 7) return false;
                } else if (timeFilter === "month") {
                    if (diffDays > 30) return false;
                } else if (timeFilter === "older") {
                    if (diffDays <= 30) return false;
                }
            }
            return true;
        });
    };

    const selectVisibleCodes = () => {
        const visibleIds = getFilteredCodes().map((b) => b.id);
        setSelectedCodes((prev) => Array.from(new Set([...prev, ...visibleIds])));
    };

    const clearSelectedCodes = () => setSelectedCodes([]);

    if (!loggedIn) {
        return (
            <section className="admin-page">
                <div className="container login-wrap">
                    <form className="form-panel login-box" onSubmit={handleLogin}>
                        <h2 className="text-center" style={{ marginBottom: "1.5rem" }}>
                            Admin <span className="title-gradient">Login</span>
                        </h2>
                        <div className="form-group">
                            <label htmlFor="admin-pass">Password</label>
                            <input type="password" id="admin-pass" className="form-control"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password" required />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                            Sign In
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    /* ═══ DASHBOARD ═══ */
    return (
        <section className="admin-page">
            <div className="container">
                {/* Header */}
                <div className="admin-header">
                    <div>
                        <span className="section-label">Dashboard</span>
                        <h1>Admin <span className="title-gradient">Panel</span></h1>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => setLoggedIn(false)}>
                        Logout
                    </button>
                </div>

                {/* Tab Switcher */}
                <div style={{
                    display: "flex", gap: "0.5rem", marginBottom: "2rem",
                    borderBottom: "2px solid var(--border-color)", paddingBottom: "0.5rem",
                }}>
                    <button
                        className={`btn ${tab === "news" ? "btn-primary" : "btn-secondary"} btn-sm`}
                        onClick={() => setTab("news")}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
                            <path d="M3 5.5A1.5 1.5 0 014.5 4h15A1.5 1.5 0 0121 5.5v11A1.5 1.5 0 0119.5 18h-15A1.5 1.5 0 013 16.5v-11z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 8h10M7 12h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        News Manager
                    </button>
                    <button
                        className={`btn ${tab === "books" ? "btn-primary" : "btn-secondary"} btn-sm`}
                        onClick={() => setTab("books")}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
                            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 6.5V17a2 2 0 01-2 2H6.5A2.5 2.5 0 014 16.5V6.5A2.5 2.5 0 016.5 4H18a2 2 0 012 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Book Codes
                    </button>
                </div>

                {/* ═══════════════════════════════════════════
                    NEWS TAB
                ═══════════════════════════════════════════ */}
                {tab === "news" && (
                    <>
                        <form className="form-panel" onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                            <h3 style={{ marginBottom: "1rem" }}>
                                {editing ? "Edit Post" : "Create New Post"}
                            </h3>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" name="title" className="form-control"
                                        value={form.title} onChange={onChange} required placeholder="Post title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select id="category" name="category" className="form-control"
                                        value={form.category} onChange={onChange}>
                                        <option>News</option>
                                        <option>Idea</option>
                                        <option>Thought</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Main Image or Video (optional)</label>
                                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                    <input type="text" id="image" name="image" className="form-control"
                                        value={form.image} onChange={onChange}
                                        placeholder="https://images.unsplash.com/... or /uploads/..." />
                                    <label style={{ display: 'inline-flex', gap: '.4rem' }}>
                                        <input type="file" accept="image/*,video/*,audio/*" id="upload-file" style={{ display: 'none' }}
                                            onChange={async (e) => {
                                                const f = e.target.files && e.target.files[0];
                                                if (!f) return;
                                                const fd = new FormData();
                                                fd.append('image', f);
                                                setUploading(true);
                                                try {
                                                    const res = await fetch('/api/upload', {
                                                        method: 'POST',
                                                        headers: { 'x-admin-key': ADMIN_KEY },
                                                        body: fd
                                                    });
                                                    const data = await readApiResponse(res);
                                                    setForm((s) => ({ ...s, image: data.url }));
                                                } catch (err) {
                                                    console.error('Upload Error:', err);
                                                    alert('Upload failed: ' + err.message);
                                                } finally { setUploading(false); }
                                            }} />
                                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => document.getElementById('upload-file').click()}>
                                            {uploading ? 'Uploading…' : 'Upload'}
                                        </button>
                                    </label>
                                </div>
                                {form.image && (
                                    <div style={{ marginTop: '.6rem' }}>
                                        <MediaRenderer src={form.image} alt="preview" size="small" />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="excerpt">Excerpt</label>
                                <input type="text" id="excerpt" name="excerpt" className="form-control"
                                    value={form.excerpt} onChange={onChange} required
                                    placeholder="Short summary for the card" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="body">Full Body (optional)</label>
                                <textarea id="body" name="body" className="form-control"
                                    value={form.body} onChange={onChange}
                                    placeholder="Extended content for 'Read More' section"></textarea>
                            </div>

                            {/* ─── Gallery Section ─── */}
                            <div className="form-panel" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.03)', marginTop: '1rem' }}>
                                <h4 style={{ marginBottom: '0.35rem' }}>Gallery / Additional Media</h4>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                                    Upload several images or videos at once, or add a single media item with its own caption.
                                </p>
                                {form.gallery.map((g, idx) => (
                                    <div key={idx} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: '1rem', position: 'relative' }}>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            style={{ position: 'absolute', top: 5, right: 5 }}
                                            onClick={() => {
                                                const newG = [...form.gallery];
                                                newG.splice(idx, 1);
                                                setForm({ ...form, gallery: newG });
                                            }}
                                        >
                                            &times;
                                        </button>

                                        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                            <label>Media Source (URL or Upload)</label>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={g.url}
                                                    onChange={(e) => {
                                                        const newG = [...form.gallery];
                                                        newG[idx].url = e.target.value;
                                                        setForm({ ...form, gallery: newG });
                                                    }}
                                                    placeholder="/uploads/..."
                                                />
                                                <label style={{ display: 'inline-flex' }}>
                                                    <input type="file" accept="image/*,video/*,audio/*" style={{ display: 'none' }}
                                                        onChange={async (e) => {
                                                            const f = e.target.files && e.target.files[0];
                                                            if (!f) return;
                                                            const fd = new FormData();
                                                            fd.append('image', f);
                                                            setUploading(true);
                                                            try {
                                                                const res = await fetch('/api/upload', {
                                                                    method: 'POST',
                                                                    headers: { 'x-admin-key': ADMIN_KEY },
                                                                    body: fd
                                                                });
                                                                const data = await readApiResponse(res);
                                                                const newG = [...form.gallery];
                                                                newG[idx].url = data.url;
                                                                setForm({ ...form, gallery: newG });
                                                            } catch (err) {
                                                                alert('Upload failed: ' + err.message);
                                                            } finally { setUploading(false); }
                                                        }}
                                                    />
                                                    <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => e.currentTarget.previousElementSibling.click()}>
                                                        Upload
                                                    </button>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                            <label>Description / Caption</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={g.caption}
                                                onChange={(e) => {
                                                    const newG = [...form.gallery];
                                                    newG[idx].caption = e.target.value;
                                                    setForm({ ...form, gallery: newG });
                                                }}
                                                placeholder="Brief description under the media"
                                            />
                                        </div>

                                        {g.url && (
                                            <div style={{ marginTop: '0.5rem' }}>
                                                <MediaRenderer src={g.url} size="small" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => setForm({ ...form, gallery: [...form.gallery, { url: "", caption: "" }] })}
                                    >
                                        + Add More Media
                                    </button>
                                    <label style={{ display: 'inline-flex' }}>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            style={{ display: 'none' }}
                                            onChange={async (e) => {
                                                    const input = e.currentTarget;
                                                    const files = input.files;
                                                    if (!files || files.length === 0) return;
                                                const fd = new FormData();
                                                for (let i = 0; i < files.length; i++) {
                                                    fd.append('files', files[i]);
                                                }
                                                setUploading(true);
                                                try {
                                                    const res = await fetch('/api/upload-multiple', {
                                                        method: 'POST',
                                                        headers: { 'x-admin-key': ADMIN_KEY },
                                                        body: fd
                                                    });
                                                    const data = await readApiResponse(res);
                                                    
                                                    const newG = data.urls.map(url => ({ url, caption: "" }));
                                                    setForm(prev => ({
                                                        ...prev,
                                                        image: prev.image || (newG[0] && newG[0].url) || "",
                                                        gallery: [...prev.gallery, ...newG]
                                                    }));
                                                } catch (err) {
                                                    alert('Multiple upload failed: ' + err.message);
                                                } finally {
                                                    setUploading(false);
                                                    input.value = "";
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={(ev) => ev.currentTarget.previousElementSibling.click()}
                                        >
                                            {uploading ? 'Uploading...' : 'Upload Multiple Images/Videos'}
                                        </button>
                                    </label>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "0.75rem", marginTop: '2rem' }}>
                                <button type="submit" className="btn btn-primary">
                                    {editing ? "Update Post" : "Publish Post"}
                                </button>
                                {editing && (
                                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="form-panel">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                <h3 style={{ margin: 0 }}>All Posts ({items.length})</h3>
                                {items.length > 0 && (
                                    <button className="btn btn-danger btn-sm" onClick={handleDeleteAllNews}>
                                        Delete All Posts
                                    </button>
                                )}
                            </div>
                            {items.length === 0 ? (
                                <p style={{ padding: "1rem 0" }}>No posts yet. Create one above.</p>
                            ) : (
                                <div style={{ overflowX: "auto" }}>
                                    <table className="admin-table">
                                        <thead>
                                            <tr><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item) => (
                                                <tr key={item.id}>
                                                    <td style={{ color: "var(--text-secondary)" }}>{item.title}</td>
                                                    <td>
                                                        <span style={{
                                                            background: "var(--gold-glow)", color: "var(--gold)",
                                                            padding: "0.15rem 0.5rem", borderRadius: "999px",
                                                            fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                                                        }}>
                                                            {item.category}
                                                        </span>
                                                    </td>
                                                    <td>{item.date}</td>
                                                    <td>
                                                        <div className="admin-actions">
                                                            <button className="btn btn-secondary btn-sm"
                                                                onClick={() => handleEdit(item)}>Edit</button>
                                                            <button className="btn btn-danger btn-sm"
                                                                onClick={() => handleDeleteNews(item.id)}>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* ═══════════════════════════════════════════
                    BOOK CODES TAB
                ═══════════════════════════════════════════ */}
                {tab === "books" && (
                    <>
                        {/* Generate Form */}
                        <form className="form-panel" onSubmit={handleGenerate} style={{ marginBottom: "2rem" }}>
                            <h3 style={{ marginBottom: "1rem" }}>Generate Book Codes</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                                <div className="form-group">
                                    <label htmlFor="bookTitle">Book Title</label>
                                    <select id="bookTitle" className="form-control"
                                        value={genForm.bookTitle}
                                        onChange={(e) => setGenForm((f) => ({ ...f, bookTitle: e.target.value }))}>
                                        <option value="">Select a book…</option>
                                        <option>Karamon - Pigon and Falcon</option>
                                        <option>Halwot</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity (1–1000)</label>
                                    <input type="number" id="quantity" className="form-control"
                                        min="1" max="1000"
                                        value={genForm.quantity}
                                        onChange={(e) => setGenForm((f) => ({ ...f, quantity: parseInt(e.target.value) || 1 }))} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
                                Generate Codes
                            </button>
                        </form>

                        {/* Filters and Selection Actions */}
                        {bookCodes.length > 0 && (
                            <div className="form-panel" style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid var(--border-color)", padding: "1.25rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
                                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                        <div className="form-group" style={{ margin: 0, minWidth: "150px" }}>
                                            <label htmlFor="filter-status" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Status Category</label>
                                            <select
                                                id="filter-status"
                                                className="form-control"
                                                style={{ padding: "0.3rem 0.6rem", fontSize: "0.9rem" }}
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                            >
                                                <option value="all">All Statuses</option>
                                                <option value="unused">Unused</option>
                                                <option value="verified">Verified</option>
                                                <option value="suspicious">Suspicious</option>
                                            </select>
                                        </div>
                                        <div className="form-group" style={{ margin: 0, minWidth: "150px" }}>
                                            <label htmlFor="filter-time" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Time Status</label>
                                            <select
                                                id="filter-time"
                                                className="form-control"
                                                style={{ padding: "0.3rem 0.6rem", fontSize: "0.9rem" }}
                                                value={timeFilter}
                                                onChange={(e) => setTimeFilter(e.target.value)}
                                            >
                                                <option value="all">All Time</option>
                                                <option value="today">Created Today</option>
                                                <option value="week">Created This Week</option>
                                                <option value="month">Created This Month</option>
                                                <option value="older">Older</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={selectVisibleCodes}
                                        >
                                            Select Visible ({getFilteredCodes().length})
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            disabled={selectedCodes.length === 0}
                                            onClick={clearSelectedCodes}
                                            style={{ opacity: selectedCodes.length === 0 ? 0.5 : 1 }}
                                        >
                                            Clear Selection
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            disabled={selectedCodes.length === 0}
                                            onClick={downloadSelectedZIP}
                                            style={{ opacity: selectedCodes.length === 0 ? 0.5 : 1 }}
                                        >
                                            Download Selected QR ZIP ({selectedCodes.length})
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Codes Table */}
                        <div className="form-panel">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                                <h3 style={{ margin: 0 }}>
                                    All Book Codes ({bookCodes.length}) {selectedCodes.length > 0 && <span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>({selectedCodes.length} selected)</span>}
                                </h3>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    {bookCodes.length > 0 && (
                                        <>
                                            <button className="btn btn-secondary btn-sm" onClick={selectedCodes.length > 0 ? downloadSelectedZIP : downloadZIP}>
                                                {selectedCodes.length > 0
                                                    ? `Download Selected ZIP (${selectedCodes.length})`
                                                    : getFilteredCodes().length < bookCodes.length
                                                        ? `Download Filtered ZIP (${getFilteredCodes().length})`
                                                        : 'Download All (ZIP)'}
                                            </button>
                                            <button className="btn btn-secondary btn-sm" onClick={downloadCSV}>
                                                {selectedCodes.length > 0
                                                    ? 'Download Selected CSV'
                                                    : getFilteredCodes().length < bookCodes.length
                                                        ? 'Download Filtered CSV'
                                                        : 'Download CSV'}
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={handleDeleteAllCodes}>
                                                Delete All
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {bookCodes.length === 0 ? (
                                <p style={{ padding: "1rem 0" }}>No codes generated yet.</p>
                            ) : getFilteredCodes().length === 0 ? (
                                <p style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>No codes match the selected filters.</p>
                            ) : (
                                <div style={{ overflowX: "auto" }}>
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "40px", textAlign: "center" }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={getFilteredCodes().length > 0 && getFilteredCodes().every(b => selectedCodes.includes(b.id))}
                                                        onChange={(e) => {
                                                            const filtered = getFilteredCodes();
                                                            if (e.target.checked) {
                                                                const allFilteredIds = filtered.map(b => b.id);
                                                                setSelectedCodes(prev => {
                                                                    const newSelection = [...prev];
                                                                    allFilteredIds.forEach(id => {
                                                                        if (!newSelection.includes(id)) newSelection.push(id);
                                                                    });
                                                                    return newSelection;
                                                                });
                                                            } else {
                                                                const allFilteredIds = filtered.map(b => b.id);
                                                                setSelectedCodes(prev => prev.filter(id => !allFilteredIds.includes(id)));
                                                            }
                                                        }}
                                                    />
                                                </th>
                                                <th>Code</th>
                                                <th>Book</th>
                                                <th>Status</th>
                                                <th>Scans</th>
                                                <th>Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getFilteredCodes().map((b) => (
                                                <tr key={b.id}>
                                                    <td style={{ textAlign: "center" }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCodes.includes(b.id)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSelectedCodes([...selectedCodes, b.id]);
                                                                } else {
                                                                    setSelectedCodes(selectedCodes.filter(id => id !== b.id));
                                                                }
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <code style={{
                                                            fontFamily: "monospace",
                                                            fontWeight: 700,
                                                            color: "var(--accent-red)",
                                                            letterSpacing: "0.05em",
                                                        }}>
                                                            {b.code}
                                                        </code>
                                                    </td>
                                                    <td style={{ color: "var(--text-secondary)" }}>{b.bookTitle}</td>
                                                    <td>
                                                        <span style={{
                                                            color: statusColor(b.status),
                                                            fontWeight: 700,
                                                            fontSize: "0.75rem",
                                                            textTransform: "uppercase",
                                                        }}>
                                                            {b.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>{b.scans}</td>
                                                    <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <div className="admin-actions">
                                                            <button
                                                                className="btn btn-secondary btn-sm"
                                                                onClick={() => setQrModal(b.code)}
                                                            >
                                                                QR
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDeleteCode(b.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* QR Modal */}
                        {qrModal && (
                            <div className="qr-modal-overlay" onClick={() => setQrModal(null)}>
                                <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
                                    <h3 style={{ marginBottom: "1rem" }}>QR Code: <strong>{qrModal}</strong></h3>
                                    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", display: "inline-block" }}>
                                        <QRCodeSVG
                                            id={"qr-download-" + qrModal}
                                            value={VERIFY_BASE + qrModal}
                                            size={220}
                                            level="H"
                                            fgColor="#0a0e17"
                                        />
                                    </div>
                                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.75rem", wordBreak: "break-all" }}>
                                        {VERIFY_BASE + qrModal}
                                    </p>
                                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", justifyContent: "center" }}>
                                        <button className="btn btn-primary btn-sm" onClick={() => downloadQR(qrModal)}>
                                            Download PNG
                                        </button>
                                        <button className="btn btn-secondary btn-sm" onClick={() => setQrModal(null)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
