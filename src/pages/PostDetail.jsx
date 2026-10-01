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

  // Static curated news archive with full paragraphs and metadata
  const staticArticles = [
    {
      id: 'lost-spell-award',
      date: '24 SEPTEMBER 2026',
      readTime: '4 min read',
      category: 'AWARDS',
      categoryAm: 'ሽልማቶችና እውቅና',
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
        "This milestone represents one of the highest international literary acknowledgments for contemporary Amharic speculative literature, introducing Yismake Worku’s narrative universe to readers across the United Kingdom, Europe, and North America.",
        "The Society of Authors highlighted the significance of promoting African translated literature: 'Worku’s storytelling offers an unsparing, inventive mirror of human hypocrisy, balancing the gravitas of Ethiopian folklore with modern existential philosophy.'",
        "Dr. Bethlehem Attfield noted in an interview: 'Translating Yismake Worku was an exhilarating journey into contemporary Amharic prose, packed with layers of Ethiopian cultural humor, street philosophy, and profound existential questions.'"
      ],
      fullTextAm: [
        "የብሪታንያ የደራሲያን ማህበር (Society of Authors) ለ2022 TA First Translation Prize ሽልማት እጩዎችን በይፋ አሳውቋል። በዚህ ዝርዝር ውስጥ በዶ/ር ቤተልሔም አትፊልድ ተተርጉሞ በሄኒንግሃም ፕሬስ የታተመው የይስማዕከ ወርቁ ድንቅ ልቦለድ «ክቡር ድንጋይ» (The Lost Spell) ተካቷል።",
        "የዳኞች ቡድኑ ስለ ልቦለዱ በሰጠው አስተያየት፡ 'የሰው ልጅን እብሪትና የፖለቲካ ግብዝነት ከመሬት ተነስቶ በውሻ እይታ የመረመረበት አስደናቂ ማህበራዊ ምጸት ነው። የትርጉም ስራውም የኢትዮጵያን ጥልቅ ባህልና የአማርኛን ጣዕም ሳይለቅ ለአለም አቀፍ አንባቢ አቅርቦታል' ሲሉ አድንቀዋል።",
        "ይህ ታላቅ እውቅና የዘመናዊው የኢትዮጵያ ስነ-ጽሑፍ በዓለም አቀፍ መድረክ ተወዳዳሪ መሆኑን ያረጋገጠ ድንቅ ድል ነው።",
        "የብሪታንያ የስነ-ጽሑፍ ማህበር እንደገለጸው፤ 'የይስማዕከ ወርቁ ስራ የኢትዮጵያን የበለጸገ የቃላት ቅኔና ማህበራዊ ፍልስፍና ለአለም አንባቢዎች በማስተዋወቅ አዲስ ምዕራፍ ከፍቷል' ሲሉ ገልጸዋል።",
        "ዶ/ር ቤተልሔም አትፊልድ በሰጡት አስተያየት፡ 'የይስማዕከ ወርቁን ስራ መተርጎም የአማርኛ ቋንቋን ጣዕምና የአገራችንን ውስብስብ ማህበራዊ እውነታ ለአለም ለማስተዋወቅ ትልቅ እድል ፈጥሮልኛል' ብለዋል።"
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
      imageCaptionEn: 'Archival library notes and direct reader communications from the official salon.',
      imageCaptionAm: 'ከደራሲው ማህደርና ከአንባቢው ማህበረሰብ የተሰባሰቡ ማስታወሻዎች።',
      summaryEn:
        "The official digital community of Yismake Worku has crossed 18,600 verified readers, serving as an active literary salon for unpublished poems, reflections, and direct author discussions.",
      summaryAm:
        "የይስማዕከ ወርቁ ይፋዊ የቴሌግራም ማህበረሰብ ከ18,600 በላይ ተከታዮችን አሰባስቧል። በቻናሉ አማካኝነት አዳዲስ ግጥሞች፣ የስነ-ጽሑፍ ምክሮችና የቀጥታ የውይይት መድረኮች ይቀርባሉ።",
      pullQuoteEn: "Without your steadfast companionship through every trial and milestone, this literary journey would be incomplete. You are the guardians of our written word.",
      pullQuoteAm: "በእያንዳንዱ የህይወት ፈተናና ደስታ ውስጥ ከጎኔ ለቆማችሁ አንባቢዎቼ ሁሉ ምስጋናዬ ከልብ ነው። የእኔ ትልቁ ሀብት እናንተ ናችሁ።",
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
      imageCaptionEn: 'Theoretical rendering of the subterranean scientific sanctum beneath ancient Lake Tana.',
      imageCaptionAm: 'በጣና ሐይቅ ስር የተሰወረው የዴርቶጋዳ ሳይንሳዊ ማዕከል ምናባዊ ስዕል።',
      summaryEn:
        "A peer-reviewed academic study titled 'Modernisation from the Shadows: Conspiracy, Monasticism and Techno-Utopia in Dertogada' explores the synthesis of Ethiopian ecclesiastical history and speculative fiction.",
      summaryAm:
        "በታዋቂው የታይለር ኤንድ ፍራንሲስ ዓለም አቀፍ የጥናት ጆርናል ላይ የዴርቶጋዳን ገዳማዊ እውቀትና የሳይንስ ልቦለድ ይዘት የመረመረ አጠቃላይ ጥናት ታትሞ ወጣ።",
      pullQuoteEn: "Worku challenged Western-centric science fiction paradigms by demonstrating that ancient Ge'ez scholarship and national sovereignty provide a potent framework for technological imagination.",
      pullQuoteAm: "ይስማዕከ ወርቁ የምዕራባውያንን ሳይንስ ልቦለድ ከመኮረጅ ይልቅ፣ የራሱን አገራዊ ቅርስና የግዕዝ እውቀት ተጠቅሞ የሳይንስ ነጻነትን ማሳየቱ ትልቅ ፋይዳ አለው።",
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
            pullQuoteEn: item.excerpt || '',
            pullQuoteAm: item.excerpt || '',
            fullTextEn: [item.body || item.excerpt],
            fullTextAm: [item.body || item.excerpt]
          });
        }
        setLoading(false);
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
        <div className="text-center font-serif text-gray-500">Loading authorized dispatch...</div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center pt-28 pb-20">
        <div className="text-center p-8 bg-white border border-[#e8e2d5] rounded-xl max-w-md mx-auto shadow-md">
          <h2 className="font-serif text-2xl font-bold mb-3">
            {lang === 'am' ? 'ዜናው አልተገኘም' : 'Dispatch Not Found'}
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            The requested article could not be located in the authorized archive.
          </p>
          <Link to="/news" className="jkr-pill-btn-dark !text-xs">
            ← {lang === 'am' ? 'ወደ ዜናዎች ተመለስ' : 'Back to News Archive'}
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = staticArticles.filter((a) => a.id !== post.id).slice(0, 2);

  return (
    <article
      style={{
        background: 'var(--bg-primary)',
        color: '#1a1714',
        fontFamily: 'var(--font-sans)',
        minHeight: '100vh',
      }}
      className="pt-24 pb-28"
    >
      <div className="site-container max-w-3xl mx-auto px-4">
        {/* Breadcrumb Navigation Bar */}
        <div className="flex items-center justify-between text-xs text-[#8a857d] mb-10 pb-4 border-b border-[#e8e2d5]">
          <div className="flex items-center gap-2 truncate">
            <Link to="/" className="hover:text-black">
              {lang === 'am' ? 'መነሻ' : 'Home'}
            </Link>
            <span>/</span>
            <Link to="/news" className="hover:text-black">
              {lang === 'am' ? 'ዜናዎች' : 'News'}
            </Link>
            <span>/</span>
            <span className="text-[#1a1714] font-semibold truncate max-w-[240px]">
              {lang === 'am' ? post.titleAm : post.titleEn}
            </span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e8e2d5] rounded-full hover:border-[#c9a84c] text-[11px] font-semibold text-[#1a1714] cursor-pointer shadow-2xs transition-colors shrink-0"
          >
            <Icon name={copied ? 'check' : 'link'} size={14} />
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Grand Article Header */}
        <header className="mb-10 text-left">
          <div className="flex items-center gap-3 text-xs font-bold mb-4">
            <span
              style={{
                background: '#1a1714',
                color: '#c9a84c',
                padding: '4px 12px',
                borderRadius: '4px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.6875rem',
              }}
            >
              {lang === 'am' ? post.categoryAm : post.category}
            </span>
            <span className="text-[#8a857d]">{post.date}</span>
            {post.readTime && <span className="text-[#8a857d]">• {post.readTime}</span>}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#1a1714',
              marginBottom: '1.25rem',
            }}
          >
            {lang === 'am' ? post.titleAm : post.titleEn}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1875rem',
              fontStyle: 'italic',
              color: '#5e584f',
              lineHeight: 1.7,
              paddingLeft: '1rem',
              borderLeft: '3px solid #c9a84c',
            }}
          >
            {lang === 'am' ? post.summaryAm : post.summaryEn}
          </p>
        </header>

        {/* Featured Archival Image Showcase */}
        {post.image && (
          <div className="mb-12">
            <div className="rounded-xl overflow-hidden shadow-xl border border-[#c9a84c]/40">
              <img
                src={post.image}
                alt={post.titleEn}
                className="w-full max-h-[500px] object-cover"
              />
            </div>
            {(post.imageCaptionEn || post.imageCaptionAm) && (
              <p className="mt-2.5 text-xs text-[#8a857d] italic font-serif">
                {lang === 'am' ? post.imageCaptionAm : post.imageCaptionEn}
              </p>
            )}
          </div>
        )}

        {/* Pull Quote Box */}
        {(post.pullQuoteEn || post.pullQuoteAm) && (
          <div
            className="my-10 p-6 sm:p-8 rounded-xl border relative shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #fbf9f4 0%, #f4efe6 100%)',
              borderColor: 'rgba(201,168,76,0.5)',
              borderLeft: '5px solid #c9a84c',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3rem',
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
                fontSize: '1.125rem',
                fontStyle: 'italic',
                color: '#2a251e',
                lineHeight: 1.75,
              }}
            >
              {lang === 'am' ? post.pullQuoteAm : post.pullQuoteEn}
            </p>
          </div>
        )}

        {/* Editorial Body Text */}
        <div
          className="space-y-6 text-[#2d2822] mb-14"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.125rem',
            lineHeight: 1.95,
          }}
        >
          {(lang === 'am' ? post.fullTextAm : post.fullTextEn).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Official Author Attribution & Seal */}
        <div
          style={{
            padding: '1.75rem',
            background: 'var(--bg-secondary)',
            borderLeft: '4px solid #c9a84c',
            borderRadius: '0 12px 12px 0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            marginBottom: '3.5rem',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#c9a84c]">
              <span>❖</span>
              <span>{lang === 'am' ? 'ይፋዊ የደራሲው ማህደር መረጃ' : 'AUTHORIZED LITERARY DOSSIER'}</span>
            </div>
            <span className="text-[10px] font-mono text-[#8a857d]">REF: YW-{post.id}</span>
          </div>
          <p className="text-xs text-[#5e584f] leading-relaxed">
            {lang === 'am'
              ? 'ይህ ጽሑፍ ከደራሲ ይስማዕከ ወርቁ ይፋዊ የፕሬስና የህትመት ማህደር የተወሰደ ነው። መረጃውን ለሚዲያና ለምርምር ስራዎች ለመጥቀስ ህጋዊ ፈቃድ አያስፈልግዎትም።'
              : 'Official dispatch issued by the literary registry of Yismake Worku. For citation in academic monographs, theses, or press broadcasting, credit the official author archive.'}
          </p>
        </div>

        {/* Navigation & Discussion Actions */}
        <div className="pt-8 border-t border-[#e8e2d5] flex items-center justify-between flex-wrap gap-4 mb-16">
          <Link
            to="/news"
            className="jkr-pill-btn-dark !py-2.5 !px-6 !text-xs inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>{lang === 'am' ? 'ወደ ሁሉም ዜናዎች ተመለስ' : 'Back to News Archive'}</span>
          </Link>

          <a
            href="https://t.me/yismakeworku"
            target="_blank"
            rel="noopener noreferrer"
            className="jkr-pill-btn !py-2.5 !px-6 !text-xs border border-gray-300 inline-flex items-center gap-2 shadow-sm"
          >
            <span>{lang === 'am' ? 'በቴሌግራም ተወያዩ (18.6K+)' : 'Join Discussion on Telegram'}</span>
            <span>↗</span>
          </a>
        </div>

        {/* Related Archival Dispatches */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 border-t border-[#e8e2d5]">
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '1.5rem',
              }}
            >
              {lang === 'am' ? 'ተዛማጅ ይፋዊ ዜናዎች' : 'Related Dispatches'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/news/${rel.id}`}
                  className="p-5 bg-white border border-[#e8e2d5] rounded-xl hover:border-[#c9a84c] shadow-sm hover:shadow-md transition-all group block"
                >
                  <span className="text-[10px] font-bold text-[#c9a84c] uppercase tracking-wider block mb-1">
                    {rel.date}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: '#1a1714',
                      lineHeight: 1.35,
                      marginBottom: '0.5rem',
                    }}
                    className="group-hover:text-[#c9a84c] transition-colors"
                  >
                    {lang === 'am' ? rel.titleAm : rel.titleEn}
                  </h4>
                  <p className="text-xs text-[#6e685f] line-clamp-2">
                    {lang === 'am' ? rel.summaryAm : rel.summaryEn}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
