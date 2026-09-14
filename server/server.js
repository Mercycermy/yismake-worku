const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "news.json");
const BOOKS_FILE = path.join(DATA_DIR, "books.json");
const FEEDBACKS_FILE = process.env.FEEDBACKS_FILE
    ? path.resolve(process.env.FEEDBACKS_FILE)
    : path.join(DATA_DIR, "feedbacks.json");
const ADMIN_KEY = "author-admin-2026";
const PORT = process.env.PORT || 3001;
const PROJECT_ROOT = path.resolve(__dirname, "..");
const { renderSeoHtml } = require("./seo");

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o775 });
    }
}

try {
    ensureDataDir();
    if (!fs.existsSync(FEEDBACKS_FILE)) {
        fs.writeFileSync(FEEDBACKS_FILE, "[]", "utf-8");
    }
} catch (e) {
    console.error("[DATA] Failed to initialize data directory:", e.message);
}

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-admin-key"]
}));
app.use(express.json({ limit: '50mb' }));

// Block direct PDF downloads — only allow when embedded via iframe
app.use(function (req, res, next) {
    if (req.path.toLowerCase().endsWith('.pdf')) {
        // Set headers to prevent download
        res.setHeader('Content-Disposition', 'inline');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Cache-Control', 'no-store');

        // Block direct browser navigation (allow only iframe/object embeds or empty fetch destinations used by PDF workers)
        var dest = req.headers['sec-fetch-dest'];
        if (dest && dest === 'document') {
            return res.status(403).send('Direct PDF access is not allowed. Please read samples on the website.');
        }
    }
    next();
});

// Serve public folder so bundled images are accessible
app.use(express.static(path.join(PROJECT_ROOT, 'public')));

// Serve the compiled React frontend
// Route HTML is handled below so every important URL receives its own metadata
// and meaningful initial content. Assets are still served directly.
app.use(express.static(path.join(PROJECT_ROOT, 'dist'), { index: false }));

// Multer setup for actual file uploads (supporting images, video, audio)
const multer = require('multer');

function uniquePaths(paths) {
    return Array.from(new Set(paths.filter(Boolean).map(function (dir) {
        return path.resolve(dir);
    })));
}

function configuredUploadDir() {
    if (!process.env.UPLOAD_DIR) return null;
    return path.isAbsolute(process.env.UPLOAD_DIR)
        ? process.env.UPLOAD_DIR
        : path.resolve(PROJECT_ROOT, process.env.UPLOAD_DIR);
}

// The original project stored files in <project>/uploads. Some cPanel Node
// configurations only allow writes inside the configured application root
// (server/), so server/uploads is retained as a safe fallback.
const uploadCandidates = uniquePaths([
    configuredUploadDir(),
    path.join(PROJECT_ROOT, 'uploads'),
    path.join(__dirname, 'uploads')
]);

function verifyWritableDirectory(dir) {
    fs.mkdirSync(dir, { recursive: true, mode: 0o755 });
    fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK);

    const probe = path.join(dir, `.upload-write-test-${process.pid}-${Date.now()}`);
    try {
        fs.writeFileSync(probe, '');
    } finally {
        if (fs.existsSync(probe)) fs.unlinkSync(probe);
    }
}

let uploadDir = null;
const uploadInitErrors = [];

for (const candidate of uploadCandidates) {
    try {
        verifyWritableDirectory(candidate);
        uploadDir = candidate;
        break;
    } catch (e) {
        uploadInitErrors.push(`${candidate}: ${e.code || e.message}`);
        console.error(`[UPLOAD] Cannot use ${candidate}:`, e.message);
    }
}

if (uploadDir) {
    console.log(`[UPLOAD] Files will be stored in ${uploadDir}`);
} else {
    console.error('[UPLOAD CRITICAL] No writable upload directory was found.');
}

function uploadReadDirs() {
    return uniquePaths([uploadDir].concat(uploadCandidates)).filter(function (dir) {
        try {
            return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
        } catch (_e) {
            return false;
        }
    });
}

function findReadableUpload(name) {
    if (!name || path.basename(name) !== name) return null;

    for (const dir of uploadReadDirs()) {
        const filePath = path.join(dir, name);
        try {
            if (fs.statSync(filePath).isFile()) {
                fs.accessSync(filePath, fs.constants.R_OK);
                return filePath;
            }
        } catch (_e) {
            // Keep looking in legacy/fallback directories.
        }
    }
    return null;
}

