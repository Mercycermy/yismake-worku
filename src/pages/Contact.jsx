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
    subject: '',
    message: ''
  });

  const faqs = [
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
      aEn: 'No. Unauthorized scans and Telegram PDFs violate copyright. For an authorized excerpt, use the sample reader linked from each book page.',
      aAm: 'አይ። ያልተፈቀዱ ቅጂዎችና የቴሌግራም ፒዲኤፎች የቅጂ መብትን ይጥሳሉ። የተፈቀደ ቅምሻ ለማንበብ በእያንዳንዱ የመጽሐፍ ገጽ ያለውን የንባብ ማገናኛ ይጠቀሙ።'
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
              ? 'ለሚዲያ፣ ለአካዳሚያዊ ምርምርና ለዓለም አቀፍ የትርጉም ስራዎች ይፋዊ መገናኛ።'
              : 'Official contact for media, academic research, and international translation inquiries.'}
          </p>
          <div className="w-16 h-0.5 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN CONTACT & DISPATCH SECTION
            ══════════════════════════════════════════════════════════════ */}
        <div className="jkr-contact-inquiry grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          {/* Telegram channel */}
          <div className="lg:col-span-5">
            <div className="jkr-contact-telegram-card">
              <div className="jkr-contact-telegram-card__profile">
                <span className="jkr-contact-telegram-card__icon"><Icon name="send" size={19} /></span>
                <div className="jkr-contact-telegram-card__identity">
                  <span className="jkr-contact-telegram-card__label">Telegram</span>
                  <h3>{lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Yismake Worku'}</h3>
                  <p>@yismakeworku</p>
                </div>
              </div>
              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="jkr-contact-telegram-card__link"
              >
                <span>{lang === 'am' ? 'ቻናሉን ይክፈቱ' : 'Open channel'}</span>
                <Icon name="arrowRight" size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Universal Correspondence Form */}
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
              {lang === 'am' ? 'የመልእክት መላኪያ ቅጽ' : 'Send a Direct Message'}
            </h3>
            <p className="text-xs sm:text-sm text-[#7a746a] mb-8">
              {lang === 'am'
                ? 'ለጥያቄዎች፣ የሚዲያ ግንኙነት ወይም አጠቃላይ መልእክት ከታች ይጻፉ።'
                : 'For media inquiries, research, or general correspondence, send a message below.'}
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
                    : 'Thank you for reaching out. Your message has been logged, and we will respond shortly.'}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
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
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      lang === 'am'
                        ? 'የመጽሐፍ ጥያቄ፣ የአንባቢ አስተያየት ወይም ሌላ መልእክትዎን እዚህ ይጻፉ...'
                        : 'Please write your reflections, inquiries, or message here...'
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
                    <span>{lang === 'am' ? 'መልእክት ላክ' : 'Send Message'}</span>
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
              {lang === 'am' ? 'ተደጋግመው የሚጠየቁ ጥያቄዎች' : 'Reader Questions'}
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
