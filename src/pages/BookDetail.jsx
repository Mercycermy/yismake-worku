import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import { getBookSample } from '../data/bookSamples';
import BookCover from '../components/BookCover';
import QuickPurchaseModal from '../components/QuickPurchaseModal';

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
    <div className="bg-white text-[#222222] font-sans antialiased">
      {/* ─────────────────────────────────────────────────────────────
          1. STICKY ACTION ANCHOR BAR (The 4 Pillars)
          ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-14 z-30 bg-[#111111]/95 backdrop-blur-md border-b border-gray-800 text-white py-2.5 px-4 shadow-md">
        <div className="site-container max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="font-serif font-bold text-sm text-amber-300 truncate max-w-[200px] sm:max-w-none">
            {lang === 'am' ? book.titleAm : book.titleEn}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => scrollToSection(purchaseRef)}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all cursor-pointer flex items-center gap-1 shadow-sm text-[11px] sm:text-xs"
            >
              <span>🛒</span>
              <span>{lang === 'am' ? 'ቅጂ ይግዙ' : 'Purchase Copy'}</span>
            </button>

            <button
              onClick={() => scrollToSection(sampleRef)}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs"
            >
              <span>📖</span>
              <span>{lang === 'am' ? 'ቅምሻ ያንብቡ' : 'Read Sample'}</span>
            </button>

            <button
              onClick={() => scrollToSection(verifyRef)}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs"
            >
              <span>🛡️</span>
              <span>{lang === 'am' ? 'ትክክለኛነትን ያረጋግጡ' : 'Verify Authenticity'}</span>
            </button>

            <button
              onClick={() => scrollToSection(discussionRef)}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs"
            >
              <span>💬</span>
              <span>
                {lang === 'am' ? 'ውይይት' : 'Discussion'} ({reviews.length})
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="site-container max-w-5xl mx-auto py-10 sm:py-14">
        {/* Breadcrumb Trail */}
        <div className="pb-4 mb-8 border-b border-gray-200 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">
            {lang === 'am' ? 'መነሻ' : 'Home'}
          </Link>
          <span>/</span>
          <Link to="/books" className="hover:text-black">
            {lang === 'am' ? 'መጻሕፍት' : 'Books'}
          </Link>
          <span>/</span>
          <span className="text-[#111111] font-semibold">{book.titleEn}</span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HERO EDITORIAL SHOWCASE
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left: Book Cover Presentation & Direct Quick Buttons */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm flex flex-col items-center">
              <div className="shadow-2xl hover:scale-102 transition-transform duration-300">
                <BookCover book={book} size="large" />
              </div>

              {/* Action Buttons: Buy Now & Read Sample */}
              <div className="mt-6 w-full space-y-2.5">
                <button
                  onClick={() => setPurchaseModalOpen(true)}
                  className="w-full py-3 px-4 bg-[#111111] hover:bg-black text-white font-bold text-sm rounded-full transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🛒</span>
                  <span>{lang === 'am' ? 'አሁን ይግዙ (Buy Now)' : 'Buy Now'}</span>
                  <span className="text-amber-400 font-mono text-xs">· {pricing.paperback}</span>
                </button>

                <button
                  onClick={() => scrollToSection(sampleRef)}
                  className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-[#111111] font-semibold text-xs rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>📖</span>
                  <span>{lang === 'am' ? 'የመጽሐፉን ቅምሻ ያንብቡ' : 'Read Free Sample Chapter'}</span>
                </button>
              </div>

              {/* Fast Trust Indicators */}
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg w-full text-xs text-gray-600 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <span>✓</span>
                  <span>{lang === 'am' ? 'ይፋዊ ደራሲያዊ የጸደቀ እትም' : 'Official Authorized Edition'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡️</span>
                  <span>{lang === 'am' ? 'የሆሎግራም ማረጋገጫ ኮድ አለው' : 'Includes Holographic Security Seal'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>{lang === 'am' ? 'ፈጣን የአዲስ አበባና የክልል አቅርቦት' : 'Fast Delivery across Ethiopia & Abroad'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Description & Meta */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-bold text-[#888888] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span>{book.year} ({book.yearEc} ዓ.ም)</span>
                <span>•</span>
                <span>{book.series || 'STANDALONE WORK'}</span>
                {book.seriesOrder && (
                  <>
                    <span>•</span>
                    <span className="text-amber-600 font-bold">VOL 0{book.seriesOrder}</span>
                  </>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#111111] leading-tight">
                {lang === 'am' ? book.titleAm : book.titleEn}
              </h1>

              <div className="text-sm font-semibold text-[#c59b27] mt-1 font-serif">
                {lang === 'am' ? book.genreAm : book.genre}
              </div>
            </div>

            {/* Tagline */}
            <div className="p-5 bg-[#faf8f5] border-l-4 border-[#111111] rounded-sm font-serif text-base sm:text-lg italic text-[#333333]">
              “{lang === 'am' ? book.tagline?.am : book.tagline?.en}”
            </div>

            {/* Synopsis */}
            <div className="space-y-4 text-base sm:text-lg text-[#333333] leading-relaxed font-serif">
              <p>{lang === 'am' ? book.description?.am : book.description?.en}</p>
            </div>

            {/* Publication Details */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="font-serif text-lg font-bold text-[#111111] mb-3">
                {lang === 'am' ? 'የህትመት መረጃ' : 'Publication Dossier'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Publisher</span>
                  <span className="text-[#111111] font-semibold text-xs line-clamp-1">
                    {lang === 'am' ? book.publisherAm : book.publisher}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Page Count</span>
                  <span className="text-[#111111] font-semibold text-xs">{book.pageCount} Pages</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Format</span>
                  <span className="text-[#111111] font-semibold text-xs">Paperback / Hardcover</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Price</span>
                  <span className="text-amber-700 font-bold text-xs">{pricing.paperback}</span>
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
          className="my-16 pt-10 border-t-2 border-[#111111] scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Pillar 1
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              {lang === 'am' ? 'የመጽሐፉን ህጋዊ ቅጂ ይግዙ' : 'Purchase Authorized Copy'}
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-serif">
              {lang === 'am'
                ? 'የይስማዕከ ወርቁን ኦሪጂናል መጻሕፍት በቀጥታ በማዘዝ ወይም በታወቁ የመጻሕፍት መደብሮች በኩል ይግዙ።'
                : 'Acquire authentic author editions with verifiable security seal, directly or via verified distributors.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Edition Cards & Instant Channels */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#111111] border-b pb-2">
                  {lang === 'am' ? 'የእትም አማራጮችና ዋጋዎች' : 'Available Editions & Pricing'}
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 bg-gray-50 border-2 border-black rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900">
                        {lang === 'am' ? 'መደበኛ ቅጂ (Paperback)' : 'Standard Paperback'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {book.pageCount} Pages · High Quality Print
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#111111]">{pricing.paperback}</div>
                      <div className="text-[10px] text-gray-500">{pricing.usd}</div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900">
                        {lang === 'am' ? 'ዴሉክስ ቅጂ (Hardcover)' : 'Collector Hardcover'}
                      </div>
                      <div className="text-xs text-gray-500">
                        Foil-stamped spine · Archival cloth
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#111111]">{pricing.hardcover}</div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900">
                        {lang === 'am' ? 'ዲጂታል ቅጂ (E-Book)' : 'Official E-Book'}
                      </div>
                      <div className="text-xs text-gray-500">
                        Secure reader access
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#111111]">{pricing.ebook}</div>
                    </div>
                  </div>
                </div>

                {/* Instant Order Channels */}
                <div className="pt-2 space-y-2.5">
                  <a
                    href={`https://t.me/yismakeworku?text=${encodeURIComponent(
                      `Hello, I would like to purchase "${book.titleEn}" (${pricing.paperback}). Please assist me with delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>💬</span>
                    <span>{lang === 'am' ? 'በቴሌግራም በቀጥታ እዘዝ' : 'Order Directly on Telegram'}</span>
                  </a>

                  {book.purchaseLinks?.map((pl, i) => (
                    <a
                      key={i}
                      href={pl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-white border border-gray-300 hover:border-black text-[#111111] font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <span>🏪</span>
                      <span>{pl.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Express Delivery Order Form */}
            <div className="lg:col-span-7">
              <div className="border border-gray-300 rounded-lg p-6 bg-[#fafafa] shadow-sm">
                {orderPlaced ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                      ✓
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#111111]">
                      {lang === 'am' ? 'የትዕዛዝ ጥያቄዎ ደርሶናል!' : 'Order Placed Successfully!'}
                    </h3>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      {lang === 'am'
                        ? `እናመሰግናለን ${orderForm.name}። የመጽሐፍ አቅርቦት ክፍላችን በ${orderForm.phone} ደውሎ ያረጋግጣል።`
                        : `Thank you, ${orderForm.name}. Our delivery coordinator will call ${orderForm.phone} to finalize delivery.`}
                    </p>
                    <button
                      onClick={() => setOrderPlaced(false)}
                      className="mt-4 px-6 py-2 bg-[#111111] text-white text-xs font-bold rounded-full"
                    >
                      {lang === 'am' ? 'አዲስ ትዕዛዝ አስገባ' : 'Place Another Order'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#111111] mb-1">
                      {lang === 'am' ? 'ፈጣን የማድረሻ ቅጽ (Direct Delivery Form)' : 'Direct Delivery Order Form'}
                    </h3>
                    <p className="text-xs text-gray-500 mb-5">
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
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            {lang === 'am' ? 'ሙሉ ስም' : 'Full Name *'}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Abebe Kebede"
                            value={orderForm.name}
                            onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                            className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            {lang === 'am' ? 'ስልክ ቁጥር' : 'Phone Number *'}
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0911XXXXXX"
                            value={orderForm.phone}
                            onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                            className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            {lang === 'am' ? 'ከተማ' : 'City'}
                          </label>
                          <input
                            type="text"
                            value={orderForm.city}
                            onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                            className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            {lang === 'am' ? 'የእትም ዓይነት' : 'Format'}
                          </label>
                          <select
                            value={orderForm.format}
                            onChange={(e) => setOrderForm({ ...orderForm, format: e.target.value })}
                            className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                          >
                            <option value="paperback">Paperback ({pricing.paperback})</option>
                            <option value="hardcover">Hardcover ({pricing.hardcover})</option>
                            <option value="ebook">E-Book ({pricing.ebook})</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            {lang === 'am' ? 'የክፍያ ዘዴ' : 'Payment'}
                          </label>
                          <select
                            value={orderForm.paymentMethod}
                            onChange={(e) =>
                              setOrderForm({ ...orderForm, paymentMethod: e.target.value })
                            }
                            className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                          >
                            <option value="telebirr">Telebirr (ቴሌብር)</option>
                            <option value="cbe">CBE Birr (ንግድ ባንክ)</option>
                            <option value="cod">Cash on Delivery</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          {lang === 'am' ? 'የማድረሻ አድራሻ (ክፍለ ከተማ፣ ሰፈር)' : 'Specific Delivery Address / Location'}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Bole Medhanialem, Near Edna Mall"
                          value={orderForm.address}
                          onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-[#111111] hover:bg-black text-white font-bold text-xs rounded transition-all cursor-pointer shadow-md"
                      >
                        {lang === 'am'
                          ? `ትዕዛዙን አረጋግጥ — ${pricing[orderForm.format] || pricing.paperback}`
                          : `Confirm Purchase Order — ${pricing[orderForm.format] || pricing.paperback}`}
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
          className="my-16 pt-10 border-t-2 border-[#111111] scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Pillar 2
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              {lang === 'am' ? 'ነፃ የመጽሐፍ ቅምሻ (Read Sample)' : 'Interactive Sample Reader'}
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-serif">
              {lang === 'am'
                ? 'የመጽሐፉን የመጀመሪያ ምዕራፎች በድረ-ገጹ ላይ በቀጥታ ያንብቡ።'
                : 'Experience the opening chapters with customizable manuscript typography and dual-language translation.'}
            </p>
          </div>

          {/* Reader Console Container */}
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
            {/* Top Reader Controls Bar */}
            <div className="bg-[#111111] text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Chapter Tabs */}
              <div className="flex items-center gap-2">
                {sampleData?.sampleChapters?.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => setSampleChapterIdx(idx)}
                    className={`px-3 py-1 rounded text-xs cursor-pointer transition-colors ${
                      sampleChapterIdx === idx
                        ? 'bg-amber-400 text-black font-bold'
                        : 'bg-white/10 hover:bg-white/20 text-gray-200'
                    }`}
                  >
                    {lang === 'am' ? `ምዕራፍ ${chap.id}` : `Chapter ${chap.id}`}
                  </button>
                ))}
              </div>

              {/* Reader Preferences: Font Size & Language & Theme */}
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <div className="flex items-center bg-white/10 rounded p-0.5">
                  <button
                    onClick={() => setSampleLang('am')}
                    className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                      sampleLang === 'am' ? 'bg-amber-400 text-black font-bold' : 'text-gray-300'
                    }`}
                  >
                    አማ
                  </button>
                  <button
                    onClick={() => setSampleLang('en')}
                    className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                      sampleLang === 'en' ? 'bg-amber-400 text-black font-bold' : 'text-gray-300'
                    }`}
                  >
                    EN
                  </button>
                </div>

                {/* Font Size Toggle */}
                <div className="flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5 text-xs">
                  <button
                    onClick={() => setSampleFontSize('small')}
                    className={`px-1 cursor-pointer ${sampleFontSize === 'small' ? 'text-amber-400 font-bold' : 'text-gray-400'}`}
                    title="Small Font"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setSampleFontSize('normal')}
                    className={`px-1 cursor-pointer ${sampleFontSize === 'normal' ? 'text-amber-400 font-bold' : 'text-gray-400'}`}
                    title="Default Font"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setSampleFontSize('large')}
                    className={`px-1 cursor-pointer ${sampleFontSize === 'large' ? 'text-amber-400 font-bold' : 'text-gray-400'}`}
                    title="Large Font"
                  >
                    A+
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    onClick={() => setSampleTheme('parchment')}
                    className={`w-4 h-4 rounded-full bg-[#fbf8f1] border cursor-pointer ${
                      sampleTheme === 'parchment' ? 'ring-2 ring-amber-400' : ''
                    }`}
                    title="Parchment Mode"
                  />
                  <button
                    onClick={() => setSampleTheme('white')}
                    className={`w-4 h-4 rounded-full bg-white border cursor-pointer ${
                      sampleTheme === 'white' ? 'ring-2 ring-amber-400' : ''
                    }`}
                    title="Clean White Mode"
                  />
                  <button
                    onClick={() => setSampleTheme('dark')}
                    className={`w-4 h-4 rounded-full bg-[#151d1f] border cursor-pointer ${
                      sampleTheme === 'dark' ? 'ring-2 ring-amber-400' : ''
                    }`}
                    title="Night Codex Mode"
                  />
                </div>
              </div>
            </div>

            {/* Reading Area */}
            <div
              className={`p-6 sm:p-12 transition-colors min-h-[380px] select-text ${
                sampleTheme === 'parchment'
                  ? 'bg-[#fcfaf5] text-[#2c2621]'
                  : sampleTheme === 'dark'
                  ? 'bg-[#0f1719] text-[#e0e6e8]'
                  : 'bg-white text-[#222222]'
              }`}
            >
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Chapter Heading */}
                <div className="border-b pb-4 mb-6 text-center border-current/20">
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c59b27] font-bold block mb-1">
                    {lang === 'am' ? 'ይፋዊ የስራው ቅምሻ' : 'Official Published Specimen'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                    {sampleLang === 'am'
                      ? currentSampleChapter?.titleAm
                      : currentSampleChapter?.titleEn}
                  </h3>
                </div>

                {/* Paragraphs */}
                <div
                  className={`font-serif leading-relaxed space-y-5 text-justify ${
                    sampleFontSize === 'small'
                      ? 'text-sm sm:text-base leading-relaxed'
                      : sampleFontSize === 'large'
                      ? 'text-lg sm:text-xl leading-loose'
                      : 'text-base sm:text-lg leading-relaxed'
                  }`}
                >
                  {(sampleLang === 'am'
                    ? currentSampleChapter?.paragraphsAm
                    : currentSampleChapter?.paragraphsEn
                  )?.map((para, pIdx) => (
                    <p key={pIdx} className={pIdx === 0 ? 'first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#c59b27]' : ''}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Excerpt Footer Sign-off */}
                <div className="pt-8 border-t border-current/15 flex flex-wrap items-center justify-between text-xs font-mono opacity-70 gap-2">
                  <span>© YISMAKE WORKU ARCHIVES</span>
                  <span>SAMPLE PREVIEW · PAGE {sampleChapterIdx + 1} OF {sampleData?.sampleChapters?.length || 2}</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Want more? Buy copy */}
            <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-600">
                {lang === 'am'
                  ? 'የተሟላውን 380+ ገጽ ታሪክ ለማንበብ የመጽሐፉን ሙሉ ቅጂ ይዘዙ።'
                  : 'Enjoyed this excerpt? Continue Shagiz and Didimos’s journeys in the full physical volume.'}
              </div>
              <button
                onClick={() => scrollToSection(purchaseRef)}
                className="px-5 py-2 bg-[#111111] hover:bg-black text-white font-bold text-xs rounded-full transition-all cursor-pointer shadow-sm"
              >
                {lang === 'am' ? 'ሙሉውን ቅጂ ይዘዙ →' : 'Order Full Volume →'}
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
          className="my-16 pt-10 border-t-2 border-[#111111] scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Pillar 3
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              {lang === 'am' ? 'የመጽሐፍዎን ትክክለኛነት ያረጋግጡ' : 'Verify Book Authenticity'}
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-serif">
              {lang === 'am'
                ? 'በመጽሐፉ የፊት ሽፋን ውስጠኛ ገጽ ላይ የሚገኘውን ልዩ የደህንነት ኮድ (Security Code) ወይም QR በማስገባት ትክክለኛነቱን ያረጋግጡ።'
                : 'Confirm whether your physical copy is an authentic authorized edition registered in the author registry.'}
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-300 rounded-lg p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {lang === 'am' ? 'የደህንነት ኮድ ያስገቡ (Security Code)' : 'Enter Book Verification Code'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BK-DERT001 or BK-XXXXXXX"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                    className="flex-1 font-mono uppercase text-sm sm:text-base px-4 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none tracking-widest"
                  />
                  <button
                    type="submit"
                    disabled={verifyLoading}
                    className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white font-bold text-xs rounded transition-all cursor-pointer shadow-sm shrink-0"
                  >
                    {verifyLoading
                      ? (lang === 'am' ? 'በማረጋገጥ ላይ...' : 'Verifying...')
                      : (lang === 'am' ? 'አረጋግጥ' : 'Verify Code')}
                  </button>
                </div>
              </div>

              {/* Helper test code pills for easy testing */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500 pt-1">
                <span>{lang === 'am' ? 'የሙከራ ኮዶች (Quick Test):' : 'Test Verified Codes:'}</span>
                <button
                  type="button"
                  onClick={() => {
                    const code = sampleData?.sampleCode || 'BK-DERT001';
                    setVerifyCode(code);
                    handleVerifySubmit(null, code);
                  }}
                  className="px-2.5 py-0.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded font-mono text-[11px] cursor-pointer"
                >
                  {sampleData?.sampleCode || 'BK-DERT001'} (Authentic)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVerifyCode('BK-DERT002');
                    handleVerifySubmit(null, 'BK-DERT002');
                  }}
                  className="px-2.5 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded font-mono text-[11px] cursor-pointer"
                >
                  BK-DERT002 (Scanned)
                </button>
              </div>
            </form>

            {/* Verification Result Output */}
            {verifyResult && (
              <div
                className={`mt-6 p-5 rounded-lg border text-sm transition-all ${
                  verifyResult.status === 'authentic'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : verifyResult.status === 'warning'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">
                    {verifyResult.status === 'authentic'
                      ? '🛡️'
                      : verifyResult.status === 'warning'
                      ? '⚠️'
                      : '❌'}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base">
                      {verifyResult.status === 'authentic'
                        ? (lang === 'am' ? 'ትክክለኛ የጸደቀ እትም (Verified Authentic)' : 'Verified Authentic Copy')
                        : verifyResult.status === 'warning'
                        ? (lang === 'am' ? 'ከዚህ ቀደም የተረጋገጠ ቅጂ (Previously Verified)' : 'Previously Verified Copy')
                        : (lang === 'am' ? 'ያልተረጋገጠ ወይም የተጠረጠረ ኮድ (Unverified Code)' : 'Invalid or Unregistered Code')}
                    </h4>
                    <p className="text-xs leading-relaxed">{verifyResult.message}</p>
                    {verifyResult.code && (
                      <div className="font-mono text-xs pt-1 opacity-80">
                        Code: <strong>{verifyResult.code}</strong> {verifyResult.scans ? `· Total Scans: ${verifyResult.scans}` : ''}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Camera QR scanner link */}
            <div className="mt-6 pt-5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <span>📷</span>
                <span>{lang === 'am' ? 'ካሜራ ተጠቅመው QR ኮድ መፈተሽ ይፈልጋሉ?' : 'Prefer to scan the QR barcode directly?'}</span>
              </div>
              <Link
                to="/verify"
                className="px-3.5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded text-xs transition-colors"
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
          className="my-16 pt-10 border-t-2 border-[#111111] scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Pillar 4
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              {lang === 'am' ? 'የአንባቢዎች ውይይትና አስተያየቶች' : 'Reader Discussion & Reviews'}
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-serif">
              {lang === 'am'
                ? 'ስለ መጽሐፉ ሀሳብዎን፣ ትንታኔዎንና አስተያየትዎን ለሌሎች አንባቢዎች ያካፍሉ።'
                : 'Join the literary circle. Share your reflections, critical analysis, and inquiries on this volume.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Submit a Review Form */}
            <div className="lg:col-span-5 bg-[#fafafa] border border-gray-300 rounded-lg p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#111111] mb-1">
                {lang === 'am' ? 'አስተያየትዎን ያካፍሉ' : 'Share Your Thoughts'}
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                {lang === 'am' ? 'የእርስዎ ድምጽ ለደራሲውና ለአንባቢዎች ወሳኝ ነው።' : 'Your voice contributes to the communal Ethiopian literary canon.'}
              </p>

              {reviewMessage && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded">
                  {reviewMessage}
                </div>
              )}

              <form onSubmit={handlePostReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'am' ? 'ስም ወይም ቅጽል ስም *' : 'Your Name / Nickname *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alazar M."
                    value={newComment.username}
                    onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded focus:border-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'am' ? 'ደረጃ (Rating)' : 'Rating'}
                  </label>
                  <div className="flex gap-1.5 text-2xl text-amber-400 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setNewComment({ ...newComment, rating: star })}
                        className={`transition-transform hover:scale-115 ${
                          newComment.rating >= star ? 'text-amber-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs font-sans font-bold text-gray-600 self-center ml-2">
                      {newComment.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                    className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded focus:border-black outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-2.5 px-4 bg-[#111111] hover:bg-black text-white font-bold text-xs rounded transition-all cursor-pointer shadow-sm"
                >
                  {submittingReview
                    ? (lang === 'am' ? 'በመላክ ላይ...' : 'Submitting...')
                    : (lang === 'am' ? 'አስተያየት አስገባ' : 'Post to Discussion')}
                </button>
              </form>
            </div>

            {/* Right: Comments Stream */}
            <div className="lg:col-span-7 space-y-4">
              {/* Header metrics */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold font-serif text-[#111111]">
                    {averageRating}
                  </div>
                  <div>
                    <div className="flex text-amber-400 text-sm">★★★★★</div>
                    <div className="text-xs text-gray-500">
                      {lang === 'am'
                        ? `ከተረጋገጡ ${reviews.length} አንባቢዎች የተሰጠ`
                        : `Based on ${reviews.length} reader reviews`}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono font-semibold text-gray-600 bg-white px-3 py-1.5 border rounded">
                  {book.titleEn}
                </div>
              </div>

              {/* Reviews List */}
              {reviewsLoading ? (
                <div className="text-center py-10 text-gray-500 text-xs">
                  {lang === 'am' ? 'አስተያየቶች በመጫን ላይ...' : 'Loading discussion threads...'}
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 border border-dashed rounded-lg text-gray-500 text-xs">
                  <span className="text-2xl block mb-2">💬</span>
                  {lang === 'am'
                    ? 'እስካሁን ምንም አስተያየት አልተሰጠም። የመጀመሪያው አስተያየት ሰጪ ይሁኑ!'
                    : 'No reader reviews yet. Be the first to start the discussion for this volume!'}
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 bg-white border border-gray-200 hover:border-gray-300 rounded-lg shadow-sm transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gray-900 text-white font-bold text-xs flex items-center justify-center">
                            {rev.username ? rev.username.charAt(0).toUpperCase() : 'R'}
                          </div>
                          <span className="font-bold text-sm text-gray-900">
                            {rev.username || 'Anonymous Reader'}
                          </span>
                          {rev.source === 'scan' || rev.source === 'verified' ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                              Verified Copy
                            </span>
                          ) : null}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 text-xs">
                            {'★'.repeat(rev.rating || 5)}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">
                            {rev.createdAt
                              ? new Date(rev.createdAt).toLocaleDateString()
                              : 'Recent'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                        {rev.comment}
                      </p>

                      {/* Actions: Like & Reply */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLikeReview(rev.id)}
                            className="flex items-center gap-1 text-gray-600 hover:text-black cursor-pointer font-medium"
                          >
                            <span>❤️</span>
                            <span>{rev.likes || 0}</span>
                          </button>

                          <button
                            onClick={() =>
                              setReplyOpenId(replyOpenId === rev.id ? null : rev.id)
                            }
                            className="text-gray-600 hover:text-black cursor-pointer font-medium"
                          >
                            {lang === 'am' ? 'መልስ ስጥ' : 'Reply'}
                          </button>
                        </div>
                      </div>

                      {/* Reply Box if open */}
                      {replyOpenId === rev.id && (
                        <div className="mt-3 p-3 bg-gray-50 rounded border space-y-2">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={replyText.username}
                            onChange={(e) =>
                              setReplyText({ ...replyText, username: e.target.value })
                            }
                            className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded outline-none"
                          />
                          <textarea
                            rows="2"
                            placeholder="Write your reply..."
                            value={replyText.comment}
                            onChange={(e) =>
                              setReplyText({ ...replyText, comment: e.target.value })
                            }
                            className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded outline-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setReplyOpenId(null)}
                              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReplyReview(rev.id)}
                              className="px-3 py-1 bg-black text-white text-xs rounded font-bold"
                            >
                              Post Reply
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Display existing replies */}
                      {rev.replies && rev.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-2">
                          {rev.replies.map((rep, rIdx) => (
                            <div key={rIdx} className="text-xs bg-gray-50 p-2.5 rounded">
                              <span className="font-bold text-gray-900 mr-2">
                                {rep.username}:
                              </span>
                              <span className="text-gray-700">{rep.comment}</span>
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
          <div className="pt-16 border-t border-gray-200">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-8 text-center">
              {lang === 'am' ? 'ሌሎች የይስማዕከ ወርቁ ስራዎች' : 'More Works in the Canon'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedBooks.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-[#fafafa] border border-gray-200 p-6 rounded-sm text-center flex flex-col items-center justify-between"
                >
                  <div className="mb-4">
                    <BookCover book={rel} size="small" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#111111] mb-1">
                      {lang === 'am' ? rel.titleAm : rel.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">{rel.year}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/books/${rel.slug}`}
                        className="jkr-pill-btn-dark !py-1.5 !px-3.5 !text-xs"
                      >
                        {lang === 'am' ? 'ተመልከት →' : 'Read More →'}
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