// Serve both new uploads and files left in the legacy project-root folder.
app.get('/uploads/:name', function (req, res) {
    const filePath = findReadableUpload(req.params.name);
    if (!filePath) {
        return res.status(404).json({ error: 'Uploaded file not found' });
    }

    res.sendFile(filePath, function (err) {
        if (!err) return;
        console.error(`[UPLOAD] Failed to serve ${filePath}:`, err.message);
        if (res.headersSent) {
            return res.destroy(err);
        }
        res.status(err.statusCode || 500).json({
            error: 'Failed to read uploaded file',
            details: err.message
        });
    });
});

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        if (!uploadDir) {
            return cb(new Error(
                'No writable upload directory. Set UPLOAD_DIR to a writable absolute path and restart the app.'
            ));
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, '');
        cb(null, Date.now() + '-' + crypto.randomBytes(4).toString('hex') + ext);
    }
});
const upload = multer({ storage: storage, limits: { fileSize: 200 * 1024 * 1024 } }); // 200MB limit

function uploadErrorResponse(res, err) {
    const isSizeError = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE';
    const status = isSizeError ? 413 : 500;
    const storageHint = !uploadDir
        ? ' Set the UPLOAD_DIR environment variable to a writable directory and restart the Node application.'
        : '';

    return res.status(status).json({
        error: `Upload failed: ${err.message}.${storageHint}`,
        code: err.code || 'UPLOAD_ERROR'
    });
}

function finalizeUploadedFile(file) {
    // Uploaded media should remain readable after cPanel/Passenger restarts.
    try {
        fs.chmodSync(file.path, 0o644);
    } catch (e) {
        console.warn(`[UPLOAD] Could not set permissions on ${file.path}:`, e.message);
    }
    return '/uploads/' + path.basename(file.path);
}

app.get('/api/upload-status', requireAdmin, function (_req, res) {
    res.json({
        ready: Boolean(uploadDir),
        directory: uploadDir,
        readableDirectories: uploadReadDirs(),
        initializationErrors: uploadInitErrors
    });
});

// Upload endpoint (admin only)
app.post('/api/upload', requireAdmin, (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return uploadErrorResponse(res, err);
        }

        try {
            if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
            const urlPath = finalizeUploadedFile(req.file);
            res.json({ url: urlPath });
        } catch (e) {
            console.error('Post-upload processing error:', e);
            res.status(500).json({ error: 'Post-upload processing failed', details: e.message });
        }
    });
});

// Upload multiple files endpoint (admin only)
app.post('/api/upload-multiple', requireAdmin, (req, res) => {
    upload.array('files', 20)(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return uploadErrorResponse(res, err);
        }

        try {
            if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded' });
            const urls = req.files.map(finalizeUploadedFile);
            res.json({ urls });
        } catch (e) {
            console.error('Post-upload processing error:', e);
            res.status(500).json({ error: 'Post-upload processing failed', details: e.message });
        }
    });
});

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    res.on('finish', () => {
        console.log(`${new Date().toISOString()} ${req.method} ${req.url} -> ${res.statusCode}`);
    });
    next();
});

/* ─── Helpers: News ─── */
function readNews() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeNews(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4), "utf-8");
}

/* ─── Helpers: Book Codes ─── */
function readBooks() {
    if (!fs.existsSync(BOOKS_FILE)) return [];
    return JSON.parse(fs.readFileSync(BOOKS_FILE, "utf-8"));
}

function writeBooks(data) {
    fs.writeFileSync(BOOKS_FILE, JSON.stringify(data, null, 4), "utf-8");
}

/* ─── Helpers: Feedbacks ─── */
function readFeedbacks() {
    if (!fs.existsSync(FEEDBACKS_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(FEEDBACKS_FILE, "utf-8"));
    } catch (e) {
        return [];
    }
}

function writeFeedbacks(data) {
    ensureDataDir();
    fs.writeFileSync(FEEDBACKS_FILE, JSON.stringify(data, null, 4), "utf-8");
}

function normalizeFeedback(feedback) {
    return {
        ...feedback,
        likes: Math.max(parseInt(feedback.likes, 10) || 0, 0),
        replies: Array.isArray(feedback.replies)
            ? feedback.replies.slice().sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
            })
            : []
    };
}

