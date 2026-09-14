import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MediaRenderer from "../components/MediaRenderer";

const API = "/api/news";

const getGalleryItems = (post) =>
    (post?.gallery || []).filter((media) => media && media.url);

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [galleryIndex, setGalleryIndex] = useState(0);

    useEffect(() => {
        // Fetch all and find specifically, or hit backend endpoint if exists
        fetch(API)
            .then((r) => r.json())
            .then((data) => {
                const found = data.find((item) => item.id === id);
                setPost(found);
                setGalleryIndex(0);
                setLoading(false);
            })
            .catch(() => {
                setPost(null);
                setLoading(false);
            });
    }, [id]);

    const galleryItems = getGalleryItems(post);
    const currentGalleryItem = galleryItems[galleryIndex] || galleryItems[0];

    return (
        <section style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
            <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <Link to="/insights" className="btn btn-secondary btn-sm" style={{ marginBottom: "2rem" }}>
                    &larr; Back to Insights
                </Link>

                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                ) : !post ? (
                    <div className="empty-state">
                        <h2>Post Not Found</h2>
                        <p>The post you are looking for does not exist or has been deleted.</p>
                    </div>
                ) : (
                    <article className="fade-in-up">
                        <div style={{ marginBottom: "1.5rem" }}>
                            <span className="badge" style={{ marginBottom: "0.5rem", display: "inline-block" }}>
                                {post.category}
                            </span>
                            <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{post.title}</h1>
                            <span className="date" style={{ color: "var(--text-muted)" }}>{post.date}</span>
                        </div>

                        {post.image && (
                            <div className="post-hero-media">
                                <MediaRenderer
                                    src={post.image}
                                    alt={post.title}
                                    size="large"
                                    style={{ maxWidth: "none", maxHeight: "460px", objectFit: "cover" }}
                                />
                            </div>
                        )}

                        <div className="post-content" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                            <p style={{ fontWeight: 600, fontSize: "1.2rem", marginBottom: "1.5rem", color: "var(--text-secondary)" }}>
                                {post.excerpt}
                            </p>
                            {post.body && (
                                <div style={{ whiteSpace: "pre-wrap", color: "white", marginBottom: "3rem" }}>
                                    {post.body}
                                </div>
                            )}
                        </div>

                        {/* ─── Additional Gallery (Horizontal Slider) ─── */}
                        {galleryItems.length > 0 && (
                            <div className="post-gallery">
                                <h3>Gallery</h3>
                                <div className="post-gallery-shell">
                                    {galleryItems.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setGalleryIndex(prev => (prev === 0 ? galleryItems.length - 1 : prev - 1))}
                                            className="gallery-arrow gallery-arrow-left"
                                            aria-label="Previous image"
                                        >
                                            &larr;
                                        </button>
                                    )}

                                    <div className="post-gallery-stage">
                                        <MediaRenderer
                                            src={currentGalleryItem.url}
                                            size="large"
                                            style={{ maxWidth: "none", maxHeight: "430px", objectFit: "contain", transition: "opacity 0.3s ease" }}
                                        />
                                    </div>

                                    {galleryItems.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setGalleryIndex(prev => (prev === galleryItems.length - 1 ? 0 : prev + 1))}
                                            className="gallery-arrow gallery-arrow-right"
                                            aria-label="Next image"
                                        >
                                            &rarr;
                                        </button>
                                    )}
                                </div>

                                {currentGalleryItem.caption && (
                                    <p className="post-gallery-caption">
                                        {currentGalleryItem.caption}
                                    </p>
                                )}

                                {galleryItems.length > 1 && (
                                    <div className="post-gallery-dots">
                                        {galleryItems.map((_, i) => (
                                            <button
                                                type="button"
                                                key={i}
                                                className={`post-gallery-dot ${galleryIndex === i ? "active" : ""}`}
                                                onClick={() => setGalleryIndex(i)}
                                                aria-label={`Show gallery item ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {galleryItems.length > 1 && (
                                    <div className="post-gallery-strip">
                                        {galleryItems.map((media, i) => (
                                            <button
                                                type="button"
                                                key={`${media.url}-${i}`}
                                                className={`post-gallery-thumb ${galleryIndex === i ? "active" : ""}`}
                                                onClick={() => setGalleryIndex(i)}
                                                aria-label={`Open gallery item ${i + 1}`}
                                            >
                                                <MediaRenderer
                                                    src={media.url}
                                                    size="small"
                                                    style={{ height: "66px", maxWidth: "none", objectFit: "cover", borderRadius: 6 }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </article>
                )}
            </div>
        </section>
    );
}
