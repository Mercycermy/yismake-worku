import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import AuthorHero from '../components/AuthorHero';
import DertogadaUniverseMap from '../components/DertogadaUniverseMap';
import BookCard from '../components/BookCard';
import BookCover from '../components/BookCover';
import TimelineExhibition from '../components/TimelineExhibition';
import QuoteGallery from '../components/QuoteGallery';
import { verifiedBooks, authorData } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();

  // Curated prominent works (Dertogada, Ramatohara, Kebur Dengay, Zamra)
  const curatedNovels = verifiedBooks.filter((b) => b.isFeatured || ['zamra'].includes(b.slug)).slice(0, 4);
  const keburDengay = verifiedBooks.find((b) => b.slug === 'kebur-dengay');

  return (
    <main className="bg-[#0a0c0f] text-[var(--text-vellum)]">
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
      <section className="section-editorial bg-[#0a0c0f]">
        <div className="site-container">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-4 border-b border-[var(--rule-line-subtle)]">
            <div>
              <div className="chapter-numeral">
                <span>03 / THE CODEX EXHIBITION</span>
              </div>
              <h2 className="monument-title-am text-3xl sm:text-5xl lg:text-6xl text-[var(--text-vellum)]">
                ቁልፍ የልቦለድ ድርሰቶች
              </h2>
              <div className="font-['Cinzel'] text-xs sm:text-sm text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mt-2">
                CURATED NOVELS & ANTHOLOGIES (15+ WORKS IN REPOSITORY)
              </div>
            </div>

            <Link to="/books" className="btn-folio text-xs shrink-0 self-start md:self-auto">
              <span>{lang === 'am' ? 'ሁሉንም 15+ መጻሕፍት ይመልከቱ' : 'COMPLETE CATALOGUE (15+)'}</span>
              <span>→</span>
            </Link>
          </div>

          {/* Curated 4-Book Exhibition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {curatedNovels.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Featured Exhibition Broadside: Kebur Dengay / The Lost Spell (UK Award) */}
          {keburDengay && (
            <div className="archival-plate archival-plate-framed p-7 sm:p-12 bg-[var(--ink-surface)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-4 flex justify-center">
                  <Link to={`/books/${keburDengay.slug}`} className="block group">
                    <BookCover book={keburDengay} size="large" />
                  </Link>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase">
                    <span className="archival-tag archival-tag-rubric">
                      TA FIRST TRANSLATION PRIZE SHORTLIST 2022 (UK)
                    </span>
                    <span className="archival-tag archival-tag-gold">
                      HENNINGHAM FAMILY PRESS (LONDON)
                    </span>
                  </div>

                  <h3 className="font-serif-ethiopic text-3xl sm:text-4xl font-black text-[var(--text-vellum)]">
                    ክቡር ድንጋይ <span className="font-['Cinzel'] text-xl sm:text-2xl text-[var(--highland-gold)] font-bold ml-2">(The Lost Spell)</span>
                  </h3>

                  <p className="font-serif-ethiopic text-base sm:text-lg text-[var(--text-vellum-soft)] leading-relaxed">
                    {lang === 'am'
                      ? "በዶ/ር ቤተልሔም አትፊልድ (በርሚንግሃም ዩኒቨርሲቲ) ወደ እንግሊዝኛ ተተርጉሞ በለንደን ሄኒንግሃም ፕሬስ የታተመው 'ክቡር ድንጋይ'፣ በታላቋ ብሪታንያ ለታላቁ የ2022 TA First Translation Prize ሽልማት እጩ ሆኖ የቀረበ ዓለም አቀፍ ድንቅ ስራ ነው። አንድ የከተማው ባለጸጋ በጥንታዊ ድግምት ወደ ውሻነት ሲለወጥ፣ የህብረተሰቡን ግብዝነትና የፖለቲካውን ህመም ከመሬት ተነስቶ በጥልቅ ይመረምራል።"
                      : "Translated into English by Dr. Bethlehem Attfield (PhD, University of Birmingham) and published in the UK by Henningham Family Press, 'The Lost Spell' (Kebur Dengay) was shortlisted for the prestigious 2022 TA First Translation Prize. When an arrogant Addis Ababa businessman accidentally transforms himself into a dog, he observes the stark realities of power, class hypocrisy, and street-level compassion from four paws."}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link to={`/books/${keburDengay.slug}`} className="btn-folio text-xs">
                      <span>{lang === 'am' ? 'ስለ መጽሐፉ ዝርዝር መረጃ' : 'VIEW NOVEL DOSSIER'}</span>
                      <span>→</span>
                    </Link>
                    <a
                      href="https://henninghamfamilypress.com/the-lost-spell/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-archival text-xs"
                    >
                      <span>HENNINGHAM FAMILY PRESS (UK)</span>
                      <span>↗</span>
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
      <section className="section-editorial bg-[#0c0f14] border-t border-[var(--rule-line)]">
        <div className="site-container">
          <div className="max-w-4xl mx-auto archival-plate archival-plate-framed p-8 sm:p-14 bg-[var(--ink-surface)] text-center">
            <div className="chapter-numeral justify-center">
              <span>06 / THE WRITER'S DISPATCH</span>
            </div>

            <div className="author-seal mx-auto mb-6">
              <span>ይ</span>
            </div>

            <h2 className="monument-title-am text-3xl sm:text-4xl lg:text-5xl text-[var(--text-vellum)]">
              ቀጥታ ከአንባቢ ጋር የሚደረግ ውይይት
            </h2>

            <div className="font-['Cinzel'] text-xs sm:text-sm text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mt-2">
              OFFICIAL COMMUNITY DIALOGUE & LITERARY DISPATCHES
            </div>

            <p className="mt-5 text-sm sm:text-base text-[var(--text-vellum-soft)] max-w-xl mx-auto font-serif-ethiopic leading-relaxed">
              {lang === 'am'
                ? "በይፋዊው የቴሌግራም ቻናል (@yismakeworku) በኩል ከአስራ ስምንት ሺህ በላይ አባላት ባሉበት መድረክ ላይ በየዕለቱ የደራሲነት ማስታወሻዎችን፣ አዳዲስ ምልከታዎችን፣ የግጥም ስንኞችንና ስነ-ጽሑፋዊ ውይይቶችን ይከታተሉ።"
                : "Join over 18,600 readers on the official Telegram channel (@yismakeworku) for behind-the-scenes writing craft notes, Amharic poetic dispatches, book excerpts, and direct literary dialogue."}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={authorData.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-folio text-xs sm:text-sm"
              >
                <span>{lang === 'am' ? 'የቴሌግራም ቻናሉን ይቀላቀሉ (18.6K+)' : 'JOIN TELEGRAM @YISMAKEWORKU (18.6K+)'}</span>
                <span>↗</span>
              </a>

              <Link to="/contact" className="btn-ghost-archival text-xs sm:text-sm">
                <span>{lang === 'am' ? 'የሚዲያና የአካዳሚ መልዕክት' : 'ACADEMIC & MEDIA INQUIRY'}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