function handleGetFeedbacks(req, res) {
    try {
        const { bookSlug } = req.query;
        if (!bookSlug) {
            return res.status(400).json({ error: "Missing bookSlug query parameter" });
        }

        const feedbacks = readFeedbacks()
            .filter(function (f) { return f.bookSlug === bookSlug; })
            .map(normalizeFeedback);
        feedbacks.sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });

        let avgRating = 0;
        if (feedbacks.length > 0) {
            const sum = feedbacks.reduce(function (acc, curr) { return acc + curr.rating; }, 0);
            avgRating = (sum / feedbacks.length).toFixed(1);
        }

        res.json({
            feedbacks: feedbacks,
            stats: {
                average: parseFloat(avgRating),
                count: feedbacks.length
            }
        });
    } catch (e) {
        console.error("[FEEDBACKS] GET failed:", e.message);
        res.status(500).json({ error: "Failed to load reviews" });
    }
}

function handlePostFeedback(req, res) {
    try {
        const { bookSlug, bookTitle, username, comment, rating, source, bookCode } = req.body;
        const cleanUsername = String(username || "").trim();
        const cleanComment = String(comment || "").trim();
        if (!bookSlug || !cleanUsername || !cleanComment || !rating) {
            return res.status(400).json({ error: "Missing required feedback fields" });
        }
        if (cleanUsername.length > 60 || cleanComment.length > 2000) {
            return res.status(400).json({ error: "Name or review is too long" });
        }

        const feedbacks = readFeedbacks();
        const newFeedback = {
            id: crypto.randomUUID(),
            bookSlug: bookSlug,
            bookTitle: bookTitle || "",
            username: cleanUsername,
            comment: cleanComment,
            rating: Math.min(Math.max(parseInt(rating, 10) || 5, 1), 5),
            source: source || "web",
            bookCode: bookCode || "",
            likes: 0,
            replies: [],
            createdAt: new Date().toISOString()
        };

        feedbacks.push(newFeedback);
        writeFeedbacks(feedbacks);
        res.status(201).json(newFeedback);
    } catch (e) {
        console.error("[FEEDBACKS] POST failed:", e.message);
        res.status(500).json({ error: "Failed to save review. Check server/data folder permissions." });
    }
}

function handleFeedbackLike(req, res) {
    try {
        const action = req.body.action === "unlike" ? "unlike" : "like";
        const feedbacks = readFeedbacks();
        const index = feedbacks.findIndex(function (feedback) {
            return String(feedback.id) === String(req.params.id);
        });
        if (index === -1) return res.status(404).json({ error: "Review not found" });

        const currentLikes = Math.max(parseInt(feedbacks[index].likes, 10) || 0, 0);
        feedbacks[index].likes = action === "unlike"
            ? Math.max(currentLikes - 1, 0)
            : currentLikes + 1;
        writeFeedbacks(feedbacks);
        res.json(normalizeFeedback(feedbacks[index]));
    } catch (e) {
        console.error("[FEEDBACKS] LIKE failed:", e.message);
        res.status(500).json({ error: "Failed to update like" });
    }
}

function handleFeedbackReply(req, res) {
    try {
        const cleanUsername = String(req.body.username || "").trim();
        const cleanComment = String(req.body.comment || "").trim();
        if (!cleanUsername || !cleanComment) {
            return res.status(400).json({ error: "Name and reply are required" });
        }
        if (cleanUsername.length > 60 || cleanComment.length > 1000) {
            return res.status(400).json({ error: "Name or reply is too long" });
        }

        const feedbacks = readFeedbacks();
        const index = feedbacks.findIndex(function (feedback) {
            return String(feedback.id) === String(req.params.id);
        });
        if (index === -1) return res.status(404).json({ error: "Review not found" });

        const reply = {
            id: crypto.randomUUID(),
            username: cleanUsername,
            comment: cleanComment,
            createdAt: new Date().toISOString()
        };
        if (!Array.isArray(feedbacks[index].replies)) feedbacks[index].replies = [];
        feedbacks[index].replies.push(reply);
        writeFeedbacks(feedbacks);
        res.status(201).json({ reply: reply, feedback: normalizeFeedback(feedbacks[index]) });
    } catch (e) {
        console.error("[FEEDBACKS] REPLY failed:", e.message);
        res.status(500).json({ error: "Failed to post reply" });
    }
}

