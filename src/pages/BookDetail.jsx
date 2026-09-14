import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks, authorData } from '../data/yismakeData';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';

export default function BookDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();

  const book = verifiedBooks.find((b) => b.slug === slug);

  // If slug is not found
  if (!book) {
    return (
      <main className="min-h-screen pt-32 pb-20 bg-[#080b11] text-white flex items-center justify-center">
        <div className="text-center p-8 glass-panel max-w-md mx-auto">
          <div className="text-4xl mb-4">📜</div>
          <h1 className="text-2xl font-bold font-['Cinzel'] mb-2">Book Not Found</h1>
          <p className="text-sm text-white/60 mb-6 font-['Noto_Serif_Ethiopic']">
            {lang === 'am' ? 'የተጠየቀው መጽሐፍ በማህደሩ ውስጥ አልተገኘም።' : 'The requested book was not found in the verified archive.'}
          </p>
          <Link to="/books" className="btn-primary text-xs">
            {lang === 'am' ? 'ወደ መጻሕፍት ዝርዝር ተመለስ' : 'Return to Book Catalog'}
          </Link>
        </div>
      </main>
    );
  }

  // Related books (same series or other prominent works)
  const relatedBooks = verifiedBooks
    .filter((b) => b.id !== book.id && (b.series === book.series || b.isFeatured))
    .slice(0, 3);

  return (
    <main className="pt-28 pb-24 bg-[#080b11] text-[#f6f0e2]">
      {/* Breadcrumbs */}
      <div className="site-container py-4 text-xs font-mono text-white/50 border-b border-white/10 flex items-center gap-2">
        <Link to="/" className="hover:text-[#00f0ff] transition-colors">{lang === 'am' ? 'መነሻ' : 'Home'}</Link>
        <span>/</span>
        <Link to="/books" className="hover:text-[#00f0ff] transition-colors">{lang === 'am' ? 'መጻሕፍት' : 'Books'}</Link>
        <span>/</span>
        <span className="text-[#d4af37] font-semibold">{book.titleEn}</span>
      </div>

      {/* Book Editorial Hero */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        {/* Ambient glow matching the book's specific accent color */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-[150px] opacity-15 pointer-events-none rounded-full"
          style={{ background: book.accentColor || '#00f0ff' }}
        />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Book 3D Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="sticky top-28">
                <BookCover book={book} size="hero" />

                {/* Purchase / Read Fast Action Bar */}
                <div className="mt-6 w-full max-w-sm space-y-3 text-center">
                  {book.purchaseLinks?.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-center text-sm"
                    >
                      <span>{link.name}</span>
                      <span>↗</span>
                    </a>
                  ))}

                  <a
                    href="https://t.me/yismakeworku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-center text-xs"
                  >
                    <span>{lang === 'am' ? 'በቴሌግራም ስለ መጽሐፉ ጠይቅ' : 'Discuss on Author Telegram'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Dossier & Deep Details */}
            <div className="lg:col-span-7">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="badge badge-gold font-mono">
                  {book.year} G.C. · {book.yearEc} ዓ.ም.
                </span>
                {book.seriesOrder && (
                  <span className="badge badge-cyan font-mono">
                    {book.series} · Part 0{book.seriesOrder}
                  </span>
                )}
                <span className="badge badge-outline font-mono">
                  {book.genre?.split('/')[0]}
                </span>
              </div>

              {/* Monumental Titles */}
              <h1 className="text-3xl sm:text-5xl font-black text-white font-['Noto_Serif_Ethiopic'] leading-tight">
                {book.titleAm}
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-[#d4af37] font-['Cinzel'] tracking-wider uppercase mt-1">
                {book.titleEn}
              </div>

              {/* Tagline */}
              <div className="mt-4 p-4 rounded-lg bg-white/5 border-l-4 border-[#00f0ff] text-sm sm:text-base text-cyan-200 font-['Noto_Serif_Ethiopic'] italic">
                "{lang === 'am' ? book.tagline.am : book.tagline.en}"
              </div>

              {/* Comprehensive Synopsis */}
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-3">
                  {lang === 'am' ? 'ስለ መጽሐፉ ማጠቃለያ' : 'Literary Synopsis & Overview'}
                </h3>
                <div className="text-sm sm:text-base text-[#ebe4d3] font-['Noto_Serif_Ethiopic'] leading-relaxed space-y-4">
                  <p>{lang === 'am' ? book.description.am : book.description.en}</p>
                  {lang !== 'am' && (
                    <p className="text-xs text-white/50 border-t border-white/10 pt-3">
                      {book.description.am}
                    </p>
                  )}
                </div>
              </div>

              {/* Themes */}
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-3">
                  {lang === 'am' ? 'ቁልፍ ጭብጦች' : 'Core Thematic Threads'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'am' ? book.themesAm : book.themes).map((theme, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/90 font-['Noto_Serif_Ethiopic']"
                    >
                      ❖ {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical & Publishing Metadata Table */}
              <div className="mt-10 p-6 rounded-xl bg-black/40 border border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-4">
                  {lang === 'am' ? 'የህትመትና የቴክኒክ መረጃ' : 'Bibliographic Metadata'}
                </h3>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <dt className="text-white/40 uppercase">{lang === 'am' ? 'ደራሲ' : 'Author'}</dt>
                    <dd className="text-white font-semibold mt-0.5">
                      {authorData.name.en} ({authorData.name.am})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/40 uppercase">{lang === 'am' ? 'የታተመበት ዓመት' : 'Publication Year'}</dt>
                    <dd className="text-[#d4af37] font-semibold mt-0.5">
                      {book.year} G.C. / {book.yearEc} ዓ.ም.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/40 uppercase">{lang === 'am' ? 'ቋንቋ' : 'Language'}</dt>
                    <dd className="text-white font-semibold mt-0.5">
                      {lang === 'am' ? book.languageAm : book.language}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/40 uppercase">{lang === 'am' ? 'የገጽ ብዛት' : 'Page Count'}</dt>
                    <dd className="text-white font-semibold mt-0.5">{book.pageCount} pages</dd>
                  </div>
                  {book.translator && (
                    <div className="sm:col-span-2 border-t border-white/10 pt-3">
                      <dt className="text-cyan-400 uppercase">{lang === 'am' ? 'ተርጓሚ' : 'English Translator'}</dt>
                      <dd className="text-white font-semibold mt-0.5">
                        {lang === 'am' ? book.translatorAm : book.translator}
                      </dd>
                    </div>
                  )}
                  <div className="sm:col-span-2 border-t border-white/10 pt-3">
                    <dt className="text-white/40 uppercase">{lang === 'am' ? 'አሳታሚ' : 'Publisher'}</dt>
                    <dd className="text-white/80 mt-0.5">
                      {lang === 'am' ? book.publisherAm : book.publisher}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Works in Universe */}
      {relatedBooks.length > 0 && (
        <section className="section-padding bg-[#05070a] border-t border-white/10 mt-16">
          <div className="site-container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono">
                  {lang === 'am' ? 'ተዛማጅ ስራዎች' : 'Connected Canon'}
                </div>
                <h3 className="text-2xl font-bold text-white font-['Cinzel'] mt-1">
                  RELATED <span className="text-gradient-gold">WORKS</span>
                </h3>
              </div>

              <Link to="/books" className="text-xs font-mono text-[#00f0ff] hover:underline">
                {lang === 'am' ? 'ሁሉንም አስስ →' : 'Browse All →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((relBook) => (
                <BookCard key={relBook.id} book={relBook} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
