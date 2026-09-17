import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';
import ModalInspectionFolio from '../components/ModalInspectionFolio';

export default function BookDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const [inspectionOpen, setInspectionOpen] = useState(false);

  const book = verifiedBooks.find((b) => b.slug === slug);

  if (!book) {
    return (
      <main className="min-h-screen pt-36 pb-24 bg-[#0d1517] text-[var(--on-surface)] flex items-center justify-center">
        <div className="text-center p-8 archival-plate max-w-md mx-auto bg-[#0e1a1d] border border-[var(--border-hairline)]">
          <div className="font-mono text-xs text-[var(--secondary)] uppercase mb-3">
            FOLIO NOT LOCATED
          </div>
          <h1 className="font-serif text-2xl font-bold mb-2">መጽሐፉ በማህደሩ ውስጥ አልተገኘም</h1>
          <p className="font-serif text-sm text-[var(--on-surface-variant)] mb-6">
            The requested volume was not found in the verified repository.
          </p>
          <Link to="/books" className="btn-relic text-xs">
            RETURN TO CATALOGUE →
          </Link>
        </div>
      </main>
    );
  }

  // Related volumes in the same series or prominent works
  const relatedBooks = verifiedBooks
    .filter((b) => b.id !== book.id && (b.series === book.series || b.isFeatured))
    .slice(0, 3);

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0d1517] text-[var(--on-surface)]">
      {/* Archival Breadcrumbs */}
      <div className="site-container pb-4 mb-8 border-b border-[var(--border-hairline)] font-mono text-[11px] text-[var(--outline)] flex items-center gap-2 uppercase tracking-widest">
        <Link to="/" className="hover:text-[var(--primary)] transition-colors">
          {lang === 'am' ? 'መነሻ' : 'INDEX'}
        </Link>
        <span>/</span>
        <Link to="/books" className="hover:text-[var(--primary)] transition-colors">
          {lang === 'am' ? 'መጻሕፍት' : 'CATALOGUE'}
        </Link>
        <span>/</span>
        <span className="text-[var(--secondary)] font-bold">{book.titleEn}</span>
      </div>

      {/* Book Editorial Broadside */}
      <section className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Physical Codex Showcase & Purchase/Reading Channels */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-28 w-full max-w-sm flex flex-col items-center">
              <BookCover book={book} size="hero" />

              {/* Inspect Full Folio Button */}
              <button
                onClick={() => setInspectionOpen(true)}
                className="mt-6 btn-relic w-full text-center"
              >
                <span>[INSPECT ARCHIVAL FOLIO 👁]</span>
              </button>

              {/* Purchase & Archival Reading Channels */}
              <div className="mt-4 w-full space-y-3 font-mono text-xs">
                {book.purchaseLinks?.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-folio w-full text-center"
                  >
                    <span>{link.name}</span>
                    <span>↗</span>
                  </a>
                ))}

                <a
                  href="https://t.me/yismakeworku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-archival w-full text-center"
                >
                  <span>{lang === 'am' ? 'በቴሌግራም ስለ መጽሐፉ ተወያይ' : 'DISCUSS ON TELEGRAM'}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Master Dossier */}
          <div className="lg:col-span-7 space-y-6">
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase">
              <span className="catalog-tag">
                <span className="catalog-indicator-emerald" />
                {book.year} G.C. · {book.yearEc} ዓ.ም.
              </span>
              {book.seriesOrder && (
                <span className="catalog-tag">
                  <span className="catalog-indicator-crimson" />
                  {book.series} · VOL 0{book.seriesOrder}
                </span>
              )}
              <span className="catalog-tag">
                {book.genre?.split('/')[0]}
              </span>
              {book.pageCount && (
                <span className="catalog-tag">
                  {book.pageCount} PAGES
                </span>
              )}
            </div>

            {/* Monumental Titles */}
            <div>
              <h1 className="font-serif text-4xl sm:text-6xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                {book.titleAm}
              </h1>
              <div className="font-serif text-xl sm:text-2xl font-bold text-[var(--secondary)] tracking-[0.16em] uppercase mt-2">
                {book.titleEn}
              </div>
            </div>

            {/* Tagline Aphorism */}
            <div className="border-l-2 border-[var(--primary-container)] pl-4 py-2 italic font-serif text-base sm:text-lg text-[var(--on-surface)] bg-[#132427]/40 border-y border-r border-[var(--border-hairline)]">
              "{lang === 'am' ? book.tagline?.am : book.tagline?.en}"
            </div>

            {/* Comprehensive Synopsis */}
            <div className="space-y-4 font-serif text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed pt-2">
              <p>{lang === 'am' ? book.description?.am : book.description?.en}</p>
            </div>

            {/* Verified Themes */}
            <div className="pt-6 border-t border-[var(--border-hairline)]">
              <div className="font-mono text-xs text-[var(--secondary)] uppercase tracking-widest mb-3">
                {lang === 'am' ? 'ማዕከላዊ ጭብጦች' : 'CORE SPECULATIVE & PHILOSOPHICAL THEMES'}
              </div>
              <div className="flex flex-wrap gap-2">
                {(lang === 'am' ? book.themesAm : book.themes)?.map((theme, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-serif bg-[#0e1a1d] border border-[var(--border-hairline)] text-[var(--on-surface-variant)] hover:border-[var(--primary-container)] transition-colors"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Translation Accolade if applicable */}
            {book.translator && (
              <div className="p-4 bg-[#0e1a1d] border border-[var(--primary-container)] font-mono text-xs space-y-1 shadow-[0_0_20px_-4px_rgba(45,212,191,0.2)]">
                <div className="text-[var(--primary)] font-bold uppercase">
                  OFFICIAL ENGLISH EDITION & SCHOLARLY HONORS
                </div>
                <div className="text-[var(--on-surface)] font-serif text-sm">
                  Translated by {book.translator} · Published by Henningham Family Press (UK)
                </div>
                <div className="text-[#fca5a5] text-[11px] pt-1">
                  ★ Shortlisted for the TA First Translation Prize 2022 (United Kingdom)
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Volumes Section */}
      {relatedBooks.length > 0 && (
        <section className="site-container mt-20 pt-16 border-t border-[var(--border-hairline)]">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)] font-mono text-xs text-[var(--outline)] uppercase tracking-widest">
            <span className="text-[var(--secondary)] font-bold">RELATED ARCHIVAL FOLIOS</span>
            <span>CHRONICLES IN CANON</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBooks.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        </section>
      )}

      {/* Full-Screen Modal Inspection Folio */}
      <ModalInspectionFolio
        book={book}
        isOpen={inspectionOpen}
        onClose={() => setInspectionOpen(false)}
      />
    </main>
  );
}
