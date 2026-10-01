import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { publicInterviewsAndArchive } from '../data/yismakeData';
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

  const articles = [
    {
      id: 'lost-spell-award',
      date: '24 SEPTEMBER 2026',
      readTime: '4 min read',
      category: 'AWARDS',
      categoryAm: 'ሽልማቶችና እውቅና',
      titleEn: "The Lost Spell Shortlisted for the TA First Translation Prize in the United Kingdom",
      titleAm: "«ክቡር ድንጋይ» (The Lost Spell) በእንግሊዝ ለታላቁ የ2022 TA First Translation Prize እጩ ሆነ",
      image: '/images/the-lost-spell-award.jpg',
      summaryEn:
        "Henningham Family Press and the Society of Authors in the UK announced the prestigious shortlist for the TA First Translation Prize, celebrating Dr. Bethlehem Attfield's English translation of Yismake Worku's satirical masterpiece 'The Lost Spell' (Kebur Dengay).",
      summaryAm:
        "በዶ/ር ቤተልሔም አትፊልድ ወደ እንግሊዝኛ ተተርጉሞ በለንደን ሄኒንግሃም ፋሚሊ ፕሬስ የታተመው የይስማዕከ ወርቁ «ክቡር ድንጋይ» (The Lost Spell) በታላቋ ብሪታንያ የስነ-ጽሑፍ ማህበር ለ2022 TA First Translation Prize ሽልማት እጩ መሆኑ ይፋ ተደረገ።",
      fullTextEn: [
        "The Society of Authors in London has formally announced the shortlist for the 2022 TA First Translation Prize. Among the distinguished nominees is 'The Lost Spell', the English translation of Yismake Worku’s iconic 2013 Amharic novel 'Kebur Dengay', translated by Dr. Bethlehem Attfield (PhD, University of Birmingham) and published by the esteemed British indie publisher Henningham Family Press.",
        "The judges commended the novel's biting allegorical genius: 'A powerful, satirical examination of human arrogance, power dynamics, and urban vulnerability seen through the eyes of a corrupt businessman magically transformed into a street dog. Attfield’s translation brings Worku’s rich Ethiopian idiom and layered social humor alive with extraordinary fidelity.'",
        "This milestone represents one of the highest international literary acknowledgments for contemporary Amharic speculative literature, introducing Yismake Worku’s narrative universe to readers across the United Kingdom, Europe, and North America.",
        "The Society of Authors highlighted the significance of promoting African translated literature: 'Worku’s storytelling offers an unsparing, inventive mirror of human hypocrisy, balancing the gravitas of Ethiopian folklore with modern existential philosophy.'"
      ],
      fullTextAm: [
        "የብሪታንያ የደራሲያን ማህበር (Society of Authors) ለ2022 TA First Translation Prize ሽልማት እጩዎችን በይፋ አሳውቋል። በዚህ ዝርዝር ውስጥ በዶ/ር ቤተልሔም አትፊልድ ተተርጉሞ በሄኒንግሃም ፕሬስ የታተመው የይስማዕከ ወርቁ ድንቅ ልቦለድ «ክቡር ድንጋይ» (The Lost Spell) ተካቷል።",
        "የዳኞች ቡድኑ ስለ ልቦለዱ በሰጠው አስተያየት፡ 'የሰው ልጅን እብሪትና የፖለቲካ ግብዝነት ከመሬት ተነስቶ በውሻ እይታ የመረመረበት አስደናቂ ማህበራዊ ምጸት ነው። የትርጉም ስራውም የኢትዮጵያን ጥልቅ ባህልና የአማርኛን ጣዕም ሳይለቅ ለአለም አቀፍ አንባቢ አቅርቦታል' ሲሉ አድንቀዋል።",
        "ይህ ታላቅ እውቅና የዘመናዊው የኢትዮጵያ ስነ-ጽሑፍ በዓለም አቀፍ መድረክ ተወዳዳሪ መሆኑን ያረጋገጠ ድንቅ ድል ነው።",
        "የብሪታንያ የስነ-ጽሑፍ ማህበር እንደገለጸው፤ 'የይስማዕከ ወርቁ ስራ የኢትዮጵያን የበለጸገ የቃላት ቅኔና ማህበራዊ ፍልስፍና ለአለም አንባቢዎች በማስተዋወቅ አዲስ ምዕራፍ ከፍቷል' ሲሉ ገልጸዋል።"
      ]
    },
    {
      id: 'telegram-community',
      date: '12 AUGUST 2026',
      readTime: '3 min read',
      category: 'COMMUNITY',
      categoryAm: 'ማህበረሰብና ጽሑፎች',
      titleEn: "The Living Archive: Yismake Worku Surpasses 18,600+ Subscribers on Official Telegram",
      titleAm: "በይፋዊ የቴሌግራም ቻናል ከ18,600 በላይ አንባቢዎች ጋር የተደረገ የቀጥታ ውይይት",
      image: '/images/library-bg.jpg',
      summaryEn:
        "The official digital community of Yismake Worku has crossed 18,600 verified readers, serving as an active literary salon for unpublished poems, reflections, and direct author discussions.",
      summaryAm:
        "የይስማዕከ ወርቁ ይፋዊ የቴሌግራም ማህበረሰብ ከ18,600 በላይ ተከታዮችን አሰባስቧል። በቻናሉ አማካኝነት አዳዲስ ግጥሞች፣ የስነ-ጽሑፍ ምክሮችና የቀጥታ የውይይት መድረኮች ይቀርባሉ።",
      fullTextEn: [
        "In an era where unauthorized reprints and digital bootlegs circulate freely, Yismake Worku's official Telegram channel (@yismakeworku) has become the direct heartbeat connecting the author with more than 18,600 readers worldwide.",
        "Subscribers receive exclusive access to early manuscript snippets, personal reflections on Ethiopian cultural sovereignty, and verified alerts regarding legitimate authorized book editions.",
        "The author expressed his deep gratitude to the community: 'Without your steadfast companionship through every trial and milestone, this literary journey would be incomplete. You are the guardians of our written word.'"
      ],
      fullTextAm: [
        "በይስማዕከ ወርቁ ይፋዊ የቴሌግራም ቻናል (@yismakeworku) በኩል ከአገር ውስጥና ከመላው ዓለም የተውጣጡ ከ18,600 በላይ አንባቢዎች ተሰባስበው ጽሑፎቹን ይከታተላሉ።",
        "ይህ መድረክ ያልታተሙ አጫጭር ግጥሞች፣ ደራሲያዊ ምክሮችና ህጋዊ የመጽሐፍ እትሞች መረጃዎች የሚቀርቡበት ዋነኛ ይፋዊ መስኮት ነው።",
        "ደራሲው ለአንባቢዎቹ ባስተላለፈው መልእክት፡ 'በእያንዳንዱ የህይወት ፈተናና ደስታ ውስጥ ከጎኔ ለቆማችሁ አንባቢዎቼ ሁሉ ምስጋናዬ ከልብ ነው። የእኔ ትልቁ ሀብት እናንተ ናችሁ' ብሏል።"
      ]
    },
    {
      id: 'academic-study',
      date: '18 JULY 2026',
      readTime: '5 min read',
      category: 'RESEARCH',
      categoryAm: 'አካዳሚያዊ ጥናት',
      titleEn: "Taylor & Francis Academic Journal Publishes In-Depth Analysis of Dertogada",
      titleAm: "ስለ ዴርቶጋዳ የቀረበ ዓለም አቀፍ አካዳሚያዊ ጥናት በታይለር ኤንድ ፍራንሲስ ታተመ",
      image: '/images/dertogada-art.jpg',
      summaryEn:
        "A peer-reviewed academic study titled 'Modernisation from the Shadows: Conspiracy, Monasticism and Techno-Utopia in Dertogada' explores the synthesis of Ethiopian ecclesiastical history and speculative fiction.",
      summaryAm:
        "በታዋቂው የታይለር ኤንድ ፍራንሲስ ዓለም አቀፍ የጥናት ጆርናል ላይ የዴርቶጋዳን ገዳማዊ እውቀትና የሳይንስ ልቦለድ ይዘት የመረመረ አጠቃላይ ጥናት ታትሞ ወጣ።",
      fullTextEn: [
        "Published in Eastern African Literary and Cultural Studies by researchers Sara Marzagora and Tom Boylston, the paper 'Modernisation from the Shadows: Conspiracy, Monasticism and Techno-Utopia in the Amharic novel Dertogada' critically examines how Yismake Worku bridged traditional Ethiopian monastic science with contemporary Afrofuturism.",
        "The study demonstrates how Dertogada broke new ground by portraying Lake Tana not as a passive relic of the past, but as an active, subterranean center of quantum computing and aerospace development.",
        "The scholars note: 'Worku challenged Western-centric science fiction paradigms by demonstrating that ancient Ge'ez scholarship and national sovereignty provide a potent framework for technological imagination.'"
      ],
      fullTextAm: [
        "በሳራ ማርዛጎራና ቶም ቦይልስተን የተዘጋጀው ይህ ጥናት፣ ዴርቶጋዳ እንዴት ጥንታዊውን የጣና ሐይቅ ገዳማት ታሪክ ወደ ዘመናዊ የጠፈርና የሳይንስ ማዕከልነት እንደቀየረው ይመረምራል።",
        "ተመራማሪዎቹ እንደገለጹት፤ 'ይስማዕከ ወርቁ የምዕራባውያንን ሳይንስ ልቦለድ ከመኮረጅ ይልቅ፣ የራሱን አገራዊ ቅርስና የግዕዝ እውቀት ተጠቅሞ የሳይንስ ነጻነትን ማሳየቱ ትልቅ አካዳሚያዊ ፋይዳ አለው' ብለዋል።"
      ]
    },
    {
      id: 'lecture-series',
      date: '05 MAY 2026',
      readTime: '4 min read',
      category: 'RESEARCH',
      categoryAm: 'አካዳሚያዊ ጥናት',
      titleEn: "Debre Markos University Hosts Annual Symposium on Contemporary Amharic Fiction",
      titleAm: "በደብረ ማርቆስ ዩኒቨርሲቲ ስለ ዘመናዊው የአማርኛ ልቦለድ እድገት የተካሄደ ውይይት",
      image: '/images/writers-desk.jpg',
      summaryEn:
        "Academics and graduate researchers gathered to discuss how speculative narrative structures pioneered by Yismake Worku are shaping emerging Ethiopian novelists.",
      summaryAm:
        "በዩኒቨርሲቲው በተዘጋጀው ዓመታዊ ሲምፖዚየም ላይ የይስማዕከ ወርቁ የስነ-ጽሑፍ ፈጠራና የአጻጻፍ ስልት በወጣት ደራሲያን ላይ ያሳደረው አዎንታዊ ተፅዕኖ ተገምግሟል።",
      fullTextEn: [
        "The Department of Literature at Debre Markos University convened its annual symposium focusing on technological imagination in contemporary fiction. Faculty members highlighted how Yismake's works continue to inspire graduate theses.",
        "Scholars discussed the pedagogical importance of blending cultural preservation with scientific inquiry, noting that over twenty university theses across Ethiopia have analyzed the Dertogada storyworld.",
        "The session concluded with calls for enhanced archival preservation of contemporary Ethiopian manuscripts."
      ],
      fullTextAm: [
        "የደብረ ማርቆስ ዩኒቨርሲቲ የስነ-ጽሑፍ ትምህርት ክፍል ባዘጋጀው መድረክ ላይ፣ የይስማዕከ ወርቁ ስራዎች በዩኒቨርሲቲዎች ለምርምር ማስተማሪያነት ያላቸው ፋይዳ ተብራርቷል።",
        "ከሃያ በላይ የማስተርስና የዶክትሬት ጥናቶች በዴርቶጋዳ እና በይስማዕከ ስራዎች ላይ መሰራታቸው ተገልጾ፣ የዘመናዊው ስነ-ጽሑፍ ማህደር ይበልጥ ሊጠናከር እንደሚገባ አሳስበዋል።"
      ]
    }
  ];

  const allArticles = [...serverArticles, ...articles];

  const categories = [
    { id: 'ALL', en: 'All Dispatches', am: 'ሁሉም ዜናዎች', icon: 'archive' },
    { id: 'AWARDS', en: 'Awards & Honors', am: 'ሽልማቶችና እውቅና', icon: 'medal' },
    { id: 'COMMUNITY', en: 'Literary Salon', am: 'የስነ-ጽሑፍ ሳሎን', icon: 'users' },
    { id: 'RESEARCH', en: 'Academic Studies', am: 'አካዳሚያዊ ጥናቶች', icon: 'bookOpen' },
  ];

  const categoryCounts = {
    ALL: allArticles.length,
    AWARDS: allArticles.filter((a) => a.category === 'AWARDS').length,
    COMMUNITY: allArticles.filter((a) => a.category === 'COMMUNITY').length,
    RESEARCH: allArticles.filter((a) => a.category === 'RESEARCH').length,
  };

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
            {lang === 'am' ? 'ይፋዊ የስነ-ጽሑፍ ማህደር' : 'Authorial Archive & Dispatches'}
          </span>
          <h2 className="jkr-section-heading mb-4">
            {lang === 'am' ? 'የደራሲው ይፋዊ ዜናና ማህደር' : 'Dispatches from the Literary Archive'}
          </h2>
          <p className="jkr-section-lead font-semibold text-[#2a251e]">
            {lang === 'am'
              ? 'ስለ ይስማዕከ ወርቁ፣ አዳዲስ መጻሕፍት፣ ዓለም አቀፍ የትርጉም ሽልማቶችና አካዳሚያዊ ጥናቶች ይፋዊ ማህደር።'
              : 'Official dispatches from Yismake Worku — including international translation honors, publishing releases, and scholarly monographs.'}
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

        {/* Media Broadcasts & Television Interviews */}
        <div className="jkr-news-broadcasts pt-16 border-t border-[#e8e2d5] mb-20">
          <div className="text-center mb-12">
            <span className="jkr-section-badge mb-4">
              {lang === 'am' ? 'የቴሌቪዥንና የሚዲያ ማህደር' : 'Broadcast & Media Archive'}
            </span>
            <h3 className="jkr-section-heading text-2xl sm:text-3xl mb-3">
              {lang === 'am' ? 'የሚዲያ ቃለ-መጠይቆችና የቪዲዮ ማህደር' : 'Media Broadcasts & Television Interviews'}
            </h3>
            <p className="jkr-section-lead text-sm sm:text-base">
              {lang === 'am'
                ? 'በኢቢኤስ (EBS TV)፣ አርትስ ቲቪ (Arts TV) እና በዋና ዋና መድረኮች የተላለፉ ውይይቶች፣ የሳይንስ ልቦለድ ትንታኔዎችና አካዳሚያዊ ጥናቶች።'
                : 'National television dialogues, speculative fiction masterclasses, and international academic retrospectives.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {publicInterviewsAndArchive.map((item) => (
              <a
                key={item.id}
                href={item.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="jkr-broadcast-card group block no-underline"
              >
                <div className="jkr-broadcast-stage">
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-extrabold text-[#c9a84c] uppercase tracking-widest">
                      {item.platform}
                    </span>
                  </div>
                  <div className="jkr-broadcast-play"><Icon name="play" size={20} /></div>
                  <div className="relative z-10">
                    <span className="text-[10px] text-white/50 font-mono block mb-1">
                      ARCHIVE · {item.id.replace(/-/g, ' ').toUpperCase()}
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-[#e8cf78] transition-colors">
                      {lang === 'am' ? item.titleAm : item.titleEn}
                    </h4>
                  </div>
                </div>
                <div className="p-5 sm:p-6 bg-white">
                  <p className="text-sm text-[#575147] leading-relaxed mb-4 font-serif line-clamp-3">
                    {lang === 'am' ? item.summaryAm : item.summaryEn}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#f0ebe3]">
                    <span className="text-[11px] font-semibold text-[#8a8377]">
                      {item.tag || (lang === 'am' ? 'ይፋዊ ማህደር' : 'Official Archive')}
                    </span>
                    <span className="text-xs font-bold text-[#b8860b] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {item.id === 'academic-taylor-francis'
                        ? (lang === 'am' ? 'ጥናቱን ያንብቡ' : 'Read Journal')
                        : (lang === 'am' ? 'ይመልከቱ' : 'Watch Now')}
                      <Icon name="external" size={14} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Editorial Press & Archival Bureau */}
        <div className="jkr-news-press jkr-press-bureau p-8 sm:p-12 lg:p-14 text-center text-[#fdfcfa]">
          <div className="jkr-press-bureau__glow jkr-press-bureau__glow--left" />
          <div className="jkr-press-bureau__glow jkr-press-bureau__glow--right" />

          <div className="jkr-news-press__content max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="jkr-section-badge jkr-section-badge--dark">
              {lang === 'am' ? 'የፕሬስና የሚዲያ ቢሮ' : 'Editorial Press & Archival Bureau'}
            </span>

            <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {lang === 'am'
                ? 'ለጋዜጠኞች፣ ተመራማሪዎችና ለዓለም አቀፍ የትርጉም ተቋማት'
                : 'For Journalists, Academic Researchers & Cultural Critics'}
            </h3>

            <p className="text-sm sm:text-base text-[#d8d1c7] max-w-2xl mx-auto leading-relaxed font-serif">
              {lang === 'am'
                ? 'ስለ ይስማዕከ ወርቁ ስራዎች ይፋዊ የፕሬስ መግለጫዎችን፣ የፎቶ ማህደሮችንና የትርጉም መብቶችን ለመጠየቅ ከደራሲው ቢሮ ጋር በቀጥታ ይገናኙ።'
                : 'Access authorized high-resolution press imagery, official author biography dossiers, academic citation protocols, and direct licensing inquiries for broadcast interviews.'}
            </p>

            <div className="jkr-news-press__resources grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { icon: 'file', en: 'Author Biography & Press Dossier', am: 'ይፋዊ የህይወት ታሪክና የህትመት ማህደር' },
                { icon: 'image', en: 'High-Res Portraits & Book Jackets', am: 'ከፍተኛ ጥራት ያላቸው ፎቶዎችና ሽፋኖች' },
                { icon: 'scale', en: 'Academic Monograph & Citation Licensing', am: 'የትርጉምና የጥቅስ ፈቃድ መመሪያ' },
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

            <p className="text-[11px] text-[#9c9388] font-mono pt-2">
              RESPONSE &lt; 24H · DEBRE MARKOS & ADDIS ABABA, ETHIOPIA
            </p>
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
