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
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0d1517] text-[var(--on-surface)] min-h-screen">
      {/* Header */}
      <section className="pb-16 border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፯
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              DISPATCH & DIRECT INQUIRY
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            ግንኙነትና መልዕክት
          </h1>

          <div className="font-serif text-xs sm:text-sm text-[var(--secondary)] font-bold tracking-[0.2em] uppercase mt-2">
            ACADEMIC INQUIRIES, TRANSLATION RIGHTS & READER ENGAGEMENT
          </div>

          <p className="mt-4 max-w-3xl font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
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
            <div className="p-6 sm:p-8 bg-[#151d1f] border border-[var(--border-hairline)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/5 blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-[var(--primary)]" />
                <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
                  COMMUNITY DISPATCH NODE
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--on-surface)]">
                ይፋዊ የቴሌግራም ቻናል
              </h2>

              <p className="mt-3 font-serif text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed">
                {lang === 'am'
                  ? "ከ18,600 በላይ አባላት ባሉበት ይፋዊ ቻናል ላይ በየዕለቱ የደራሲነት ማስታወሻዎችንና ውይይቶችን ይከታተሉ።"
                  : "Daily dispatches, Amharic poetry excerpts, writing craft notes, and direct community engagement."}
              </p>

              <div className="mt-6 pt-5 border-t border-[var(--border-hairline)]">
                <a
                  href={authorData.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-relic text-xs w-full text-center flex items-center justify-center gap-2"
                >
                  <span>JOIN @YISMAKEWORKU (18.6K+)</span>
                  <span className="text-[var(--secondary)]">↗</span>
                </a>
              </div>
            </div>

            {/* Academic & Geographic Coordinates */}
            <div className="p-6 bg-[#151d1f] border border-[var(--border-hairline)] font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                <span className="text-[var(--secondary)] font-semibold uppercase tracking-widest">
                  GEOGRAPHIC COORDINATES
                </span>
                <span className="text-[10px] text-[var(--outline)]">ARCH-REF: ET-DMU</span>
              </div>

              <div className="text-[var(--on-surface-variant)] space-y-2.5 text-[11px]">
                <div className="flex items-start justify-between">
                  <span className="text-[var(--outline)]">ACADEMIC BASE:</span>
                  <span className="text-[var(--on-surface)] text-right">Debre Markos University</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[var(--outline)]">REGION:</span>
                  <span className="text-[var(--on-surface)] text-right">East Gojjam, Ethiopia</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[var(--outline)]">LITERARY SECTOR:</span>
                  <span className="text-[var(--on-surface)] text-right">Lake Tana Basin & Addis Ababa</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[var(--outline)]">COORDINATES:</span>
                  <span className="text-[var(--primary)] text-right font-bold">11°56′N 37°18′E</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Archival Inquiry Desk (Form) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 bg-[#151d1f] border border-[var(--border-hairline)] relative">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
                  INQUIRY & DISPATCH FORM
                </span>
                <span className="font-mono text-[10px] text-[var(--outline)]">
                  SPECIMEN YW-INQ-07
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--on-surface)] mb-6">
                መልዕክት ይላኩ
              </h2>

              {formSubmitted ? (
                <div className="p-6 bg-[#080f11] border border-[var(--primary)] font-mono text-xs space-y-4">
                  <div className="text-[var(--primary)] font-bold tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--primary)]" />
                    DISPATCH REGISTERED IN MONASTERY CODEX
                  </div>
                  <p className="font-serif text-sm text-[var(--on-surface)] leading-relaxed">
                    {lang === 'am'
                      ? "መልዕክትዎ በማህደሩ ውስጥ ተመዝግቧል። እናመሰግናለን!"
                      : "Your dispatch has been registered in the archive. Thank you for your inquiry."}
                  </p>
                  <div className="text-[10px] text-[var(--outline)] pt-3 border-t border-[var(--border-hairline)] flex justify-between">
                    <span>DISPATCH REF: #YW-ARCH-{Math.floor(1000 + Math.random() * 9000)}</span>
                    <span className="text-[var(--secondary)]">STATUS: LOGGED</span>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-marginal text-xs mt-2"
                  >
                    <span>SEND ANOTHER DISPATCH</span>
                    <span className="marginal-glyph">→</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                  <div>
                    <label className="block text-[var(--on-surface-variant)] uppercase tracking-wider mb-2 text-[11px]">
                      {lang === 'am' ? 'ሙሉ ስም' : 'Your Name / Institution'} *
                    </label>
                    <div className="archival-input-wrap">
                      <span className="archival-input-taxonomic">§</span>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Abebe / University of ..."
                        className="archival-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[var(--on-surface-variant)] uppercase tracking-wider mb-2 text-[11px]">
                      {lang === 'am' ? 'ኢሜይል' : 'Email Address'} *
                    </label>
                    <div className="archival-input-wrap">
                      <span className="archival-input-taxonomic">@</span>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@institution.edu"
                        className="archival-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[var(--on-surface-variant)] uppercase tracking-wider mb-2 text-[11px]">
                      {lang === 'am' ? 'የመልዕክቱ ዓላማ' : 'Purpose of Inquiry'}
                    </label>
                    <div className="archival-input-wrap">
                      <span className="archival-input-taxonomic">◇</span>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="archival-input cursor-pointer bg-[#080f11] appearance-none pr-8"
                      >
                        <option value="reader">{lang === 'am' ? 'የአንባቢ አስተያየት (Reader Reflection)' : 'Reader Reflection / Comment'}</option>
                        <option value="academic">{lang === 'am' ? 'አካዳሚያዊ ጥናትና ምርምር (Academic Research)' : 'Academic Research / Thesis Inquiry'}</option>
                        <option value="translation">{lang === 'am' ? 'የትርጉም ፈቃድና ህትመት (Translation Rights)' : 'Translation Rights & Publishing'}</option>
                        <option value="media">{lang === 'am' ? 'የሚዲያና ጋዜጣዊ ቃለ-መጠይቅ (Media Interview)' : 'Media Interview & Literary Press'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[var(--on-surface-variant)] uppercase tracking-wider mb-2 text-[11px]">
                      {lang === 'am' ? 'መልዕክት' : 'Dispatch / Message'} *
                    </label>
                    <div className="archival-input-wrap items-start">
                      <span className="archival-input-taxonomic pt-2.5">¶</span>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={lang === 'am' ? 'መልዕክትዎን እዚህ ይጻፉ...' : 'Write your inquiry or message here...'}
                        className="archival-input font-serif text-sm min-h-[140px] resize-y py-2.5 pl-8"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-relic w-full text-center flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'am' ? 'መልዕክቱን አስመዝግብ' : 'TRANSMIT ARCHIVAL DISPATCH'}</span>
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
