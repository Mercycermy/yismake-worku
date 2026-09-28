import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';
import ModalInspectionFolio from '../components/ModalInspectionFolio';

export default function BookDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const [inspectionOpen, setInspectionOpen] = useState(false);

  const book = verifiedBooks.find((b) => b.slug === slug);

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

  // Related volumes in the same series or prominent works
  const relatedBooks = verifiedBooks
    .filter((b) => b.id !== book.id && (b.series === book.series || b.isFeatured))
    .slice(0, 3);

  return (
    <div className="bg-white text-[#222222] font-sans py-12 sm:py-16">
      <div className="site-container max-w-5xl mx-auto">
        {/* Breadcrumb Trail */}
        <div className="pb-4 mb-10 border-b border-gray-200 text-xs text-gray-500 flex items-center gap-2">
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

        {/* Book Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left: Book Cover Presentation & Links */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm flex flex-col items-center sticky top-28">
              <div className="shadow-2xl hover:scale-102 transition-transform duration-300">
                <BookCover book={book} size="large" />
              </div>

              {/* Quick Inspect Button */}
              <button
                onClick={() => setInspectionOpen(true)}
                className="mt-6 w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-[#111111] font-semibold text-xs rounded-full transition-colors cursor-pointer text-center"
              >
                {lang === 'am' ? 'የመጽሐፉን ሙሉ ዝርዝር መርምር' : 'Inspect Book Dossier'}
              </button>

              {/* Purchase Channels */}
              <div className="mt-4 w-full space-y-2.5 text-xs">
                {book.purchaseLinks?.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 px-4 bg-white border border-gray-300 hover:border-black text-[#111111] font-semibold text-center rounded-full transition-all"
                  >
                    <span>{link.name}</span>
                    <span className="ml-1 text-gray-400">↗</span>
                  </a>
                ))}

                <a
                  href="https://t.me/yismakeworku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 px-4 bg-[#111111] text-white font-semibold text-center rounded-full hover:bg-[#333333] transition-all"
                >
                  <span>{lang === 'am' ? 'በቴሌግራም ስለ መጽሐፉ ተወያይ' : 'Discuss on Telegram'}</span>
                  <span className="ml-1">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Editorial Description & Meta */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-bold text-[#888888] uppercase tracking-widest mb-2">
                {book.year} ({book.yearEc} ዓ.ም) • {book.series || 'STANDALONE WORK'}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#111111] leading-tight">
                {lang === 'am' ? book.titleAm : book.titleEn}
              </h1>

              <div className="text-sm font-semibold text-[#c59b27] mt-1 font-serif">
                {lang === 'am' ? book.genreAm : book.genre}
              </div>
            </div>

            {/* Tagline */}
            <div className="p-5 bg-gray-50 border-l-4 border-[#111111] rounded-sm font-serif text-base sm:text-lg italic text-[#333333]">
              “{lang === 'am' ? book.tagline?.am : book.tagline?.en}”
            </div>

            {/* Full Synopsis */}
            <div className="space-y-4 text-base sm:text-lg text-[#333333] leading-relaxed font-serif">
              <p>{lang === 'am' ? book.description?.am : book.description?.en}</p>
            </div>

            {/* Publication Details Table */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="font-serif text-xl font-bold text-[#111111] mb-4">
                {lang === 'am' ? 'የህትመት ዝርዝር መረጃ' : 'Publication Details'}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Publisher</span>
                  <span className="text-[#111111] font-semibold text-sm">
                    {lang === 'am' ? book.publisherAm : book.publisher}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Page Count</span>
                  <span className="text-[#111111] font-semibold text-sm">{book.pageCount} Pages</span>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Language</span>
                  <span className="text-[#111111] font-semibold text-sm">
                    {lang === 'am' ? book.languageAm : book.language}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Translator</span>
                  <span className="text-[#111111] font-semibold text-sm">
                    {book.translator ? (lang === 'am' ? book.translatorAm : book.translator) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Literary Themes */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="font-serif text-xl font-bold text-[#111111] mb-3">
                {lang === 'am' ? 'ቁልፍ ጭብጦች' : 'Key Themes & Motifs'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {(lang === 'am' ? book.themesAm : book.themes)?.map((theme, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 bg-gray-100 text-[#333333] text-xs font-semibold rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="pt-16 border-t border-gray-200">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-8 text-center">
              {lang === 'am' ? 'ተዛማጅ መጻሕፍት' : 'Other Works by Yismake Worku'}
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
                    <Link
                      to={`/books/${rel.slug}`}
                      className="jkr-pill-btn-dark !py-1.5 !px-4 !text-xs"
                    >
                      {lang === 'am' ? 'ዝርዝር →' : 'View Book →'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {inspectionOpen && (
        <ModalInspectionFolio book={book} onClose={() => setInspectionOpen(false)} />
      )}
    </div>
  );
}
