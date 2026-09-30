import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import BookCover from './BookCover';
import QuickPurchaseModal from './QuickPurchaseModal';

export default function BookCard({ book, onInspect }) {
  const { lang } = useLanguage();
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  if (!book) return null;

  const serialStamp = `ARCH-ETH-0${book.id ? book.id.toUpperCase().slice(0, 2) : '94'}`;

  return (
    <>
      <article className="archival-plate p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group border border-[var(--border-hairline)] hover:border-[var(--primary-container)] bg-[#0e1a1d] shadow-[0_0_24px_-8px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_-8px_rgba(45,212,191,0.18)] rounded-sm">
        {/* Header Lock: Bilingual Tag + Right-Aligned Serial Stamp */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-hairline)] font-mono text-[10px] tracking-widest uppercase">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-[var(--primary-container)]" />
              <span className="text-[var(--secondary)] font-bold">
                {book.seriesOrder ? `ቅጽ 0${book.seriesOrder}` : 'ማህደር'}
              </span>
              <span className="text-[var(--outline)] hidden sm:inline">· {book.year} G.C.</span>
            </div>
            <div className="font-mono text-[10px] text-[var(--primary)] font-bold tracking-wider">
              {serialStamp}
            </div>
          </div>

          {/* Center: Book Cover */}
          <div className="flex justify-center my-4">
            <Link
              to={`/books/${book.slug}`}
              className="block transition-transform duration-500 group-hover:-translate-y-1.5"
            >
              <BookCover book={book} size="normal" />
            </Link>
          </div>

          {/* Titles */}
          <div className="mt-5">
            <Link to={`/books/${book.slug}`} className="block group-hover:text-[var(--primary)] transition-colors">
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[var(--on-surface)] leading-snug tracking-tight">
                {book.titleAm}
              </h3>
              <div className="font-serif text-xs font-semibold tracking-[0.14em] uppercase text-[var(--secondary)] mt-1">
                {book.titleEn}
              </div>
            </Link>

            <p className="mt-3 text-xs text-[var(--on-surface-variant)] font-serif line-clamp-2 leading-relaxed">
              {lang === 'am' ? book.tagline?.am : book.tagline?.en}
            </p>
          </div>
        </div>

        {/* Footer Shelf: Buy Now & Read More Action Buttons */}
        <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex flex-col gap-2.5 font-mono text-xs">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setPurchaseModalOpen(true)}
              className="flex-1 py-1.5 px-3 bg-[#c29b38] hover:bg-[#d4af37] text-black text-[11px] font-bold rounded-sm transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              <span>🛒</span>
              <span>{lang === 'am' ? 'አሁን ይግዙ' : 'Buy Now'}</span>
            </button>

            <Link
              to={`/books/${book.slug}`}
              className="flex-1 py-1.5 px-3 bg-[#132427] hover:bg-[#1a3135] border border-[var(--border-hairline)] text-[var(--on-surface)] text-[11px] font-bold rounded-sm transition-all text-center"
            >
              {lang === 'am' ? 'ተጨማሪ ያንብቡ →' : 'Read More →'}
            </Link>
          </div>

          {onInspect && (
            <div className="flex items-center justify-between text-[10px] pt-1">
              <button
                onClick={() => onInspect(book)}
                className="text-[var(--outline)] hover:text-[var(--primary)] cursor-pointer"
              >
                [FOLIO 👁 INSPECT]
              </button>
              <span className="text-[var(--outline)]">VERIFIED CODEX</span>
            </div>
          )}
        </div>
      </article>

      {purchaseModalOpen && (
        <QuickPurchaseModal
          book={book}
          isOpen={purchaseModalOpen}
          onClose={() => setPurchaseModalOpen(false)}
        />
      )}
    </>
  );
}
