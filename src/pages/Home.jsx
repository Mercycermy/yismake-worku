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
    <div style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundImage: "url('/images/writers-desk.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,23,20,0.55) 0%, rgba(26,23,20,0.4) 50%, rgba(26,23,20,0.65) 100%)',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          textAlign: 'center',
        }}>
          {/* Hero Title */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            marginBottom: '1.25rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}>
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

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7,
            maxWidth: '540px',
            margin: '0 auto 3rem',
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}>
            {lang === 'am'
              ? 'ስለ ደራሲውና የኢትዮጵያን የስነ-ጽሑፍ ታሪክ የቀየሩትን ድንቅ መጻሕፍቱን የተመለከቱ የቅርብ ጊዜ ዜናዎችንና መረጃዎችን እዚህ ያገኛሉ።'
              : "Here you can find the latest news and information on him and the books that made him one of Ethiopia's best-known authors."}
          </p>

          {/* Dual Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '3rem', maxWidth: '800px', margin: '0 auto', alignItems: 'center' }}>
            {/* COLUMN 1: OFFICIAL SITE */}
            <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}>
                  YISMAKE WORKU
                </div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.28em',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                }}>
                  {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Official Author Website'}
                </div>
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '300px',
                margin: '0 auto 1.5rem',
                lineHeight: 1.7,
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}>
                {lang === 'am'
                  ? 'ስለ ይስማዕከ ወርቁና ስለ ስነ-ጽሑፍ ስራዎቹ ሁሉንም የቅርብ ጊዜ ዜናዎችና መረጃዎችን ለማግኘት በዚህ በኩል ይግቡ።'
                  : 'This way for all the latest news and information about Yismake Worku and his writing.'}
              </p>

              <button
                onClick={scrollToBio}
                className="jkr-pill-btn"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
              >
                {lang === 'am' ? 'እዚህ ይግቡ' : 'Enter here'}
              </button>
            </div>

            {/* COLUMN 2: STORIES */}
            <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}>
                  YISMAKE WORKU'S
                </div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  fontStyle: 'italic',
                  color: '#c9a84c',
                  marginTop: '-2px',
                  textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                }}>
                  STORIES
                </div>
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '300px',
                margin: '0 auto 1.5rem',
                lineHeight: 1.7,
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}>
                {lang === 'am'
                  ? 'በጣና ሐይቅ ስር ስላለው የዴርቶጋዳ ሳይንሳዊ ዓለምና ተረኮች የበለጠ ለማወቅ ለሚፈልጉ ወጣት አንባቢዎች።'
                  : "This way for younger readers, who want to find out more about Yismake Worku and his speculative stories."}
              </p>

              <Link to="/universe" className="jkr-pill-btn" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                {lang === 'am' ? 'ይምጡና ይጎብኙ!' : 'Come on in!'}
              </Link>
            </div>
          </div>

          {/* Imposter Notification Banner */}
          <div style={{
            width: '100%',
            maxWidth: '600px',
            margin: '3.5rem auto 0',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '999px',
            padding: '0.75rem 1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textAlign: 'left',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '1.5px solid #c9a84c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#c9a84c',
            }}>!</div>
            <p style={{ fontSize: '0.75rem', color: '#3d3a35', lineHeight: 1.5 }}>
              {lang === 'am' ? (
                <>
                  ስለ ሀሰተኛ ገጾችና ያልተፈቀዱ ቅጂዎች ጥንቃቄ ያድርጉ። ለበለጠ መረጃ የ{' '}
                  <Link to="/enquiries" style={{ textDecoration: 'underline', fontWeight: 600, color: '#1a1714' }}>
                    ጥያቄዎችና አድራሻ
                  </Link>{' '}
                  ገጻችንን ይጎብኙ።
                </>
              ) : (
                <>
                  We are aware of imposter accounts online posing as Yismake Worku. Please visit our{' '}
                  <Link to="/enquiries" style={{ textDecoration: 'underline', fontWeight: 600, color: '#1a1714' }}>
                    Enquiries
                  </Link>{' '}
                  page for more information.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BIO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section ref={bioRef} style={{ padding: '5rem 0', background: 'var(--bg-primary)' }}>
        <div className="site-container" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          {/* Gold decorative element */}
          <div className="jkr-gold-divider" style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#c9a84c' }}>❖</span>
          </div>

          <h2 className="jkr-section-title">
            {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Yismake Worku'}
          </h2>

          <div className="jkr-editorial-body" style={{ marginBottom: '3rem' }}>
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
          <div className="jkr-polaroid-stack" style={{ marginBottom: '1rem' }}>
            <div className="jkr-polaroid-back-1">
              <div style={{ width: '100%', height: '224px', overflow: 'hidden', background: '#edeae4' }}>
                <img src="/images/library-bg.jpg" alt="Archival notes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="jkr-polaroid-back-2">
              <div style={{ width: '100%', height: '224px', overflow: 'hidden', background: '#edeae4' }}>
                <img src="/images/dertogada-art.jpg" alt="Dertogada Universe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="jkr-polaroid-front">
              <div style={{ width: '100%', height: '256px', overflow: 'hidden', background: '#1a1714', marginBottom: '12px' }}>
                <img src="/images/yismake-portrait.jpg" alt="Yismake Worku" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.875rem', fontWeight: 600, color: '#1a1714' }}>
                Yismake Worku
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#8a857d' }}>
                Gojjam &amp; Addis Ababa, Ethiopia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CANONICAL WORKS
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0 5rem', background: 'var(--bg-primary)' }}>
        <div className="site-container" style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Dertogada */}
          {[
            {
              book: dertogadaBook,
              titleAm: 'ዴርቶጋዳ',
              titleEn: 'The Dertogada Saga',
              descAm: 'የይስማዕከ ወርቁ የመጀመሪያ ልቦለድ የሆነው «ዴርቶጋዳ» በ2001 ዓ.ም ሲታተም በአንድ ዓመት ውስጥ ብቻ 10 ጊዜ ታትሞ ከ200,000 በላይ ቅጂዎች በመሸጥ በኢትዮጵያ የስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት ፈጠረ።',
              descEn: "Yismake Worku's debut novel, Dertogada, published in 2009, began a groundbreaking 5-volume speculative saga. The series broke Ethiopian publishing records with over 200,000 copies sold in its debut year across 10 editions.",
            },
            {
              book: keburDengay,
              titleAm: 'ክቡር ድንጋይ (The Lost Spell)',
              titleEn: 'The Lost Spell',
              descAm: 'በዶ/ር ቤተልሔም አትፊልድ ወደ እንግሊዝኛ ተተርጉሞ በለንደን ሄኒንግሃም ፋሚሊ ፕሬስ የታተመው «ክቡር ድንጋይ» (The Lost Spell)፣ በታላቋ ብሪታንያ ለታላቁ የ2022 TA First Translation Prize ሽልማት እጩ ሆኖ ቀርቧል።',
              descEn: 'Translated into English by Dr. Bethlehem Attfield and published in the UK by Henningham Family Press, The Lost Spell (Kebur Dengay) was shortlisted for the prestigious 2022 TA First Translation Prize in the United Kingdom.',
            },
            {
              book: melosBook,
              titleAm: 'ሌሎች ድርሰቶች',
              titleEn: 'Other works',
              descAm: 'ከዴርቶጋዳ በተጨማሪ ይስማዕከ ወርቁ የተለያዩ ራሳቸውን የቻሉ ልቦለዶችን አበርክቷል። ሜሎስ፣ ተልሚድ፣ ዛምራ፣ የቀንድ አውጣ ኑሮ፣ የኦጋዴን ድመቶች፣ ተከርቼም እንዲሁም የመጀመሪያ የግጥም መድበሉ የወንድ ምጥ ይገኙበታል።',
              descEn: 'Alongside the Dertogada saga and The Lost Spell, Yismake Worku has written a rich range of standalone books exploring human morality, psychological suspense, and economic resilience.',
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                paddingTop: idx > 0 ? '3rem' : 0,
                marginTop: idx > 0 ? '3rem' : 0,
                borderTop: idx > 0 ? '1px solid #edeae4' : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{
                  width: '200px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                  transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                  cursor: 'pointer',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                >
                  <BookCover book={item.book} size="normal" />
                </div>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                fontWeight: 700,
                color: '#1a1714',
                marginBottom: '0.75rem',
              }}>
                {lang === 'am' ? item.titleAm : item.titleEn}
              </h3>

              <p style={{
                fontSize: '1rem',
                color: '#5a564e',
                lineHeight: 1.75,
                marginBottom: '1.25rem',
              }}>
                {lang === 'am' ? item.descAm : item.descEn}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPurchaseBook(item.book)}
                  className="jkr-pill-btn-dark"
                  style={{ fontSize: '0.75rem', padding: '0.6rem 1.5rem' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <span>{lang === 'am' ? 'ይግዙ' : 'Buy Now'}</span>
                </button>
                <Link
                  to={item.book ? `/books/${item.book.slug}` : '/books'}
                  className="jkr-pill-btn"
                  style={{ fontSize: '0.75rem', padding: '0.6rem 1.5rem' }}
                >
                  {lang === 'am' ? 'ተጨማሪ →' : 'Read More →'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LATEST NEWS
          ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid #edeae4',
      }}>
        <div className="site-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="jkr-gold-divider" style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#c9a84c' }}>❖</span>
            </div>
            <h2 className="jkr-section-title">
              {lang === 'am' ? 'የቅርብ ጊዜ ዜናዎች' : 'Latest News'}
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#8a857d',
              maxWidth: '480px',
              margin: '0.75rem auto 0',
            }}>
              {lang === 'am'
                ? 'ስለ ይስማዕከ ወርቁ፣ መጻሕፍቱ፣ የትርጉም ሥራዎችና ይፋዊ ማስታወቂያዎች ወቅታዊ መረጃዎችን ያንብቡ።'
                : 'Read the latest updates from Yismake Worku — books, writing projects, adaptations and official announcements.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2rem', marginBottom: '3rem' }}>
            {latestNews.map((article) => (
              <article key={article.id} className="jkr-news-card">
                <Link to={article.link} className="jkr-news-card__image">
                  <img src={article.image} alt={article.titleEn} loading="lazy" />
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

          <div style={{ textAlign: 'center' }}>
            <Link to="/news" className="jkr-pill-btn-dark">
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
