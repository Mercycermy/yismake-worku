import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import AuthorHero from '../components/AuthorHero';
import DertogadaUniverseMap from '../components/DertogadaUniverseMap';
import BookCard from '../components/BookCard';
import BookCover from '../components/BookCover';
import TimelineExhibition from '../components/TimelineExhibition';
import QuoteGallery from '../components/QuoteGallery';
import ModalInspectionFolio from '../components/ModalInspectionFolio';
import { verifiedBooks, authorData } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();
  const [inspectionBook, setInspectionBook] = useState(null);

  // Curated prominent works (Dertogada, Ramatohara, Kebur Dengay, Zamra)
  const curatedNovels = verifiedBooks.filter((b) => b.isFeatured || ['zamra'].includes(b.slug)).slice(0, 4);
  const keburDengay = verifiedBooks.find((b) => b.slug === 'kebur-dengay');

  return (
    <main className="bg-[#0d1517] text-[var(--on-surface)]">
      {/* ----------------------------------------------------------------------
          CHAPTER I: ARCHIVAL PROLOGUE & MONUMENTAL ENCOUNTER
          ---------------------------------------------------------------------- */}
      <AuthorHero />

      {/* ----------------------------------------------------------------------
          CHAPTER II: THE CANONICAL STORYWORLD (DERTOGADA PENTOLOGY)
          ---------------------------------------------------------------------- */}
      <DertogadaUniverseMap />

      {/* ----------------------------------------------------------------------
          CHAPTER III: THE CODEX EXHIBITION (CURATED MASTERPIECES)
          ---------------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#080f11] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          {/* Section Header: Bilingual Codex Lockup */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-4 border-b border-[var(--border-hairline)]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
                  ክፍል ፫
                </span>
                <span className="font-mono text-xs text-[var(--outline)]">/</span>
                <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
                  THE CODEX EXHIBITION
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                ቁልፍ የልቦለድ ድርሰቶች
              </h2>
              <div className="font-serif text-xs sm:text-sm text-[var(--secondary)] font-bold tracking-[0.2em] uppercase mt-2">
                CURATED NOVELS & ANTHOLOGIES (15+ WORKS IN REPOSITORY)
              </div>
            </div>

            <Link to="/books" className="btn-relic text-xs shrink-0 self-start md:self-auto">
              <span>{lang === 'am' ? 'ሁሉንም 15+ መጻሕፍት ይመልከቱ' : 'COMPLETE CATALOGUE (15+)'}</span>
              <span>→</span>
            </Link>
          </div>

          {/* Curated 4-Book Exhibition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {curatedNovels.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onInspect={(b) => setInspectionBook(b)}
              />
            ))}
          </div>

          {/* Featured Exhibition Broadside: Kebur Dengay / The Lost Spell (UK Award) */}
          {keburDengay && (
            <div className="archival-plate p-7 sm:p-12 bg-[#0e1a1d] border border-[var(--border-hairline)] shadow-[0_0_35px_-8px_rgba(45,212,191,0.14)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  <Link to={`/books/${keburDengay.slug}`} className="block group">
                    <BookCover book={keburDengay} size="large" />
                  </Link>

                  <button
                    onClick={() => setInspectionBook(keburDengay)}
                    className="mt-5 btn-relic text-xs py-2 px-5 w-full max-w-[288px] text-center"
                  >
                    <span>[INSPECT CODEX FOLIO 👁]</span>
                  </button>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase">
                    <span className="catalog-tag">
                      <span className="catalog-indicator-crimson" />
                      TA FIRST TRANSLATION PRIZE SHORTLIST 2022 (UK)
                    </span>
                    <span className="catalog-tag">
                      <span className="catalog-indicator-emerald" />
                      HENNINGHAM FAMILY PRESS (LONDON)
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-black text-[var(--on-surface)] tracking-tight">
                    ክቡር ድንጋይ <span className="font-serif text-xl sm:text-2xl text-[var(--secondary)] font-bold ml-2">(The Lost Spell)</span>
                  </h3>

                  <p className="font-serif text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed">
                    {lang === 'am'
                      ? "በዶ/ር ቤተልሔም አትፊልድ (በርሚንግሃም ዩኒቨርሲቲ) ወደ እንግሊዝኛ ተተርጉሞ በለንደን ሄኒንግሃም ፕሬስ የታተመው 'ክቡር ድንጋይ'፣ በታላቋ ብሪታንያ ለታላቁ የ2022 TA First Translation Prize ሽልማት እጩ ሆኖ የቀረበ ዓለም አቀፍ ድንቅ ስራ ነው። አንድ የከተማው ባለጸጋ በጥንታዊ ድግምት ወደ ውሻነት ሲለወጥ፣ የህብረተሰቡን ግብዝነትና የፖለቲካውን ህመም ከመሬት ተነስቶ በጥልቅ ይመረምራል።"
                      : "Translated into English by Dr. Bethlehem Attfield (PhD, University of Birmingham) and published in the UK by Henningham Family Press, 'The Lost Spell' (Kebur Dengay) was shortlisted for the prestigious 2022 TA First Translation Prize. When an arrogant Addis Ababa businessman accidentally transforms himself into a dog, he observes the stark realities of power, class hypocrisy, and street-level compassion from four paws."}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link to={`/books/${keburDengay.slug}`} className="btn-relic text-xs">
                      <span>{lang === 'am' ? 'ስለ መጽሐፉ ዝርዝር መረጃ' : 'VIEW NOVEL DOSSIER'}</span>
                      <span>→</span>
                    </Link>
                    <a
                      href="https://henninghamfamilypress.com/the-lost-spell/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-marginal text-xs"
                    >
                      <span>HENNINGHAM FAMILY PRESS (UK)</span>
                      <span className="marginal-glyph">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          CHAPTER IV: THE AUTHOR'S CHRONICLE (HISTORIC MILESTONES)
          ---------------------------------------------------------------------- */}
      <TimelineExhibition />

      {/* ----------------------------------------------------------------------
          CHAPTER V: PHILOSOPHICAL SCRIPTS & APHORISMS
          ---------------------------------------------------------------------- */}
      <QuoteGallery />

      {/* ----------------------------------------------------------------------
          CHAPTER VI: THE READER'S DISPATCH & COMMUNITY
          ---------------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#0e1a1d] border-t border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="max-w-4xl mx-auto archival-plate p-8 sm:p-14 bg-[#080f11] text-center border border-[var(--border-hairline)] shadow-[0_0_35px_-8px_rgba(45,212,191,0.12)]">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
                ክፍል ፮
              </span>
              <span className="font-mono text-xs text-[var(--outline)]">/</span>
              <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
                THE WRITER'S DISPATCH
              </span>
            </div>

            <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center bg-[#132427] border border-[var(--border-hairline)] text-[var(--secondary)] font-serif text-xl font-bold shadow-[0_0_12px_rgba(45,212,191,0.2)]">
              <span>ይ</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--on-surface)] font-black tracking-tight">
              ቀጥታ ከአንባቢ ጋር የሚደረግ ውይይት
            </h2>

            <div className="font-serif text-xs sm:text-sm text-[var(--secondary)] font-bold tracking-[0.2em] uppercase mt-2">
              OFFICIAL COMMUNITY DIALOGUE & LITERARY DISPATCHES
            </div>

            <p className="mt-5 text-sm sm:text-base text-[var(--on-surface-variant)] max-w-xl mx-auto font-serif leading-relaxed">
              {lang === 'am'
                ? "በይፋዊው የቴሌግራም ቻናል (@yismakeworku) በኩል ከአስራ ስምንት ሺህ በላይ አባላት ባሉበት መድረክ ላይ በየዕለቱ የደራሲነት ማስታወሻዎችን፣ አዳዲስ ምልከታዎችን፣ የግጥም ስንኞችንና ስነ-ጽሑፋዊ ውይይቶችን ይከታተሉ።"
                : "Join over 18,600 readers on the official Telegram channel (@yismakeworku) for behind-the-scenes writing craft notes, Amharic poetic dispatches, book excerpts, and direct literary dialogue."}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <a
                href={authorData.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-relic text-xs sm:text-sm"
              >
                <span>{lang === 'am' ? 'የቴሌግራም ቻናሉን ይቀላቀሉ (18.6K+)' : 'JOIN TELEGRAM @YISMAKEWORKU (18.6K+)'}</span>
                <span>↗</span>
              </a>

              <Link to="/contact" className="btn-marginal text-xs sm:text-sm">
                <span>{lang === 'am' ? 'የሚዲያና የአካዳሚ መልዕክት' : 'ACADEMIC & MEDIA INQUIRY'}</span>
                <span className="marginal-glyph">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Folio Modal Component */}
      <ModalInspectionFolio
        book={inspectionBook}
        isOpen={Boolean(inspectionBook)}
        onClose={() => setInspectionBook(null)}
      />
    </main>
  );
}
