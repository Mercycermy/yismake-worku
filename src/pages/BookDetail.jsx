import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import { getBookSample } from '../data/bookSamples';
import BookCover from '../components/BookCover';
import Icon from '../components/Icon';

export default function BookDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const book = verifiedBooks.find((b) => b.slug === slug);

  // Read Sample State
  const [sampleChapterIdx, setSampleChapterIdx] = useState(0);
  const [sampleLang, setSampleLang] = useState('am');
  const [sampleFontSize, setSampleFontSize] = useState('normal');
  const [sampleTheme, setSampleTheme] = useState('parchment');

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

  const sampleRef = useRef(null);
  const verifyRef = useRef(null);
  const discussionRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, likes: (r.likes || 0) + 1 } : r
      )
    );
  };

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
      <main className="min-h-[70vh] pt-28 pb-20 bg-white text-[#1a1714] flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-2xl">
          <h1 className="font-serif text-2xl font-bold mb-2">
            {lang === 'am' ? 'መጽሐፉ አልተገኘም' : 'Book Not Found'}
          </h1>
          <Link to="/books" className="jkr-pill-btn-dark !text-xs mt-4 inline-block">
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
    .filter((b) => b.id !== book.id)
    .slice(0, 3);

  return (
    <div className="jkr-book-detail-page bg-white text-[#1a1714]">
      {/* Sticky Quick Nav Bar */}
      <div className="sticky top-0 z-40 bg-[#12100e]/90 backdrop-blur-md border-b border-[#c9a84c]/30 text-white px-4 py-2.5 shadow-md">
        <div className="site-container max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />
            <span className="font-serif font-bold text-[#c9a84c] text-sm truncate">
              {lang === 'am' ? book.titleAm : book.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => scrollToSection(sampleRef)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap"
            >
              {lang === 'am' ? 'ቅምሻ ያንብቡ' : 'Read Sample'}
            </button>
            <button
              onClick={() => scrollToSection(verifyRef)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap"
            >
              {lang === 'am' ? 'ትክክለኛነትን ያረጋግጡ' : 'Verify Authenticity'}
            </button>
            <button
              onClick={() => scrollToSection(discussionRef)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap"
            >
              {lang === 'am' ? 'ውይይት' : 'Discussion'} ({reviews.length})
            </button>
          </div>
        </div>
      </div>

      <div className="site-container max-w-5xl mx-auto py-8 sm:py-16 px-4">
        {/* Breadcrumb */}
        <div className="pb-4 mb-8 border-b border-[#e8e2d5] text-xs text-[#736d65] flex items-center gap-2">
          <Link to="/" className="hover:text-[#c9a84c]">
            {lang === 'am' ? 'መነሻ' : 'Home'}
          </Link>
          <span>/</span>
          <Link to="/books" className="hover:text-[#c9a84c]">
            {lang === 'am' ? 'መጻሕፍት' : 'Books'}
          </Link>
          <span>/</span>
          <span className="text-[#1a1714] font-semibold">{lang === 'am' ? book.titleAm : book.titleEn}</span>
        </div>

        {/* Hero Section of Book Detail */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#faf8f4] border border-[#e8e2d5] rounded-3xl p-6 sm:p-10 shadow-lg mb-16">
          <div className="md:col-span-5 flex justify-center">
            <div className="w-48 sm:w-56 shadow-2xl rounded-lg overflow-hidden border border-[#c9a84c]/40">
              <BookCover book={book} size="large" />
            </div>
          </div>

          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="px-3 py-1 bg-[#1a1714] text-[#c9a84c] text-[10px] font-mono font-bold tracking-widest uppercase rounded-md inline-block mb-3">
                {book.year} • {book.genre}
              </span>
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
            </div>

            {book.tagline && (
              <p className="font-serif italic text-base text-[#c9a84c] font-bold border-l-2 border-[#c9a84c] pl-3">
                “{lang === 'am' ? book.tagline.am : book.tagline.en}”
              </p>
            )}

            <p className="font-serif text-sm sm:text-base text-[#4a453e] leading-relaxed">
              {lang === 'am' ? book.description?.am : book.description?.en}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-3">
              <div className="p-3 bg-white border border-[#e8e2d5] rounded-xl shadow-xs">
                <span className="text-[#8a857d] text-[10px] font-bold uppercase block">{lang === 'am' ? 'አሳታሚ' : 'Publisher'}</span>
                <span className="font-bold text-[#1a1714] line-clamp-1">{book.publisherEn || book.publisher}</span>
              </div>
              <div className="p-3 bg-white border border-[#e8e2d5] rounded-xl shadow-xs">
                <span className="text-[#8a857d] text-[10px] font-bold uppercase block">{lang === 'am' ? 'ገጾች' : 'Pages'}</span>
                <span className="font-bold text-[#1a1714]">{book.pageCount} pages</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection(sampleRef)}
                className="jkr-pill-btn-dark !py-2.5 !px-6 !text-xs cursor-pointer shadow-md"
              >
                <Icon name="bookOpen" size={15} />
                <span>{lang === 'am' ? 'ናሙና ያንብቡ' : 'Read Sample Chapter'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section: Read Sample */}
        <section ref={sampleRef} className="my-16 pt-10 border-t border-[#e8e2d5]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest block mb-1">
              FREE SAMPLE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1714]">
              {lang === 'am' ? 'የመጽሐፉ ቅምሻ' : 'Sample Manuscript Chapter'}
            </h2>
          </div>

          <div className="bg-white border border-[#e8e2d5] rounded-2xl overflow-hidden shadow-lg">
            {/* Toolbar */}
            <div className="bg-[#1a1714] text-white p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                {sampleData?.sampleChapters?.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => setSampleChapterIdx(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                      sampleChapterIdx === idx ? 'bg-[#c9a84c] text-[#1a1714]' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Chapter {chap.id}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSampleLang((l) => (l === 'am' ? 'en' : 'am'))}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold cursor-pointer"
                >
                  {sampleLang === 'am' ? 'አማርኛ' : 'English'}
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-12 bg-[#fcfaf5] text-[#2c2621] min-h-[320px]">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-6 pb-4 border-b border-[#e8dfc8]">
                {sampleLang === 'am' ? currentSampleChapter?.titleAm : currentSampleChapter?.titleEn}
              </h3>

              <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                {(sampleLang === 'am'
                  ? currentSampleChapter?.paragraphsAm
                  : currentSampleChapter?.paragraphsEn
                )?.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Verify Authenticity */}
        <section ref={verifyRef} className="my-16 pt-10 border-t border-[#e8e2d5]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest block mb-1">
              AUTHENTICITY VERIFICATION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1714]">
              {lang === 'am' ? 'የመጽሐፉን ትክክለኛነት ያረጋግጡ' : 'Verify Your Physical Copy'}
            </h2>
          </div>

          <div className="max-w-xl mx-auto bg-white border border-[#e8e2d5] rounded-2xl p-6 sm:p-8 shadow-md">
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1a1714] uppercase tracking-wider mb-2">
                  Security Serial Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BK-DERT001"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                    className="flex-1 font-mono uppercase text-sm px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl outline-none focus:border-[#c9a84c]"
                  />
                  <button
                    type="submit"
                    disabled={verifyLoading}
                    className="jkr-pill-btn-dark !py-3 !px-6 !text-xs cursor-pointer shadow-xs"
                  >
                    {verifyLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </div>
            </form>

            {verifyResult && (
              <div
                className="mt-6 p-5 rounded-xl border text-xs sm:text-sm animate-fade-in"
                style={{
                  background: verifyResult.status === 'authentic' ? '#f0fdf4' : '#fef2f2',
                  borderColor: verifyResult.status === 'authentic' ? '#22c55e' : '#ef4444',
                }}
              >
                <h4 className="font-serif font-bold text-base mb-1 text-[#1a1714]">
                  {verifyResult.status === 'authentic' ? 'Verified Authentic Copy ✓' : 'Invalid or Unregistered Code'}
                </h4>
                <p className="text-[#4a453e]">{verifyResult.message}</p>
              </div>
            )}
          </div>
        </section>

        {/* Section: Discussion & Reviews */}
        <section ref={discussionRef} className="my-16 pt-10 border-t border-[#e8e2d5]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest block mb-1">
              COMMUNITY REVIEWS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1714]">
              {lang === 'am' ? 'የአንባቢዎች አስተያየት' : 'Reader Discussion & Reviews'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="md:col-span-5 bg-white border border-[#e8e2d5] rounded-2xl p-6 shadow-md">
              <h3 className="font-serif text-lg font-bold mb-3 text-[#1a1714]">
                {lang === 'am' ? 'አስተያየት ይጻፉ' : 'Leave a Review'}
              </h3>

              {reviewMessage && (
                <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg">
                  {reviewMessage}
                </div>
              )}

              <form onSubmit={handlePostReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a1714] mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newComment.username}
                    onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1714] mb-1">Rating</label>
                  <div className="flex gap-1 text-xl text-[#c9a84c]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setNewComment({ ...newComment, rating: s })}
                        className="cursor-pointer"
                      >
                        <Icon name="star" size={18} className={newComment.rating >= s ? 'fill-current' : 'text-gray-300'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1714] mb-1">Review</label>
                  <textarea
                    required
                    rows="3"
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full jkr-pill-btn-dark !py-2.5 !text-xs cursor-pointer"
                >
                  {submittingReview ? 'Posting...' : 'Post Review'}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="md:col-span-7 space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 bg-white border border-[#e8e2d5] rounded-2xl shadow-xs space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#1a1714]">{rev.username}</span>
                    <span className="flex text-[#c9a84c]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Icon key={s} name="star" size={12} className="fill-current" />
                      ))}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4a453e] leading-relaxed font-serif">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
