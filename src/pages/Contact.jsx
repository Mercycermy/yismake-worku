import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import Icon from '../components/Icon';

export default function Contact() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="jkr-contact-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      {/* Minimal Header (PageBanner with background image removed) */}
      <div className="pt-12 pb-6 px-4 text-center border-b border-[#e8e2d5] bg-white">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1714]/5 border border-[#c9a84c]/40 text-[#b8860b] text-[11px] font-bold tracking-widest uppercase mb-3">
          <Icon name="spark" size={14} />
          <span>{lang === 'am' ? 'ይፋዊ የስነ-ጽሑፍ ቢሮ' : 'Official Institutional Desk'}</span>
          <Icon name="spark" size={14} />
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 2.85rem)',
            fontWeight: 800,
            color: '#1a1714',
            marginBottom: '0.5rem',
          }}
        >
          {lang === 'am' ? 'አድራሻና ይፋዊ ግንኙነት' : 'Contact & Official Inquiries'}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.125rem',
            color: '#5a564e',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          {lang === 'am'
            ? 'ለሚዲያ፣ ለአካዳሚያዊ ምርምርና ለዓለም አቀፍ የትርጉም ስራዎች ይፋዊ መገናኛ።'
            : 'Official contact for media, academic research, and international translation inquiries.'}
        </p>
      </div>

      <div className="site-container max-w-5xl mx-auto py-10 sm:py-16 px-4">
        {/* Contact Inquiry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Telegram Channel Card */}
          <div className="lg:col-span-5">
            <div className="jkr-contact-telegram-card bg-white border border-[#e8e2d5] rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-[#229ed9] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Icon name="send" size={22} />
                </span>
                <div>
                  <span className="text-[10px] font-bold text-[#c9a84c] uppercase tracking-widest block">
                    TELEGRAM SALON
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1a1714]">
                    {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Yismake Worku'}
                  </h3>
                  <p className="text-xs text-[#8a857d]">@yismakeworku • 18.6K+ Readers</p>
                </div>
              </div>

              <p className="text-xs text-[#555047] leading-relaxed mb-6 font-serif">
                {lang === 'am'
                  ? 'ከደራሲው ጋር በቀጥታ ለመገናኘትና አዳዲስ ጽሑፎችን ለመከታተል ይፋዊውን የቴሌግራም ቻናል ይጎብኙ።'
                  : 'Join Yismake Worku’s official Telegram salon for direct reflections, poem releases, and community discussions.'}
              </p>

              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full jkr-pill-btn-dark !py-3 !text-xs cursor-pointer inline-flex items-center justify-between"
              >
                <span>{lang === 'am' ? 'ቻናሉን ይክፈቱ' : 'Open Official Channel'}</span>
                <Icon name="arrowRight" size={15} />
              </a>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="lg:col-span-7 bg-white border border-[#e8e2d5] rounded-2xl p-6 sm:p-10 shadow-xl">
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
              <div className="text-center py-12 px-6 bg-[#fbf9f4] border border-[#c9a84c] rounded-2xl">
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
                  {lang === 'am' ? 'መልእክትዎ በተሳካ ሁኔታ ደርሷል!' : 'Message Dispatched Successfully'}
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
                        ? 'የመጽሐፍ ጥያቄ፣ የአንባቢ አስተያየት ወይም ሌላ መልእክትዎን እዚህ ይጻፉ...'
                        : 'Please write your reflections, inquiries, or message here...'
                    }
                    className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                  />
                </div>

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
      </div>
    </div>
  );
}
