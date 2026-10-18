import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';
import { curatedNewsArticles } from './PostDetail';

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

  const allArticles = serverArticles.length > 0 ? serverArticles : curatedNewsArticles;

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
      <PageBanner title={lang === 'am' ? 'ዜናዎችና ይፋዊ ማስታወቂያዎች' : 'News & Literary Dispatches'} />

      <div className="site-container jkr-news-content max-w-5xl mx-auto py-12 sm:py-20 px-4">
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

        {/* Category Filter Tabs */}
        <div className="jkr-dispatch-tabs mb-14 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1a1714] text-[#c9a84c] shadow-sm ring-1 ring-[#c9a84c]'
                    : 'bg-white border border-[#e8dfc8] text-[#5a564e] hover:border-[#c9a84c]'
                }`}
              >
                <Icon name={cat.icon} size={13} />
                <span>{lang === 'am' ? cat.am : cat.en}</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-black/5 text-[#8a857d]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-[#e8dfc8] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="h-52 overflow-hidden bg-black relative">
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
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#8a857d] mb-2 font-mono">
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
                    className="group-hover:text-[#c9a84c] transition-colors"
                  >
                    {lang === 'am' ? article.titleAm : article.titleEn}
                  </h3>

                  <p
                    className="text-xs text-[#5e584f] line-clamp-3 leading-relaxed"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {lang === 'am' ? article.summaryAm : article.summaryEn}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-6 pt-0 border-t border-transparent flex items-center justify-between gap-3">
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

        {/* Press Desk Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1a1714] text-white text-center">
          <span className="text-[10px] font-bold text-[#c9a84c] uppercase tracking-widest block mb-2 font-mono">
            PRESS & LITERARY CORRESPONDENCE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {lang === 'am' ? 'ለጋዜጠኞች፣ ተመራማሪዎችና አንባቢዎች' : 'For Journalists, Researchers & Readers'}
          </h3>
          <p className="text-sm text-[#d8d1c7] max-w-xl mx-auto mb-6 font-serif">
            {lang === 'am'
              ? 'ለቃለ-መጠይቅ፣ ለምርምር ወይም ለትርጉም ጥያቄ በቀጥታ ይገናኙ።'
              : "For interviews, research, or translation inquiries, get in touch with Yismake's team."}
          </p>
          <Link to="/contact" className="jkr-pill-btn-gold !py-3 !px-7 !text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <span>{lang === 'am' ? 'ይፋዊ ግንኙነት ይክፈቱ' : 'Contact Official Desk'}</span>
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>
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
