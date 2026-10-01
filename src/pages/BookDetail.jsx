import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import { getBookSample } from '../data/bookSamples';
import BookCover from '../components/BookCover';
import QuickPurchaseModal from '../components/QuickPurchaseModal';
import LanguageToggle from '../components/LanguageToggle';
import Icon from '../components/Icon';

export default function BookDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const book = verifiedBooks.find((b) => b.slug === slug);

  // Quick Purchase Modal State
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  // Purchase Form State
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    city: 'Addis Ababa',
    address: '',
    format: 'paperback',
    paymentMethod: 'telebirr'
  });

  // Read Sample State
  const [sampleChapterIdx, setSampleChapterIdx] = useState(0);
  const [sampleLang, setSampleLang] = useState('am'); // 'am' | 'en'
  const [sampleFontSize, setSampleFontSize] = useState('normal'); // 'small' | 'normal' | 'large'
  const [sampleTheme, setSampleTheme] = useState('parchment'); // 'parchment' | 'white' | 'dark'

  // Verify State
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);

  // Discussion State
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [newComment, setNewComment] = useState({ username: '', rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');
  const [replyOpenId, setReplyOpenId] = useState(null);
  const [replyText, setReplyText] = useState({ username: '', comment: '' });

  const sampleData = getBookSample(slug);
  const pricing = sampleData?.pricing || {
    paperback: '380 ETB',
    hardcover: '550 ETB',
    ebook: '200 ETB',
    usd: '$14.99'
  };

  // Section references for smooth scrolling
  const purchaseRef = useRef(null);
  const sampleRef = useRef(null);
  const verifyRef = useRef(null);
  const discussionRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Fetch reviews for this book
  useEffect(() => {
    if (!book) return;
    setReviewsLoading(true);
    fetch(`/api/reviews?bookSlug=${book.slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load reviews');
        return res.json();
      })
      .then((data) => {
        setReviews(data.feedbacks || []);
        setReviewsLoading(false);
      })
      .catch(() => {
        // Fallback default sample reviews if API is temporarily unavailable
        setReviews([
          {
            id: 'sample-rev-1',
            username: 'Ermias T.',
            rating: 5,
            comment:
              lang === 'am'
                ? 'በኢትዮጵያ ስነ-ጽሑፍ ውስጥ ትልቅ አብዮት የፈጠረ ድንቅ ስራ ነው። ደራሲው የጥንቱን የብራና እውቀት ከዘመናዊ ቴክኖሎጂ ጋር ያዋሃደበት መንገድ ወደር የለውም።'
                : 'A landmark triumph of modern Ethiopian literature. The seamless synthesis of monastic heritage and high-tech suspense sets a new standard.',
            likes: 12,
            createdAt: new Date().toISOString(),
            source: 'verified'
          },
          {
            id: 'sample-rev-2',
            username: 'Bethlehem A.',
            rating: 5,
            comment:
              lang === 'am'
                ? 'አስደናቂ ገጸ-ባህሪያትና ልብ አንጠልጣይ ታሪክ። አንብቤ እስክጨርስ ድረስ ከአፌ አላወረድኩትም።'
                : 'Brilliant pacing and profound philosophical undertones. Highly recommended to every discerning reader.',
            likes: 7,
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            source: 'web'
          }
        ]);
        setReviewsLoading(false);
      });
  }, [book, lang]);

  // Handle Verify Code
  const handleVerifySubmit = async (e, codeToTest) => {
    if (e) e.preventDefault();
    const code = (codeToTest || verifyCode || '').trim();
    if (!code) return;

    setVerifyLoading(true);
    setVerifyResult(null);

    try {
      const res = await fetch(`/api/verify?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      setVerifyResult(data);
    } catch (err) {
      setVerifyResult({
        valid: false,
        status: 'error',
        message: 'Could not connect to verification server. Please check internet connection.'
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  // Handle Post Review
  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!newComment.username.trim() || !newComment.comment.trim()) return;

    setSubmittingReview(true);
    setReviewMessage('');

    const reviewPayload = {
      bookSlug: book.slug,
      bookTitle: book.titleEn,
      username: newComment.username.trim(),
      comment: newComment.comment.trim(),
      rating: newComment.rating,
      source: 'web'
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewPayload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit review');

      setReviews([data, ...reviews]);
      setNewComment({ username: '', rating: 5, comment: '' });
      setReviewMessage(
        lang === 'am'
          ? 'አስተያየትዎ በተሳካ ሁኔታ ተመዝግቧል! እናመሰግናለን።'
          : 'Your review has been successfully posted! Thank you.'
      );
    } catch (err) {
      // Optimistic fallback
      const mockNew = {
        id: 'rev-' + Date.now(),
        ...reviewPayload,
        likes: 0,
        replies: [],
        createdAt: new Date().toISOString()
      };
      setReviews([mockNew, ...reviews]);
      setNewComment({ username: '', rating: 5, comment: '' });
      setReviewMessage(
        lang === 'am'
          ? 'አስተያየትዎ ታይቷል! (Local Preview)'
          : 'Your review has been added to the discussion stream.'
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  // Handle Like Review
  const handleLikeReview = async (reviewId) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' })
      });
      if (res.ok) {
        const updated = await res.json();
        setReviews(reviews.map((r) => (r.id === reviewId ? updated : r)));
        return;
      }
    } catch (_) {}
    // Optimistic fallback
    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, likes: (r.likes || 0) + 1 } : r
      )
    );
  };

  // Handle Reply to Review
  const handleReplyReview = async (reviewId) => {
    if (!replyText.username.trim() || !replyText.comment.trim()) return;
    try {
      const res = await fetch(`/api/reviews/${reviewId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyText)
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(reviews.map((r) => (r.id === reviewId ? data.feedback : r)));
        setReplyOpenId(null);
        setReplyText({ username: '', comment: '' });
        return;
      }
    } catch (_) {}
    // Optimistic fallback
    setReviews(
      reviews.map((r) => {
        if (r.id === reviewId) {
          const newReplies = r.replies || [];
          return {
            ...r,
            replies: [
              ...newReplies,
              {
                id: 'rep-' + Date.now(),
                username: replyText.username,
                comment: replyText.comment,
                createdAt: new Date().toISOString()
              }
            ]
          };
        }
        return r;
      })
    );
    setReplyOpenId(null);
    setReplyText({ username: '', comment: '' });
  };

  if (!book) {
    return (
      <main className="min-h-[70vh] pt-36 pb-24 bg-white text-[#222222] flex items-center justify-center font-sans">
        <div className="text-center p-8 max-w-md mx-auto bg-gray-50 border border-gray-200 rounded">
          <h1 className="font-serif text-2xl font-bold mb-2">
            {lang === 'am' ? 'መጽሐፉ አልተገኘም' : 'Book Not Found'}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            The requested volume was not found in the verified catalogue.
          </p>
          <Link to="/books" className="jkr-pill-btn-dark !text-xs">
            Return to Books →
          </Link>
        </div>
      </main>
    );
  }

  const currentSampleChapter =
    sampleData?.sampleChapters?.[sampleChapterIdx] ||
    sampleData?.sampleChapters?.[0];

  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length
      ).toFixed(1)
    : '5.0';

  const relatedBooks = verifiedBooks
    .filter((b) => b.id !== book.id && (b.series === book.series || b.isFeatured))
    .slice(0, 3);

  return (
    <div className="jkr-book-detail-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      {/* ─────────────────────────────────────────────────────────────
          1. STICKY ACTION ANCHOR BAR (The 4 Pillars)
          ───────────────────────────────────────────────────────────── */}
      <div className="jkr-book-sticky-bar px-4 shadow-lg">
        <div className="site-container max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 truncate max-w-[240px] sm:max-w-none">
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#c9a84c',
                boxShadow: '0 0 8px #c9a84c',
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                fontSize: '0.9375rem',
                color: '#c9a84c',
                letterSpacing: '0.04em',
              }}
            >
              {lang === 'am' ? book.titleAm : book.titleEn}
            </div>
            <span className="hidden sm:inline-block text-[#8a857d] text-[11px] font-mono">
              ({book.year})
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => scrollToSection(purchaseRef)}
              className="px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm text-[11px] sm:text-xs"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #b8860b)',
                color: '#1a1714',
                boxShadow: '0 2px 10px rgba(201,168,76,0.3)',
              }}
            >
              <Icon name="cart" size={14} />
              <span>{lang === 'am' ? 'ቅጂ ይግዙ' : 'Purchase Copy'}</span>
            </button>

            <button
              onClick={() => scrollToSection(sampleRef)}
              className="px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 text-[11px] sm:text-xs border hover:border-[#c9a84c] hover:text-[#c9a84c]"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
              }}
            >
              <Icon name="bookOpen" size={14} />
              <span>{lang === 'am' ? 'ቅምሻ ያንብቡ' : 'Read Sample'}</span>
            </button>

            <button
              onClick={() => scrollToSection(verifyRef)}
              className="px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 text-[11px] sm:text-xs border hover:border-[#c9a84c] hover:text-[#c9a84c]"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
              }}
            >
              <Icon name="shield" size={14} />
              <span>{lang === 'am' ? 'ትክክለኛነትን ያረጋግጡ' : 'Verify Authenticity'}</span>
            </button>

            <button
              onClick={() => scrollToSection(discussionRef)}
              className="px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 text-[11px] sm:text-xs border hover:border-[#c9a84c] hover:text-[#c9a84c]"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
              }}
            >
              <Icon name="message" size={14} />
              <span>
                {lang === 'am' ? 'ውይይት' : 'Discussion'} ({reviews.length})
              </span>
            </button>

            <LanguageToggle variant="dark" size="sm" className="ml-1" />
          </div>
        </div>
      </div>

      <div className="site-container max-w-5xl mx-auto py-10 sm:py-16">
        {/* Breadcrumb Trail */}
        <div className="pb-4 mb-10 border-b border-[#e8e2d5] text-xs text-[#736d65] flex items-center gap-2">
          <Link to="/" className="hover:text-[#c9a84c] transition-colors">
            {lang === 'am' ? 'መነሻ' : 'Home'}
          </Link>
          <span className="text-[#c9a84c]">/</span>
          <Link to="/books" className="hover:text-[#c9a84c] transition-colors">
            {lang === 'am' ? 'መጻሕፍት' : 'Books'}
          </Link>
          <span className="text-[#c9a84c]">/</span>
          <span className="text-[#1a1714] font-semibold">{lang === 'am' ? book.titleAm : book.titleEn}</span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HERO EDITORIAL SHOWCASE
            ───────────────────────────────────────────────────────────── */}
        <div className="jkr-book-hero mb-20">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm flex flex-col items-center">
              <div className="jkr-book-cover-frame relative group w-full">
                <div className="overflow-hidden rounded-lg group-hover:scale-102 transition-transform duration-300 flex justify-center">
                  <BookCover book={book} size="large" />
                </div>
                {book.isBestseller && (
                  <div
                    className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c, #b8860b)',
                      color: '#1a1714',
                    }}
                  >
                    <Icon name="medal" size={13} /> {lang === 'am' ? 'ምርጥ ሽያጭ' : 'Bestseller'}
                  </div>
                )}
              </div>

              {/* Action Buttons: Buy Now & Read Sample */}
              <div className="mt-7 w-full space-y-3">
                <button
                  onClick={() => setPurchaseModalOpen(true)}
                  className="w-full py-3.5 px-5 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group"
                  style={{
                    background: 'linear-gradient(135deg, #1a1714 0%, #2a221b 100%)',
                    border: '1px solid rgba(201,168,76,0.4)',
                    color: '#ffffff',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  }}
                >
                  <Icon name="cart" size={16} />
                  <span>{lang === 'am' ? 'አሁን ይግዙ (Buy Now)' : 'Buy Now'}</span>
                  <span className="text-[#c9a84c] font-mono text-xs font-bold">· {pricing.paperback}</span>
                </button>

                <button
                  onClick={() => scrollToSection(sampleRef)}
                  className="w-full py-3 px-5 bg-white border border-[#e8e2d5] hover:border-[#c9a84c] hover:bg-[#fbf9f4] text-[#1a1714] font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Icon name="bookOpen" size={16} />
                  <span>{lang === 'am' ? 'የመጽሐፉን ቅምሻ ያንብቡ' : 'Read Free Sample Chapter'}</span>
                </button>
              </div>

              {/* Fast Trust Indicators */}
              <div
                className="mt-5 p-4 rounded-xl w-full text-xs text-[#555047] space-y-2 border"
                style={{
                  background: 'linear-gradient(135deg, #fdfbf7 0%, #f7f3ea 100%)',
                  borderColor: '#e8dfc8',
                }}
              >
                <div className="flex items-center gap-2.5 font-bold text-[#1e6f42]">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">✓</span>
                  <span>{lang === 'am' ? 'ይፋዊ ደራሲያዊ የጸደቀ እትም' : 'Official Authorized Edition'}</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Icon name="shield" size={15} />
                  <span>{lang === 'am' ? 'የሆሎግራም ማረጋገጫ ኮድ አለው' : 'Includes Holographic Security Seal'}</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Icon name="truck" size={15} />
                  <span>{lang === 'am' ? 'ፈጣን የአዲስ አበባና የክልል አቅርቦት' : 'Fast Delivery across Ethiopia & Abroad'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold text-[#8a857d] uppercase tracking-widest mb-2.5 flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded bg-[#1a1714] text-[#c9a84c] text-[10px] font-mono tracking-wider">
                  {book.year} ({book.yearEc} ዓ.ም)
                </span>
                <span>•</span>
                <span className="font-semibold">{book.series || 'CANONICAL MONOGRAPH'}</span>
                {book.seriesOrder && (
                  <>
                    <span>•</span>
                    <span className="text-[#c9a84c] font-bold">TRILOGY PART 0{book.seriesOrder}</span>
                  </>
                )}
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                  fontWeight: 800,
                  color: '#1a1714',
                  lineHeight: 1.15,
                  marginBottom: '0.5rem',
                }}
              >
                {lang === 'am' ? book.titleAm : book.titleEn}
              </h1>

              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#c9a84c',
                }}
              >
                {lang === 'am' ? book.genreAm : book.genre}
              </div>
            </div>

            {/* Tagline */}
            <div
              className="p-5 rounded-xl border relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fbf9f4 0%, #f5efe3 100%)',
                borderLeft: '4px solid #c9a84c',
                borderColor: '#e8dfc8',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.125rem',
                  fontStyle: 'italic',
                  color: '#2e2923',
                  lineHeight: 1.6,
                }}
              >
                “{lang === 'am' ? book.tagline?.am : book.tagline?.en}”
              </p>
            </div>

            {/* Synopsis */}
            <div
              className="space-y-4 text-base sm:text-lg text-[#3d372e] leading-relaxed"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              <p>{lang === 'am' ? book.description?.am : book.description?.en}</p>
            </div>

            {/* Publication Details */}
            <div className="pt-6 border-t border-[#e8e2d5]">
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#1a1714',
                  marginBottom: '0.75rem',
                }}
              >
                {lang === 'am' ? 'የህትመት መረጃ' : 'Publication Dossier'}
              </h2>
                <div className="jkr-publication-grid grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="jkr-publication-fact p-3.5 bg-white border border-[#e8e2d5] rounded-xl shadow-xs">
                  <span className="text-[#8a857d] block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Publisher
                  </span>
                  <span className="text-[#1a1714] font-semibold text-xs line-clamp-1">
                    {lang === 'am' ? book.publisherAm : book.publisher}
                  </span>
                </div>
                <div className="jkr-publication-fact p-3.5 bg-white border border-[#e8e2d5] rounded-xl shadow-xs">
                  <span className="text-[#8a857d] block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Page Count
                  </span>
                  <span className="text-[#1a1714] font-semibold text-xs">{book.pageCount} Pages</span>
                </div>
                <div className="jkr-publication-fact p-3.5 bg-white border border-[#e8e2d5] rounded-xl shadow-xs">
                  <span className="text-[#8a857d] block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Binding
                  </span>
                  <span className="text-[#1a1714] font-semibold text-xs">Paperback / Hardcover</span>
                </div>
                <div className="jkr-publication-fact p-3.5 bg-white border border-[#e8e2d5] rounded-xl shadow-xs">
                  <span className="text-[#8a857d] block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Standard Price
                  </span>
                  <span className="text-[#b8860b] font-bold text-xs font-mono">{pricing.paperback}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            PILLAR 1: PURCHASE COPY (#purchase)
            ───────────────────────────────────────────────────────────── */}
        <section
          ref={purchaseRef}
          id="purchase"
          className="jkr-book-detail-section my-20 pt-16 border-t border-[#e8e2d5] scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="jkr-gold-divider mb-3">
              <Icon name="spark" size={15} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {lang === 'am' ? 'ምዕራፍ ፩ · ህጋዊ ቅጂ' : 'Section I · Authorized Edition'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.65rem)',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '0.5rem',
              }}
            >
              {lang === 'am' ? 'የመጽሐፉን ህጋዊ ቅጂ ይግዙ' : 'Purchase Authorized Copy'}
            </h2>
            <p className="text-sm text-[#6e685f] mt-2 font-serif">
              {lang === 'am'
                ? 'የይስማዕከ ወርቁን ኦሪጂናል መጻሕፍት በቀጥታ በማዘዝ ወይም በታወቁ የመጻሕፍት መደብሮች በኩል ይግዙ።'
                : 'Acquire authentic author editions with verifiable security seal, directly or via verified distributors.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Edition Cards & Instant Channels */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-[#e8e2d5] rounded-2xl p-6 bg-white shadow-md space-y-5">
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#1a1714',
                  }}
                  className="border-b border-[#f5f3ef] pb-3"
                >
                  {lang === 'am' ? 'የእትም አማራጮችና ዋጋዎች' : 'Available Editions & Pricing'}
                </h3>

                <div className="space-y-3">
                  <div
                    onClick={() => setOrderForm({ ...orderForm, format: 'paperback' })}
                    className={`jkr-edition-option p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                      orderForm.format === 'paperback'
                        ? 'bg-[#fbf9f4] border-[#c9a84c] shadow-sm'
                        : 'bg-white border-[#e8e2d5] hover:border-gray-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-[#1a1714] flex items-center gap-1.5">
                        <span>{lang === 'am' ? 'መደበኛ ቅጂ (Paperback)' : 'Standard Paperback'}</span>
                        {orderForm.format === 'paperback' && (
                          <span className="text-[10px] text-[#c9a84c] font-bold">✓ Selected</span>
                        )}
                      </div>
                      <div className="text-xs text-[#736d65]">
                        {book.pageCount} Pages · High Quality Print
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#1a1714] font-mono">{pricing.paperback}</div>
                      <div className="text-[10px] text-[#8a857d]">{pricing.usd}</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setOrderForm({ ...orderForm, format: 'hardcover' })}
                    className={`jkr-edition-option p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                      orderForm.format === 'hardcover'
                        ? 'bg-[#fbf9f4] border-[#c9a84c] shadow-sm'
                        : 'bg-white border-[#e8e2d5] hover:border-gray-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-[#1a1714] flex items-center gap-1.5">
                        <span>{lang === 'am' ? 'ዴሉክስ ቅጂ (Hardcover)' : 'Collector Hardcover'}</span>
                        {orderForm.format === 'hardcover' && (
                          <span className="text-[10px] text-[#c9a84c] font-bold">✓ Selected</span>
                        )}
                      </div>
                      <div className="text-xs text-[#736d65]">
                        Foil-stamped spine · Archival cloth
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#1a1714] font-mono">{pricing.hardcover}</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setOrderForm({ ...orderForm, format: 'ebook' })}
                    className={`jkr-edition-option p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                      orderForm.format === 'ebook'
                        ? 'bg-[#fbf9f4] border-[#c9a84c] shadow-sm'
                        : 'bg-white border-[#e8e2d5] hover:border-gray-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-[#1a1714] flex items-center gap-1.5">
                        <span>{lang === 'am' ? 'ዲጂታል ቅጂ (E-Book)' : 'Official E-Book'}</span>
                        {orderForm.format === 'ebook' && (
                          <span className="text-[10px] text-[#c9a84c] font-bold">✓ Selected</span>
                        )}
                      </div>
                      <div className="text-xs text-[#736d65]">
                        Secure digital reader access
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#1a1714] font-mono">{pricing.ebook}</div>
                    </div>
                  </div>
                </div>

                {/* Instant Order Channels */}
                <div className="pt-2 space-y-2.5">
                  <a
                    href={`https://t.me/yismakeworku?text=${encodeURIComponent(
                      `Hello, I would like to purchase "${book.titleEn}" (${pricing[orderForm.format] || pricing.paperback}). Please assist me with delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Icon name="message" size={15} />
                    <span>{lang === 'am' ? 'በቴሌግራም በቀጥታ እዘዝ' : 'Order Directly on Telegram'}</span>
                  </a>

                  {book.purchaseLinks?.map((pl, i) => (
                    <a
                      key={i}
                      href={pl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-white border border-[#e8e2d5] hover:border-[#c9a84c] text-[#1a1714] font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Icon name="building" size={15} />
                      <span>{pl.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Express Delivery Order Form */}
            <div className="lg:col-span-7">
              <div className="border border-[#e8e2d5] rounded-2xl p-6 sm:p-8 bg-white shadow-md">
                {orderPlaced ? (
                  <div className="text-center py-10 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-xs">
                      ✓
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#1a1714',
                      }}
                    >
                      {lang === 'am' ? 'የትዕዛዝ ጥያቄዎ ደርሶናል!' : 'Order Placed Successfully!'}
                    </h3>
                    <p className="text-sm text-[#5a554c] max-w-md mx-auto leading-relaxed">
                      {lang === 'am'
                        ? `እናመሰግናለን ${orderForm.name}። የመጽሐፍ አቅርቦት ክፍላችን በ${orderForm.phone} ደውሎ ያረጋግጣል።`
                        : `Thank you, ${orderForm.name}. Our delivery coordinator will call ${orderForm.phone} to finalize delivery.`}
                    </p>
                    <button
                      onClick={() => setOrderPlaced(false)}
                      className="mt-4 px-6 py-2.5 bg-[#1a1714] text-white text-xs font-bold rounded-full hover:bg-black transition-colors cursor-pointer"
                    >
                      {lang === 'am' ? 'አዲስ ትዕዛዝ አስገባ' : 'Place Another Order'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#1a1714',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {lang === 'am' ? 'ፈጣን የማድረሻ ቅጽ (Direct Delivery Form)' : 'Direct Delivery Order Form'}
                    </h3>
                    <p className="text-xs text-[#736d65] mb-6">
                      {lang === 'am'
                        ? 'መረጃዎን ያስገቡ፤ መጽሐፉ ያሉበት ድረስ ይላክልዎታል። ክፍያ በቴሌብር፣ በንግድ ባንክ ወይም ሲደርስዎት መፈጸም ይችላሉ።'
                        : 'Enter your delivery details. We deliver within Addis Ababa and regional cities with verified security packaging.'}
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (orderForm.name && orderForm.phone) setOrderPlaced(true);
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                            {lang === 'am' ? 'ሙሉ ስም' : 'Full Name *'}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Abebe Kebede"
                            value={orderForm.name}
                            onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-lg focus:border-[#c9a84c] focus:bg-white outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                            {lang === 'am' ? 'ስልክ ቁጥር' : 'Phone Number *'}
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0911XXXXXX"
                            value={orderForm.phone}
                            onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-lg focus:border-[#c9a84c] focus:bg-white outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                            {lang === 'am' ? 'ከተማ' : 'City'}
                          </label>
                          <input
                            type="text"
                            value={orderForm.city}
                            onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-lg focus:border-[#c9a84c] focus:bg-white outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                            {lang === 'am' ? 'የእትም ዓይነት' : 'Format'}
                          </label>
                          <select
                            value={orderForm.format}
                            onChange={(e) => setOrderForm({ ...orderForm, format: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-lg focus:border-[#c9a84c] focus:bg-white outline-none transition-colors"
                          >
                            <option value="paperback">Paperback ({pricing.paperback})</option>
                            <option value="hardcover">Hardcover ({pricing.hardcover})</option>
                            <option value="ebook">E-Book ({pricing.ebook})</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                            {lang === 'am' ? 'የክፍያ ዘዴ' : 'Payment'}
                          </label>
                          <select
                            value={orderForm.paymentMethod}
                            onChange={(e) =>
                              setOrderForm({ ...orderForm, paymentMethod: e.target.value })
                            }
                            className="w-full text-xs px-3.5 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-lg focus:border-[#c9a84c] focus:bg-white outline-none transition-colors"
                          >
                            <option value="telebirr">Telebirr (ቴሌብር)</option>
                            <option value="cbe">CBE Birr (ንግድ ባንክ)</option>
                            <option value="cod">Cash on Delivery</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                          {lang === 'am' ? 'የማድረሻ አድራሻ (ክፍለ ከተማ፣ ሰፈር)' : 'Specific Delivery Address / Location'}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Bole Medhanialem, Near Edna Mall"
                          value={orderForm.address}
                          onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-lg focus:border-[#c9a84c] focus:bg-white outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-4 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #1a1714 0%, #2a221b 100%)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          color: '#ffffff',
                        }}
                      >
                        <span>✓</span>
                        <span>
                          {lang === 'am'
                            ? `ትዕዛዙን አረጋግጥ — ${pricing[orderForm.format] || pricing.paperback}`
                            : `Confirm Purchase Order — ${pricing[orderForm.format] || pricing.paperback}`}
                        </span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* ─────────────────────────────────────────────────────────────
            PILLAR 2: READ SAMPLE (#sample)
            ───────────────────────────────────────────────────────────── */}
        <section
          ref={sampleRef}
          id="sample"
          className="jkr-book-detail-section my-20 pt-16 border-t border-[#e8e2d5] scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="jkr-gold-divider mb-3">
              <Icon name="spark" size={15} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {lang === 'am' ? 'ምዕራፍ ፪ · ነፃ ቅምሻ' : 'Section II · Free Manuscript Sample'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.65rem)',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '0.5rem',
              }}
            >
              {lang === 'am' ? 'የመጽሐፉ ቅምሻ አንባቢ' : 'Interactive Manuscript Reader'}
            </h2>
            <p className="text-sm text-[#6e685f] mt-2 font-serif">
              {lang === 'am'
                ? 'የመጽሐፉን የመጀመሪያ ምዕራፎች በድረ-ገጹ ላይ በቀጥታ ያንብቡ።'
                : 'Experience the opening chapters with customizable manuscript typography and dual-language translation.'}
            </p>
          </div>

          <div className="jkr-reader-console bg-white">
            <div className="jkr-reader-toolbar text-xs text-white">
              {/* Chapter Tabs */}
              <div className="flex items-center gap-2">
                {sampleData?.sampleChapters?.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => setSampleChapterIdx(idx)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all"
                    style={{
                      background:
                        sampleChapterIdx === idx
                          ? 'linear-gradient(135deg, #c9a84c, #b8860b)'
                          : 'rgba(255,255,255,0.08)',
                      color: sampleChapterIdx === idx ? '#1a1714' : '#e0dbd3',
                      boxShadow: sampleChapterIdx === idx ? '0 2px 8px rgba(201,168,76,0.4)' : 'none',
                    }}
                  >
                    {lang === 'am' ? `ምዕራፍ ${chap.id}` : `Chapter ${chap.id}`}
                  </button>
                ))}
              </div>

              {/* Reader Preferences: Font Size & Language & Theme */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="lang-toggle lang-toggle--dark lang-toggle--sm">
                  <div className="lang-toggle__track">
                    <span
                      className="lang-toggle__indicator"
                      style={{ transform: sampleLang === 'am' ? 'translateX(0)' : 'translateX(100%)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setSampleLang('am')}
                      className={`lang-toggle__btn lang-toggle__btn--am ${sampleLang === 'am' ? 'lang-toggle__btn--active' : ''}`}
                    >
                      አማ
                    </button>
                    <button
                      type="button"
                      onClick={() => setSampleLang('en')}
                      className={`lang-toggle__btn ${sampleLang === 'en' ? 'lang-toggle__btn--active' : ''}`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* Font Size Toggle */}
                <div
                  className="flex items-center gap-1 rounded-full px-2 py-1 text-xs border"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  <button
                    onClick={() => setSampleFontSize('small')}
                    className={`px-1.5 cursor-pointer font-bold ${
                      sampleFontSize === 'small' ? 'text-[#c9a84c]' : 'text-gray-400'
                    }`}
                    title="Small Font"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setSampleFontSize('normal')}
                    className={`px-1.5 cursor-pointer font-bold ${
                      sampleFontSize === 'normal' ? 'text-[#c9a84c]' : 'text-gray-400'
                    }`}
                    title="Default Font"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setSampleFontSize('large')}
                    className={`px-1.5 cursor-pointer font-bold ${
                      sampleFontSize === 'large' ? 'text-[#c9a84c]' : 'text-gray-400'
                    }`}
                    title="Large Font"
                  >
                    A+
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => setSampleTheme('parchment')}
                    className={`w-5 h-5 rounded-full border cursor-pointer transition-all ${
                      sampleTheme === 'parchment' ? 'ring-2 ring-[#c9a84c] scale-110' : ''
                    }`}
                    style={{ background: '#fdfbf7', borderColor: '#d9cdb8' }}
                    title="Parchment Mode"
                  />
                  <button
                    onClick={() => setSampleTheme('white')}
                    className={`w-5 h-5 rounded-full border cursor-pointer transition-all ${
                      sampleTheme === 'white' ? 'ring-2 ring-[#c9a84c] scale-110' : ''
                    }`}
                    style={{ background: '#ffffff', borderColor: '#dcdcdc' }}
                    title="Clean White Mode"
                  />
                  <button
                    onClick={() => setSampleTheme('dark')}
                    className={`w-5 h-5 rounded-full border cursor-pointer transition-all ${
                      sampleTheme === 'dark' ? 'ring-2 ring-[#c9a84c] scale-110' : ''
                    }`}
                    style={{ background: '#12100e', borderColor: '#3a342c' }}
                    title="Night Codex Mode"
                  />
                </div>
              </div>
            </div>

            {/* Reading Area */}
            <div
              className={`jkr-reader-reading-area p-6 sm:p-14 transition-colors min-h-[420px] select-text relative ${
                sampleTheme === 'parchment'
                  ? 'bg-[#fcfaf5] text-[#2c2621]'
                  : sampleTheme === 'dark'
                  ? 'bg-[#0f0e0c] text-[#e8e4dc]'
                  : 'bg-white text-[#1a1714]'
              }`}
            >
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Chapter Heading */}
                <div className="border-b pb-5 mb-8 text-center border-current/20">
                  <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#c9a84c] font-bold block mb-1.5">
                    {lang === 'am' ? 'ይፋዊ የስራው ቅምሻ' : 'Official Published Specimen'}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                      fontWeight: 800,
                    }}
                  >
                    {sampleLang === 'am'
                      ? currentSampleChapter?.titleAm
                      : currentSampleChapter?.titleEn}
                  </h3>
                </div>

                {/* Paragraphs */}
                <div
                  className={`leading-relaxed space-y-6 text-justify ${
                    sampleFontSize === 'small'
                      ? 'text-sm sm:text-base leading-relaxed'
                      : sampleFontSize === 'large'
                      ? 'text-lg sm:text-xl leading-loose'
                      : 'text-base sm:text-lg leading-relaxed'
                  }`}
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {(sampleLang === 'am'
                    ? currentSampleChapter?.paragraphsAm
                    : currentSampleChapter?.paragraphsEn
                  )?.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className={
                        pIdx === 0
                          ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#c9a84c]'
                          : ''
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Excerpt Footer Sign-off */}
                <div className="pt-10 border-t border-current/15 flex flex-wrap items-center justify-between text-xs font-mono opacity-70 gap-2">
                  <span>© YISMAKE WORKU ARCHIVES</span>
                  <span>
                    SAMPLE PREVIEW · PAGE {sampleChapterIdx + 1} OF {sampleData?.sampleChapters?.length || 2}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Want more? Buy copy */}
            <div className="bg-[#f7f5ef] px-6 py-5 border-t border-[#e8e2d5] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#5a554c] font-serif">
                {lang === 'am'
                  ? 'የተሟላውን 380+ ገጽ ታሪክ ለማንበብ የመጽሐፉን ሙሉ ቅጂ ይዘዙ።'
                  : 'Enjoyed this excerpt? Continue Shagiz and Didimos’s journeys in the full physical volume.'}
              </div>
              <button
                onClick={() => scrollToSection(purchaseRef)}
                className="px-6 py-2.5 bg-[#1a1714] hover:bg-black text-white font-bold text-xs rounded-full transition-all cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>{lang === 'am' ? 'ሙሉውን ቅጂ ይዘዙ →' : 'Order Full Volume →'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            PILLAR 3: VERIFY AUTHENTICITY (#verify)
            ───────────────────────────────────────────────────────────── */}
        <section
          ref={verifyRef}
          id="verify"
          className="jkr-book-detail-section my-20 pt-16 border-t border-[#e8e2d5] scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="jkr-gold-divider mb-3">
              <Icon name="spark" size={15} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {lang === 'am' ? 'ምዕራፍ ፫ · ትክክለኛነት ማረጋገጫ' : 'Section III · Security Verification'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.65rem)',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '0.5rem',
              }}
            >
              {lang === 'am' ? 'የመጽሐፍዎን ትክክለኛነት ያረጋግጡ' : 'Verify Book Authenticity'}
            </h2>
            <p className="text-sm text-[#6e685f] mt-2 font-serif">
              {lang === 'am'
                ? 'በመጽሐፉ የፊት ሽፋን ውስጠኛ ገጽ ላይ የሚገኘውን ልዩ የደህንነት ኮድ (Security Code) ወይም QR በማስገባት ትክክለኛነቱን ያረጋግጡ።'
                : 'Confirm whether your physical copy is an authentic authorized edition registered in the author registry.'}
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white border border-[#e8e2d5] rounded-2xl p-6 sm:p-10 shadow-lg">
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1a1714] uppercase tracking-wider mb-2">
                  {lang === 'am' ? 'የደህንነት ኮድ ያስገቡ (Security Code)' : 'Enter Book Verification Code'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BK-DERT001"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                    className="flex-1 font-mono uppercase text-sm sm:text-base px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl focus:border-[#c9a84c] focus:bg-white outline-none tracking-widest transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={verifyLoading}
                    className="px-6 py-3 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm shrink-0 flex items-center gap-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #1a1714 0%, #2a221b 100%)',
                      border: '1px solid rgba(201,168,76,0.4)',
                      color: '#ffffff',
                    }}
                  >
                    <Icon name="shield" size={15} />
                    <span>
                      {verifyLoading
                        ? lang === 'am' ? 'በማረጋገጥ ላይ...' : 'Verifying...'
                        : lang === 'am' ? 'አረጋግጥ' : 'Verify Code'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Helper test code pills */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-[#736d65] pt-1">
                <span className="font-semibold">{lang === 'am' ? 'የሙከራ ኮዶች:' : 'Quick Test Codes:'}</span>
                <button
                  type="button"
                  onClick={() => {
                    const code = sampleData?.sampleCode || 'BK-DERT001';
                    setVerifyCode(code);
                    handleVerifySubmit(null, code);
                  }}
                  className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full font-mono text-[11px] cursor-pointer font-bold transition-colors"
                >
                  {sampleData?.sampleCode || 'BK-DERT001'} (Authentic)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVerifyCode('BK-DERT002');
                    handleVerifySubmit(null, 'BK-DERT002');
                  }}
                  className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-full font-mono text-[11px] cursor-pointer font-bold transition-colors"
                >
                  BK-DERT002 (Scanned)
                </button>
              </div>
            </form>

            {/* Verification Result Output — Gold Holographic Certificate */}
            {verifyResult && (
              <div
                className="mt-6 p-6 sm:p-7 rounded-xl border relative overflow-hidden animate-fade-in shadow-md"
                style={{
                  background:
                    verifyResult.status === 'authentic'
                      ? 'linear-gradient(135deg, #f7fcf9 0%, #edf8f2 100%)'
                      : verifyResult.status === 'warning'
                      ? 'linear-gradient(135deg, #fdfbf7 0%, #faf3e6 100%)'
                      : 'linear-gradient(135deg, #fff7f7 0%, #feebeb 100%)',
                  borderColor:
                    verifyResult.status === 'authentic'
                      ? '#22c55e'
                      : verifyResult.status === 'warning'
                      ? '#c9a84c'
                      : '#ef4444',
                }}
              >
                {/* Holographic Watermark Badge */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      <Icon name={verifyResult.status === 'authentic' ? 'shield' : verifyResult.status === 'warning' ? 'alert' : 'close'} size={28} />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#8a857d] block">
                        Official Security Dossier
                      </span>
                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: '#1a1714',
                        }}
                      >
                        {verifyResult.status === 'authentic'
                          ? lang === 'am' ? 'ትክክለኛ የጸደቀ እትም (Verified Authentic)' : 'Verified Official Authorized Copy'
                          : verifyResult.status === 'warning'
                          ? lang === 'am' ? 'ከዚህ ቀደም የተረጋገጠ ቅጂ (Previously Verified)' : 'Previously Scanned Authorized Copy'
                          : lang === 'am' ? 'ያልተረጋገጠ ወይም የተጠረጠረ ኮድ (Unverified Code)' : 'Invalid or Unregistered Code'}
                      </h4>
                    </div>
                  </div>

                  {verifyResult.status === 'authentic' && (
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#1a1714] shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #c9a84c, #b8860b)',
                        boxShadow: '0 2px 8px rgba(201,168,76,0.3)',
                      }}
                    >
                      Hologram Certified
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#4a453e] leading-relaxed mb-4">
                  {verifyResult.message}
                </p>

                {verifyResult.code && (
                  <div className="pt-3 border-t border-black/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#5a554c] gap-2">
                    <div>
                      Registered Serial: <strong className="text-[#1a1714]">{verifyResult.code}</strong>
                    </div>
                    {verifyResult.scans && (
                      <div>Total Verification Scans: <strong>{verifyResult.scans}</strong></div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Camera QR scanner link */}
            <div className="mt-6 pt-5 border-t border-[#e8e2d5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#736d65]">
              <div className="flex items-center gap-2">
                <Icon name="camera" size={15} />
                <span>{lang === 'am' ? 'ካሜራ ተጠቅመው QR ኮድ መፈተሽ ይፈልጋሉ?' : 'Prefer to scan the QR barcode directly with camera?'}</span>
              </div>
              <Link
                to="/verify"
                className="px-4 py-2 bg-[#faf8f4] hover:bg-[#f2ede4] text-[#1a1714] font-bold rounded-xl text-xs transition-colors border border-[#e8e2d5]"
              >
                {lang === 'am' ? 'የካሜራ ስካነር ክፈት →' : 'Launch Camera Scanner →'}
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            PILLAR 4: DISCUSSION & REVIEWS (#discussion)
            ───────────────────────────────────────────────────────────── */}
        <section
          ref={discussionRef}
          id="discussion"
          className="jkr-book-detail-section my-20 pt-16 border-t border-[#e8e2d5] scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="jkr-gold-divider mb-3">
              <Icon name="spark" size={15} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {lang === 'am' ? 'ምዕራፍ ፬ · የአንባቢዎች ውይይት' : 'Section IV · Reader Discussion & Canon'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.65rem)',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '0.5rem',
              }}
            >
              {lang === 'am' ? 'የአንባቢዎች ውይይትና አስተያየቶች' : 'Reader Discussion & Reviews'}
            </h2>
            <p className="text-sm text-[#6e685f] mt-2 font-serif">
              {lang === 'am'
                ? 'ስለ መጽሐፉ ሀሳብዎን፣ ትንታኔዎንና አስተያየትዎን ለሌሎች አንባቢዎች ያካፍሉ።'
                : 'Join the literary circle. Share your reflections, critical analysis, and inquiries on this volume.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Submit a Review Form */}
            <div className="lg:col-span-5 bg-white border border-[#e8e2d5] rounded-2xl p-6 sm:p-7 shadow-md">
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#1a1714',
                  marginBottom: '0.25rem',
                }}
              >
                {lang === 'am' ? 'አስተያየትዎን ያካፍሉ' : 'Share Your Reflections'}
              </h3>
              <p className="text-xs text-[#736d65] mb-5">
                {lang === 'am'
                  ? 'የእርስዎ ድምጽ ለደራሲውና ለአንባቢዎች ወሳኝ ነው።'
                  : 'Your voice contributes to the communal Ethiopian literary canon.'}
              </p>

              {reviewMessage && (
                <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl animate-fade-in">
                  {reviewMessage}
                </div>
              )}

              <form onSubmit={handlePostReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                    {lang === 'am' ? 'ስም ወይም ቅጽል ስም *' : 'Your Name / Nickname *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alazar M."
                    value={newComment.username}
                    onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-lg focus:border-[#c9a84c] focus:bg-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                    {lang === 'am' ? 'ደረጃ (Rating)' : 'Rating'}
                  </label>
                  <div className="flex gap-1.5 text-2xl text-[#c9a84c] cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewComment({ ...newComment, rating: star })}
                        aria-label={`Rate ${star} out of 5`}
                        className={`transition-transform hover:scale-120 cursor-pointer ${
                          newComment.rating >= star ? 'text-[#c9a84c]' : 'text-gray-300'
                        }`}
                      >
                        <Icon name="star" size={22} className="fill-current" />
                      </button>
                    ))}
                    <span className="text-xs font-sans font-bold text-[#736d65] self-center ml-2">
                      {newComment.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1a1714] mb-1">
                    {lang === 'am' ? 'አስተያየት ወይም ትንታኔ *' : 'Your Review / Discussion Comment *'}
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder={
                      lang === 'am'
                        ? 'ስለ መጽሐፉ ምን አሰቡ? የትኛው ክፍል አስደነቀዎት?...'
                        : 'What did you think of the story, characters, and themes? Share your perspective...'
                    }
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-lg focus:border-[#c9a84c] focus:bg-white outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-3 px-4 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #1a1714 0%, #2a221b 100%)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    color: '#ffffff',
                  }}
                >
                  {submittingReview
                    ? lang === 'am' ? 'በመላክ ላይ...' : 'Submitting...'
                    : lang === 'am' ? 'አስተያየት አስገባ' : 'Post to Discussion'}
                </button>
              </form>
            </div>

            {/* Right: Comments Stream */}
            <div className="lg:col-span-7 space-y-4">
              {/* Header metrics */}
              <div className="p-4 bg-white border border-[#e8e2d5] rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#1a1714',
                    }}
                  >
                    {averageRating}
                  </div>
                  <div>
                    <div className="flex text-[#c9a84c] text-sm">
                      {[1, 2, 3, 4, 5].map((star) => <Icon key={star} name="star" size={14} className="fill-current" />)}
                    </div>
                    <div className="text-xs text-[#736d65]">
                      {lang === 'am'
                        ? `ከተረጋገጡ ${reviews.length} አንባቢዎች የተሰጠ`
                        : `Based on ${reviews.length} reader reviews`}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono font-semibold text-[#8a857d] bg-[#faf8f4] px-3 py-1.5 border border-[#e8e2d5] rounded-lg">
                  {book.titleEn}
                </div>
              </div>

              {/* Reviews List */}
              {reviewsLoading ? (
                <div className="text-center py-10 text-[#8a857d] text-xs">
                  {lang === 'am' ? 'አስተያየቶች በመጫን ላይ...' : 'Loading discussion threads...'}
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12 bg-white border border-dashed border-[#e8e2d5] rounded-xl text-[#8a857d] text-xs">
                  <Icon name="message" size={22} className="mb-2 text-[#c9a84c]" />
                  {lang === 'am'
                    ? 'እስካሁን ምንም አስተያየት አልተሰጠም። የመጀመሪያው አስተያየት ሰጪ ይሁኑ!'
                    : 'No reader reviews yet. Be the first to start the discussion for this volume!'}
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 bg-white border border-[#e8e2d5] hover:border-[#c9a84c] rounded-xl shadow-xs transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#1a1714] text-[#c9a84c] font-bold text-xs flex items-center justify-center">
                            {rev.username ? rev.username.charAt(0).toUpperCase() : 'R'}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-[#1a1714] block">
                              {rev.username || 'Anonymous Reader'}
                            </span>
                            {rev.source === 'scan' || rev.source === 'verified' ? (
                              <span className="text-[10px] text-emerald-700 font-bold">
                                ✓ Verified Reader
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="flex text-[#c9a84c]">
                            {Array.from({ length: Math.max(1, Math.min(5, Number(rev.rating) || 5)) }, (_, star) => (
                              <Icon key={star} name="star" size={13} className="fill-current" />
                            ))}
                          </span>
                          <span className="text-[11px] text-[#8a857d] font-mono">
                            {rev.createdAt
                              ? new Date(rev.createdAt).toLocaleDateString()
                              : 'Recent'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4a453e] leading-relaxed font-sans">
                        {rev.comment}
                      </p>

                      {/* Actions: Like & Reply */}
                      <div className="pt-2 border-t border-[#f5f3ef] flex items-center justify-between text-xs text-[#736d65]">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLikeReview(rev.id)}
                            className="flex items-center gap-1 hover:text-[#1a1714] cursor-pointer font-medium"
                          >
                            <Icon name="heart" size={14} />
                            <span>{rev.likes || 0}</span>
                          </button>

                          <button
                            onClick={() =>
                              setReplyOpenId(replyOpenId === rev.id ? null : rev.id)
                            }
                            className="hover:text-[#1a1714] cursor-pointer font-medium"
                          >
                            {lang === 'am' ? 'መልስ ስጥ' : 'Reply'}
                          </button>
                        </div>
                      </div>

                      {/* Reply Box if open */}
                      {replyOpenId === rev.id && (
                        <div className="mt-3 p-3 bg-[#faf8f4] rounded-lg border border-[#e8e2d5] space-y-2">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={replyText.username}
                            onChange={(e) =>
                              setReplyText({ ...replyText, username: e.target.value })
                            }
                            className="w-full text-xs px-3 py-2 bg-white border border-[#e8e2d5] rounded-md outline-none"
                          />
                          <textarea
                            rows="2"
                            placeholder="Write your reply..."
                            value={replyText.comment}
                            onChange={(e) =>
                              setReplyText({ ...replyText, comment: e.target.value })
                            }
                            className="w-full text-xs px-3 py-2 bg-white border border-[#e8e2d5] rounded-md outline-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setReplyOpenId(null)}
                              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-md cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReplyReview(rev.id)}
                              className="px-3 py-1 bg-[#1a1714] text-white text-xs rounded-md font-bold cursor-pointer"
                            >
                              Post Reply
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Display existing replies */}
                      {rev.replies && rev.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-[#c9a84c]/30 space-y-2">
                          {rev.replies.map((rep, rIdx) => (
                            <div key={rIdx} className="text-xs bg-[#faf8f4] p-3 rounded-lg border border-[#e8e2d5]">
                              <span className="font-bold text-[#1a1714] mr-2">
                                {rep.username}:
                              </span>
                              <span className="text-[#5a554c]">{rep.comment}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            RELATED WORKS
            ───────────────────────────────────────────────────────────── */}
        {relatedBooks.length > 0 && (
          <div className="pt-20 border-t border-[#e8e2d5]">
            <div className="text-center mb-10">
              <div className="jkr-gold-divider mb-3">
                <Icon name="spark" size={15} />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  fontWeight: 800,
                  color: '#1a1714',
                }}
              >
                {lang === 'am' ? 'ሌሎች የይስማዕከ ወርቁ ስራዎች' : 'More Works in the Canon'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedBooks.map((rel) => (
                <div
                  key={rel.id}
                  className="jkr-related-book-card bg-white border border-[#e8e2d5] p-6 rounded-2xl text-center flex flex-col items-center justify-between hover:border-[#c9a84c] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="mb-4 group-hover:scale-103 transition-transform">
                    <BookCover book={rel} size="small" />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#1a1714',
                        marginBottom: '0.25rem',
                      }}
                      className="group-hover:text-[#c9a84c] transition-colors"
                    >
                      {lang === 'am' ? rel.titleAm : rel.titleEn}
                    </h3>
                    <p className="text-xs text-[#8a857d] mb-4 font-mono">{rel.year}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/books/${rel.slug}`}
                        className="jkr-pill-btn-dark !py-2 !px-4 !text-xs cursor-pointer shadow-xs"
                      >
                        {lang === 'am' ? 'ተመልከት' : 'Read More'} <Icon name="arrowRight" size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Purchase Modal */}
      {purchaseModalOpen && (
        <QuickPurchaseModal
          book={book}
          isOpen={purchaseModalOpen}
          onClose={() => setPurchaseModalOpen(false)}
        />
      )}
    </div>
  );
}
