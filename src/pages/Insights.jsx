import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MediaRenderer from "../components/MediaRenderer";

const API = "/api/news";
const CATEGORIES = ["All", "News", "Idea", "Thought"];

const getPrimaryMedia = (item) => {
    if (item.image) return item.image;
    const firstGalleryItem = (item.gallery || []).find((media) => media && media.url);
    return firstGalleryItem ? firstGalleryItem.url : "";
};

export default function Insights() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetch(API)
            .then((r) => r.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch(() => {
                setItems([]);
                setLoading(false);
            });
    }, []);

    const filtered =
        filter === "All" ? items : items.filter((i) => i.category === filter);

    return (
        <section style={{ paddingTop: "7rem" }}>
            <div className="container">
                <span className="section-label">Stay Updated</span>
                <h1>
                    News &amp; <span className="title-gradient">Insights</span>
                </h1>
                <p>
                    Ideas, writing updates, and news from the author's
                    desk.
                </p>
                <div className="section-divider"></div>

                {/* ─── Filter Tabs ─── */}
                <div className="filter-tabs">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-tab ${filter === cat ? "active" : ""}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ─── Content ─── */}
                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="empty-state">
                        <h3>No posts yet</h3>
                        <p>Check back soon for new updates.</p>
                    </div>
                ) : (
                    <div className="news-grid">
                        {filtered.map((item) => {
                            const primaryMedia = getPrimaryMedia(item);
                            const galleryCount = (item.gallery || []).filter((media) => media && media.url).length;

                            return (
                            <article key={item.id} className="card news-card fade-in-up">
                                {primaryMedia && (
                                    <div className="card-img-wrapper news-card-media">
                                        <MediaRenderer
                                            src={primaryMedia}
                                            alt={item.title}
                                            className="card-img"
                                            style={{ height: "220px", maxWidth: "none", objectFit: "cover", borderRadius: 0 }}
                                        />
                                        {galleryCount > 1 && (
                                            <span className="news-media-count">{galleryCount} media</span>
                                        )}
                                    </div>
                                )}
                                <div className="card-body">
                                    <div className="card-meta">
                                        <span className="badge">{item.category}</span>
                                        <span className="date">{item.date}</span>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.excerpt}</p>
                                    <div style={{ marginTop: "1rem" }}>
                                        <Link to={`/insights/${item.id}`} className="btn btn-primary btn-sm">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
