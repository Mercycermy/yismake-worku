import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import Icon from '../components/Icon';

export default function News() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [serverArticles, setServerArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
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
      .catch(() => {
        setServerArticles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const allArticles = serverArticles;

  const categories = [
    { id: 'ALL', en: 'All', am: 'ሁሉም', icon: 'archive' },
    { id: 'NEWS', en: 'News', am: 'ዜና', icon: 'bookOpen' },
    { id: 'INSIGHT', en: 'Insight', am: 'ግንዛቤ', icon: 'spark' },
    { id: 'IDEA', en: 'Idea', am: 'ሀሳብ', icon: 'telescope' },
    { id: 'THOUGHT', en: 'Thought', am: 'አሰላስል', icon: 'scroll' },
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
    <div className="jkr-news-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', minHeight: '100vh' }}>
      {/* Editorial Page Header — Consistent with Books and Contact */}
      <section className="jkr-news-header pt-12 sm:pt-16 pb-8 border-b border-[#e8e2d5]/60 text-center">
        <div className="site-container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1714]/5 border border-[#c9a84c]/40 text-[#b8860b] text-[11px] font-bold tracking-widest uppercase mb-4">
            <Icon name="spark" size={13} />
            <span>{lang === 'am' ? 'ከደራሲው የሥራ ጠረጴዛ' : "From the Writer's Desk"}</span>
            <Icon name="spark" size={13} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            {lang === 'am' ? 'ዜናዎችና ይፋዊ ማስታወቂያዎች' : 'News & Literary Dispatches'}
          </h1>

          <p
            className="max-w-2xl mx-auto text-sm sm:text-base text-[#6e685f]"
            style={{
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {lang === 'am'
              ? 'የመጽሐፍ ዜናዎች፣ የትርጉም ሽልማቶች፣ የስነ-ጽሑፍ ማስታወሻዎችና ይፋዊ መግለጫዎች።'
              : 'Book announcements, international translation honors, occasional reflections, and verified literary dispatches.'}
          </p>
          <div className="w-16 h-0.5 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
        </div>
      </section>

      <div className="site-container jkr-news-content max-w-5xl mx-auto py-10 sm:py-16 px-4">

        {/* Category Filter Tabs */}
        <div className="jkr-dispatch-tabs mb-14 flex flex-wrap justify-center gap-2" role="group" aria-label={lang === 'am' ? 'ማስታወቂያዎችን በዘርፍ አጣራ' : 'Filter dispatches by category'}>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`jkr-dispatch-tab inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'jkr-dispatch-tab--active bg-[#1a1714] text-[#c9a84c] shadow-sm ring-1 ring-[#c9a84c]'
                    : 'bg-white border border-[#e8dfc8] text-[#5a564e] hover:border-[#c9a84c]'
                }`}
              >
                <Icon name={cat.icon} size={13} />
                <span>{lang === 'am' ? cat.am : cat.en}</span>
                <span className="jkr-dispatch-tab__count px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-black/5 text-[#8a857d]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-24 text-center font-serif text-[#8a857d] animate-pulse">
            <p className="text-base sm:text-lg">{lang === 'am' ? 'ዜናዎች በመጫን ላይ...' : 'Loading dispatches from official archive...'}</p>
          </div>
        ) : (
          <>
            {/* Article Cards Grid */}
            {filteredArticles.length > 0 && (
              <div className="jkr-dispatch-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="jkr-dispatch-card bg-white rounded-2xl border border-[#e8dfc8] overflow-hidden shadow-xs transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image */}
                      <div className="jkr-dispatch-card__image h-52 overflow-hidden bg-black relative">
                        <img
                          src={article.image}
                          alt={article.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#1a1714]/85 text-[#c9a84c] text-[10px] font-bold tracking-widest uppercase font-mono">
                            {lang === 'am' ? article.categoryAm : article.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="jkr-dispatch-card__body p-6">
                        <div className="jkr-dispatch-card__meta flex items-center gap-2 text-xs text-[#8a857d] mb-2 font-mono">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            color: '#1a1714',
                            lineHeight: 1.3,
                            marginBottom: '0.65rem',
                          }}
                          className="jkr-dispatch-card__title group-hover:text-[#c9a84c] transition-colors"
                        >
                          {lang === 'am' ? article.titleAm : article.titleEn}
                        </h3>

                        <p
                          className="jkr-dispatch-card__summary text-xs text-[#5e584f] line-clamp-3 leading-relaxed"
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          {lang === 'am' ? article.summaryAm : article.summaryEn}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="jkr-dispatch-card__actions p-6 pt-0 border-t border-transparent flex items-center justify-between gap-3">
                      <Link
                        to={`/news/${article.id}`}
                        className="jkr-pill-btn-dark !py-2.5 !px-5 !text-xs inline-flex items-center gap-2 flex-1 justify-center"
                      >
                        <span>{lang === 'am' ? 'ሙሉ ጽሑፉን ያንብቡ' : 'Read Full Dispatch'}</span>
                        <Icon name="arrowRight" size={13} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setSelectedArticle(article)}
                        className="p-2.5 rounded-full border border-[#e8dfc8] hover:border-[#c9a84c] text-[#8a857d] hover:text-[#1a1714] transition-colors cursor-pointer"
                        title={lang === 'am' ? 'ፈጣን ንባብ' : 'Quick read'}
                      >
                        <Icon name="spark" size={15} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {filteredArticles.length === 0 && (
              <section className="jkr-dispatch-empty" aria-live="polite">
                <span className="jkr-dispatch-empty__mark" aria-hidden="true">
                  <Icon name="archive" size={22} />
                </span>
                <p className="jkr-dispatch-empty__eyebrow">{lang === 'am' ? 'ማህደሩ' : 'THE ARCHIVE'}</p>
                <h2>{lang === 'am' ? 'እስካሁን የታተሙ ማስታወቂያዎች የሉም' : 'No Published Dispatches Yet'}</h2>
                <p>{lang === 'am' ? 'በዚህ ዘርፍ አዲስ ጽሑፎች ሲጨመሩ እዚህ ይታያሉ።' : 'New writing in this category will appear here.'}</p>
                <button type="button" onClick={() => setActiveCategory('ALL')}>
                  {lang === 'am' ? 'ሁሉንም ማስታወቂያዎች ይመልከቱ' : 'Browse all dispatches'}
                  <Icon name="arrowRight" size={14} />
                </button>
              </section>
            )}
          </>
        )}

        {/* Press Desk Callout */}
        <section className="press-correspondence" aria-labelledby="press-title">
          <div className="press-correspondence__seal" aria-hidden="true"><Icon name="feather" size={34} /></div>
          <div className="press-correspondence__copy">
            <span className="editorial-eyebrow">{lang === 'am' ? 'ፕሬስና የሥነ-ጽሑፍ ግንኙነት' : 'PRESS & LITERARY CORRESPONDENCE'}</span>
            <h2 id="press-title">{lang === 'am' ? 'ውይይቱ ከዚህ ይጀምራል።' : 'A conversation starts here.'}</h2>
            <p>{lang === 'am' ? 'ለቃለ-መጠይቅ፣ ለምርምር ወይም ለትርጉም ጥያቄ ይገናኙ።' : 'For interviews, research, translation inquiries, and thoughtful conversations about literature.'}</p>
          </div>
          <Link to="/contact" className="collection-button collection-button--gold">{lang === 'am' ? 'መልእክት ይላኩ' : 'Get in touch'}<Icon name="arrowRight" size={16} /></Link>
        </section>
      </div>

      {/* Quick Read Modal Folio */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[10px] font-mono font-bold text-[#c9a84c] uppercase tracking-wider block mb-2">
              {lang === 'am' ? selectedArticle.categoryAm : selectedArticle.category} • {selectedArticle.date}
            </span>

            <h2 className="font-serif text-2xl font-bold text-[#1a1714] mb-4">
              {lang === 'am' ? selectedArticle.titleAm : selectedArticle.titleEn}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#3a352e] font-serif leading-relaxed mb-6">
              {(lang === 'am' ? selectedArticle.fullTextAm : selectedArticle.fullTextEn).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
      )}
    </div>
  );
}
