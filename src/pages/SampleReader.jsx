import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { booksData } from "../data/booksData";

import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker matching the version of pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function SampleReader() {
    const { slug } = useParams();
    const book = booksData.find((b) => b.slug === slug);
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setContainerWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!book || !book.samplePdf) {
        return <Navigate to="/books" replace />;
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
    }

    return (
        <section className="sample-reader-page">
            {/* Top bar */}
            <div className="reader-topbar">
                <Link to={`/books/${book.slug}`} className="reader-back-btn">
                    &larr; Back
                </Link>
                <h2 className="reader-title">{book.title} — Sample</h2>
                <div style={{ width: "80px" }}></div>
            </div>

            {/* PDF container */}
            <div
                className="reader-container"
                onContextMenu={(e) => e.preventDefault()}
                style={{
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                }}
            >
                {loading && (
                    <div className="reader-loading">
                        <div className="reader-spinner"></div>
                        <p>Loading sample…</p>
                    </div>
                )}

                <Document
                    file={book.samplePdf}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={null}
                    className="pdf-document"
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={Math.min(containerWidth * 0.95, 800)}
                            className="pdf-page-custom"
                            style={{
                                marginBottom: '20px',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                                backgroundColor: 'white'
                            }}
                        />
                    ))}
                </Document>

                {/* Adding an overlay over each page inside Document is harder, but we 
                    already disabled right-click on the parent container. We do not need the absolute overlay 
                    if we disabled text layers entirely. No selecting, no downloading. */}
            </div>

            {/* Watermark notice */}
            <div className="reader-footer">
                <p>© Yismake Worku — Sample preview only. Purchase the full book for the complete experience.</p>
            </div>
        </section>
    );
}
