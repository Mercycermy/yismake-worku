import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { publicInterviewsAndArchive } from '../data/yismakeData';
import PageBanner from '../components/PageBanner';

export default function News() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 'lost-spell-award',
      date: '24 SEPTEMBER 2026',
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
        "This milestone represents one of the highest international literary acknowledgments for contemporary Amharic speculative literature, introducing Yismake Worku’s narrative universe to readers across the United Kingdom, Europe, and North America."
      ],
      fullTextAm: [
        "የብሪታንያ የደራሲያን ማህበር (Society of Authors) ለ2022 TA First Translation Prize ሽልማት እጩዎችን በይፋ አሳውቋል። በዚህ ዝርዝር ውስጥ በዶ/ር ቤተልሔም አትፊልድ ተተርጉሞ በሄኒንግሃም ፕሬስ የታተመው የይስማዕከ ወርቁ ድንቅ ልቦለድ «ክቡር ድንጋይ» (The Lost Spell) ተካቷል።",
        "የዳኞች ቡድኑ ስለ ልቦለዱ በሰጠው አስተያየት፡ 'የሰው ልጅን እብሪትና የፖለቲካ ግብዝነት ከመሬት ተነስቶ በውሻ እይታ የመረመረበት አስደናቂ ማህበራዊ ምጸት ነው። የትርጉም ስራውም የኢትዮጵያን ጥልቅ ባህልና የአማርኛን ጣዕም ሳይለቅ ለአለም አቀፍ አንባቢ አቅርቦታል' ሲሉ አድንቀዋል።",
        "ይህ ታላቅ እውቅና የዘመናዊው የኢትዮጵያ ስነ-ጽሑፍ በዓለም አቀፍ መድረክ ተወዳዳሪ መሆኑን ያረጋገጠ ድንቅ ድል ነው።"
      ]
    },
    {
      id: 'telegram-community',
      date: '12 AUGUST 2026',
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
    }
  ];

  const filteredArticles =
    activeCategory === 'ALL'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="bg-white text-[#222222] font-sans antialiased">
      <PageBanner title={lang === 'am' ? 'ዜናዎች' : 'News'} />
      <div className="site-container max-w-4xl mx-auto py-14 sm:py-20">
        {/* Page Subtitle */}
        <div className="text-center mb-14">
          <p className="text-base text-[#666666] max-w-xl mx-auto font-serif">
            {lang === 'am'
              ? 'ስለ ይስማዕከ ወርቁ፣ መጻሕፍቱ፣ ሽልማቶችና ይፋዊ ማስታወቂያዎች ወቅታዊ ዘገባዎች።'
              : 'Read the latest updates from Yismake Worku, including literary translation awards, book releases, and official announcements.'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {['ALL', 'AWARDS', 'COMMUNITY', 'RESEARCH'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-[#f4f4f4] text-[#555555] hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lead News Story (Large Feature) */}
        {filteredArticles.length > 0 && (
          <div className="mb-14 pb-14 border-b border-gray-200">
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
              <div className="md:col-span-7 aspect-[16/10] overflow-hidden bg-gray-100 rounded-sm">
                <img
                  src={filteredArticles[0].image}
                  alt={filteredArticles[0].titleEn}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
              </div>

              <div className="md:col-span-5 space-y-3">
                <div className="text-xs font-bold text-[#888888] tracking-widest uppercase">
                  {filteredArticles[0].date}
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] leading-snug group-hover:text-[#c59b27] transition-colors">
                  <button
                    onClick={() => setSelectedArticle(filteredArticles[0])}
                    className="text-left cursor-pointer"
                  >
                    {lang === 'am' ? filteredArticles[0].titleAm : filteredArticles[0].titleEn}
                  </button>
                </h2>

                <p className="text-sm text-[#555555] leading-relaxed line-clamp-3">
                  {lang === 'am' ? filteredArticles[0].summaryAm : filteredArticles[0].summaryEn}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedArticle(filteredArticles[0])}
                    className="jkr-pill-btn-dark !py-2 !px-6 !text-xs cursor-pointer"
                  >
                    {lang === 'am' ? 'ሙሉውን አንብብ' : 'Read more'}
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {filteredArticles.slice(1).map((article) => (
            <article key={article.id} className="jkr-news-card">
              <div
                onClick={() => setSelectedArticle(article)}
                className="jkr-news-card__image cursor-pointer rounded-sm"
              >
                <img
                  src={article.image}
                  alt={article.titleEn}
                  loading="lazy"
                />
              </div>

              <p className="jkr-news-card__date">{article.date}</p>

              <h3 className="jkr-news-card__title">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-left cursor-pointer"
                >
                  {lang === 'am' ? article.titleAm : article.titleEn}
                </button>
              </h3>
            </article>
          ))}
        </div>

        {/* Broadcasts & Media Archives Section */}
        <div className="pt-12 border-t border-gray-200">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-2 text-center">
            {lang === 'am' ? 'የሚዲያ ቃለ-መጠይቆችና የቪዲዮ ማህደር' : 'Media Interviews & Broadcasts'}
          </h2>
          <p className="text-sm text-[#666666] text-center mb-10 max-w-xl mx-auto">
            {lang === 'am'
              ? 'በኢቢኤስ፣ አርትስ ቲቪና ሌሎችም መድረኮች የተላለፉ ታዋቂ ቃለ-መጠይቆች'
              : 'Television dialogues on EBS TV, Arts TV, and literary roundtables.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicInterviewsAndArchive.map((item) => (
              <div
                key={item.id}
                className="bg-[#f9f9f9] border border-gray-200 p-6 rounded-sm flex flex-col justify-between hover:border-gray-400 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider block mb-2">
                    {item.platform}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#111111] mb-2 leading-snug">
                    {lang === 'am' ? item.titleAm : item.titleEn}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed line-clamp-3">
                    {lang === 'am' ? item.summaryAm : item.summaryEn}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-200">
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#111111] hover:text-[#c59b27] flex items-center justify-between"
                  >
                    <span>{lang === 'am' ? 'በዩቲዩብ ይመልከቱ' : 'Watch Broadcast'}</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Detail Reader Modal (Clean light modal) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-10 rounded-sm text-[#222222] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-sm"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-xs font-bold text-[#888888] tracking-widest uppercase mb-2">
              {selectedArticle.date} • {selectedArticle.category}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-6 leading-tight">
              {lang === 'am' ? selectedArticle.titleAm : selectedArticle.titleEn}
            </h2>

            <div className="aspect-[16/9] w-full rounded-sm overflow-hidden mb-6 bg-gray-100">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.titleEn}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#333333] font-serif">
              {(lang === 'am' ? selectedArticle.fullTextAm : selectedArticle.fullTextEn).map(
                (para, i) => (
                  <p key={i}>{para}</p>
                )
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-400">YISMAKE WORKU OFFICIAL</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="jkr-pill-btn-dark !py-2 !px-5 !text-xs cursor-pointer"
              >
                {lang === 'am' ? 'ዝጋ' : 'Close Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
