import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { authorData } from '../data/yismakeData';

export default function Contact() {
  const { lang } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'reader',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="pt-28 pb-24 bg-[#080b11] text-[#f6f0e2]">
      {/* Header */}
      <section className="relative py-14 sm:py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00f0ff] text-xs font-mono tracking-widest uppercase mb-3">
            <span>❖ {lang === 'am' ? 'የአንባቢና የሚዲያ ግንኙነት' : 'COMMUNITY & INQUIRIES'} ❖</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Cinzel'] tracking-tight">
            CONNECT WITH <span className="text-gradient-cyan">YISMAKE</span>
            <span className="block text-2xl sm:text-4xl font-['Noto_Serif_Ethiopic'] text-[#d4af37] font-bold mt-2">
              ግንኙነትና መልዕክት
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#9aa5b8] font-['Noto_Serif_Ethiopic'] leading-relaxed">
            {lang === 'am'
              ? "ለአንባቢ አስተያየቶች፣ ለአካዳሚያዊ ጥናቶች፣ ለትርጉም ስራዎች እና የሚዲያ ቃለ-መጠይቆች የቀረበ ይፋዊ የመገናኛ መድረክ።"
              : "Direct channels for readers, academic researchers, translation inquiries, and literary media requests."}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Telegram Channel & Direct Contact info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Telegram Official Bridge */}
              <div className="glass-panel-cyan p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] mb-4">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.63 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.88 7.97-3.44 3.8-1.58 4.59-1.86 5.11-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.22-.04.38z" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-white font-['Cinzel']">
                  {lang === 'am' ? 'ይፋዊ የቴሌግራም ቻናል' : 'Primary Public Channel'}
                </h3>
                <p className="mt-2 text-sm text-[#ebe4d3] font-['Noto_Serif_Ethiopic'] leading-relaxed">
                  {lang === 'am'
                    ? "ከ18,600 በላይ አንባቢዎች ጋር በየዕለቱ የሚገናኙበት፣ ግጥሞችና አዳዲስ መረጃዎች የሚቀርቡበት ዋና መድረክ።"
                    : "The author's active daily broadcast and discussion platform with over 18,600 readers in Ethiopia and globally."}
                </p>

                <a
                  href={authorData.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyan w-full text-center text-xs mt-6"
                >
                  <span>{lang === 'am' ? 'ቴሌግራም ክፈት' : 'Open Telegram @yismakeworku'}</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Academic & Literary Guild */}
              <div className="glass-panel p-6">
                <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-2">
                  {lang === 'am' ? 'አካዳሚያዊ መረጃ' : 'Academic & Translation Hub'}
                </div>
                <div className="text-sm text-white/80 font-['Noto_Serif_Ethiopic'] space-y-2">
                  <p>
                    <strong>Department:</strong> {authorData.academicAffiliation.en}
                  </p>
                  <p>
                    <strong>UK Translation Contact:</strong> Henningham Family Press (London)
                  </p>
                  <p className="text-xs text-white/50 pt-2 border-t border-white/10">
                    For dissertation permissions, academic excerpts, and rights inquiries.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7 glass-panel p-8 sm:p-10">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4 text-[#00f0ff]">✓</div>
                  <h3 className="text-2xl font-bold text-white font-['Cinzel']">
                    {lang === 'am' ? 'መልዕክትዎ ደርሷል!' : 'Message Received'}
                  </h3>
                  <p className="mt-3 text-sm text-[#ebe4d3] font-['Noto_Serif_Ethiopic'] max-w-md mx-auto">
                    {lang === 'am'
                      ? "ስለ መልዕክትዎ እናመሰግናለን። የደራሲው ማህደር ቡድን በተቻለ ፍጥነት ምላሽ ይሰጣል።"
                      : "Thank you for reaching out. Your message has been logged with the official archive coordinator."}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-secondary text-xs mt-6 cursor-pointer"
                  >
                    {lang === 'am' ? 'ሌላ መልዕክት ላክ' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-['Noto_Serif_Ethiopic']">
                  <h3 className="text-xl font-bold text-white font-['Cinzel']">
                    {lang === 'am' ? 'መልዕክት ይላኩ' : 'Send an Inquiry'}
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase mb-2">
                      {lang === 'am' ? 'ስምዎ' : 'Your Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#00f0ff] transition-all text-sm"
                      placeholder={lang === 'am' ? 'ሙሉ ስም' : 'Abebe Bikila'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase mb-2">
                      {lang === 'am' ? 'ኢሜይል' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#00f0ff] transition-all text-sm"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase mb-2">
                      {lang === 'am' ? 'የመልዕክቱ ዓላማ' : 'Inquiry Purpose'}
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#00f0ff] transition-all text-sm cursor-pointer"
                    >
                      <option value="reader">{lang === 'am' ? 'የአንባቢ አስተያየት' : 'Reader Reflection / Letter'}</option>
                      <option value="academic">{lang === 'am' ? 'አካዳሚያዊ ጥናት / ዩኒቨርሲቲ' : 'Academic Study / Research Thesis'}</option>
                      <option value="media">{lang === 'am' ? 'የሚዲያና የቃለ-መጠይቅ ጥያቄ' : 'Media Interview / Press Inquiry'}</option>
                      <option value="translation">{lang === 'am' ? 'የትርጉም ወይም የአሳታሚነት ጥያቄ' : 'Translation / Publishing Rights'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase mb-2">
                      {lang === 'am' ? 'መልዕክት' : 'Your Message'} *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#00f0ff] transition-all text-sm"
                      placeholder={lang === 'am' ? 'መልዕክትዎን እዚህ ያስፍሩ...' : 'Write your inquiry or letter here...'}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full text-center text-sm py-3.5">
                    <span>{lang === 'am' ? 'መልዕክቱን ላክ' : 'Transmit Message'}</span>
                    <span>→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