function generateCode() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var code = "BK-";
    for (var i = 0; i < 7; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function bookSlugFromTitle(title) {
    var normalized = String(title || "").toLowerCase();
    if (normalized.includes("karamon")) return "karamon";
    if (normalized.includes("halwot")) return "halwot";
    return normalized
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "book";
}

function normalizeGallery(gallery) {
    if (!Array.isArray(gallery)) return [];
    return gallery
        .filter(function (item) { return item && item.url; })
        .map(function (item) {
            return {
                url: String(item.url).trim(),
                caption: String(item.caption || "").trim(),
            };
        })
        .filter(function (item) { return item.url; });
}

function safeFilePart(value) {
    return String(value || "Book")
        .replace(/[\\/:*?"<>|]+/g, "-")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 40) || "Book";
}

/* ─── Middleware ─── */
function requireAdmin(req, res, next) {
    if (req.headers["x-admin-key"] !== ADMIN_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}

/* ═══════════════════════════════════════════
   NEWS ROUTES
   ═══════════════════════════════════════════ */

// GET all news (public)
app.get("/api/news", function (_req, res) {
    const news = readNews();
    news.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    res.json(news);
});

// Reader reviews (public) — registered next to /api/news for cPanel compatibility
app.get("/api/reviews", handleGetFeedbacks);
app.post("/api/reviews", handlePostFeedback);
app.post("/api/reviews/:id/like", handleFeedbackLike);
app.post("/api/reviews/:id/replies", handleFeedbackReply);
app.get("/api/feedbacks", handleGetFeedbacks);
app.post("/api/feedbacks", handlePostFeedback);
app.post("/api/feedbacks/:id/like", handleFeedbackLike);
app.post("/api/feedbacks/:id/replies", handleFeedbackReply);

// POST new news item (admin)
app.post("/api/news", requireAdmin, function (req, res) {
    const news = readNews();
    const gallery = normalizeGallery(req.body.gallery);
    const item = {
        id: crypto.randomUUID(),
        title: req.body.title,
        excerpt: req.body.excerpt,
        body: req.body.body || "",
        category: req.body.category || "News",
        date: req.body.date || new Date().toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
        }),
        image: req.body.image || (gallery[0] && gallery[0].url) || "",
        gallery,
    };
    news.push(item);
    writeNews(news);
    res.status(201).json(item);
});

// PUT update news item (admin)
app.put("/api/news/:id", requireAdmin, function (req, res) {
    const news = readNews();
    const idx = news.findIndex(function (n) { return n.id === req.params.id; });
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const gallery = normalizeGallery(req.body.gallery);
    Object.assign(news[idx], {
        ...req.body,
        image: req.body.image || (gallery[0] && gallery[0].url) || "",
        gallery,
    });
    writeNews(news);
    res.json(news[idx]);
});

// DELETE ALL news (admin)
app.delete("/api/news", requireAdmin, function (req, res) {
    writeNews([]);
    res.json({ success: true, message: "All posts deleted" });
});

// DELETE news item (admin)
app.delete("/api/news/:id", requireAdmin, function (req, res) {
    var news = readNews();
    var len = news.length;
    news = news.filter(function (n) { return n.id !== req.params.id; });
    if (news.length === len) return res.status(404).json({ error: "Not found" });

    writeNews(news);
    res.json({ success: true });
});

/* ═══════════════════════════════════════════
   BOOK VERIFICATION ROUTES
   ═══════════════════════════════════════════ */

// PUBLIC: Verify a book code
app.get("/api/verify", function (req, res) {
    var code = (req.query.code || "").trim().toUpperCase();
    if (!code) return res.status(400).json({ error: "Missing code parameter" });

    var books = readBooks();
    var idx = books.findIndex(function (b) { return b.code === code; });

    if (idx === -1) {
        return res.json({
            valid: false,
            status: "invalid",
            message: "This code is not recognised. This may not be a genuine copy.",
        });
    }

    var book = books[idx];
    book.scans = (book.scans || 0) + 1;
    book.lastScanAt = new Date().toISOString();
    if (!book.firstScanAt) book.firstScanAt = book.lastScanAt;

    book.bookSlug = book.bookSlug || bookSlugFromTitle(book.bookTitle);

    var result = {
        valid: true,
        code: book.code,
        bookTitle: book.bookTitle,
        bookSlug: book.bookSlug,
        scans: book.scans
    };

    if (book.scans === 1) {
        book.status = "verified";
        result.status = "authentic";
        result.message = "This is a verified authentic copy. You are the first to verify this book.";
    } else if (book.scans <= 3) {
        result.status = "warning";
        result.message = "This code has been scanned " + book.scans + " times. It was first verified on " + new Date(book.firstScanAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) + ".";
    } else {
        book.status = "suspicious";
        result.status = "suspicious";
        result.message = "This code has been scanned " + book.scans + " times. This copy may not be authentic.";
    }

    writeBooks(books);
    res.json(result);
});

// ADMIN: List all book codes
app.get("/api/books", requireAdmin, function (_req, res) {
    var books = readBooks();
    books.sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
    res.json(books);
});

// ADMIN: Generate new codes
app.post("/api/books/generate", requireAdmin, function (req, res) {
    var books = readBooks();
    var quantity = Math.min(parseInt(req.body.quantity) || 1, 1000);
    var bookTitle = req.body.bookTitle || "Untitled";
    var existingCodes = new Set(books.map(function (b) { return b.code; }));
    var generated = [];

    for (var i = 0; i < quantity; i++) {
        var code;
        do { code = generateCode(); } while (existingCodes.has(code));
        existingCodes.add(code);

        var entry = {
            id: crypto.randomUUID(),
            code: code,
            bookTitle: bookTitle,
            bookSlug: bookSlugFromTitle(bookTitle),
            status: "unused",
            scans: 0,
            firstScanAt: null,
            lastScanAt: null,
            createdAt: new Date().toISOString(),
        };
        books.push(entry);
        generated.push(entry);
    }

    writeBooks(books);
    res.status(201).json({ count: generated.length, codes: generated });
});

// ADMIN: Delete ALL book codes
app.delete("/api/books", requireAdmin, function (req, res) {
    writeBooks([]);
    res.json({ success: true, message: "All codes deleted" });
});

// ADMIN: Delete a book code
app.delete("/api/books/:id", requireAdmin, function (req, res) {
    var books = readBooks();
    var len = books.length;
    books = books.filter(function (b) { return b.id !== req.params.id; });
    if (books.length === len) return res.status(404).json({ error: "Not found" });

    writeBooks(books);
    res.json({ success: true });
});


const { streamQrZip } = require("./qr-zip");

const PUBLIC_SITE_URL = String(
    process.env.PUBLIC_SITE_URL || "https://www.sigwanuniverse.com"
).replace(/\/+$/, "");
const VERIFY_BASE = PUBLIC_SITE_URL + "/verify?code=";

function qrZipEntries(books) {
    return books.map(function (book) {
        return {
            code: book.code,
            fileName: `QR-${book.code}-${safeFilePart(book.bookTitle)}.png`
        };
    });
}

function handleQrZipError(res, label, err, publicMessage) {
    console.error(label, err);
    if (res.headersSent) {
        if (!res.destroyed) res.destroy(err);
        return;
    }
    res.status(500).json({ error: publicMessage });
}

// ADMIN: Download all QR codes as a ZIP
app.get("/api/books/download-all", requireAdmin, async function (req, res) {
    try {
        const books = readBooks();
        if (books.length === 0) return res.status(400).json({ error: "No codes available" });

        await streamQrZip(res, qrZipEntries(books), {
            verifyBase: VERIFY_BASE,
            archiveName: `QR-Codes-Batch-${new Date().toISOString().split("T")[0]}.zip`
        });
    } catch (err) {
        handleQrZipError(
            res,
            "Zip error:",
            err,
            "Failed to generate ZIP archive"
        );
    }
});

// ADMIN: Download selected QR codes as a ZIP
app.post("/api/books/download-selected", requireAdmin, async function (req, res) {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: "No codes selected" });
        }
        const books = readBooks();
        const requested = new Set(ids.map(String));
        const selectedBooks = books.filter(b => requested.has(String(b.id)) || requested.has(String(b.code)));
        if (selectedBooks.length === 0) return res.status(400).json({ error: "Selected codes not found" });

        await streamQrZip(res, qrZipEntries(selectedBooks), {
            verifyBase: VERIFY_BASE,
            archiveName: "QR-Codes-Selected.zip"
        });
    } catch (err) {
        handleQrZipError(
            res,
            "Selected Zip error:",
            err,
            "Failed to generate ZIP archive for selected codes"
        );
    }
});

/* ─── Start ─── */
app.get("/about", function (_req, res) {
    res.redirect(301, "/author/azaries-dessie");
});

app.get("/books/karamon", function (_req, res) {
    res.redirect(301, "/books/karamon-pigeon-and-falcon");
});

app.get("*", function (req, res) {
    if (req.url.startsWith("/api/")) {
        return res.status(404).json({ error: "API route not found" });
    }
    try {
        const template = fs.readFileSync(path.join(PROJECT_ROOT, "dist", "index.html"), "utf-8");
        const rendered = renderSeoHtml(template, req.path, readNews());
        res.status(rendered.status).type("html").send(rendered.html);
    } catch (e) {
        console.error("[SEO] Failed to render route HTML:", e.message);
        res.status(500).send("Unable to load the website.");
    }
});

app.listen(PORT, function () {
    console.log("Author API running on port " + PORT);
    console.log("Reviews API ready at /api/reviews and /api/feedbacks");
});
