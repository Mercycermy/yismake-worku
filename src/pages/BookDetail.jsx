import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';

export default function BookDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();

  const book = verifiedBooks.find((b) => b.slug === slug);

  if (!book) {
    return (
      <main className="min-h-screen pt-36 pb-24 bg-[#0a0c0f] text-[var(--text-vellum)] flex items-center justify-center">
        <div className="text-center p-8 archival-plate max-w-md mx-auto">
          <div className="font-mono text-xs text-[var(--highland-gold)] uppercase mb-3">
            FOLIO NOT LOCATED
          </div>
          <h1 className="font-serif-ethiopic text-2xl font-bold mb-2">መጽሐፉ በማህደሩ ውስጥ አልተገኘም</h1>
          <p className="font-serif-ethiopic text-sm text-[var(--text-stone)] mb-6">
            The requested volume was not found in the verified repository.
          </p>
          <Link to="/books" className="btn-folio text-xs">
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
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0a0c0f] text-[var(--text-vellum)]">
      {/* Archival Breadcrumbs */}
      <div className="site-container pb-4 mb-8 border-b border-[var(--rule-line-subtle)] font-mono text-[11px] text-[var(--text-muted)] flex items-center gap-2 uppercase tracking-widest">
        <Link to="/" className="hover:text-[var(--highland-gold)] transition-colors">
          {lang === 'am' ? 'መነሻ' : 'INDEX'}
        </Link>
        <span>/</span>
        <Link to="/books" className="hover:text-[var(--highland-gold)] transition-colors">
          {lang === 'am' ? 'መጻሕፍት' : 'CATALOGUE'}
        </Link>
        <span>/</span>
        <span className="text-[var(--highland-gold)] font-bold">{book.titleEn}</span>
      </div>

      {/* Book Editorial Broadside */}
      <section className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Physical Codex Showcase & Purchase/Reading Channels */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-28 w-full max-w-sm flex flex-col items-center">
              <BookCover book={book} size="hero" />

              {/* Purchase & Archival Reading Channels */}
              <div className="mt-8 w-full space-y-3 font-mono text-xs">
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
              <span className="archival-tag archival-tag-gold">
                {book.year} G.C. · {book.yearEc} ዓ.ም.
              </span>
              {book.seriesOrder && (
                <span className="archival-tag archival-tag-rubric">
                  {book.series} · PART 0{book.seriesOrder}
                </span>
              )}
              <span className="archival-tag">
                {book.genre?.split('/')[0]}
              </span>
              {book.pageCount && (
                <span className="archival-tag">
                  {book.pageCount} PAGES
                </span>
              )}
            </div>

            {/* Monumental Titles */}
            <div>
              <h1 className="monument-title-am text-4xl sm:text-6xl text-[var(--text-vellum)]">
                {book.titleAm}
              </h1>
              <div className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-[var(--highland-gold)] tracking-[0.16em] uppercase mt-2">
                {book.titleEn}
              </div>
            </div>

            {/* Tagline Aphorism */}
            <div className="border-l-2 border-[var(--rubric-bright)] pl-4 py-1 italic font-serif-ethiopic text-base sm:text-lg text-[var(--text-vellum-soft)]">
              "{lang === 'am' ? book.tagline.am : book.tagline.en}"
            </div>

            {/* Comprehensive Synopsis */}
            <div className="space-y-4 font-serif-ethiopic text-base sm:text-lg text-[var(--text-vellum-soft)] leading-relaxed pt-2">
              <p>{lang === 'am' ? book.description.am : book.description.en}</p>
            </div>

            {/* Verified Themes */}
            <div className="pt-6 border-t border-[var(--rule-line-subtle)]">
              <div className="font-mono text-xs text-[var(--highland-gold)] uppercase tracking-widest mb-3">
                {lang === 'am' ? 'ማዕከላዊ ጭብጦች' : 'CORE SPECULATIVE & PHILOSOPHICAL THEMES'}
              </div>
              <div className="flex flex-wrap gap-2">
                {(lang === 'am' ? book.themesAm : book.themes).map((theme, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-serif-ethiopic bg-[var(--ink-surface)] border border-[var(--rule-line)] text-[var(--text-vellum)]"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Archival Specification Ledger (Table) */}
            <div className="pt-6 border-t border-[var(--rule-line-subtle)]">
              <div className="font-mono text-xs text-[var(--highland-gold)] uppercase tracking-widest mb-3">
                {lang === 'am' ? 'የህትመትና የአካዳሚ ሰነድ' : 'PUBLICATION & SCHOLASTIC DOSSIER'}
              </div>

              <div className="archival-plate divide-y divide-[var(--rule-line-subtle)] font-mono text-xs">
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">{lang === 'am' ? 'ዋና አሳታሚ' : 'Primary Publisher'}</span>
                  <span className="text-[var(--text-vellum)] text-right">
                    {lang === 'am' ? book.publisherAm : book.publisher}
                  </span>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">{lang === 'am' ? 'የድርሰት ቋንቋ' : 'Language of Composition'}</span>
                  <span className="text-[var(--text-vellum)] text-right">
                    {lang === 'am' ? book.languageAm : book.language}
                  </span>
                </div>

                {book.translator && (
                  <div className="p-3.5 flex items-center justify-between bg-[var(--ink-plate)]">
                    <span className="text-[var(--rubric-bright)] font-bold">{lang === 'am' ? 'የእንግሊዝኛ ተርጓሚ' : 'English Translator'}</span>
                    <span className="text-[var(--text-vellum)] text-right font-semibold">
                      {lang === 'am' ? book.translatorAm : book.translator}
                    </span>
                  </div>
                )}

                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">{lang === 'am' ? 'ተከታታይ ምዕራፍ' : 'Series Canonical Order'}</span>
                  <span className="text-[var(--highland-gold)] text-right">
                    {book.seriesOrder ? `Part 0${book.seriesOrder} of the Saga` : 'Standalone Masterpiece'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Works in the Repository */}
        {relatedBooks.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[var(--rule-line)]">
            <div className="chapter-numeral">
              <span>RELATED VOLUMES</span>
            </div>
            <h3 className="monument-title-am text-2xl sm:text-3xl text-[var(--text-vellum)] mb-8">
              ተዛማጅ የስነ-ጽሑፍ ስራዎች
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((relBook) => (
                <BookCard key={relBook.id} book={relBook} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
