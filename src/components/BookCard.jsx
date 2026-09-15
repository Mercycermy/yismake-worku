import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import BookCover from './BookCover';

export default function BookCard({ book }) {
  const { lang } = useLanguage();
  if (!book) return null;

  return (
    <article className="archival-plate archival-plate-framed p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group">
      {/* Top Metadata Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--rule-line-subtle)] font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
          <div className="flex items-center gap-1.5 text-[var(--highland-gold)]">
            <span>FOLIO</span>
            <span>#{book.id.toUpperCase().slice(0, 4)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{book.year} G.C.</span>
            <span>•</span>
            <span className="font-serif-ethiopic text-[var(--text-stone)]">{book.yearEc} ዓ.ም.</span>
          </div>
        </div>

        {/* Center: Book Physical Mockup */}
        <div className="flex justify-center my-4">
          <Link to={`/books/${book.slug}`} className="block transition-transform duration-500 group-hover:-translate-y-1.5">
            <BookCover book={book} size="normal" />
          </Link>
        </div>

        {/* Amharic & English Titles */}
        <div className="mt-5">
          <Link to={`/books/${book.slug}`} className="block group-hover:text-[var(--highland-gold)] transition-colors">
            <h3 className="font-serif-ethiopic text-xl sm:text-2xl font-black text-[var(--text-vellum)] leading-snug">
              {book.titleAm}
            </h3>
            <div className="font-['Cinzel'] text-xs font-semibold tracking-[0.16em] uppercase text-[var(--highland-gold)] mt-1">
              {book.titleEn}
            </div>
          </Link>

          {/* Literary Premise Note */}
          <p className="mt-3 text-xs text-[var(--text-stone)] font-serif-ethiopic line-clamp-2 leading-relaxed">
            {lang === 'am' ? book.tagline.am : book.tagline.en}
          </p>
        </div>
      </div>

      {/* Card Footer: Archival Action */}
      <div className="mt-6 pt-4 border-t border-[var(--rule-line-subtle)] flex items-center justify-between font-mono text-xs">
        <Link
          to={`/books/${book.slug}`}
          className="btn-link-editorial"
        >
          <span>{lang === 'am' ? 'የመጽሐፉ ማህደር' : 'READ DOSSIER'}</span>
          <span>→</span>
        </Link>

        {book.translator && (
          <span className="text-[10px] text-[var(--rubric-bright)] font-mono tracking-wider">
            [EN TRANSLATED]
          </span>
        )}
      </div>
    </article>
  );
}
