import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { authorData } from '../data/yismakeData';
import TimelineExhibition from '../components/TimelineExhibition';
import QuoteGallery from '../components/QuoteGallery';

export default function About() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0a0c0f] text-[var(--text-vellum)]">
      {/* Editorial Biography Exhibition Section */}
      <section className="pb-16 border-b border-[var(--rule-line)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Monumental Editorial Portrait with Archival Museum Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="sticky top-28 w-full max-w-md">
                <div className="archival-plate archival-plate-framed p-3 bg-[var(--ink-surface)]">
                  <div className="relative aspect-[3/4] overflow-hidden border border-[var(--rule-line)] bg-black">
                    <img
                      src={authorData.portrait}
                      alt="Yismake Worku - Portrait"
                      className="w-full h-full object-cover object-center filter grayscale contrast-105 transition-all duration-700 hover:filter-none"
                      loading="eager"
                    />

                    {/* Museum Specimen Label */}
                    <div className="absolute top-3 left-3 bg-[#0a0c0f]/90 border border-[var(--rule-line)] px-2.5 py-1 font-mono text-[9px] text-[var(--highland-gold)] tracking-widest uppercase">
                      AUTHOR FOLIO YW-PORTRAIT
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/80 to-transparent">
                      <div className="font-['Cinzel'] text-sm font-bold text-[var(--text-vellum)] tracking-widest">
                        YISMAKE WORKU
                      </div>
                      <div className="font-serif-ethiopic text-xs text-[var(--highland-gold)] mt-0.5">
                        ደራሲ ይስማዕከ ወርቁ · ጎጃም
                      </div>
                    </div>
                  </div>

                  {/* Archival Provenance Metadata */}
                  <div className="mt-3 px-2 py-1.5 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] border-t border-[var(--rule-line-subtle)]">
                    <span>SECTOR: DEBRE MARKOS</span>
                    <span>11°56′N 37°18′E</span>
                  </div>
                </div>

                {/* Direct Telegram Dispatch Bridge */}
                <div className="mt-6 p-4 bg-[var(--ink-surface)] border border-[var(--rule-line-subtle)] font-mono text-xs">
                  <div className="text-[var(--highland-gold)] font-bold mb-1">
                    OFFICIAL TELEGRAM CHANNEL
                  </div>
                  <p className="font-serif-ethiopic text-[11px] text-[var(--text-stone)] mb-3">
                    {lang === 'am' ? 'ከደራሲው ጋር በየዕለቱ የሚደረግ ቀጥታ የሀሳብ ልውውጥ' : 'Daily direct literary reflections, writing craft notes, and discussions.'}
                  </p>
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
            </div>

            {/* Right: Visionary Narrative Dossier */}
            <div className="lg:col-span-7 space-y-6">
              <div className="chapter-numeral">
                <span>01 / THE AUTHOR DOSSIER</span>
              </div>

              <div>
                <h1 className="monument-title-am text-4xl sm:text-6xl lg:text-7xl text-[var(--text-vellum)]">
                  ይስማዕከ ወርቁ
                </h1>
                <div className="font-['Cinzel'] text-lg sm:text-xl text-[var(--highland-gold)] font-bold tracking-[0.16em] uppercase mt-2">
                  {lang === 'am' ? authorData.titles.am : authorData.titles.en}
                </div>
              </div>

              {/* Longform Narrative Biography */}
              <div className="border-l-2 border-[var(--highland-gold)] pl-5 sm:pl-6 space-y-4 font-serif-ethiopic text-base sm:text-lg text-[var(--text-vellum-soft)] leading-relaxed">
                <p>{lang === 'am' ? authorData.bio.am : authorData.bio.en}</p>
              </div>

              {/* Verified Author Profile Table */}
              <div className="pt-6 border-t border-[var(--rule-line-subtle)]">
                <div className="font-mono text-xs text-[var(--highland-gold)] uppercase tracking-widest mb-3">
                  {lang === 'am' ? 'የደራሲው ማህደር መረጃዎች' : 'VERIFIED SCHOLASTIC SPECIFICATIONS'}
                </div>

                <div className="archival-plate divide-y divide-[var(--rule-line-subtle)] font-mono text-xs">
                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">{lang === 'am' ? 'የትውልድ ዘመን' : 'Birth Era'}</span>
                    <span className="text-[var(--text-vellum)] text-right">
                      {lang === 'am' ? authorData.birthEra.am : authorData.birthEra.en}
                    </span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">{lang === 'am' ? 'መነሻና ሥረ-መሠረት' : 'Origins & Roots'}</span>
                    <span className="text-[var(--text-vellum)] text-right">
                      {lang === 'am' ? authorData.origins.am : authorData.origins.en}
                    </span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between bg-[var(--ink-plate)]">
                    <span className="text-[var(--highland-gold)]">{lang === 'am' ? 'የትምህርትና የመምህርነት መስክ' : 'Academic Affiliation'}</span>
                    <span className="text-[var(--text-vellum)] text-right font-semibold">
                      {lang === 'am' ? authorData.academicAffiliation.am : authorData.academicAffiliation.en}
                    </span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">{lang === 'am' ? 'የዴርቶጋዳ ሽያጭ' : 'Dertogada Print Records'}</span>
                    <span className="text-[var(--rubric-bright)] text-right font-bold">
                      {authorData.stats.dertogadaSales} (10 Editions in Year 1)
                    </span>
                  </div>

                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">{lang === 'am' ? 'ዓለም አቀፍ እውቅና' : 'International Honors'}</span>
                    <span className="text-[var(--highland-gold)] text-right">
                      {authorData.stats.awards}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap gap-4 font-mono text-xs">
                <Link to="/books" className="btn-folio">
                  <span>{lang === 'am' ? 'የመጻሕፍት ማህደር' : 'BROWSE BIBLIOGRAPHY (15+)'}</span>
                  <span>→</span>
                </Link>
                <Link to="/sources" className="btn-ghost-archival">
                  <span>{lang === 'am' ? 'የአካዳሚ ማጣቀሻዎች' : 'ACADEMIC CITATIONS'}</span>
                  <span>↗</span>
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
