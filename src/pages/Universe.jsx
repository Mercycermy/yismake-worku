import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import DertogadaUniverseMap from '../components/DertogadaUniverseMap';
import { dertogadaUniverseLore, verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';

export default function Universe() {
  const { lang } = useLanguage();

  const universeBooks = verifiedBooks.filter(b => b.series?.includes('Dertogada'));

  return (
    <main className="pt-28 pb-20 bg-[#080b11] text-[#f6f0e2]">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        {/* Background Subterranean Glow & Grid */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 filter brightness-50"
          style={{ backgroundImage: "url('/images/dertogada-art.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/80 to-transparent" />
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />

        <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00f0ff] text-xs font-mono tracking-widest uppercase mb-4">
            <span>❖ {lang === 'am' ? 'የኢትዮጵያ ሳይንስ ልቦለድ ምድረ-ገነት' : 'AFROFUTURIST TECHNO-FICTION'} ❖</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white font-['Cinzel'] tracking-tight">
            THE <span className="text-gradient-cyan">DERTOGADA</span> UNIVERSE
            <span className="block text-3xl sm:text-5xl font-['Noto_Serif_Ethiopic'] text-[#d4af37] font-bold mt-2">
              የዴርቶጋዳ ዓለም
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#ebe4d3] leading-relaxed font-['Noto_Serif_Ethiopic']">
            {lang === 'am'
              ? "የኢትዮጵያን ታሪክ የቀየረው ባለ 5 ቅጽ የልቦለድ ድንቅ ስራ። በጣና ሐይቅ የደሴት ገዳማት ሥር ከተሰወረ የጠፈርና የኳንተም ምርምር ማዕከል እስከ ዓለም አቀፍ የስለላ መረቦች ድረስ የተዘረጋ ታላቅ ትረካ።"
              : "The historic five-volume speculative saga that captivated millions. A clandestine alliance of patriotic scientists beneath ancient Lake Tana defying global intelligence cartels to build the future."}
          </p>
        </div>
      </section>

      {/* Interactive Universe Constellation & Character Dossiers */}
      <DertogadaUniverseMap />

      {/* Deep-Dive Pentology Grid */}
      <section className="section-padding bg-[#05070a] border-t border-white/10">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Cinzel']">
              THE FIVE <span className="text-gradient-gold">CHRONICLES</span>
              <span className="block text-xl sm:text-2xl font-['Noto_Serif_Ethiopic'] text-[#d4af37] font-semibold mt-1">
                አምስቱ ተከታታይ ክፍሎች
              </span>
            </h2>
            <p className="mt-2 text-sm text-[#9aa5b8] font-['Noto_Serif_Ethiopic']">
              {lang === 'am'
                ? "እያንዳንዱ መጽሐፍ ከቀዳሚው ጋር በጥብቅ የተሳሰረ ሲሆን፣ በንባብ ቅደም ተከተል መነበብ ይመረጣል።"
                : "Each novel builds upon its predecessor. For the optimal narrative experience, read in sequential order."}
            </p>
          </div>

          <div className="space-y-12">
            {universeBooks.map((book, idx) => (
              <div
                key={book.id}
                className="glass-panel p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-cyan-500/35 transition-all"
              >
                <div className="lg:col-span-4 flex justify-center">
                  <Link to={`/books/${book.slug}`} className="group block">
                    <BookCover book={book} size="normal" />
                  </Link>
                </div>

                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="badge badge-cyan font-mono">
                      Part 0{book.seriesOrder}
                    </span>
                    <span className="badge badge-gold font-mono">
                      {book.year} G.C. ({book.yearEc} ዓ.ም.)
                    </span>
                    <span className="badge badge-outline font-mono">
                      {book.pageCount} Pages
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Noto_Serif_Ethiopic']">
                    {book.titleAm}
                    <span className="ml-2 text-lg sm:text-xl font-light text-[#d4af37] font-['Cinzel'] uppercase">
                      ({book.titleEn})
                    </span>
                  </h3>

                  <p className="mt-2 text-sm text-cyan-300 font-['Noto_Serif_Ethiopic'] italic">
                    "{lang === 'am' ? book.tagline.am : book.tagline.en}"
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-[#ebe4d3] leading-relaxed font-['Noto_Serif_Ethiopic']">
                    {lang === 'am' ? book.description.am : book.description.en}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link to={`/books/${book.slug}`} className="btn-cyan text-xs">
                      <span>{lang === 'am' ? 'የመጽሐፉ ሙሉ ገጽ' : 'Read Full Dossier'}</span>
                      <span>→</span>
                    </Link>

                    {book.purchaseLinks?.[0] && (
                      <a
                        href={book.purchaseLinks[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs"
                      >
                        {lang === 'am' ? 'መጽሐፉን ያግኙ / ይዘዙ' : 'Find / Purchase'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
