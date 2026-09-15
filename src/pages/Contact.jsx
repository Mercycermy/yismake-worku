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
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0a0c0f] text-[var(--text-vellum)]">
      {/* Header */}
      <section className="pb-16 border-b border-[var(--rule-line)]">
        <div className="site-container">
          <div className="chapter-numeral">
            <span>DISPATCH & DIRECT INQUIRY</span>
          </div>

          <h1 className="monument-title-am text-4xl sm:text-6xl lg:text-7xl text-[var(--text-vellum)]">
            ግንኙነትና መልዕክት
          </h1>

          <div className="font-['Cinzel'] text-xs sm:text-sm text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mt-2">
            ACADEMIC INQUIRIES, TRANSLATION RIGHTS & READER ENGAGEMENT
          </div>

          <p className="mt-4 max-w-3xl font-serif-ethiopic text-sm sm:text-base text-[var(--text-stone)] leading-relaxed">
            {lang === 'am'
              ? "ለአንባቢ አስተያየቶች፣ ለአካዳሚያዊ ጥናቶች፣ ለትርጉም ስራዎች እና ለስነ-ጽሑፋዊ ሚዲያ ቃለ-መጠይቆች የቀረበ ይፋዊ የመገናኛ መድረክ።"
              : "Direct channels for readers, academic researchers, translation licensing inquiries, and literary press interviews."}
          </p>
        </div>
      </section>

      {/* Main Dispatch Channels */}
      <section className="site-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Left: Telegram & Official Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            {/* Telegram Channel Card */}
            <div className="archival-plate archival-plate-framed p-6 sm:p-8 bg-[var(--ink-surface)]">
              <div className="font-mono text-xs text-[var(--highland-gold)] uppercase tracking-widest mb-3">
                PRIMARY COMMUNITY CHANNEL
              </div>

              <h2 className="font-serif-ethiopic text-xl font-bold text-[var(--text-vellum)]">
                ይፋዊ የቴሌግራም ቻናል
              </h2>

              <p className="mt-3 font-serif-ethiopic text-xs text-[var(--text-stone)] leading-relaxed">
                {lang === 'am'
                  ? "ከ18,600 በላይ አባላት ባሉበት ይፋዊ ቻናል ላይ በየዕለቱ የደራሲነት ማስታወሻዎችንና ውይይቶችን ይከታተሉ።"
                  : "Daily dispatches, Amharic poetry excerpts, writing craft notes, and direct community engagement."}
              </p>

              <div className="mt-6 pt-4 border-t border-[var(--rule-line-subtle)]">
                <a
                  href={authorData.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-folio text-xs w-full text-center"
                >
                  <span>JOIN @YISMAKEWORKU (18.6K+)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Academic & Geographic Coordinates */}
            <div className="archival-plate p-6 bg-[var(--ink-surface)] font-mono text-xs space-y-3">
              <div className="text-[var(--highland-gold)] uppercase tracking-widest">
                GEOGRAPHIC & ACADEMIC BASES
              </div>
              <div className="text-[var(--text-stone)] space-y-2 text-[11px]">
                <div>
                  <span className="text-[var(--text-vellum)]">ACADEMIC BASE:</span> Debre Markos University, East Gojjam, Ethiopia
                </div>
                <div>
                  <span className="text-[var(--text-vellum)]">LITERARY SECTOR:</span> Lake Tana Basin & Addis Ababa
                </div>
                <div>
                  <span className="text-[var(--text-vellum)]">COORDINATES:</span> 11°56′N 37°18′E
                </div>
              </div>
            </div>
          </div>

          {/* Right: Archival Inquiry Desk (Form) */}
          <div className="lg:col-span-7">
            <div className="archival-plate archival-plate-framed p-7 sm:p-10 bg-[var(--ink-surface)]">
              <div className="font-mono text-xs text-[var(--highland-gold)] uppercase tracking-widest mb-2">
                INQUIRY & DISPATCH FORM
              </div>

              <h2 className="font-serif-ethiopic text-2xl font-bold text-[var(--text-vellum)] mb-6">
                መልዕክት ይላኩ
              </h2>

              {formSubmitted ? (
                <div className="p-6 bg-[var(--ink-plate)] border border-[var(--highland-gold-border)] font-mono text-xs space-y-3">
                  <div className="text-[var(--highland-gold)] font-bold tracking-widest uppercase">
                    ✓ DISPATCH REGISTERED
                  </div>
                  <p className="font-serif-ethiopic text-sm text-[var(--text-vellum)]">
                    {lang === 'am'
                      ? "መልዕክትዎ በማህደሩ ውስጥ ተመዝግቧል። እናመሰግናለን!"
                      : "Your dispatch has been registered in the archive. Thank you for your inquiry."}
                  </p>
                  <div className="text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--rule-line-subtle)]">
                    DISPATCH REF: #YW-{Math.floor(1000 + Math.random() * 9000)} · STATUS: LOGGED
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-link-editorial mt-3 block"
                  >
                    SEND ANOTHER DISPATCH →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                  <div>
                    <label className="block text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      {lang === 'am' ? 'ሙሉ ስም' : 'Your Name / Institution'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Abebe / University of ..."
                      className="w-full px-4 py-2.5 bg-[var(--ink-base)] border border-[var(--rule-line)] text-[var(--text-vellum)] focus:outline-none focus:border-[var(--highland-gold)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      {lang === 'am' ? 'ኢሜይል' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@institution.edu"
                      className="w-full px-4 py-2.5 bg-[var(--ink-base)] border border-[var(--rule-line)] text-[var(--text-vellum)] focus:outline-none focus:border-[var(--highland-gold)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      {lang === 'am' ? 'የመልዕክቱ ዓላማ' : 'Purpose of Inquiry'}
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[var(--ink-base)] border border-[var(--rule-line)] text-[var(--text-vellum)] focus:outline-none focus:border-[var(--highland-gold)] transition-colors"
                    >
                      <option value="reader">{lang === 'am' ? 'የአንባቢ አስተያየት' : 'Reader Reflection / Comment'}</option>
                      <option value="academic">{lang === 'am' ? 'አካዳሚያዊ ጥናትና ምርምር' : 'Academic Research / Thesis Inquiry'}</option>
                      <option value="translation">{lang === 'am' ? 'የትርጉም ፈቃድና ህትመት' : 'Translation Rights & Publishing'}</option>
                      <option value="media">{lang === 'am' ? 'የሚዲያና ጋዜጣዊ ቃለ-መጠይቅ' : 'Media Interview & Literary Press'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      {lang === 'am' ? 'መልዕክት' : 'Dispatch / Message'} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'am' ? 'መልዕክትዎን እዚህ ይጻፉ...' : 'Write your inquiry or message here...'}
                      className="w-full px-4 py-2.5 bg-[var(--ink-base)] border border-[var(--rule-line)] text-[var(--text-vellum)] focus:outline-none focus:border-[var(--highland-gold)] font-serif-ethiopic text-sm transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-folio w-full text-center"
                  >
                    <span>{lang === 'am' ? 'መልዕክቱን አስመዝግብ' : 'SUBMIT ARCHIVAL DISPATCH'}</span>
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
