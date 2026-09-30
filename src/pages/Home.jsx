import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import BookCover from '../components/BookCover';
import QuickPurchaseModal from '../components/QuickPurchaseModal';
import { verifiedBooks } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();
  const bioRef = useRef(null);
  const [purchaseBook, setPurchaseBook] = useState(null);

  const scrollToBio = () => {
    bioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const dertogadaBook = verifiedBooks.find((b) => b.slug === 'dertogada');
  const keburDengay = verifiedBooks.find((b) => b.slug === 'kebur-dengay');
  const melosBook = verifiedBooks.find((b) => b.slug === 'melos');

  const latestNews = [
    {
      id: 1,
      date: '24 SEPTEMBER 2026',
      titleEn: "The Lost Spell Shortlisted for the TA First Translation Prize in the United Kingdom",
      titleAm: "«ክቡር ድንጋይ» (The Lost Spell) በእንግሊዝ ለታላቁ የ2022 TA First Translation Prize እጩ ሆነ",
      image: '/images/the-lost-spell-award.jpg',
      link: '/news#lost-spell-award'
    },
    {
      id: 2,
      date: '12 AUGUST 2026',
      titleEn: "The Living Archive: Yismake Worku Surpasses 18,600+ Subscribers on Official Telegram",
      titleAm: "በይፋዊ የቴሌግራም ቻናል ከ18,600 በላይ አንባቢዎች ጋር የተደረገ የቀጥታ ውይይት",
      image: '/images/library-bg.jpg',
      link: '/news#telegram-community'
    },
    {
      id: 3,
      date: '18 JULY 2026',
      titleEn: "Academic Study Explores Monasticism and Techno-Utopia in Dertogada",
      titleAm: "ስለ ዴርቶጋዳ የቀረበ ዓለም አቀፍ አካዳሚያዊ ጥናት በታይለር ኤንድ ፍራንሲስ ታተመ",
      image: '/images/dertogada-art.jpg',
      link: '/news#academic-study'
    }
  ];

  return (
    <div className="bg-white text-[#222222] font-sans antialiased">
      {/* ==================================================================
          1. HERO — Full-width desk background with dual portal cards
          ================================================================== */}
      <section
        className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/writers-desk.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-16 text-center">
          {/* Hero Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] tracking-tight mb-4 drop-shadow-lg">
            {lang === 'am' ? (
              <>
                እንኳን ወደ ይስማዕከ ወርቁ <br />
                ይፋዊ ድረ-ገጽ በደህና መጡ።
              </>
            ) : (
              <>
                Welcome to Yismake Worku's <br />
                official website.
              </>
            )}
          </h1>

          <p className="font-serif text-base sm:text-lg text-white/85 leading-relaxed max-w-xl mx-auto mb-14 drop-shadow-md">
            {lang === 'am'
              ? 'ስለ ደራሲውና የኢትዮጵያን የስነ-ጽሑፍ ታሪክ የቀየሩትን ድንቅ መጻሕፍቱን የተመለከቱ የቅርብ ጊዜ ዜናዎችንና መረጃዎችን እዚህ ያገኛሉ።'
              : "Here you can find the latest news and information on him and the books that made him one of Ethiopia's best-known authors."}
          </p>

          {/* Dual Columns — Directly over desk background (Exact JKR Insp) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-4xl mx-auto items-center">
            {/* COLUMN 1: GROWN-UPS / OFFICIAL SITE */}
            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-4">
                <div className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.16em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                  YISMAKE WORKU
                </div>
                <div className="font-serif text-xs tracking-[0.3em] text-[#e5c06e] uppercase mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Official Author Website'}
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/95 max-w-xs mx-auto mb-6 leading-relaxed font-sans drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                {lang === 'am'
                  ? 'ስለ ይስማዕከ ወርቁና ስለ ስነ-ጽሑፍ ስራዎቹ ሁሉንም የቅርብ ጊዜ ዜናዎችና መረጃዎችን ለማግኘት በዚህ በኩል ይግቡ።'
                  : 'This way for all the latest news and information about Yismake Worku and his writing.'}
              </p>

              <button
                onClick={scrollToBio}
                className="jkr-pill-btn shadow-xl hover:shadow-2xl cursor-pointer"
              >
                {lang === 'am' ? 'እዚህ ይግቡ' : 'Enter here'}
              </button>
            </div>

            {/* COLUMN 2: YOUNGER READERS / STORIES */}
            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-4">
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                  YISMAKE WORKU'S
                </div>
                <div className="font-serif text-xl sm:text-2xl italic text-[#f4d06f] -mt-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                  STORIES
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/95 max-w-xs mx-auto mb-6 leading-relaxed font-sans drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                {lang === 'am'
                  ? 'በጣና ሐይቅ ስር ስላለው የዴርቶጋዳ ሳይንሳዊ ዓለምና ተረኮች የበለጠ ለማወቅ ለሚፈልጉ ወጣት አንባቢዎች።'
                  : "This way for younger readers, who want to find out more about Yismake Worku and his speculative stories."}
              </p>

              <Link
                to="/universe"
                className="jkr-pill-btn shadow-xl hover:shadow-2xl"
              >
                {lang === 'am' ? 'ይምጡና ይጎብኙ!' : 'Come on in!'}
              </Link>
            </div>
          </div>

          {/* Imposter Notification Bar (Exact JKR inspo from screenshot) */}
          <div className="w-full max-w-2xl mx-auto mt-14 bg-white/95 backdrop-blur-sm border border-black/10 rounded-full py-3 px-6 shadow-xl flex items-center gap-3 text-left">
            <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center shrink-0 text-xs font-bold text-gray-700">!</div>
            <p className="text-xs sm:text-[13px] text-[#222222] leading-snug font-sans">
              {lang === 'am' ? (
                <>
                  ስለ ሀሰተኛ ገጾችና ያልተፈቀዱ ቅጂዎች ጥንቃቄ ያድርጉ። ለበለጠ መረጃ የ{' '}
                  <Link to="/enquiries" className="underline font-semibold text-black hover:text-[#c59b27]">
                    ጥያቄዎችና አድራሻ
                  </Link>{' '}
                  ገጻችንን ይጎብኙ።
                </>
              ) : (
                <>
                  We are aware of imposter accounts online posing as Yismake Worku. Please visit our{' '}
                  <Link to="/enquiries" className="underline font-semibold text-black hover:text-[#c59b27]">
                    Enquiries
                  </Link>{' '}
                  page for more information.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. BIO SECTION
          ================================================================== */}
      <section ref={bioRef} className="py-16 sm:py-24 bg-white">
        <div className="site-container max-w-3xl mx-auto text-center">
          <h2 className="jkr-section-title">
            {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Yismake Worku'}
          </h2>

          <div className="jkr-editorial-body mb-12">
            <p>
              {lang === 'am'
                ? 'ይስማዕከ ወርቁ በዘመናዊው የኢትዮጵያ ስነ-ጽሁፍ ውስጥ ከፍተኛ ተወዳጅነት ያተረፈ ደራሲና የባህል ፈር-ቀዳጅ ሲሆን፣ በታላቁ የ«ዴርቶጋዳ» ተከታታይ የሳይንስ ልቦለዱ እንዲሁም በታዋቂው ማህበራዊ ምጸቱ «ክቡር ድንጋይ» (The Lost Spell) ይታወቃል።'
                : 'Yismake Worku is an Ethiopian author, cultural icon, and literary pioneer best known for creating the Dertogada series and the internationally acclaimed satire The Lost Spell (Kebur Dengay).'}
            </p>
            <p>
              {lang === 'am'
                ? 'የደራሲው ይፋዊ ድረ-ገጽ ስለ መጻሕፍቱና አዳዲስ ፕሮጀክቶቹ ወቅታዊ ዜናዎችን፣ በራሱ አንደበት የቀረቡ ጥልቅ ማስታወሻዎችን፣ ስለ ጽሕፈት ጥበብ የተሰጡ ምክሮችንና ስለ ህይወት ጉዞው የተሟላ መረጃዎችን በአንድ ላይ ያቀርባል።'
                : 'His official website brings together news and updates on his books and current projects, personal reflections in his own words, essays offering a glimpse into his writing life, and information about his life and literary career.'}
            </p>
          </div>

          {/* Polaroid Photo Stack */}
          <div className="jkr-polaroid-stack mb-4">
            <div className="jkr-polaroid-back-1">
              <div className="w-full h-56 bg-gray-200 overflow-hidden">
                <img
                  src="/images/library-bg.jpg"
                  alt="Archival notes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="jkr-polaroid-back-2">
              <div className="w-full h-56 bg-gray-200 overflow-hidden">
                <img
                  src="/images/dertogada-art.jpg"
                  alt="Dertogada Universe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="jkr-polaroid-front">
              <div className="w-full h-64 bg-gray-900 overflow-hidden mb-3">
                <img
                  src="/images/yismake-portrait.jpg"
                  alt="Yismake Worku"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-serif text-sm font-semibold text-[#333333]">
                Yismake Worku
              </div>
              <div className="text-[11px] text-[#777777] font-sans">
                Gojjam &amp; Addis Ababa, Ethiopia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. CANONICAL WORKS
          ================================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="site-container max-w-2xl mx-auto space-y-20">
          {/* Row 1: The Dertogada Saga */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-48 sm:w-56 shadow-2xl hover:scale-105 transition-transform duration-300">
                <BookCover book={dertogadaBook} size="normal" />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              {lang === 'am' ? 'ዴርቶጋዳ' : 'The Dertogada Saga'}
            </h3>

            <p className="text-base text-[#444444] leading-relaxed font-sans">
              {lang === 'am'
                ? 'የይስማዕከ ወርቁ የመጀመሪያ ልቦለድ የሆነው «ዴርቶጋዳ» በ2001 ዓ.ም ሲታተም በአንድ ዓመት ውስጥ ብቻ 10 ጊዜ ታትሞ ከ200,000 በላይ ቅጂዎች በመሸጥ በኢትዮጵያ የስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት ፈጠረ።'
                : "Yismake Worku's debut novel, Dertogada, published in 2009, began a groundbreaking 5-volume speculative saga. The series broke Ethiopian publishing records with over 200,000 copies sold in its debut year across 10 editions."}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setPurchaseBook(dertogadaBook)}
                className="jkr-pill-btn-dark !py-2 !px-5 !text-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>🛒</span>
                <span>{lang === 'am' ? 'አሁን ይግዙ' : 'Buy Now'}</span>
              </button>
              <Link
                to="/books/dertogada"
                className="jkr-pill-btn !py-2 !px-5 !text-xs inline-block"
              >
                {lang === 'am' ? 'ተጨማሪ ያንብቡ →' : 'Read More →'}
              </Link>
            </div>
          </div>

          {/* Row 2: The Lost Spell */}
          <div className="text-center space-y-4 pt-6 border-t border-[#f0f0f0]">
            <div className="flex justify-center mb-6">
              <div className="w-48 sm:w-56 shadow-2xl hover:scale-105 transition-transform duration-300">
                <BookCover book={keburDengay} size="normal" />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              {lang === 'am' ? 'ክቡር ድንጋይ (The Lost Spell)' : 'The Lost Spell'}
            </h3>

            <p className="text-base text-[#444444] leading-relaxed font-sans">
              {lang === 'am'
                ? 'በዶ/ር ቤተልሔም አትፊልድ ወደ እንግሊዝኛ ተተርጉሞ በለንደን ሄኒንግሃም ፋሚሊ ፕሬስ የታተመው «ክቡር ድንጋይ» (The Lost Spell)፣ በታላቋ ብሪታንያ ለታላቁ የ2022 TA First Translation Prize ሽልማት እጩ ሆኖ ቀርቧል።'
                : 'Translated into English by Dr. Bethlehem Attfield and published in the UK by Henningham Family Press, The Lost Spell (Kebur Dengay) was shortlisted for the prestigious 2022 TA First Translation Prize in the United Kingdom.'}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setPurchaseBook(keburDengay)}
                className="jkr-pill-btn-dark !py-2 !px-5 !text-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>🛒</span>
                <span>{lang === 'am' ? 'አሁን ይግዙ' : 'Buy Now'}</span>
              </button>
              <Link
                to="/books/kebur-dengay"
                className="jkr-pill-btn !py-2 !px-5 !text-xs inline-block"
              >
                {lang === 'am' ? 'ተጨማሪ ያንብቡ →' : 'Read More →'}
              </Link>
            </div>
          </div>

          {/* Row 3: Other Works */}
          <div className="text-center space-y-4 pt-6 border-t border-[#f0f0f0]">
            <div className="flex justify-center mb-6">
              <div className="w-48 sm:w-56 shadow-2xl hover:scale-105 transition-transform duration-300">
                <BookCover book={melosBook} size="normal" />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              {lang === 'am' ? 'ሌሎች ድርሰቶች' : 'Other works'}
            </h3>

            <p className="text-base text-[#444444] leading-relaxed font-sans">
              {lang === 'am'
                ? 'ከዴርቶጋዳ በተጨማሪ ይስማዕከ ወርቁ የተለያዩ ራሳቸውን የቻሉ ልቦለዶችን አበርክቷል። ሜሎስ፣ ተልሚድ፣ ዛምራ፣ የቀንድ አውጣ ኑሮ፣ የኦጋዴን ድመቶች፣ ተከርቼም እንዲሁም የመጀመሪያ የግጥም መድበሉ የወንድ ምጥ ይገኙበታል።'
                : 'Alongside the Dertogada saga and The Lost Spell, Yismake Worku has written a rich range of standalone books exploring human morality, psychological suspense, and economic resilience.'}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setPurchaseBook(melosBook)}
                className="jkr-pill-btn-dark !py-2 !px-5 !text-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>🛒</span>
                <span>{lang === 'am' ? 'አሁን ይግዙ' : 'Buy Now'}</span>
              </button>
              <Link
                to={melosBook ? `/books/${melosBook.slug}` : '/books'}
                className="jkr-pill-btn !py-2 !px-5 !text-xs inline-block"
              >
                {lang === 'am' ? 'ተጨማሪ ያንብቡ →' : 'Read More →'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. LATEST NEWS
          ================================================================== */}
      <section id="news" className="py-16 sm:py-24 bg-[#f4f4f4] border-t border-[#e8e8e8]">
        <div className="site-container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="jkr-section-title">
              {lang === 'am' ? 'የቅርብ ጊዜ ዜናዎች' : 'Latest News'}
            </h2>
            <p className="text-base text-[#666666] max-w-xl mx-auto font-sans">
              {lang === 'am'
                ? 'ስለ ይስማዕከ ወርቁ፣ መጻሕፍቱ፣ የትርጉም ሥራዎችና ይፋዊ ማስታወቂያዎች ወቅታዊ መረጃዎችን ያንብቡ።'
                : 'Read the latest updates from Yismake Worku, including news about his books, writing projects, adaptations and official announcements.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {latestNews.map((article) => (
              <article key={article.id} className="jkr-news-card">
                <Link to={article.link} className="jkr-news-card__image">
                  <img
                    src={article.image}
                    alt={article.titleEn}
                    loading="lazy"
                  />
                </Link>

                <p className="jkr-news-card__date">{article.date}</p>

                <h3 className="jkr-news-card__title">
                  <Link to={article.link}>
                    {lang === 'am' ? article.titleAm : article.titleEn}
                  </Link>
                </h3>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/news"
              className="jkr-pill-btn-dark"
            >
              {lang === 'am' ? 'ሁሉንም ይመልከቱ' : 'View all'}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Purchase Modal */}
      {purchaseBook && (
        <QuickPurchaseModal
          book={purchaseBook}
          isOpen={Boolean(purchaseBook)}
          onClose={() => setPurchaseBook(null)}
        />
      )}
    </div>
  );
}
