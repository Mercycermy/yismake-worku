import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { authorData } from '../data/yismakeData';
import TimelineExhibition from '../components/TimelineExhibition';
import QuoteGallery from '../components/QuoteGallery';

export default function About() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0d1517] text-[var(--on-surface)]">
      {/* Editorial Biography Exhibition Section */}
      <section className="pb-16 border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Monumental Editorial Portrait with Archival Museum Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="sticky top-28 w-full max-w-md">
                <div className="archival-plate p-3 bg-[#0e1a1d] border border-[var(--border-hairline)] shadow-[0_0_35px_-8px_rgba(45,212,191,0.15)]">
                  <div className="relative aspect-[3/4] overflow-hidden border border-[var(--border-hairline)] bg-black">
                    <img
                      src={authorData.portrait}
                      alt="Yismake Worku - Portrait"
                      className="w-full h-full object-cover object-center filter grayscale contrast-110 transition-all duration-700 hover:filter-none"
                      loading="eager"
                    />

                    {/* Museum Specimen Label */}
                    <div className="absolute top-3 left-3 bg-[#080f11]/90 border border-[var(--border-hairline)] px-2.5 py-1 font-mono text-[9px] text-[var(--secondary)] tracking-widest uppercase flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 bg-[var(--primary)]" />
                      <span>AUTHOR FOLIO · ARCH-ETH-YW</span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#080f11] via-[#080f11]/85 to-transparent">
                      <div className="font-serif text-base font-bold text-[var(--on-surface)] tracking-wider">
                        YISMAKE WORKU
                      </div>
                      <div className="font-serif text-xs text-[var(--secondary)] mt-0.5">
                        ደራሲ ይስማዕከ ወርቁ · ጎጃም
                      </div>
                    </div>
                  </div>

                  {/* Archival Provenance Metadata */}
                  <div className="mt-3 px-2 py-1.5 flex items-center justify-between text-[10px] font-mono text-[var(--outline)] border-t border-[var(--border-hairline)]">
                    <span>SECTOR: DEBRE MARKOS</span>
                    <span className="text-[var(--primary)]">11°56′N 37°18′E</span>
                  </div>
                </div>

                {/* Direct Telegram Dispatch Bridge */}
                <div className="mt-6 p-4 bg-[#0e1a1d] border border-[var(--border-hairline)] font-mono text-xs shadow-[0_0_20px_-6px_rgba(0,0,0,0.8)]">
                  <div className="text-[var(--secondary)] font-bold mb-1 uppercase tracking-wider">
                    OFFICIAL TELEGRAM DISPATCH
                  </div>
                  <p className="font-serif text-xs text-[var(--on-surface-variant)] mb-3 leading-relaxed">
                    {lang === 'am' ? 'ከደራሲው ጋር በየዕለቱ የሚደረግ ቀጥታ የሀሳብ ልውውጥ' : 'Daily direct literary reflections, writing craft notes, and discussions.'}
                  </p>
                  <a
                    href={authorData.telegram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-relic text-xs w-full text-center"
                  >
                    <span>JOIN @YISMAKEWORKU (18.6K+)</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Visionary Narrative Dossier */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
                  ክፍል ፫
                </span>
                <span className="font-mono text-xs text-[var(--outline)]">/</span>
                <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
                  THE AUTHOR DOSSIER
                </span>
              </div>

              <div>
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  ይስማዕከ ወርቁ
                </h1>
                <div className="font-serif text-lg sm:text-xl text-[var(--secondary)] font-bold tracking-[0.16em] uppercase mt-2">
                  {lang === 'am' ? authorData.titles.am : authorData.titles.en}
                </div>
              </div>

              {/* Longform Narrative Biography */}
              <div className="border-l-2 border-[var(--primary-container)] pl-5 sm:pl-6 space-y-4 font-serif text-base sm:text-lg text-[var(--on-surface)] leading-relaxed bg-[#0e1a1d]/50 p-4 border-y border-r border-[var(--border-hairline)]">
                <p>{lang === 'am' ? authorData.bio.am : authorData.bio.en}</p>
              </div>

              {/* Verified Author Profile Table */}
              <div className="pt-6 border-t border-[var(--border-hairline)]">
                <div className="font-mono text-xs text-[var(--secondary)] uppercase tracking-widest mb-3">
                  {lang === 'am' ? 'የደራሲው ማህደር መረጃዎች' : 'VERIFIED SCHOLASTIC SPECIFICATIONS'}
                </div>

                <div className="archival-plate divide-y divide-[var(--border-hairline)] font-mono text-xs bg-[#0e1a1d] border border-[var(--border-hairline)]">
                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[var(--outline)]">{lang === 'am' ? 'የትውልድ ዘመን' : 'Birth Era'}</span>
                    <span className="text-[var(--on-surface)] text-right">
                      {lang === 'am' ? authorData.birthEra.am : authorData.birthEra.en}
                    </span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[var(--outline)]">{lang === 'am' ? 'መነሻና ሥረ-መሠረት' : 'Origins & Roots'}</span>
                    <span className="text-[var(--on-surface)] text-right">
                      {lang === 'am' ? authorData.origins.am : authorData.origins.en}
                    </span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between bg-[#132427]">
                    <span className="text-[var(--primary)] font-bold">{lang === 'am' ? 'የትምህርትና የመምህርነት መስክ' : 'Academic Affiliation'}</span>
                    <span className="text-[var(--on-surface)] text-right font-semibold">
                      {lang === 'am' ? authorData.academicAffiliation.am : authorData.academicAffiliation.en}
                    </span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[var(--outline)]">{lang === 'am' ? 'የዴርቶጋዳ ሽያጭ' : 'Dertogada Print Records'}</span>
                    <span className="text-[var(--secondary)] text-right font-bold">
                      {authorData.stats.dertogadaSales} (10 Editions in Year 1)
                    </span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[var(--outline)]">{lang === 'am' ? 'ዓለም አቀፍ እውቅና' : 'International Honors'}</span>
                    <span className="text-[var(--primary)] text-right font-bold">
                      {authorData.stats.awards}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap gap-4 font-mono text-xs">
                <Link to="/books" className="btn-relic">
                  <span>{lang === 'am' ? 'የመጻሕፍት ማህደር' : 'BROWSE BIBLIOGRAPHY (15+)'}</span>
                  <span>→</span>
                </Link>
                <Link to="/sources" className="btn-marginal">
                  <span>{lang === 'am' ? 'የአካዳሚ ማጣቀሻዎች' : 'ACADEMIC CITATIONS'}</span>
                  <span className="marginal-glyph">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Chronology Ledger */}
      <TimelineExhibition />

      {/* Philosophical Reflections Broadside */}
      <QuoteGallery />
    </main>
  );
}
