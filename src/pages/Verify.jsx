import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

const API = "/api/verify";

export default function Verify() {
    const [params] = useSearchParams();
    const code = params.get("code") || "";
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Feedback state
    const [feedbackForm, setFeedbackForm] = useState({ username: "", comment: "", rating: 5 });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [submittingFeedback, setSubmittingFeedback] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackError, setFeedbackError] = useState("");

    const getSlugFromTitle = (title) => {
        if (!title) return "";
        const t = title.toLowerCase();
        if (t.includes("dertogada")) return "dertogada";
        if (t.includes("ramatohara")) return "ramatohara";
        if (t.includes("xantoxara")) return "xantoxara";
        return t.replace(/[^a-z0-9]/g, "");
    };

    const getBookSlug = () => result?.bookSlug || getSlugFromTitle(result?.bookTitle);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (!feedbackForm.username.trim() || !feedbackForm.comment.trim()) {
            setFeedbackError("Please fill out all fields.");
            return;
        }
        setSubmittingFeedback(true);
        setFeedbackError("");
        try {
            const bookSlug = getBookSlug();
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookSlug,
                    bookTitle: result?.bookTitle,
                    bookCode: result?.code,
                    username: feedbackForm.username,
                    comment: feedbackForm.comment,
                    rating: feedbackForm.rating,
                    source: "scan"
                })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
            setFeedbackSubmitted(true);
        } catch (err) {
            setFeedbackError("Failed to submit feedback: " + err.message);
        } finally {
            setSubmittingFeedback(false);
        }
    };

    useEffect(() => {
        if (!code) {
            setLoading(false);
            setError("No verification code provided.");
            return;
        }
        fetch(`${API}?code=${encodeURIComponent(code)}`)
            .then((r) => r.json())
            .then((data) => {
                setResult(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Unable to reach verification server. Please try again later.");
                setLoading(false);
            });
    }, [code]);

    /* Status icon */
    const statusIcon = (status) => {
        switch (status) {
            case "authentic":
                return (
                    <div className="verify-icon verify-icon-authentic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                );
            case "warning":
                return (
                    <div className="verify-icon verify-icon-warning">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>
                );
            case "suspicious":
                return (
                    <div className="verify-icon verify-icon-danger">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="verify-icon verify-icon-invalid">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                );
        }
    };

    const statusLabel = {
        authentic: "Verified Authentic",
        warning: "Previously Verified",
        suspicious: "Suspicious Code",
        invalid: "Invalid Code",
    };

    const statusClass = {
        authentic: "verify-authentic",
        warning: "verify-warning",
        suspicious: "verify-danger",
        invalid: "verify-invalid",
    };

    /* ─── Render ─── */
    return (
        <section className="verify-page">
            <div className="container" style={{ maxWidth: "600px", paddingTop: "6rem", paddingBottom: "4rem" }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <span className="section-label">Book Verification</span>
                    <h1>
                        Verify Your <span className="title-gradient">Copy</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                        Scan the QR code inside your book to confirm its authenticity.
                    </p>
                </div>

                {loading && !result && (
                    <div className="verify-card" style={{ textAlign: "center", padding: "3rem" }}>
                        <div className="verify-spinner"></div>
                        <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>Verifying your code…</p>
                    </div>
                )}

                {!loading && !result && (
                    <div className="verify-card" style={{ textAlign: "center", padding: "2rem" }}>
                        <div id="reader" style={{ width: '100%', marginBottom: '1rem' }}></div>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => {
                                const html5QrCode = new window.Html5Qrcode("reader");
                                const qrCodeSuccessCallback = (decodedText) => {
                                    /* Handle the scanned code - expecting either a code or a full URL */
                                    let finalCode = decodedText;
                                    if (decodedText.includes('code=')) {
                                        finalCode = new URL(decodedText, window.location.origin).searchParams.get('code');
                                    }
                                    window.location.href = `/verify?code=${finalCode}`;
                                    html5QrCode.stop().catch(err => console.error(err));
                                };
                                const config = { fps: 10, qrbox: { width: 250, height: 250 } };
                                html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                            Start Camera Scanner
                        </button>
                    </div>
                )}

                {result && (
                    <>
                        <div className={`verify-card ${statusClass[result.status] || "verify-invalid"}`}>
                            {statusIcon(result.status)}

                            <h2 style={{ marginTop: "1rem" }}>
                                {statusLabel[result.status] || "Unknown Status"}
                            </h2>

                            {result.bookTitle && (
                                <p className="verify-book-title">{result.bookTitle}</p>
                            )}

                            <p className="verify-message">{result.message}</p>

                            {result.code && (
                                <div className="verify-code-display">
                                    Code: <strong>{result.code}</strong>
                                </div>
                            )}

                            {result.scans && result.scans === 1 && (
                                <div className="verify-badge">
                                    ★ First Verification
                                </div>
                            )}
                        </div>

                        {result.valid && (
                            <div className="verify-card" style={{ marginTop: "2rem", textAlign: "left", padding: "2rem" }}>
                                <h3 style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                                    Share Your Thoughts
                                </h3>
                                
                                {feedbackSubmitted ? (
                                    <div style={{ textAlign: "center", padding: "1.5rem" }}>
                                        <div style={{ color: "var(--gold)", fontSize: "3rem", marginBottom: "0.5rem" }}>★</div>
                                        <h4 style={{ color: "white" }}>Thank you for your feedback!</h4>
                                        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
                                            Your comments have been posted to the book's discussion page.
                                        </p>
                                        <Link to={`/books/${getBookSlug()}#discussion`} className="btn btn-primary btn-sm" style={{ marginTop: "1rem" }}>
                                            View Discussion
                                        </Link>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFeedbackSubmit}>
                                        {feedbackError && (
                                            <div style={{ color: "var(--accent-red)", marginBottom: "1rem", fontSize: "0.9rem" }}>
                                                {feedbackError}
                                            </div>
                                        )}
                                        
                                        <div className="form-group">
                                            <label htmlFor="feedback-username">Your Name / Nickname</label>
                                            <input
                                                type="text"
                                                id="feedback-username"
                                                className="form-control"
                                                placeholder="Enter your name"
                                                value={feedbackForm.username}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, username: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                                            <label style={{ display: "block", marginBottom: "0.5rem" }}>Rating</label>
                                            <div style={{ display: "flex", gap: "0.5rem", fontSize: "1.8rem" }}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        style={{
                                                            cursor: "pointer",
                                                            color: (hoveredRating || feedbackForm.rating) >= star ? "var(--gold)" : "var(--text-muted)",
                                                            transition: "color 0.15s ease"
                                                        }}
                                                        onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                                                        onMouseEnter={() => setHoveredRating(star)}
                                                        onMouseLeave={() => setHoveredRating(0)}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="feedback-comment">Comments / Ideas</label>
                                            <textarea
                                                id="feedback-comment"
                                                className="form-control"
                                                rows="4"
                                                placeholder="What did you think of the book? Share your thoughts here..."
                                                value={feedbackForm.comment}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{ width: "100%", marginTop: "1rem" }}
                                            disabled={submittingFeedback}
                                        >
                                            {submittingFeedback ? "Submitting..." : "Submit Feedback"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </>
                )}

                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <Link to="/" className="btn btn-secondary">
                        ← Back to Website
                    </Link>
                </div>
            </div>
        </section>
    );
}
