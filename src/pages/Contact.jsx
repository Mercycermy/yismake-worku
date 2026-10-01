import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

export default function Contact() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Reader Feedback',
    subject: '',
    message: ''
  });

  const categories = [
    { id: 'Reader Feedback', en: 'Reader Reflections & Correspondence', am: 'የአንባቢ አስተያየቶችና ደብዳቤዎች' },
    { id: 'Book Orders', en: 'Book Orders & Authorized Distribution', am: 'የመጻሕፍት ትዕዛዝ እና ህጋዊ ስርጭት' },
    { id: 'Media & Press', en: 'Media, Press & Television Inquiries', am: 'የሚዲያ፣ የጋዜጣና የቃለ-መጠይቅ ጥያቄዎች' },
    { id: 'Academic & Rights', en: 'Translation & Academic Licensing', am: 'የትርጉም እና የአካዳሚክ መብቶች' }
  ];

  const faqs = [
    {
      qEn: 'How can I acquire authentic, authorized editions of Yismake Worku’s books?',
      qAm: 'የይስማዕከ ወርቁን ኦሪጂናልና ህጋዊ መጻሕፍት እንዴት መግዛት እችላለሁ?',
      aEn: 'Authentic editions can be ordered directly through our official delivery desk using the order form on this page or through authorized bookshops in Addis Ababa (Mega Book Store, Jaffar Books, Addis Books). Every verified copy contains a registered holographic authenticity stamp.',
      aAm: 'ኦሪጂናል መጻሕፍትን በዚህ ገጽ ላይ ባለው ቅጽ በኩል በቀጥታ ማዘዝ ወይም በአዲስ አበባ በሚገኙ ታዋቂ የመጻሕፍት መደብሮች (ሜጋ፣ ጃፋር፣ አዲስ ቡክስ) ማግኘት ይችላሉ። እያንዳንዱ ህጋዊ ቅጂ የሆሎግራም ማረጋገጫ ማህተም አለው።'
    },
    {
      qEn: 'How can universities and researchers cite the Dertogada storyworld in academic papers?',
      qAm: 'ዩኒቨርሲቲዎችና ተመራማሪዎች የዴርቶጋዳን ልቦለድ በምርምር ስራዎቻቸው እንዴት መጥቀስ ይችላሉ?',
      aEn: 'Yismake Worku’s works are catalogued in the National Archives and Library of Ethiopia and registered under academic ISBN identifiers. Scholarly references may cite the official Addis Ababa first editions or the peer-reviewed Taylor & Francis study by Marzagora & Boylston.',
      aAm: 'የይስማዕከ ወርቁ ስራዎች በኢትዮጵያ ብሔራዊ ቤተ-መጻሕፍትና ቤተ-መዛግብት ኤጀንሲ የተመዘገቡ ህጋዊ ISBN አላቸው። ተመራማሪዎች የመጀመሪያውን የአዲስ አበባ እትም ወይም በታይለር ኤንድ ፍራንሲስ የታተመውን ዓለም አቀፍ ጥናት መጥቀስ ይችላሉ።'
    },
    {
      qEn: 'How do international publishers acquire translation and adaptation rights?',
      qAm: 'ዓለም አቀፍ አሳታሚዎች የመጻሕፍቱን የትርጉምና የፊልም መብት እንዴት ማግኘት ይችላሉ?',
      aEn: 'Foreign translation rights (such as Dr. Bethlehem Attfield’s UK translation of The Lost Spell / Kebur Dengay) and audiovisual adaptations are managed through the author’s official editorial bureau. Select "Translation & Academic Licensing" in the inquiry form below.',
      aAm: "የውጭ አገር የትርጉም መብቶች (በእንግሊዝ አገር እንደታተመው 'The Lost Spell' የመሳሰሉት) እና የፊልም ስራዎች በደራሲው ይፋዊ የህግና የአስተዳደር ክፍል በኩል የሚስተናገዱ ሲሆን፣ ከታች ባለው ቅጽ \"የትርጉም እና የአካዳሚክ መብቶች\" የሚለውን መምረጥ ይችላሉ።"
    },
    {
      qEn: 'Are digital PDF editions shared on social media authorized?',
      qAm: 'በማህበራዊ ሚዲያ የሚሰራጩ የፒዲኤፍ (PDF) ቅጂዎች ህጋዊ ናቸው?',
      aEn: 'No. Unauthorized digital scans and Telegram PDFs are copyright violations that directly harm the author and the creative ecosystem. We urge all dedicated readers to support genuine Ethiopian literature through authorized print and licensed digital copies.',
      aAm: 'በፍጹም ህጋዊ አይደሉም። በማህበራዊ ሚዲያ የሚዘዋወሩ የፒዲኤፍ ቅጂዎች የደራሲውን የፈጠራ መብት የሚጥሱ ናቸው። አንባቢዎች ኦሪጂናልና ህጋዊ የሆኑትን የመጽሐፍ ቅጂዎች ብቻ በመግዛት ደራሲውን እንዲደግፉ እናሳስባለን።'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const geezNumerals = ['፩', '፪', '፫', '፬'];

  return (
    <div className="jkr-contact-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      <PageBanner title={lang === 'am' ? 'አድራሻና ይፋዊ ግንኙነት' : 'Contact & Official Inquiries'} />

      <div className="site-container jkr-contact-content max-w-5xl mx-auto py-12 sm:py-20">
        {/* Editorial Subtitle & Bureau Header */}
        <div className="jkr-contact-intro text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1714]/5 border border-[#c9a84c]/40 text-[#b8860b] text-[11px] font-bold tracking-widest uppercase mb-4">
            <Icon name="spark" size={14} />
            <span>{lang === 'am' ? 'ይፋዊ የስነ-ጽሑፍ ቢሮ' : 'Official Institutional Desk'}</span>
            <Icon name="spark" size={14} />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: '#2a251e',
              lineHeight: 1.7,
              fontWeight: 600,
            }}
          >
            {lang === 'am'
              ? 'ለአንባቢዎች፣ ለመጻሕፍት አከፋፋዮች፣ ለሚዲያና ለዓለም አቀፍ የትርጉም ስራዎች ይፋዊ የመገናኛ ቢሮ።'
              : 'Official liaison bureau for verified book distribution, media press requests, academic research, and international translation licensing.'}
          </p>
          <div className="w-16 h-0.5 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            1. FOUR INSTITUTIONAL COORDINATES CARDS
            ══════════════════════════════════════════════════════════════ */}
        <div className="jkr-contact-coord grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {/* Card 1: Telegram */}
          <div
            className="jkr-contact-coordinate-card p-6 bg-white border border-[#e8e2d5] rounded-2xl shadow-sm hover:shadow-xl hover:border-[#229ED9] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            style={{ borderTop: '4px solid #229ED9' }}
          >
            <div className="absolute top-2 right-3 font-serif text-3xl font-extrabold text-black/5 pointer-events-none select-none">
              ፩
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#229ED9] uppercase tracking-wider mb-3">
                <span className="w-5 h-5 rounded-full bg-[#229ED9]/15 flex items-center justify-center text-[11px]">
                  <Icon name="message" size={13} />
                </span>
                <span>{lang === 'am' ? 'ይፋዊ ቴሌግራም' : 'Official Salon'}</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1a1714] mb-1 group-hover:text-[#229ED9] transition-colors">
                @yismakeworku
              </h4>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0fa85f] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0fa85f] animate-pulse" />
                <span>18,600+ {lang === 'am' ? 'አባላት' : 'Readers Worldwide'}</span>
              </div>
              <p className="text-xs text-[#6e685f] leading-relaxed">
                {lang === 'am'
                  ? 'ያልታተሙ አዳዲስ ግጥሞች፣ ደራሲያዊ ምክሮችና የቀጥታ የውይይት መድረክ።'
                  : 'Exclusive manuscript snippets, cultural reflections, and direct author discussions.'}
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[#f5f3ef]">
              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#229ED9] hover:underline flex items-center justify-between"
              >
                <span>{lang === 'am' ? 'ቻናሉን ተቀላቀሉ' : 'Join Salon Channel'}</span>
                <Icon name="external" size={13} />
              </a>
            </div>
          </div>

          {/* Card 2: Academic */}
          <div
            className="jkr-contact-coordinate-card p-6 bg-white border border-[#e8e2d5] rounded-2xl shadow-sm hover:shadow-xl hover:border-[#c9a84c] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            style={{ borderTop: '4px solid #c9a84c' }}
          >
            <div className="absolute top-2 right-3 font-serif text-3xl font-extrabold text-black/5 pointer-events-none select-none">
              ፪
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#c9a84c] uppercase tracking-wider mb-3">
                <span className="w-5 h-5 rounded-full bg-[#c9a84c]/15 flex items-center justify-center text-[11px]">
                  <Icon name="building" size={13} />
                </span>
                <span>{lang === 'am' ? 'ዩኒቨርሲቲ' : 'Lectureship'}</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1a1714] mb-1 group-hover:text-[#c9a84c] transition-colors">
                Debre Markos University
              </h4>
              <div className="text-[10px] font-semibold text-[#8a857d] mb-3 uppercase tracking-wider">
                {lang === 'am' ? 'የስነ-ጽሑፍ ትምህርት ክፍል' : 'Department of Literature'}
              </div>
              <p className="text-xs text-[#6e685f] leading-relaxed">
                {lang === 'am'
                  ? 'የአካዳሚክ ጥናቶች፣ የመመረቂያ ጽሑፎች ማህደርና የደራሲው የዩኒቨርሲቲ ማስተማሪያ ማዕከል።'
                  : 'Scholarly monograph citations, graduate theses, and contemporary Amharic literary research.'}
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[#f5f3ef]">
              <span className="text-[11px] font-bold text-[#8a857d]">
                Faculty Affiliation • East Gojjam
              </span>
            </div>
          </div>

          {/* Card 3: International Publisher */}
          <div
            className="jkr-contact-coordinate-card p-6 bg-white border border-[#e8e2d5] rounded-2xl shadow-sm hover:shadow-xl hover:border-[#b8860b] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            style={{ borderTop: '4px solid #b8860b' }}
          >
            <div className="absolute top-2 right-3 font-serif text-3xl font-extrabold text-black/5 pointer-events-none select-none">
              ፫
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#b8860b] uppercase tracking-wider mb-3">
                <span className="w-5 h-5 rounded-full bg-[#b8860b]/15 flex items-center justify-center text-[11px]">
                  <Icon name="globe" size={13} />
                </span>
                <span>{lang === 'am' ? 'ለንደን (UK)' : 'UK Publisher'}</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1a1714] mb-1 group-hover:text-[#b8860b] transition-colors">
                Henningham Family Press
              </h4>
              <div className="text-[10px] font-semibold text-[#b8860b] mb-3 uppercase tracking-wider">
                {lang === 'am' ? 'ለንደን፣ ታላቋ ብሪታንያ' : 'London, United Kingdom'}
              </div>
              <p className="text-xs text-[#6e685f] leading-relaxed">
                {lang === 'am'
                  ? 'በእንግሊዝ ለTA First Translation Prize የታጨው «ክቡር ድንጋይ» (The Lost Spell) አሳታሚ።'
                  : 'Publisher of the TA First Translation Prize Nominee. Audiovisual & European licensing.'}
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[#f5f3ef]">
              <a
                href="https://henninghamfamilypress.com/the-lost-spell/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#b8860b] hover:underline flex items-center justify-between"
              >
                <span>{lang === 'am' ? 'የአሳታሚውን ገጽ ክፈት' : 'Publisher Portal'}</span>
                <Icon name="external" size={13} />
              </a>
            </div>
          </div>

          {/* Card 4: Book Distribution */}
          <div
            className="jkr-contact-coordinate-card p-6 bg-white border border-[#e8e2d5] rounded-2xl shadow-sm hover:shadow-xl hover:border-[#1a1714] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            style={{ borderTop: '4px solid #1a1714' }}
          >
            <div className="absolute top-2 right-3 font-serif text-3xl font-extrabold text-black/5 pointer-events-none select-none">
              ፬
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#1a1714] uppercase tracking-wider mb-3">
                <span className="w-5 h-5 rounded-full bg-[#1a1714]/15 flex items-center justify-center text-[11px]">
                  <Icon name="book" size={13} />
                </span>
                <span>{lang === 'am' ? 'ስርጭት' : 'Distribution'}</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1a1714] mb-1">
                Addis Ababa Book Hubs
              </h4>
              <div className="text-[10px] font-semibold text-[#8a857d] mb-3 uppercase tracking-wider">
                Mega, Jaffar & Addis Books
              </div>
              <p className="text-xs text-[#6e685f] leading-relaxed">
                {lang === 'am'
                  ? 'ኦሪጂናል የሆሎግራም ማህተም ያላቸው ህጋዊ ቅጂዎች በአገር አቀፍ ደረጃ በፈጣን ስርጭት።'
                  : 'Authorized print supply with registered security seals. Nationwide bookstore distribution.'}
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[#f5f3ef]">
              <span className="text-[11px] font-bold text-[#1a1714]">
                Verified Stockists & Delivery
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            2. OFFICIAL CORRESPONDENCE FORM & SECURITY PANEL
            ══════════════════════════════════════════════════════════════ */}
        <div className="jkr-contact-inquiry grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          {/* Left Column: Security Note & Instructions */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="p-7 bg-white border border-[#e8e2d5] rounded-2xl shadow-md relative overflow-hidden"
              style={{ borderLeft: '4px solid #c9a84c' }}
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#c9a84c] uppercase tracking-wider mb-3">
                <Icon name="shield" size={17} />
                <span>{lang === 'am' ? 'የህትመትና የደህንነት ማረጋገጫ' : 'Authenticity Protocol'}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1a1714] mb-2">
                {lang === 'am' ? 'የይስማዕከ ወርቁ ይፋዊ ማህደር' : 'Direct Author Liaison'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5a554c] leading-relaxed mb-5">
                {lang === 'am'
                  ? 'የደራሲውን የፈጠራ ስራዎችና የአንባቢውን ማህበረሰብ ለመጠበቅ፣ ሁሉም ይፋዊ ግንኙነቶች በዚህ መድረክ እና በይፋዊው የቴሌግራም ቻናል ብቻ ይከናወናሉ።'
                  : 'To safeguard the author’s copyright and preserve genuine communication with readers, all official requests are routed directly through this bureau.'}
              </p>
              <div className="p-4 bg-[#fbf9f4] border border-[#e8e2d5] rounded-xl text-xs text-[#6a6459] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#c9a84c] font-bold">✓</span>
                  <span>{lang === 'am' ? 'የተረጋገጡ የመጽሐፍ ትዕዛዞች በሆሎግራም' : 'Verified print copy orders with hologram stamps'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#c9a84c] font-bold">✓</span>
                  <span>{lang === 'am' ? 'የሚዲያና የቴሌቪዥን ቃለ-መጠይቆች' : 'Television & press broadcast interviews'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#c9a84c] font-bold">✓</span>
                  <span>{lang === 'am' ? 'የዩኒቨርሲቲ ጥናቶችና የጥቅስ ፈቃዶች' : 'Academic monograph citations & permissions'}</span>
                </div>
              </div>
            </div>

            {/* Direct Author Telegram Callout */}
            <div
              className="p-7 rounded-2xl border text-white shadow-xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #181512 0%, #29211a 100%)',
                borderColor: 'rgba(201,168,76,0.35)',
              }}
            >
              <div className="text-xs font-extrabold text-[#c9a84c] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#229ED9] animate-ping" />
                <span>TELEGRAM DISPATCH DESK</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">
                {lang === 'am' ? 'ፈጣን መልእክት ለደራሲው' : 'Direct Reader Telegram Access'}
              </h4>
              <p className="text-xs text-[#d0c8be] leading-relaxed mb-6 font-serif">
                {lang === 'am'
                  ? 'ፈጣን የመጽሐፍ ትዕዛዝ ወይም አስቸኳይ መልእክት ካለዎት በቴሌግራም በቀጥታ ያነጋግሩን።'
                  : 'For rapid delivery coordination across Addis Ababa or urgent scholarly queries, message our official Telegram desk.'}
              </p>
              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 py-2.5 px-6 bg-[#229ED9] hover:bg-[#1b8bc2] text-white text-xs font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Open Telegram (@yismakeworku)</span>
                <Icon name="external" size={13} />
              </a>
            </div>
          </div>

          {/* Right Column: Correspondence Form */}
          <div className="jkr-contact-form-panel lg:col-span-7 bg-white border border-[#e8e2d5] rounded-2xl p-6 sm:p-10 shadow-xl">
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '0.5rem',
              }}
            >
              {lang === 'am' ? 'የመልእክት መላኪያ ቅጽ' : 'Send an Official Inquiry'}
            </h3>
            <p className="text-xs sm:text-sm text-[#7a746a] mb-8">
              {lang === 'am'
                ? 'የሚፈልጉትን የመልእክት አይነት ይምረጡና ዝርዝር መረጃዎን ያስገቡ።'
                : 'Select the nature of your inquiry below. Our team coordinates directly with the author and publishers.'}
            </p>

            {submitted ? (
              <div className="text-center py-14 px-6 bg-[#fbf9f4] border border-[#c9a84c] rounded-2xl animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#c9a84c]/20 border border-[#c9a84c] text-[#c9a84c] flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                  <Icon name="check" size={28} strokeWidth={2.4} />
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#1a1714',
                    marginBottom: '0.5rem',
                  }}
                >
                  {lang === 'am' ? 'መልእክትዎ በተሳካ ሁኔታ ደርሷል!' : 'Inquiry Dispatched Successfully'}
                </h4>
                <p className="text-xs sm:text-sm text-[#5a554c] max-w-md mx-auto mb-6 leading-relaxed">
                  {lang === 'am'
                    ? 'ስለ መልእክትዎ እናመሰግናለን። የደራሲው ማህደር ቡድን ጥያቄዎን ተመልክቶ በተቻለ ፍጥነት ምላሽ ይሰጣል።'
                    : 'Thank you for reaching out. Your message has been logged in the official archive queue, and our liaison desk will respond shortly.'}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      category: 'Reader Feedback',
                      subject: '',
                      message: ''
                    });
                  }}
                  className="jkr-pill-btn-dark !py-2.5 !px-7 !text-xs cursor-pointer shadow-md"
                >
                  {lang === 'am' ? 'ሌላ መልእክት ላክ' : 'Send Another Note'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-extrabold text-[#1a1714] mb-2 uppercase tracking-wider">
                    {lang === 'am' ? 'የመልእክት ዘርፍ' : 'Inquiry Category'} *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {categories.map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          formData.category === cat.id
                            ? 'bg-[#1a1714] text-[#e2c56a] border-[#1a1714] shadow-md'
                            : 'bg-[#faf8f4] text-[#5a554c] border-[#e8e2d5] hover:border-gray-400'
                        }`}
                      >
                        {lang === 'am' ? cat.am : cat.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1a1714] mb-1.5 uppercase tracking-wider">
                      {lang === 'am' ? 'ሙሉ ስም' : 'Your Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'am' ? 'ለምሳሌ፡ አበበ በቀለ' : 'e.g., Abebe Bekele'}
                      className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#1a1714] mb-1.5 uppercase tracking-wider">
                      {lang === 'am' ? 'ኢሜይል' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1a1714] mb-1.5 uppercase tracking-wider">
                      {lang === 'am' ? 'ስልክ ቁጥር (አስፈላጊ ከሆነ)' : 'Phone Number (Optional)'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+251 9..."
                      className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#1a1714] mb-1.5 uppercase tracking-wider">
                      {lang === 'am' ? 'ርዕስ' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={lang === 'am' ? 'የመልእክቱ ርዕስ...' : 'Inquiry subject...'}
                      className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-extrabold text-[#1a1714] mb-1.5 uppercase tracking-wider">
                    {lang === 'am' ? 'ዝርዝር መልእክት' : 'Your Message'} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      lang === 'am'
                        ? 'የመጽሐፍ ትዕዛዝ፣ የአንባቢ አስተያየት ወይም የትርጉም ጥያቄዎን እዚህ ይጻፉ...'
                        : 'Please detail your inquiry, book order volume, interview request, or literary licensing proposal...'
                    }
                    className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full jkr-pill-btn-dark !py-3.5 !text-xs cursor-pointer font-bold tracking-widest uppercase shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'am' ? 'መልእክት ላክ' : 'Send Official Inquiry'}</span>
                    <span className="text-[#c9a84c]">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            3. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION
            ══════════════════════════════════════════════════════════════ */}
        <div className="jkr-contact-faq pt-16 border-t border-[#e8e2d5]">
          <div className="text-center mb-14 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1714]/5 border border-[#c9a84c]/40 text-[#b8860b] text-[11px] font-bold tracking-widest uppercase mb-3">
              <Icon name="spark" size={14} />
              <span>{lang === 'am' ? 'መመሪያዎችና ጥያቄዎች' : 'Guidelines & Protocols'}</span>
              <Icon name="spark" size={14} />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '0.65rem',
              }}
            >
              {lang === 'am' ? 'ተደጋግመው የሚጠየቁ ጥያቄዎች' : 'Reader & Distribution Guidelines'}
            </h3>
            <p className="text-xs sm:text-sm text-[#706a61]">
              {lang === 'am'
                ? 'ስለ መጽሐፍ ትዕዛዞች፣ የህትመት ትክክለኛነትና የደራሲው ማህደር የተሰጡ ማብራሪያዎች'
                : 'Essential information regarding verified copies, academic citations, and author rights.'}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, fIdx) => {
              const isOpen = activeFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  style={{
                    borderColor: isOpen ? '#c9a84c' : '#e8e2d5',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#faf8f4] transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-[#1a1714]/5 text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-serif text-sm font-bold">
                        {geezNumerals[fIdx] || fIdx + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.0625rem',
                          fontWeight: 700,
                          color: '#1a1714',
                        }}
                      >
                        {lang === 'am' ? faq.qAm : faq.qEn}
                      </span>
                    </div>

                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#faf8f4] border border-[#e8e2d5] text-[#c9a84c] text-sm font-bold flex items-center justify-center transition-transform">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-6 pt-0 text-xs sm:text-sm text-[#4a453d] leading-relaxed border-t border-[#f5f3ef] bg-[#fdfcfa] font-serif">
                      <div className="pt-4 pl-4 border-l-2 border-[#c9a84c]">
                        {lang === 'am' ? faq.aAm : faq.aEn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
