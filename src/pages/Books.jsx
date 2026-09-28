import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';
import ModalInspectionFolio from '../components/ModalInspectionFolio';
import PageBanner from '../components/PageBanner';

export default function Books() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [inspectionBook, setInspectionBook] = useState(null);

  const categories = [
    { id: 'ALL', en: 'All Works', am: 'ሁሉም ስራዎች' },
    { id: 'DERTOGADA', en: 'The Dertogada Pentology', am: 'የዴርቶጋዳ 5 ተከታታይ' },
    { id: 'TRANSLATION', en: 'International Translations', am: 'ዓለም አቀፍ ትርጉሞች' },
    { id: 'PHILOSOPHY', en: 'Philosophical & Satire', am: 'ፍልስፍናዊና ማህበራዊ' },
    { id: 'POETRY', en: 'Poetry & Early Works', am: 'ግጥም እና የመጀመሪያ ስራዎች' }
  ];

  const filteredBooks = useMemo(() => {
    return verifiedBooks.filter((book) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchAm = book.titleAm.toLowerCase().includes(q);
        const matchEn = book.titleEn.toLowerCase().includes(q);
        const matchGenre = book.genre?.toLowerCase().includes(q);
        const matchDesc = book.description?.en?.toLowerCase().includes(q);
        if (!matchAm && !matchEn && !matchGenre && !matchDesc) return false;
      }

      if (selectedCategory === 'DERTOGADA') {
        return book.series?.includes('Dertogada');
      }
      if (selectedCategory === 'TRANSLATION') {
        return Boolean(book.translator);
      }
      if (selectedCategory === 'PHILOSOPHY') {
        return (
          book.genre?.includes('Philosophical') ||
          book.genre?.includes('Satire') ||
          book.genre?.includes('Psychological') ||
          book.slug === 'kebur-dengay'
        );
      }
      if (selectedCategory === 'POETRY') {
        return book.genre?.includes('Poetry') || book.slug === 'yewond-mit';
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const dertogadaBook = verifiedBooks.find((b) => b.slug === 'dertogada') || verifiedBooks[0];

  return (
    <div className="bg-white text-[#222222] font-sans antialiased">
      <PageBanner title={lang === 'am' ? 'መጻሕፍት' : 'Books'} />

      {/* Featured Masterpiece Section (Exact JKR inspo from screenshot) */}
      <section className="bg-[#edf0f3] py-14 sm:py-20 border-b border-gray-300">
        <div className="site-container max-w-3xl mx-auto text-center px-4">
          <div className="flex justify-center mb-8">
            <Link to="/books/dertogada" className="transform hover:scale-103 transition-transform duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.22)] rounded-sm inline-block">
              <BookCover book={dertogadaBook} size="large" />
            </Link>
          </div>

          <div className="text-xs font-bold text-[#777777] tracking-[0.25em] uppercase mb-2">
            {lang === 'am' ? 'የመጀመሪያው ተከታታይ ቅጽ' : 'DERTOGADA'}
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] mb-2 tracking-tight">
            {lang === 'am' ? 'የይስማዕከ ወርቁ ዴርቶጋዳ' : "Yismake Worku's Dertogada"}
          </h2>

          <div className="font-serif text-sm italic text-[#666666] mb-5">
            {lang === 'am' ? 'ሜጋ አሳታሚ / ኩራዝ / ዓለም አቀፍ እትሞች' : 'Mega Publishers; Kuraz Publishing; International Editions'}
          </div>

          <p className="font-serif text-base sm:text-lg text-[#444444] leading-relaxed max-w-2xl mx-auto mb-8">
            {lang === 'am'
              ? 'በ2001 ዓ.ም ሲታተም በአንድ ዓመት ውስጥ ብቻ 10 ጊዜ ታትሞ ከ200,000 በላይ ቅጂዎች በመሸጥ በኢትዮጵያ የስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት የፈጠረው የአገሪቱ የመጀመሪያው የሳይንስና የስለላ ልቦለድ።'
              : 'The first Dertogada book, published in 2009, was met with immediate, unprecedented national acclaim. The landmark novel broke Ethiopian publishing records with over 200,000 copies sold in its debut year alone.'}
          </p>

          <Link
            to="/books/dertogada"
            className="jkr-pill-btn-dark inline-block shadow-md hover:shadow-lg"
          >
            {lang === 'am' ? 'ስለ ዴርቶጋዳ ሙሉ መረጃ →' : 'Explore Dertogada →'}
          </Link>
        </div>
      </section>

      <div className="site-container max-w-6xl mx-auto py-14 sm:py-20">
        {/* Catalog Section Header */}
        <div className="text-center mb-12">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-3">
            {lang === 'am' ? 'የተሟላ 15+ መጻሕፍት ካታሎግ' : 'Complete Published Works'}
          </h3>
          <p className="text-base text-[#666666] max-w-xl mx-auto font-serif">
            {lang === 'am'
              ? 'ከአገሪቱ የመጀመሪያው የሳይንስ ልቦለድ «ዴርቶጋዳ» እስከ እንግሊዝ አገር እጩው «ክቡር ድንጋይ»፤ የይስማዕከ ወርቁ 15+ የታተሙ ስራዎች።'
              : 'From the pioneering speculative universe of Dertogada to the UK-shortlisted satire The Lost Spell; explore the 15+ published works of Yismake Worku.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-[#f4f4f4] text-[#555555] hover:bg-gray-200'
              }`}
            >
              {lang === 'am' ? cat.am : cat.en}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder={lang === 'am' ? 'በርዕስ፣ በዘውግ ወይም በጭብጥ ፈልግ...' : 'Search books by title, genre, theme...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fafafa] border border-gray-300 focus:border-[#111111] px-4 py-2.5 rounded-full text-sm text-[#111111] placeholder-gray-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBooks.map((book) => (
            <article
              key={book.id}
              className="bg-white border border-gray-200 hover:border-gray-400 p-6 sm:p-8 rounded-sm shadow-sm transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Book Cover Container */}
                <div className="flex justify-center mb-6 py-2">
                  <div className="transform group-hover:-translate-y-2 transition-transform duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                    <BookCover book={book} size="normal" />
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-[#888888] font-bold uppercase tracking-wider mb-2">
                  <span>{book.year} ({book.yearEc} ዓ.ም)</span>
                  {book.seriesOrder && (
                    <span>BOOK {book.seriesOrder}</span>
                  )}
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#111111] group-hover:text-[#c59b27] transition-colors mb-2">
                  <Link to={`/books/${book.slug}`}>
                    {lang === 'am' ? book.titleAm : book.titleEn}
                  </Link>
                </h2>

                <p className="text-xs text-[#666666] uppercase tracking-wider font-semibold mb-3">
                  {lang === 'am' ? book.genreAm : book.genre}
                </p>

                <p className="text-sm text-[#555555] leading-relaxed line-clamp-3 mb-4 font-sans">
                  {lang === 'am' ? book.description?.am : book.description?.en}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setInspectionBook(book)}
                  className="text-xs font-semibold text-[#555555] hover:text-black cursor-pointer"
                >
                  👁 {lang === 'am' ? 'ፈትሽ (Inspect)' : 'Quick Inspect'}
                </button>

                <Link
                  to={`/books/${book.slug}`}
                  className="jkr-pill-btn-dark !py-1.5 !px-4 !text-xs"
                >
                  {lang === 'am' ? 'ዝርዝር →' : 'View Novel →'}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20 bg-gray-50 border border-gray-200 rounded-sm p-8">
            <span className="text-4xl text-gray-400 block mb-3">📖</span>
            <h3 className="font-serif text-xl font-bold text-gray-700 mb-2">
              {lang === 'am' ? 'ምንም መጽሐፍ አልተገኘም' : 'No Books Found'}
            </h3>
            <p className="text-sm text-gray-500">
              {lang === 'am'
                ? 'እባክዎ የተለየ የፍለጋ ቃል ያስገቡ ወይም ማጣሪያውን ይቀይሩ።'
                : 'Try adjusting your search query or selecting a different category filter.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal Inspection Folio */}
      {inspectionBook && (
        <ModalInspectionFolio book={inspectionBook} onClose={() => setInspectionBook(null)} />
      )}
    </div>
  );
}
