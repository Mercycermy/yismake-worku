import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import DertogadaUniverseMap from '../components/DertogadaUniverseMap';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';

export default function Universe() {
  const { lang } = useLanguage();

  const universeBooks = verifiedBooks
    .filter((b) => b.series?.includes('Dertogada'))
    .sort((a, b) => a.seriesOrder - b.seriesOrder);

  return (
    <div className="bg-white text-[#222222] font-sans py-14 sm:py-20">
      <div className="site-container max-w-5xl mx-auto">
        {/* Portal Hero Header (Royal Purple Accented like JKR Stories) */}
        <div className="bg-gradient-to-r from-[#491763] to-[#2f0c42] text-white p-8 sm:p-14 rounded-sm shadow-xl text-center mb-16">
          <div className="font-serif text-sm font-bold tracking-[0.2em] text-[#f4d06f] uppercase mb-2">
            THE DERTOGADA STORYWORLD &amp; LORE
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            {lang === 'am' ? 'የዴርቶጋዳ ዓለም' : 'The Dertogada Universe'}
          </h1>
          <p className="font-serif text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            {lang === 'am'
              ? 'በጣና ሐይቅ የደሴት ገዳማት ሥር ከተሰወረው የጠፈርና የቴክኖሎጂ የምርምር ማዕከል እስከ ዓለም አቀፍ የስለላ መረቦች ድረስ የተዘረጋው የይስማዕከ ወርቁ ባለ 5 ቅጽ ታላቅ የልቦለድ ዓለም።'
              : 'Where ancient Ethiopian monastic wisdom meets the secret subterranean quantum laboratory beneath Lake Tana. Explore the 5-volume saga in chronological reading order.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              Lake Tana Basin • 11°56′N 37°18′E
            </span>
            <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              5 Connected Novels (2009–2016)
            </span>
          </div>
        </div>

        {/* The Subterranean Map & Characters Section */}
        <div className="mb-20">
          <DertogadaUniverseMap />
        </div>

        {/* Chronological Reading Order (Book 1 to Book 5) */}
        <div className="pt-12 border-t border-gray-200">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              {lang === 'am' ? 'የንባብ ቅደም ተከተል (5ቱ ተከታታይ ቅጾች)' : 'The 5 Novels in Chronological Order'}
            </h2>
            <p className="text-base text-[#666666] mt-2">
              {lang === 'am'
                ? 'ከዴርቶጋዳ ጀምሮ እስከ ዮቶድ ድረስ ያለው የተሟላ የትረካ ቅደም ተከተል'
                : 'Follow the saga from the initial recruitment race in Dertogada to the grand finale in Yotod.'}
            </p>
          </div>

          <div className="space-y-12">
            {universeBooks.map((book, idx) => (
              <article
                key={book.id}
                className="bg-[#fafafa] border border-gray-200 p-6 sm:p-10 rounded-sm shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center group hover:border-gray-400 transition-colors"
              >
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-44 shadow-lg group-hover:scale-103 transition-transform duration-300">
                    <BookCover book={book} size="normal" />
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#888888] tracking-widest uppercase">
                    <span className="bg-[#111111] text-white px-2.5 py-0.5 rounded-full text-[10px]">
                      VOLUME {idx + 1}
                    </span>
                    <span>•</span>
                    <span>{book.year} ({book.yearEc} ዓ.ም)</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                    {lang === 'am' ? book.titleAm : book.titleEn}
                  </h3>

                  <p className="text-xs text-[#c59b27] font-semibold uppercase tracking-wider font-serif">
                    {lang === 'am' ? book.genreAm : book.genre}
                  </p>

                  <p className="text-sm sm:text-base text-[#444444] leading-relaxed font-serif">
                    {lang === 'am' ? book.description?.am : book.description?.en}
                  </p>

                  <div className="pt-3">
                    <Link
                      to={`/books/${book.slug}`}
                      className="jkr-pill-btn-dark !py-2 !px-5 !text-xs"
                    >
                      {lang === 'am' ? 'ስለ ቅጹ ሙሉ መረጃ →' : 'Explore Volume →'}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
