import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import Icon from '../components/Icon';
import { curatedNewsArticles } from '../data/newsData';


export default function PostDetail() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let found = curatedNewsArticles.find((a) => a.id === id);
    if (!found && id) {
      const lower = id.toLowerCase();
      if (lower.includes('spell') || lower.includes('translation') || lower.includes('kebur') || lower.includes('prize') || lower.includes('award')) {
        found = curatedNewsArticles.find((a) => a.id === 'lost-spell-award');
      } else if (lower.includes('telegram') || lower.includes('community')) {
        found = curatedNewsArticles.find((a) => a.id === 'telegram-community');
      } else if (lower.includes('dertogada') || lower.includes('academic') || lower.includes('taylor')) {
        found = curatedNewsArticles.find((a) => a.id === 'academic-study');
      } else if (lower.includes('solitude') || lower.includes('writer') || lower.includes('tana')) {
        found = curatedNewsArticles.find((a) => a.id === 'writers-solitude');
      }
    }

    if (found) {
      setPost(found);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => {
        const item = data.find((a) => a.id === id);
        if (item) {
          setPost({
            id: item.id,
            date: item.date || 'LATEST',
            readTime: '3 min read',
            category: (item.category || 'NEWS').toUpperCase(),
            categoryAm: item.category || 'ዜና',
            titleEn: item.title,
            titleAm: item.title,
            image: item.image || '/images/writers-desk.jpg',
            summaryEn: item.excerpt || '',
            summaryAm: item.excerpt || '',
            pullQuoteEn: item.excerpt || '',
            pullQuoteAm: item.excerpt || '',
            fullTextEn: [item.body || item.excerpt],
            fullTextAm: [item.body || item.excerpt]
          });
        }
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center pt-28 pb-20">
        <div className="text-center font-serif text-gray-500 animate-pulse">
          {lang === 'am' ? 'ጽሑፉ በመጫን ላይ...' : 'Loading authorized dispatch...'}
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-4">
        <div className="text-center p-8 sm:p-10 bg-white border border-[#e8e2d5] rounded-2xl max-w-md mx-auto shadow-md">
          <h2 className="font-serif text-2xl font-bold mb-3 text-[#1a1714]">
            {lang === 'am' ? 'ጽሑፉ አልተገኘም' : 'Dispatch Not Located'}
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            {lang === 'am'
              ? 'የተጠየቀው ጽሑፍ በይፋዊ ማህደሩ ውስጥ አልተገኘም።'
              : 'The requested article could not be located in the authorized archive.'}
          </p>
          <Link to="/news" className="jkr-pill-btn-dark !text-xs !py-3 !px-6 inline-flex items-center gap-2">
            <span>←</span>
            <span>{lang === 'am' ? 'ወደ ዜናዎች ተመለስ' : 'Return to News'}</span>
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = curatedNewsArticles.filter((a) => a.id !== post.id).slice(0, 2);

  return (
    <article
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        minHeight: '100vh',
      }}
      className="jkr-post-detail-page relative pt-6 sm:pt-10 pb-20 sm:pb-28"
    >
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#c9a84c] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="jkr-post-detail-content site-container max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Share Floating Pill Bar */}
        <div className="jkr-post-detail-toolbar flex items-center justify-between text-xs text-[#8a857d] mb-8 pb-4 border-b border-[#e8e2d5]/60 gap-3">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 font-bold text-[#1a1714] hover:text-[#c9a84c] transition-colors"
          >
            <Icon name="arrowLeft" size={14} />
            <span>{lang === 'am' ? 'ወደ ዜናዎች' : 'All Dispatches'}</span>
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#e8e2d5] rounded-full hover:border-[#c9a84c] text-[11px] font-bold text-[#1a1714] cursor-pointer shadow-2xs transition-colors shrink-0"
          >
            <Icon name={copied ? 'check' : 'link'} size={13} />
            <span>{copied ? (lang === 'am' ? 'ተቀድቷል!' : 'Link Copied!') : (lang === 'am' ? 'አጋራ' : 'Share')}</span>
          </button>
        </div>

        {/* Grand Editorial Article Header */}
        <header className="jkr-post-detail-header mb-8 sm:mb-12 text-left">
          <div className="flex items-center gap-3 text-xs font-bold mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#1a1714] text-[#c9a84c] text-[10px] tracking-widest uppercase font-mono">
              {lang === 'am' ? post.categoryAm : post.category}
            </span>
            <span className="text-[#8a857d] text-[11px]">{post.date}</span>
            {post.readTime && <span className="text-[#8a857d] text-[11px]">• {post.readTime}</span>}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.8vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.18,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
            }}
          >
            {lang === 'am' ? post.titleAm : post.titleEn}
          </h1>

          <div
            className="jkr-post-detail-summary p-4 sm:p-5 rounded-xl border-l-4 border-[#c9a84c] bg-[#faf8f4] text-[#4a443b]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {lang === 'am' ? post.summaryAm : post.summaryEn}
          </div>
        </header>

        {/* Featured Archival Image */}
        {post.image && (
          <div className="jkr-post-detail-featured mb-10 sm:mb-14">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#e8dfc8] bg-black">
              <img
                src={post.image}
                alt={post.titleEn}
                className="w-full max-h-[460px] object-cover"
              />
            </div>
            {(post.imageCaptionEn || post.imageCaptionAm) && (
              <p className="mt-2.5 text-xs text-[#8a857d] italic font-serif px-1">
                {lang === 'am' ? post.imageCaptionAm : post.imageCaptionEn}
              </p>
            )}
          </div>
        )}

        {/* Pull Quote Box */}
        {(post.pullQuoteEn || post.pullQuoteAm) && (
          <div
            className="jkr-post-detail-quote my-8 sm:my-12 p-6 sm:p-8 rounded-2xl border relative shadow-xs"
            style={{
              background: 'linear-gradient(135deg, #fbf9f4 0%, #f4efe6 100%)',
              borderColor: 'rgba(201,168,76,0.4)',
              borderLeft: '5px solid #c9a84c',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.8rem',
                color: '#c9a84c',
                lineHeight: 0,
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              “
            </span>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.05rem, 2.2vw, 1.2rem)',
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                lineHeight: 1.75,
              }}
            >
              {lang === 'am' ? post.pullQuoteAm : post.pullQuoteEn}
            </p>
          </div>
        )}

        {/* Editorial Body Text */}
        <div
          className="jkr-post-detail-body space-y-6 mb-12 sm:mb-16"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.05rem, 2vw, 1.15rem)',
            lineHeight: 1.95,
            color: 'var(--text-primary)',
          }}
        >
          {(lang === 'am' ? post.fullTextAm : post.fullTextEn).map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? 'first-letter:float-left first-letter:text-4xl first-letter:font-bold first-letter:font-serif first-letter:mr-2.5 first-letter:text-[#c9a84c]' : ''}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Official Author Attribution Seal */}
        <div className="jkr-post-detail-attribution p-6 rounded-2xl bg-[#faf8f4] border border-[#e8dfc8] border-l-4 border-l-[#c9a84c] mb-12 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#c9a84c]">
              <span>❖</span>
              <span>{lang === 'am' ? 'ይፋዊ የስነ-ጽሑፍ ማህደር' : 'AUTHORIZED LITERARY DOSSIER'}</span>
            </div>
            <span className="text-[10px] font-mono text-[#8a857d]">REF: YW-{post.id}</span>
          </div>
          <p className="text-xs text-[#5e584f] leading-relaxed">
            {lang === 'am'
              ? 'ይህ ጽሑፍ ከደራሲ ይስማዕከ ወርቁ ይፋዊ የፕሬስና የህትመት ማህደር የተወሰደ ነው።'
              : 'Official dispatch issued by the literary registry of Yismake Worku. For citation in academic monographs or media reviews, credit the official archive.'}
          </p>
        </div>

        {/* Telegram Direct Salon Banner */}
        <div className="jkr-post-detail-telegram p-6 sm:p-7 rounded-2xl bg-[#1a1714] text-[#f5f1eb] mb-14 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#f5f1eb] mb-1">
              {lang === 'am' ? 'በቴሌግራም የቀጥታ ውይይቶች ይሳተፉ' : 'Join the Live Literary Salon'}
            </h4>
            <p className="text-xs text-[#a69c8e]">
              @yismakeworku • 18,600+ verified readers worldwide
            </p>
          </div>
          <a
            href="https://t.me/yismakeworku"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#c9a84c] text-[#1a1714] font-bold text-xs hover:bg-[#d8b655] transition-colors shrink-0 shadow-sm"
          >
            <span>{lang === 'am' ? 'ቻናሉን ይቀላቀሉ' : 'Join on Telegram'}</span>
            <Icon name="arrowRight" size={14} />
          </a>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="jkr-post-detail-related pt-10 border-t border-[#e8e2d5]">
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
              }}
            >
              {lang === 'am' ? 'ተዛማጅ ይፋዊ ጽሑፎች' : 'Related Dispatches'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/news/${rel.id}`}
                  className="jkr-post-related-card bg-white border border-[#e8dfc8] rounded-xl hover:border-[#c9a84c] shadow-xs hover:shadow-md transition-all group block"
                >
                  <img src={rel.image} alt="" loading="lazy" />
                  <div className="jkr-post-related-card__content">
                  <span className="text-[10px] font-bold text-[#c9a84c] uppercase tracking-wider block mb-1">
                    {rel.date}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#1a1714',
                      lineHeight: 1.35,
                      marginBottom: '0.4rem',
                    }}
                    className="group-hover:text-[#c9a84c] transition-colors line-clamp-2"
                  >
                    {lang === 'am' ? rel.titleAm : rel.titleEn}
                  </h4>
                  <p className="text-xs text-[#6e685f] line-clamp-2">
                    {lang === 'am' ? rel.summaryAm : rel.summaryEn}
                  </p>
                  <span className="jkr-post-related-card__link">{lang === 'am' ? 'ጽሑፉን ያንብቡ' : 'Read dispatch'}<Icon name="arrowRight" size={14} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
