import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

export default function News() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [serverArticles, setServerArticles] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.id,
            date: item.date || 'LATEST',
            readTime: '3 min read',
            category: (item.category || 'NEWS').toUpperCase(),
            categoryAm: item.category || 'ዜና',
            titleEn: item.title,
            titleAm: item.title,
            image: item.image || '/images/writers-desk.jpg',
            summaryEn: item.excerpt || (item.body ? item.body.slice(0, 160) + '...' : ''),
            summaryAm: item.excerpt || (item.body ? item.body.slice(0, 160) + '...' : ''),
            fullTextEn: [item.body || item.excerpt],
            fullTextAm: [item.body || item.excerpt]
          }));
          setServerArticles(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const allArticles = serverArticles;

  const categories = [
    { id: 'ALL', en: 'All Dispatches', am: 'ሁሉም ዜናዎች', icon: 'archive' },
    { id: 'CANON', en: 'Canon & Series', am: 'ቀኖናዊ ስራዎች', icon: 'bookOpen' },
    { id: 'AWARDS', en: 'Awards & Honors', am: 'ሽልማቶችና እውቅና', icon: 'medal' },
    { id: 'EXHIBITION', en: 'Exhibitions', am: 'ኤግዚቢሽንና ዝግጅት', icon: 'spark' },
    { id: 'COMMUNITY', en: 'Literary Salon', am: 'የስነ-ጽሑፍ ሳሎን', icon: 'users' },
  ];

  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat.id] =
      cat.id === 'ALL'
        ? allArticles.length
        : allArticles.filter((a) => a.category === cat.id).length;
    return acc;
  }, {});

  const filteredArticles =
    activeCategory === 'ALL'
      ? allArticles
      : allArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="jkr-news-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      <PageBanner title={lang === 'am' ? 'ዜናዎችና ይፋዊ ማስታወቂያዎች' : 'News & Literary Dispatches'} />

      <div className="site-container jkr-news-content max-w-5xl mx-auto py-12 sm:py-20">
        {/* Editorial hero & dispatch filters */}
        <div className="jkr-news-intro text-center mb-10 max-w-3xl mx-auto">
          <div className="jkr-gold-divider mb-4">
            <Icon name="spark" size={15} />
          </div>
          <span className="jkr-section-badge mb-4">
            {lang === 'am' ? 'ከደራሲው የሥራ ጠረጴዛ' : "From the Writer's Desk"}
          </span>
          <h2 className="jkr-section-heading mb-4">
            {lang === 'am' ? 'ዜናና ማስታወሻዎች' : 'News & Notes'}
          </h2>
          <p className="jkr-section-lead font-semibold text-[#2a251e]">
            {lang === 'am'
              ? 'ከይስማዕከ ወርቁ የመጽሐፍ ዜናዎች፣ ማስታወሻዎችና የስነ-ጽሑፍ ዜናዎች።'
              : 'Book news, occasional notes, and literary updates from Yismake Worku.'}
          </p>
        </div>

        <div className="jkr-dispatch-tabs mb-16">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`jkr-dispatch-tab ${isSelected ? 'jkr-dispatch-tab--active' : ''}`}
              >
                <Icon name={cat.icon} size={15} />
                <span>{lang === 'am' ? cat.am : cat.en}</span>
                <span className="jkr-dispatch-tab__count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            1. FEATURED LEAD STORY (HIGH-END EDITORIAL SPREAD)
            ══════════════════════════════════════════════════════════════ */}
        {filteredArticles.length > 0 && (
          <div className="jkr-news-featured mb-16 pb-16 border-b border-[#e8e2d5]">
            <article className="jkr-news-featured__story grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-[#e8e2d5] rounded-xl overflow-hidden shadow-lg p-6 sm:p-10 hover:border-[#c9a84c] transition-colors group">
              {/* Image Frame */}
              <div
                className="md:col-span-7 aspect-[16/10] overflow-hidden bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => setSelectedArticle(filteredArticles[0])}
              >
                <img
                  src={filteredArticles[0].image}
                  alt={filteredArticles[0].titleEn}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
              </div>

              {/* Story Content */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="px-2.5 py-0.5 rounded bg-[#1a1714] text-[#c9a84c] text-[10px] tracking-wider uppercase">
                    {lang === 'am' ? filteredArticles[0].categoryAm : filteredArticles[0].category}
                  </span>
                  <span className="text-[#8a857d]">{filteredArticles[0].date}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1714] leading-snug group-hover:text-[#c9a84c] transition-colors">
                  <button
                    onClick={() => setSelectedArticle(filteredArticles[0])}
                    className="text-left cursor-pointer"
                  >
                    {lang === 'am' ? filteredArticles[0].titleAm : filteredArticles[0].titleEn}
                  </button>
                </h2>

                <p className="text-sm text-[#555047] leading-relaxed line-clamp-3">
                  {lang === 'am' ? filteredArticles[0].summaryAm : filteredArticles[0].summaryEn}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedArticle(filteredArticles[0])}
                    className="jkr-pill-btn-dark !py-2.5 !px-6 !text-xs cursor-pointer shadow-sm"
                  >
                    {lang === 'am' ? 'ሙሉውን አንብብ' : 'Read Full Dispatch'}
                  </button>
                  <Link
                    to={`/news/${filteredArticles[0].id}`}
                    className="text-xs font-bold text-[#8a857d] hover:text-[#1a1714] transition-colors"
                  >
                    {lang === 'am' ? 'በተለየ ገጽ' : 'Permalink'} <Icon name="external" size={13} />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            2. SECONDARY DISPATCHES GRID
            ══════════════════════════════════════════════════════════════ */}
        {filteredArticles.length > 1 && (
          <div className="jkr-news-archive-grid mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e8e2d5]">
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#1a1714',
              }}
            >
              {lang === 'am' ? 'ተጨማሪ ዘገባዎችና ማህደሮች' : 'Archival Dispatches'}
            </h3>
            <span className="text-xs text-[#8a857d] font-semibold">
              {filteredArticles.length} {lang === 'am' ? 'ጽሑፎች' : 'Articles'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.slice(1).map((article) => (
              <article
                key={article.id}
                className="jkr-news-archive-card bg-white border border-[#e8e2d5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => setSelectedArticle(article)}
                    className="aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={article.image}
                      alt={article.titleEn}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-400"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-[#8a857d] mb-3">
                      <span className="px-2 py-0.5 rounded bg-[#f5f3ef] text-[#1a1714] font-bold text-[10px] tracking-wider uppercase">
                        {lang === 'am' ? article.categoryAm : article.category}
                      </span>
                      <span>{article.date}</span>
                    </div>

                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#1a1714',
                        lineHeight: 1.35,
                        marginBottom: '0.75rem',
                      }}
                      className="group-hover:text-[#c9a84c] transition-colors"
                    >
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="text-left cursor-pointer"
                      >
                        {lang === 'am' ? article.titleAm : article.titleEn}
                      </button>
                    </h4>

                    <p className="text-xs text-[#666055] leading-relaxed line-clamp-3 mb-4">
                      {lang === 'am' ? article.summaryAm : article.summaryEn}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-[#f5f3ef] mt-auto">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-bold text-[#1a1714] hover:text-[#c9a84c] cursor-pointer flex items-center gap-1"
                  >
                    <span>{lang === 'am' ? 'አንብብ' : 'Read Article'}</span>
                    <Icon name="arrowRight" size={14} />
                  </button>
                  <Link
                    to={`/news/${article.id}`}
                    className="text-[11px] text-[#8a857d] hover:text-black"
                  >
                    {lang === 'am' ? 'ዝርዝር' : 'Detail'} <Icon name="external" size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        )}

        {filteredArticles.length === 0 && (
          <div className="jkr-news-empty mb-16">
            <div className="jkr-news-empty__mark"><Icon name="bookOpen" size={22} /></div>
            <span className="jkr-news-empty__eyebrow">{lang === 'am' ? 'ከደራሲው' : 'A note from Yismake'}</span>
            <h3>{lang === 'am' ? 'ምንም ይፋዊ ዜና አልተገኘም' : 'No Published Dispatches Yet'}</h3>
            <p>
              {lang === 'am'
                ? 'አዳዲስ ዜናዎችና ማስታወሻዎች እዚህ ይጋራሉ። ለወቅታዊ ዝማኔዎች በቴሌግራም ይከታተሉ።'
                : 'News and notes will appear here. Follow Yismake on Telegram for updates.'}
            </p>
            <a href="https://t.me/yismakeworku" target="_blank" rel="noopener noreferrer" className="jkr-news-empty__link">
              {lang === 'am' ? 'የቴሌግራም ቻናሉን ይጎብኙ' : 'Visit the Telegram channel'}
              <Icon name="external" size={14} />
            </a>
          </div>
        )}

        {/* Press, research, and reader enquiries */}
        <div className="jkr-news-press jkr-press-bureau p-8 sm:p-12 lg:p-14 text-center text-[#fdfcfa]">
          <div className="jkr-press-bureau__glow jkr-press-bureau__glow--left" />
          <div className="jkr-press-bureau__glow jkr-press-bureau__glow--right" />

          <div className="jkr-news-press__content max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="jkr-section-badge jkr-section-badge--dark">
              {lang === 'am' ? 'ለፕሬስና ምርምር' : 'Press & Research'}
            </span>

            <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {lang === 'am'
                ? 'ለጋዜጠኞች፣ ተመራማሪዎችና አንባቢዎች'
                : 'For journalists, researchers & readers'}
            </h3>

            <p className="text-sm sm:text-base text-[#d8d1c7] max-w-2xl mx-auto leading-relaxed font-serif">
              {lang === 'am'
                ? 'ለቃለ-መጠይቅ፣ ለምርምር ወይም ለትርጉም ጥያቄ በቀጥታ ይገናኙ።'
                : 'For interviews, research, or translation inquiries, get in touch with Yismake’s team.'}
            </p>

            <div className="jkr-news-press__resources grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { icon: 'file', en: 'Author information', am: 'ስለ ደራሲው' },
                { icon: 'image', en: 'Press images', am: 'የፕሬስ ምስሎች' },
                { icon: 'scale', en: 'Translation & research', am: 'ትርጉምና ምርምር' },
              ].map((chip, i) => (
                <div
                  key={i}
                  className="jkr-news-press__resource flex items-start gap-2.5 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <Icon name={chip.icon} size={19} className="text-[#e8cf78] shrink-0" />
                  <span className="text-[11px] text-[#e2dad0] leading-relaxed">
                    {lang === 'am' ? chip.am : chip.en}
                  </span>
                </div>
              ))}
            </div>

            <div className="jkr-news-press__actions pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="jkr-pill-btn-gold !text-sm">
                {lang === 'am' ? 'ከፕሬስ ቢሮው ጋር ይገናኙ' : 'Contact Press Liaison'} <Icon name="arrowRight" size={15} />
              </Link>
              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="jkr-pill-btn !bg-white/10 !border-white/25 !text-white !text-sm"
              >
                {lang === 'am' ? 'ቴሌግራም ሳሎን (18.6K+)' : 'Join Telegram Salon (18.6K+)'} <Icon name="external" size={14} />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          ARTICLE DETAIL READER MODAL (HIGH-END EDITORIAL READER)
          ══════════════════════════════════════════════════════════════ */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#fdfcfa] p-6 sm:p-12 rounded-xl text-[#1a1714] shadow-2xl border border-[#c9a84c]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-sm"
              aria-label="Close"
            >
              <Icon name="close" size={16} />
            </button>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs font-bold mb-3">
              <span className="px-2.5 py-0.5 rounded bg-[#1a1714] text-[#c9a84c] text-[10px] tracking-wider uppercase">
                {lang === 'am' ? selectedArticle.categoryAm : selectedArticle.category}
              </span>
              <span className="text-[#8a857d]">{selectedArticle.date}</span>
              {selectedArticle.readTime && <span className="text-[#8a857d]">• {selectedArticle.readTime}</span>}
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#1a1714',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}
            >
              {lang === 'am' ? selectedArticle.titleAm : selectedArticle.titleEn}
            </h2>

            {/* Media Image */}
            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden mb-8 bg-gray-100 shadow-md">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.titleEn}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body Paragraphs */}
            <div
              className="space-y-4 text-base leading-relaxed text-[#3a352e]"
              style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', lineHeight: 1.85 }}
            >
              {(lang === 'am' ? selectedArticle.fullTextAm : selectedArticle.fullTextEn).map(
                (para, i) => (
                  <p key={i}>{para}</p>
                )
              )}
            </div>

            {/* Modal Colophon */}
            <div className="mt-10 pt-6 border-t border-[#e8e2d5] flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs text-[#8a857d]">
                <span className="font-bold text-[#1a1714]">YISMAKE WORKU</span> • Official Dossier
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/news/${selectedArticle.id}`}
                  className="text-xs font-bold text-[#c9a84c] hover:underline"
                >
                  {lang === 'am' ? 'የተሟላ የዜና ገጽ ክፈት →' : 'Dedicated Article Page →'}
                </Link>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="jkr-pill-btn-dark !py-2 !px-5 !text-xs cursor-pointer"
                >
                  {lang === 'am' ? 'ዝጋ' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
