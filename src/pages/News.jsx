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

  // Default curated dispatches with new categories
  const defaultDispatches = [
    {
      id: 'lost-spell-award',
      date: '24 SEP 2026',
      readTime: '4 min read',
      category: 'NEWS',
      categoryAm: 'ዜና',
      titleEn: "The Lost Spell Shortlisted for the TA First Translation Prize in the United Kingdom",
      titleAm: "«ክቡር ድንጋይ» (The Lost Spell) በእንግሊዝ ለታላቁ የ2022 TA First Translation Prize እጩ ሆነ",
      image: '/images/the-lost-spell-award.jpg',
      summaryEn:
        "Henningham Family Press and the Society of Authors in the UK announced the prestigious shortlist for the TA First Translation Prize, celebrating Dr. Bethlehem Attfield's English translation of Yismake Worku's satirical masterpiece 'The Lost Spell' (Kebur Dengay).",
      summaryAm:
        "በዶ/ር ቤተልሔም አትፊልድ ወደ እንግሊዝኛ ተተርጉሞ በለንደን ሄኒንግሃም ፋሚሊ ፕሬስ የታተመው የይስማዕከ ወርቁ «ክቡር ድንጋይ» (The Lost Spell) በታላቋ ብሪታንያ የስነ-ጽሑፍ ማህበር ለ2022 TA First Translation Prize ሽልማት እጩ መሆኑ ይፋ ተደረገ።",
      fullTextEn: [
        "The Society of Authors in London has formally announced the shortlist for the 2022 TA First Translation Prize. Among the distinguished nominees is 'The Lost Spell', the English translation of Yismake Worku’s iconic 2013 Amharic novel 'Kebur Dengay', translated by Dr. Bethlehem Attfield (PhD, University of Birmingham) and published by the esteemed British indie publisher Henningham Family Press.",
        "The judges commended the novel's biting allegorical genius: 'A powerful, satirical examination of human arrogance, power dynamics, and urban vulnerability seen through the eyes of a corrupt businessman magically transformed into a street dog. Attfield’s translation brings Worku’s rich Ethiopian idiom and layered social humor alive with extraordinary fidelity.'"
      ],
      fullTextAm: [
        "የብሪታንያ የደራሲያን ማህበር (Society of Authors) ለ2022 TA First Translation Prize ሽልማት እጩዎችን በይፋ አሳውቋል። በዚህ ዝርዝር ውስጥ በዶ/ር ቤተልሔም አትፊልድ ተተርጉሞ በሄኒንግሃም ፕሬስ የታተመው የይስማዕከ ወርቁ ድንቅ ልቦለድ «ክቡር ድንጋይ» (The Lost Spell) ተካቷል።",
        "የዳኞች ቡድኑ ስለ ልቦለዱ በሰጠው አስተያየት፡ 'የሰው ልጅን እብሪትና የፖለቲካ ግብዝነት ከመሬት ተነስቶ በውሻ እይታ የመረመረበት አስደናቂ ማህበራዊ ምጸት ነው። የትርጉም ስራውም የኢትዮጵያን ጥልቅ ባህልና የአማርኛን ጣዕም ሳይለቅ ለአለም አቀፍ አንባቢ አቅርቦታል' ሲሉ አድንቀዋል።"
      ]
    },
    {
      id: 'academic-study',
      date: '18 JUL 2026',
      readTime: '5 min read',
      category: 'INSIGHT',
      categoryAm: 'ዕይታ (INSIGHT)',
      titleEn: "Taylor & Francis Academic Journal Publishes In-Depth Analysis of Dertogada",
      titleAm: "ስለ ዴርቶጋዳ የቀረበ ዓለም አቀፍ አካዳሚያዊ ጥናት በታይለር ኤንድ ፍራንሲስ ታተመ",
      image: '/images/dertogada-art.jpg',
      summaryEn:
        "A peer-reviewed academic study titled 'Modernisation from the Shadows: Conspiracy, Monasticism and Techno-Utopia in Dertogada' explores the synthesis of Ethiopian ecclesiastical history and speculative fiction.",
      summaryAm:
        "በታዋቂው የታይለር ኤንድ ፍራንሲስ ዓለም አቀፍ የጥናት ጆርናል ላይ የዴርቶጋዳን ገዳማዊ እውቀትና የሳይንስ ልቦለድ ይዘት የመረመረ አጠቃላይ ጥናት ታትሞ ወጣ።",
      fullTextEn: [
        "Published in Eastern African Literary and Cultural Studies by researchers Sara Marzagora and Tom Boylston, the paper 'Modernisation from the Shadows: Conspiracy, Monasticism and Techno-Utopia in the Amharic novel Dertogada' critically examines how Yismake Worku bridged traditional Ethiopian monastic science with contemporary Afrofuturism."
      ],
      fullTextAm: [
        "በሳራ ማርዛጎራና ቶም ቦይልስተን የተዘጋጀው ይህ ጥናት፣ ዴርቶጋዳ እንዴት ጥንታዊውን የጣና ሐይቅ ገዳማት ታሪክ ወደ ዘመናዊ የጠፈርና የሳይንስ ማዕከልነት እንደቀየረው ይመረምራል።"
      ]
    },
    {
      id: 'telegram-community',
      date: '12 AUG 2026',
      readTime: '3 min read',
      category: 'IDEA',
      categoryAm: 'ሀሳብ (IDEA)',
      titleEn: "Connecting Monastic Heritage with Orbital Rocketry: The Afrofuturist Vision",
      titleAm: "የገዳማት ጥበብ ከጠፈር ምርምር ጋር ሲገናኝ፡ የቴክኖሎጂ አዲስ ራዕይ",
      image: '/images/library-bg.jpg',
      summaryEn:
        "Exploring how secret Ge'ez manuscripts and monastic contemplation serve as the blueprint for sovereign African technological innovation in Yismake Worku's novels.",
      summaryAm:
        "ጥንታዊ የኢትዮጵያ የብራና መጻሕፍትና የገዳማት ምስጢሮች ለአገራዊ የቴክኖሎጂና የጠፈር ምርምር እንዴት መነሻ እንደሆኑ የሚያስረዳ ሁነኛ ሀሳብ።",
      fullTextEn: [
        "In his groundbreaking novels, Yismake Worku presents a compelling thesis: ancient Ethiopian monastic archives hold the missing key to indigenous African scientific sovereignty."
      ],
      fullTextAm: [
        "በይስማዕከ ወርቁ ልቦለዶች ውስጥ ጥንታዊው የገዳማት እውቀትና የግዕዝ ምስጢር ለዘመናዊው አፍሪካዊ የሳይንስና የቴክኖሎጂ ትንሳኤ እንዴት መሠረት እንደሚሆን በሰፊው ተዳሷል።"
      ]
    },
    {
      id: 'writer-desk-reflections',
      date: '05 MAY 2026',
      readTime: '4 min read',
      category: 'THOUGHT',
      categoryAm: 'ማስታወሻ (THOUGHT)',
      titleEn: "Reflections on Creative Resilience and the Freedom of the Mind",
      titleAm: "ስለ ፈጠራ ጽናትና ስለ ሰው ልጅ ነጻ ህሊና የተጻፈ ማስታወሻ",
      image: '/images/yismake-portrait.jpg',
      summaryEn:
        "Personal reflections from Yismake Worku on overcoming physical trauma through creative bravery and the infinite power of imagination.",
      summaryAm:
        "አካል ቢታሰርና ቢጎዳም የሰው ልጅ ነጻ ህሊናና ፈጠራ ግን የማይገደብ መሆኑን የሚያሳይ ከደራሲው ማስታወሻ ደብተር የተወሰደ።",
      fullTextEn: [
        "Physical confinement is temporary, but sovereign imagination is infinite. When you write from conviction, every word becomes a bridge to freedom."
      ],
      fullTextAm: [
        "አካላዊ መቆለፍና ፈተናዎች ጊዜያዊ ናቸው፤ የሰው ልጅ ነጻ ህሊናና ምናብ ግን ድንበር የለውም። በህሊናህ ስትጽፍ እያንዳንዷ ቃል ወደ ነጻነት የሚወስድ ድልድይ ትሆናለች።"
      ]
    }
  ];

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

  const allArticles = serverArticles.length > 0 ? serverArticles : defaultDispatches;

  // Requested categories: news, insight, idea, thought
  const categories = [
    { id: 'ALL', en: 'All', am: 'ሁሉም', icon: 'archive' },
    { id: 'NEWS', en: 'News', am: 'ዜና', icon: 'bookOpen' },
    { id: 'INSIGHT', en: 'Insight', am: 'ዕይታ', icon: 'spark' },
    { id: 'IDEA', en: 'Idea', am: 'ሀሳብ', icon: 'medal' },
    { id: 'THOUGHT', en: 'Thought', am: 'ማስታወሻ', icon: 'users' },
  ];

  const filteredArticles =
    activeCategory === 'ALL'
      ? allArticles
      : allArticles.filter((a) => a.category.toUpperCase() === activeCategory);

  return (
    <div className="jkr-news-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      <PageBanner title={lang === 'am' ? 'ዜና እና ሀሳቦች' : 'News & Insights'} />

      <div className="site-container jkr-news-content max-w-5xl mx-auto py-8 sm:py-16 px-4">
        {/* Intro */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div className="jkr-gold-divider mb-3">
            <Icon name="spark" size={15} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#1a1714',
              lineHeight: 1.2,
              marginBottom: '0.5rem',
            }}
          >
            {lang === 'am' ? 'ከደራሲው ማህደር' : 'Notes & Dispatches'}
          </h2>
          <p className="text-sm sm:text-base text-[#6e685f] font-serif">
            {lang === 'am'
              ? 'የደራሲ ይስማዕከ ወርቁ ዜናዎች፣ ዕይታዎች፣ ሀሳቦችና የስነ-ጽሑፍ ማስታወሻዎች።'
              : 'Official news, sharp insights, philosophical ideas, and creative thoughts from Yismake Worku.'}
          </p>
        </div>

        {/* Categories Tab Pill Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1a1714] text-[#fdfcfa] border-[#c9a84c] shadow-md'
                    : 'bg-white text-[#5a564e] border-[#e8e2d5] hover:border-[#c9a84c]'
                }`}
              >
                {lang === 'am' ? cat.am : cat.en}
              </button>
            );
          })}
        </div>

        {/* Articles Cards Grid (Visually Appealing for Phone & Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-[#e8e2d5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#c9a84c] transition-all flex flex-col justify-between group"
            >
              <div>
                <div
                  onClick={() => setSelectedArticle(article)}
                  className="aspect-[16/9] overflow-hidden bg-gray-100 cursor-pointer relative"
                >
                  <img
                    src={article.image}
                    alt={article.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#1a1714]/80 backdrop-blur-md text-[#c9a84c] text-[10px] font-bold tracking-widest rounded-full uppercase">
                    {article.category}
                  </span>
                </div>

                <div className="p-5 sm:p-7">
                  <span className="text-[11px] text-[#8a857d] font-mono block mb-2">
                    {article.date} • {article.readTime || '3 min read'}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                      fontWeight: 800,
                      color: '#1a1714',
                      lineHeight: 1.3,
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
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555047] leading-relaxed line-clamp-3">
                    {lang === 'am' ? article.summaryAm : article.summaryEn}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-7 pb-6 pt-0 flex items-center justify-between border-t border-[#f5f3ef] mt-auto">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="jkr-pill-btn-dark !py-2 !px-5 !text-xs cursor-pointer shadow-xs"
                >
                  <span>{lang === 'am' ? 'ሙሉውን አንብብ' : 'Read Article'}</span>
                  <Icon name="arrowRight" size={13} />
                </button>
                <Link
                  to={`/news/${article.id}`}
                  className="text-xs font-semibold text-[#8a857d] hover:text-[#1a1714] transition-colors"
                >
                  {lang === 'am' ? 'ዝርዝር ገጽ' : 'Permalink'} ↗
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-white border border-[#e8e2d5] rounded-2xl p-8">
            <p className="text-sm text-[#8a857d]">
              {lang === 'am' ? 'ምንም ጽሑፍ አልተገኘም።' : 'No articles found for this category.'}
            </p>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fdfcfa] p-6 sm:p-10 rounded-2xl text-[#1a1714] shadow-2xl border border-[#c9a84c]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Icon name="close" size={18} />
            </button>

            <span className="px-3 py-1 bg-[#1a1714] text-[#c9a84c] text-[10px] font-bold tracking-widest rounded-full uppercase inline-block mb-3">
              {selectedArticle.category}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                color: '#1a1714',
                lineHeight: 1.25,
                marginBottom: '1rem',
              }}
            >
              {lang === 'am' ? selectedArticle.titleAm : selectedArticle.titleEn}
            </h2>

            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 bg-gray-100">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.titleEn}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="space-y-4 text-sm sm:text-base leading-relaxed text-[#3a352e]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {(lang === 'am' ? selectedArticle.fullTextAm : selectedArticle.fullTextEn).map(
                (p, i) => (
                  <p key={i}>{p}</p>
                )
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#e8e2d5] flex items-center justify-between">
              <Link
                to={`/news/${selectedArticle.id}`}
                className="text-xs font-bold text-[#c9a84c] hover:underline"
              >
                {lang === 'am' ? 'የተሟላ የዜና ገጽ ክፈት →' : 'View Dedicated Page →'}
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
