import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import Icon from './Icon';
import BookCover from './BookCover';

export default function BookSlider({ books }) {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!books || books.length === 0) return null;

  const total = books.length;
  const currentBook = books[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Helper to get book relative to current index
  const getBookAtOffset = (offset) => {
    const idx = (currentIndex + offset + total) % total;
    return { book: books[idx], index: idx };
  };

  const left2 = getBookAtOffset(-2);
  const left1 = getBookAtOffset(-1);
  const right1 = getBookAtOffset(1);
  const right2 = getBookAtOffset(2);

  return (
    <div className="book-slider-wrapper relative py-8 px-4 max-w-6xl mx-auto select-none">
      {/* Index Counter */}
      <div className="flex justify-end mb-4 pr-2">
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#8a857d',
            letterSpacing: '0.05em',
          }}
        >
          <strong style={{ color: '#1a1714', fontSize: '1.5rem' }}>{currentIndex + 1}</strong>
          <span style={{ margin: '0 4px', opacity: 0.5 }}>/</span>
          {total}
        </span>
      </div>

      {/* Main Slider Stage */}
      <div className="flex items-center justify-center gap-2 sm:gap-6 min-h-[420px] sm:min-h-[500px]">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Book"
          className="p-3 rounded-full bg-white/80 hover:bg-white border border-gray-200 shadow-lg text-[#1a1714] hover:text-[#c9a84c] transition-all cursor-pointer shrink-0 z-20"
        >
          <Icon name="arrowLeft" size={20} />
        </button>

        {/* Side Thumbnail Left 2 (Hidden on phone) */}
        <div
          onClick={() => setCurrentIndex(left2.index)}
          className="hidden lg:block cursor-pointer transition-all duration-300 opacity-40 hover:opacity-70 scale-75"
          style={{ width: '110px' }}
        >
          <BookCover book={left2.book} size="small" />
        </div>

        {/* Side Thumbnail Left 1 */}
        <div
          onClick={() => setCurrentIndex(left1.index)}
          className="hidden sm:block cursor-pointer transition-all duration-300 opacity-65 hover:opacity-90 scale-90"
          style={{ width: '130px' }}
        >
          <BookCover book={left1.book} size="small" />
        </div>

        {/* CENTER ACTIVE CARD */}
        <div
          className="bg-[#eef3f4] dark:bg-[#1a1714] p-6 sm:p-10 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl transition-all duration-500 max-w-xl w-full flex flex-col items-center text-center relative z-10"
          style={{
            background: 'linear-gradient(145deg, #eaf0f2 0%, #dbe4e8 100%)',
          }}
        >
          {/* Author Name */}
          <span className="text-xs font-bold tracking-widest text-[#688190] uppercase mb-4">
            YISMAKE WORKU
          </span>

          {/* Active Book Cover */}
          <Link
            to={`/books/${currentBook.slug}`}
            className="group block mb-6 transition-transform hover:scale-105 duration-300"
            style={{ width: '190px' }}
          >
            <BookCover book={currentBook} size="large" />
          </Link>

          {/* Title & Tagline */}
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#1a1714',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}
          >
            {lang === 'am' ? currentBook.titleAm : currentBook.titleEn}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: '#4a5b66',
              lineHeight: 1.6,
              maxWidth: '420px',
              marginBottom: '1.5rem',
            }}
          >
            {currentBook.tagline
              ? lang === 'am' ? currentBook.tagline.am : currentBook.tagline.en
              : lang === 'am' ? currentBook.description?.am?.slice(0, 120) + '…' : currentBook.description?.en?.slice(0, 120) + '…'}
          </p>

          <Link
            to={`/books/${currentBook.slug}`}
            className="jkr-pill-btn-dark !py-2.5 !px-6 !text-xs shadow-md inline-flex items-center gap-2"
          >
            <span>{lang === 'am' ? 'ሙሉውን ዝርዝር ያንብቡ' : 'Read More & Details'}</span>
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>

        {/* Side Thumbnail Right 1 */}
        <div
          onClick={() => setCurrentIndex(right1.index)}
          className="hidden sm:block cursor-pointer transition-all duration-300 opacity-65 hover:opacity-90 scale-90"
          style={{ width: '130px' }}
        >
          <BookCover book={right1.book} size="small" />
        </div>

        {/* Side Thumbnail Right 2 (Hidden on phone) */}
        <div
          onClick={() => setCurrentIndex(right2.index)}
          className="hidden lg:block cursor-pointer transition-all duration-300 opacity-40 hover:opacity-70 scale-75"
          style={{ width: '110px' }}
        >
          <BookCover book={right2.book} size="small" />
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Book"
          className="p-3 rounded-full bg-white/80 hover:bg-white border border-gray-200 shadow-lg text-[#1a1714] hover:text-[#c9a84c] transition-all cursor-pointer shrink-0 z-20"
        >
          <Icon name="arrowRight" size={20} />
        </button>
      </div>

      {/* Pagination dots below slider */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {books.map((b, idx) => (
          <button
            key={b.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to ${b.titleEn}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-[#1a1714]' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
