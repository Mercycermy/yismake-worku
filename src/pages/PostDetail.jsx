import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import Icon from '../components/Icon';

export default function PostDetail() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const staticArticles = [
    {
      id: 'lost-spell-award',
      date: '24 SEPTEMBER 2026',
      readTime: '4 min read',
      category: 'NEWS',
      categoryAm: 'ዜና',
      titleEn: "The Lost Spell Shortlisted for the TA First Translation Prize in the United Kingdom",
      titleAm: "«ክቡር ድንጋይ» (The Lost Spell) በእንግሊዝ ለታላቁ የ2022 TA First Translation Prize እጩ ሆነ",
      image: '/images/the-lost-spell-award.jpg',
      imageCaptionEn: 'Official shortlist announcement by the Society of Authors in London celebrating Bethlehem Attfield’s translation.',
      imageCaptionAm: 'በለንደን የደራሲያን ማህበር ይፋ የተደረገው የትርጉም ሽልማት እጩነት ማስታወቂያ።',
      summaryEn:
        "Henningham Family Press and the Society of Authors in the UK announced the prestigious shortlist for the TA First Translation Prize, celebrating Dr. Bethlehem Attfield's English translation of Yismake Worku's satirical masterpiece 'The Lost Spell' (Kebur Dengay).",
      summaryAm:
        "በዶ/ር ቤተልሔም አትፊልድ ወደ እንግሊዝኛ ተተርጉሞ በለንደን ሄኒንግሃም ፋሚሊ ፕሬስ የታተመው የይስማዕከ ወርቁ «ክቡር ድንጋይ» (The Lost Spell) በታላቋ ብሪታንያ የስነ-ጽሑፍ ማህበር ለ2022 TA First Translation Prize ሽልማት እጩ መሆኑ ይፋ ተደረገ።",
      pullQuoteEn: "Worku’s storytelling offers an unsparing, inventive mirror of human hypocrisy, balancing the gravitas of Ethiopian folklore with modern existential philosophy.",
      pullQuoteAm: "የይስማዕከ ወርቁ ስራ የሰው ልጅን እብሪትና የፖለቲካ ግብዝነት ከመሬት ተነስቶ በውሻ እይታ የመረመረበት አስደናቂ ማህበራዊ ምጸት ነው።",
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
      id: 'academic-study',
      date: '18 JULY 2026',
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
    }
  ];

  useEffect(() => {
    const found = staticArticles.find((a) => a.id === id);
    if (found) {
      setPost(found);
      setLoading(false);
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
            fullTextEn: [item.body || item.excerpt],
            fullTextAm: [item.body || item.excerpt]
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 font-serif text-gray-500">
        Loading article details...
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center pt-28 pb-20">
        <div className="text-center p-8 bg-white border border-[#e8e2d5] rounded-2xl max-w-md mx-auto shadow-md">
          <h2 className="font-serif text-2xl font-bold mb-3 text-[#1a1714]">
            {lang === 'am' ? 'ጽሑፉ አልተገኘም' : 'Article Not Found'}
          </h2>
          <Link to="/news" className="jkr-pill-btn-dark !text-xs mt-4 inline-block">
            ← {lang === 'am' ? 'ወደ ዜናዎች ተመለስ' : 'Back to News'}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="pt-12 sm:pt-20 pb-20 min-h-screen bg-white text-[#1a1714]">
      <div className="site-container max-w-3xl mx-auto px-4">
        {/* Navigation bar */}
        <div className="flex items-center justify-between text-xs text-[#8a857d] mb-8 pb-4 border-b border-[#e8e2d5]">
          <Link to="/news" className="hover:text-[#1a1714] font-semibold flex items-center gap-1">
            ← {lang === 'am' ? 'ወደ ዜናዎች ተመለስ' : 'Back to News & Insights'}
          </Link>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#faf8f4] border border-[#e8e2d5] rounded-full hover:border-[#c9a84c] text-[11px] font-bold text-[#1a1714] cursor-pointer"
          >
            <Icon name={copied ? 'check' : 'link'} size={13} />
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 text-xs font-bold mb-3">
            <span className="px-3 py-1 bg-[#1a1714] text-[#c9a84c] text-[10px] tracking-widest uppercase rounded-full">
              {post.category}
            </span>
            <span className="text-[#8a857d]">{post.date}</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#1a1714',
              marginBottom: '1rem',
            }}
          >
            {lang === 'am' ? post.titleAm : post.titleEn}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.125rem',
              fontStyle: 'italic',
              color: '#5a564e',
              lineHeight: 1.7,
              borderLeft: '4px solid #c9a84c',
              paddingLeft: '1rem',
            }}
          >
            {lang === 'am' ? post.summaryAm : post.summaryEn}
          </p>
        </header>

        {/* Article Image */}
        {post.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-[#e8e2d5]">
            <img
              src={post.image}
              alt={post.titleEn}
              className="w-full max-h-[460px] object-cover"
            />
          </div>
        )}

        {/* Paragraphs */}
        <div
          className="space-y-6 text-[#2d2822] mb-12"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.125rem',
            lineHeight: 1.9,
          }}
        >
          {(lang === 'am' ? post.fullTextAm : post.fullTextEn).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Footer actions */}
        <div className="pt-8 border-t border-[#e8e2d5] flex items-center justify-between">
          <Link to="/news" className="jkr-pill-btn-dark !py-2.5 !px-6 !text-xs">
            ← {lang === 'am' ? 'ወደ ዜናዎች ተመለስ' : 'Back to News'}
          </Link>
          <a
            href="https://t.me/yismakeworku"
            target="_blank"
            rel="noopener noreferrer"
            className="jkr-pill-btn !py-2.5 !px-6 !text-xs border border-gray-300 shadow-sm"
          >
            {lang === 'am' ? 'በቴሌግራም ተወያዩ' : 'Discuss on Telegram ↗'}
          </a>
        </div>
      </div>
    </article>
  );
}
