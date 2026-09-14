import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import BookCover from './BookCover';

export default function BookCard({ book }) {
  const { lang } = useLanguage();
  if (!book) return null;

  return (
    <div className="glass-panel group relative flex flex-col justify-between overflow-hidden p-5 transition-all duration-300 hover:border-[#00f0ff]/40 hover:-translate-y-1.5">
      {/* Top Cover Display */}
      <div className="flex justify-center mb-5 relative">
        <Link to={`/books/${book.slug}`} className="block">
          <div className="transition-transform duration-500 group-hover:scale-105">
            <BookCover book={book} size="normal" />
          </div>
        </Link>
      </div>

      {/* Book Metadata & Editorial Header */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Genre / Series Tag */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className="badge badge-outline text-[10px] font-mono text-white/60">
              {book.year} · {book.yearEc} ዓ.ም.
            </span>
            {book.seriesOrder && (
              <span className="badge badge-cyan text-[10px] font-mono">
                Part {book.seriesOrder}
              </span>
            )}
            {book.translator && (
              <span className="badge badge-crimson text-[10px] font-mono">
                EN Translation
              </span>
            )}
          </div>

          {/* Titles */}
          <Link to={`/books/${book.slug}`} className="block group-hover:text-[#00f0ff] transition-colors">
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Noto_Serif_Ethiopic'] leading-snug">
              {book.titleAm}
            </h3>
            <div className="text-xs font-semibold text-[#d4af37] font-['Cinzel'] uppercase tracking-wider mt-0.5">
              {book.titleEn}
            </div>
          </Link>

          {/* Tagline */}
          <p className="mt-2.5 text-xs text-[#9aa5b8] line-clamp-2 leading-relaxed font-['Noto_Serif_Ethiopic']">
            {lang === 'am' ? book.tagline.am : book.tagline.en}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <Link
            to={`/books/${book.slug}`}
            className="text-xs font-semibold text-[#00f0ff] hover:text-white transition-colors flex items-center gap-1 font-mono"
          >
            <span>{lang === 'am' ? 'ሙሉ ዝርዝር' : 'Dossier'}</span>
            <span>→</span>
          </Link>

          {book.purchaseLinks?.[0] && (
            <a
              href={book.purchaseLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all font-mono"
            >
              {lang === 'am' ? 'መጽሐፉን ያግኙ' : 'Find / Read'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
