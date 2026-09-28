import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import AuthorSignature from '../components/AuthorSignature';
import BookCover from '../components/BookCover';
import { verifiedBooks } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();
  const bioRef = useRef(null);

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
      {/* ----------------------------------------------------------------------
          1. INTRO SCREEN / DUAL PORTALS (Exact replica of jkrowling.com)
          ---------------------------------------------------------------------- */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white">
        <div className="site-container max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-[#111111] leading-[1.18] tracking-tight mb-5">
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

          {/* Subtitle */}
          <p className="font-serif text-base sm:text-lg text-[#555555] leading-relaxed max-w-xl mx-auto mb-12">
            {lang === 'am'
              ? 'ስለ ደራሲውና የኢትዮጵያን የስነ-ጽሑፍ ታሪክ የቀየሩትን ድንቅ መጻሕፍቱን የተመለከቱ የቅርብ ጊዜ ዜናዎችንና መረጃዎችን እዚህ ያገኛሉ።'
              : "Here you can find the latest news and information on him and the books that made him one of Ethiopia's best-known authors."}
          </p>

          {/* Dual Entrance Cards Container */}
          <div className="space-y-6 sm:space-y-8 max-w-xl mx-auto">
            {/* CARD 1: GROWN-UPS / MAIN SITE CARD (Dark Wood Desk Background) */}
            <div className="jkr-portal-card-desk p-8 sm:p-12 text-center text-white flex flex-col items-center justify-center min-h-[280px]">
              <div className="mb-4">
                <AuthorSignature className="h-14 sm:h-16 w-auto text-white" light={true} />
              </div>

              <p className="text-sm sm:text-[15px] text-white/90 max-w-md mx-auto mb-6 leading-relaxed font-sans">
                {lang === 'am'
                  ? 'ስለ ይስማዕከ ወርቁና ስለ ስነ-ጽሑፍ ስራዎቹ ሁሉንም የቅርብ ጊዜ ዜናዎችና መረጃዎችን ለማግኘት በዚህ በኩል ይግቡ።'
                  : 'This way for all the latest news and information about Yismake Worku and his writing.'}
              </p>

              <button
                onClick={scrollToBio}
                className="jkr-pill-btn"
              >
                {lang === 'am' ? 'እዚህ ይግቡ' : 'Enter here'}
              </button>
            </div>

            {/* CARD 2: YOUNGER READERS / STORIES (Royal Purple Background) */}
            <div className="jkr-portal-card-stories p-8 sm:p-12 text-center text-white flex flex-col items-center justify-center min-h-[280px]">
              <div className="mb-4">
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white flex items-center justify-center gap-2">
                  <span>YISMAKE WORKU’S</span>
                </div>
                <div className="font-serif text-xl sm:text-2xl italic text-[#f4d06f] -mt-1">
                  Stories &amp; Lore
                </div>
              </div>

              <p className="text-sm sm:text-[15px] text-white/90 max-w-md mx-auto mb-6 leading-relaxed font-sans">
                {lang === 'am'
                  ? 'በጣና ሐይቅ ስር ስላለው የዴርቶጋዳ ሳይንሳዊ ዓለምና ተረኮች የበለጠ ለማወቅ ለሚፈልጉ ወጣት አንባቢዎች።'
                  : "This way for younger readers, who want to find out more about Yismake Worku and his speculative stories."}
              </p>

              <Link
                to="/universe"
                className="jkr-pill-btn"
              >
                {lang === 'am' ? 'ይምጡና ይጎብኙ!' : 'Come on in!'}
              </Link>
            </div>
          </div>

          {/* NOTIFICATION BOX (Below Cards) */}
          <div className="mt-12 max-w-xl mx-auto p-4 sm:p-5 bg-white border border-[#e5e5e5] rounded-sm text-left shadow-sm flex items-start gap-3.5">
            <span className="text-xl shrink-0 mt-0.5">🔔</span>
            <p className="text-xs sm:text-[13px] text-[#444444] leading-relaxed m-0 font-sans">
              {lang === 'am' ? (
                <>
                  በይስማዕከ ወርቁ ስም በመስመር ላይ የሚንቀሳቀሱ ሀሰተኛ ገጾችና ያልተፈቀዱ የህትመት ቅጂዎች እንዳሉ እናውቃለን። እባክዎ ለበለጠ መረጃ የእኛን{' '}
                  <Link to="/enquiries" className="text-[#111111] underline font-bold hover:text-[#d4af37]">
                    የጥያቄዎችና አድራሻ (Enquiries)
                  </Link>{' '}
                  ገጽ ይጎብኙ።
                </>
              ) : (
                <>
                  We are aware of imposter accounts online posing as Yismake Worku and his publishers. Please visit our{' '}
                  <Link to="/enquiries" className="text-[#111111] underline font-bold hover:text-[#d4af37]">
                    Enquiries
                  </Link>{' '}
                  page for more information.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          2. BIO SECTION (Matching jkrowling.com home-intro-section--bio)
          ---------------------------------------------------------------------- */}
      <section ref={bioRef} className="py-16 sm:py-24 bg-white border-t border-[#f0f0f0]">
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

          {/* Layered Polaroid Photo Stack (Replica of JKR Polaroid Stack) */}
          <div className="jkr-polaroid-stack mb-4">
            {/* Background Archival Photo 1 */}
            <div className="jkr-polaroid-back-1">
              <div className="w-full h-56 bg-gray-200 overflow-hidden">
                <img
                  src="/images/library-bg.jpg"
                  alt="Archival notes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Background Archival Photo 2 */}
            <div className="jkr-polaroid-back-2">
              <div className="w-full h-56 bg-gray-200 overflow-hidden">
                <img
                  src="/images/dertogada-art.jpg"
                  alt="Dertogada Universe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Front Color Polaroid */}
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

      {/* ----------------------------------------------------------------------
          3. CANONICAL WORKS ROWS (Vertical rhythm matching JKR)
          ---------------------------------------------------------------------- */}
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
                ? 'የይስማዕከ ወርቁ የመጀመሪያ ልቦለድ የሆነው «ዴርቶጋዳ» በ2001 ዓ.ም ሲታተም በአንድ ዓመት ውስጥ ብቻ 10 ጊዜ ታትሞ ከ200,000 በላይ ቅጂዎች በመሸጥ በኢትዮጵያ የስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት ፈጠረ። በጣና ሐይቅ ስር የተሰወረው ሚስጥራዊ የሳይንስ ተቋምና የናሳው የጠፈር መሃንዲስ ሻጊዝ እጅጉ ያደረጉት ትግል፤ ራማቶሓራ፣ ዣንቶዣራ፣ ዮራቶራድ እና ዮቶድ በተባሉ ተከታታይ ስራዎች ተጠናቋል።'
                : 'Yismake Worku’s debut novel, Dertogada, published in 2009, began a groundbreaking 5-volume speculative saga. The series broke Ethiopian publishing records with over 200,000 copies sold in its debut year across 10 editions. Following NASA aerospace engineer Shagiz Ejigu and a clandestine laboratory beneath Lake Tana, the saga inspired an entire generation of African readers.'}
            </p>
          </div>

          {/* Row 2: Robert Galbraith / The Lost Spell */}
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
                ? 'በዶ/ር ቤተልሔም አትፊልድ (በርሚንግሃም ዩኒቨርሲቲ) ወደ እንግሊዝኛ ተተርጉሞ በለንደን ሄኒንግሃም ፋሚሊ ፕሬስ የታተመው «ክቡር ድንጋይ» (The Lost Spell)፣ በታላቋ ብሪታንያ ለታላቁ የ2022 TA First Translation Prize ሽልማት እጩ ሆኖ ቀርቧል። አንድ ባለጸጋ በድግምት ወደ ውሻነት ሲቀየር የህብረተሰቡን ግብዝነትና የፖለቲካውን ህመም ከመሬት ተነስቶ በጥልቅ ይመረምራል።'
                : 'Translated into English by Dr. Bethlehem Attfield and published in the UK by Henningham Family Press, The Lost Spell (Kebur Dengay) was shortlisted for the prestigious 2022 TA First Translation Prize in the United Kingdom. When an arrogant Addis Ababa businessman accidentally transforms into a street dog, he observes the stark realities of power and class hypocrisy from four paws.'}
            </p>
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
                ? 'ከዴርቶጋዳ በተጨማሪ ይስማዕከ ወርቁ የተለያዩ ራሳቸውን የቻሉ ልቦለዶችን አበርክቷል። ሜሎስ (ስነ-ልቦናዊ ልቦለድ)፣ ተልሚድ (መንፈሳዊ ፍልስፍና)፣ ዛምራ፣ የቀንድ አውጣ ኑሮ፣ የኦጋዴን ድመቶች፣ ተከርቼም እንዲሁም የመጀመሪያ የግጥም መድበሉ የወንድ ምጥ ይገኙበታል።'
                : 'Alongside the Dertogada saga and The Lost Spell, Yismake Worku has written a rich range of standalone books exploring human morality, psychological suspense, and economic resilience. These include Melos, Telmid (The Disciple), Zamra, Tekerchem (Locked), and his debut poetry collection Yewond Mit.'}
            </p>
          </div>

          {/* Row 4: Monastic Wisdom & Sovereignty */}
          <div className="text-center space-y-4 pt-6 border-t border-[#f0f0f0]">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-[#111111] text-[#d4af37] flex items-center justify-center font-serif text-3xl font-bold shadow-xl border-2 border-[#d4af37]">
                <span>ይ</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              {lang === 'am' ? 'ገዳማዊ ጥበብና አገራዊ ሉዓላዊነት' : 'Monastic Wisdom & Sovereignty'}
            </h3>

            <p className="text-base text-[#444444] leading-relaxed font-sans">
              {lang === 'am'
                ? 'ይስማዕከ ወርቁ ጥንታዊውን የኢትዮጵያ የብራና ቅርስና የገዳማት ምስጢር ለዘመናዊው ትውልድ በሳይንስ ልቦለድ መነጽር እንዲታይ አድርጓል። የአእምሮና የቴክኖሎጂ ነጻነትን የሚያወድሱ ጽሑፎቹ በኢትዮጵያም ሆነ በአፍሪካ የወጣቱን ምናብ አንቅተዋል።'
                : 'Yismake Worku has championed the resurgence of indigenous African intellectual capital. Through his writing and community dialogues, he advocates that ancient ecclesiastical scholarship and modern quantum engineering must converge to secure genuine technological self-determination.'}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          4. LATEST NEWS (Soft gray background #f4f4f4 matching jkrowling.com)
          ---------------------------------------------------------------------- */}
      <section id="news" className="py-16 sm:py-24 bg-[#f4f4f4] border-t border-[#e8e8e8]">
        <div className="site-container max-w-4xl mx-auto">
          {/* Section Header */}
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

          {/* 3 News Articles Stacked on Mobile, Grid on Tablet/Desktop */}
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

          {/* Centered View All Link */}
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
    </div>
  );
}
