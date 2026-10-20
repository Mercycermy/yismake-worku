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
    <div
      className="jkr-contact-page"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        minHeight: '100vh',
      }}
    >
      {/* Editorial Header — Clean typographic header WITHOUT hero background image */}
      <section className="pt-12 sm:pt-16 pb-8 border-b border-[#e8e2d5]/60 text-center">
        <div className="site-container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1714]/5 border border-[#c9a84c]/40 text-[#b8860b] text-[11px] font-bold tracking-widest uppercase mb-4">
            <Icon name="spark" size={13} />
            <span>{lang === 'am' ? 'ይፋዊ የስነ-ጽሑፍ ቢሮ' : 'Official Bureau & Desk'}</span>
            <Icon name="spark" size={13} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {lang === 'am' ? 'አድራሻና ይፋዊ ግንኙነት' : 'Contact & Inquiries'}
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
              ? 'ለሚዲያ፣ ለአካዳሚያዊ ምርምር፣ ለዓለም አቀፍ የትርጉም ስራዎች እና ለአንባቢዎች አስተያየት ይፋዊ መገናኛ።'
              : 'Direct correspondence channel for literary inquiries, translation rights, academic research, and reader reflections.'}
          </p>
          <div className="w-12 h-0.5 bg-[#c9a84c] mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="site-container max-w-5xl mx-auto py-10 sm:py-16 px-4">
        <div className="jkr-contact-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Official Channels — Telegram Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Telegram Card */}
            <div className="jkr-contact-telegram-card p-6 sm:p-8 rounded-3xl border border-[#d9e8ed] bg-white shadow-sm transition-all relative overflow-hidden">
              <div className="jkr-contact-telegram-glow absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none" />

              <div className="jkr-contact-telegram-card__profile flex items-center gap-4 mb-5">
                <span className="jkr-contact-telegram-card__icon w-14 h-14 rounded-2xl bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon name="send" size={26} />
                </span>
                <div className="jkr-contact-telegram-card__identity">
                  <div className="jkr-contact-telegram-card__label inline-flex items-center gap-1.5 text-[#1688b8] text-[10px] font-bold uppercase tracking-[0.16em] mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1688b8]" />
                    {lang === 'am' ? 'ይፋዊ ቻናል' : 'Official Channel'}
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1714]" style={{ fontFamily: 'var(--font-serif)' }}>
                    Telegram Channel
                  </h3>
                  <p className="text-xs text-[#667781]">@yismakeworku <span aria-hidden="true">·</span> 18,600+ readers</p>
                </div>
              </div>

              <p className="text-sm text-[#55616a] leading-relaxed mb-0">
                {lang === 'am'
                  ? 'ስለ አዳዲስ መጻሕፍትና የደራሲውን ማስታወሻዎች ይከታተሉ።'
                  : 'Follow new releases and notes from the author.'}
              </p>

              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="jkr-contact-telegram-card__link jkr-contact-telegram-link w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#1688b8] text-white text-xs font-bold transition-all active:scale-[0.98]"
              >
                <Icon name="send" size={15} />
                <span>{lang === 'am' ? 'በቴሌግራም ይከተሉ' : 'Follow on Telegram'}</span>
                <Icon name="arrowRight" size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7">
            <div className="jkr-contact-inquiry p-6 sm:p-8 md:p-10 rounded-3xl border border-[#e8dfc8] bg-white shadow-sm">
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: '#1a1714',
                  marginBottom: '0.4rem',
                }}
              >
                {lang === 'am' ? 'መልእክት ወይም ጥያቄ ይላኩ' : 'Send an Inquiry'}
              </h2>
              <p className="text-xs text-[#7a746a] mb-6">
                {lang === 'am'
                  ? 'መልእክትዎ በቀጥታ ለደራሲው ይፋዊ ቢሮ ይደርሳል።'
                  : 'Your dispatch is routed directly to the author’s correspondence desk.'}
              </p>

              {submitted ? (
                <div className="p-8 text-center rounded-xl bg-[#faf8f4] border border-[#c9a84c]">
                  <div className="w-14 h-14 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center mx-auto mb-4">
                    <Icon name="check" size={26} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1a1714] mb-2">
                    {lang === 'am' ? 'መልእክትዎ በተሳካ ሁኔታ ደርሷል!' : 'Inquiry Dispatched Successfully'}
                  </h3>
                  <p className="text-xs text-[#6e685f] max-w-md mx-auto mb-6">
                    {lang === 'am'
                      ? 'ስለ መልእክትዎ እናመሰግናለን። የቢሮው አስተባባሪ በተቻለ ፍጥነት ምላሽ ይሰጥዎታል።'
                      : 'Thank you for contacting the bureau. Official responses for verified inquiries are provided promptly.'}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="jkr-pill-btn-dark !text-xs !py-2.5 !px-6 cursor-pointer"
                  >
                    {lang === 'am' ? 'ሌላ መልእክት ላክ' : 'Send Another Note'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#1a1714] uppercase tracking-wider mb-1.5">
                        {lang === 'am' ? 'ሙሉ ስም' : 'Your Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === 'am' ? 'ለምሳሌ፡ ሰለሞን ተፈራ' : 'e.g. Elena Vance'}
                        className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1a1714] uppercase tracking-wider mb-1.5">
                        {lang === 'am' ? 'ኢሜይል አድራሻ' : 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="author@example.com"
                        className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#1a1714] uppercase tracking-wider mb-1.5">
                        {lang === 'am' ? 'ስልክ ቁጥር (አስፈላጊ ከሆነ)' : 'Phone Number'}
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
                      <label className="block text-[11px] font-bold text-[#1a1714] uppercase tracking-wider mb-1.5">
                        {lang === 'am' ? 'ርዕስ' : 'Subject'}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={lang === 'am' ? 'የመልእክቱ ርዕስ...' : 'Subject of inquiry...'}
                        className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1a1714] uppercase tracking-wider mb-1.5">
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
                          : 'Please compose your reflections or institutional inquiry here...'
                      }
                      className="w-full px-4 py-3 bg-[#faf8f4] border border-[#e8e2d5] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full jkr-pill-btn-dark !py-3.5 !text-xs cursor-pointer font-bold tracking-widest uppercase shadow-md hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                      <span>{lang === 'am' ? 'መልእክት ላክ' : 'Send Message'}</span>
                      <Icon name="arrowRight" size={15} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
