import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import AuthorHero from '../components/AuthorHero';
import DertogadaUniverseMap from '../components/DertogadaUniverseMap';
import BookCard from '../components/BookCard';
import TimelineExhibition from '../components/TimelineExhibition';
import QuoteGallery from '../components/QuoteGallery';
import { verifiedBooks, authorData } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();

  const featuredBooks = verifiedBooks.filter(b => b.isFeatured).slice(0, 4);

  return (
    <main className="bg-[#080b11] text-[#f6f0e2]">
      {/* 1. Monumental Hero Section */}
      <AuthorHero />

      {/* 2. Literary Authority & Press Strip */}
      <section className="border-y border-white/10 bg-[#0b0f19] py-6">
        <div className="site-container">
          <div className="flex flex-wrap items-center justify-around gap-6 text-center text-xs sm:text-sm font-mono text-white/60">
            <div>
              <span className="text-[#00f0ff] font-bold">200,000+ COPIES</span> SOLD NATIONWIDE
            </div>
            <div className="hidden sm:block text-white/20">•</div>
            <div>
              <span className="text-[#d4af37] font-bold">TA FIRST TRANSLATION PRIZE</span> SHORTLIST (UK)
            </div>
            <div className="hidden sm:block text-white/20">•</div>
            <div>
              <span className="text-white font-bold">TAYLOR & FRANCIS</span> ACADEMIC STUDY
            </div>
            <div className="hidden sm:block text-white/20">•</div>
            <div>
              <span className="text-[#00f0ff] font-bold">18,600+</span> TELEGRAM READERS
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Dertogada Universe Section (The Crown Jewel) */}
      <DertogadaUniverseMap />

      {/* 4. Featured Masterpieces Section */}
      <section className="section-padding bg-[#05070a] relative">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-2">
                {lang === 'am' ? 'የተመረጡ ስራዎች' : 'Curated Works'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Cinzel']">
                FEATURED <span className="text-gradient-gold">NOVELS</span>
                <span className="block text-xl sm:text-2xl font-['Noto_Serif_Ethiopic'] text-[#ebe4d3] font-normal mt-1">
                  ቁልፍ የልቦለድ ድርሰቶች
                </span>
              </h2>
            </div>

            <Link
              to="/books"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00f0ff] hover:text-white transition-colors font-mono"
            >
              <span>{lang === 'am' ? 'ሁሉንም 15+ መጻሕፍት ይመልከቱ' : 'View Complete Bibliography (15+ Works)'}</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Visual Biography & Timeline */}
      <TimelineExhibition />

      {/* 6. Verified Philosophical Thoughts & Quotes */}
      <QuoteGallery />

      {/* 7. Direct Community & Reader Dialogue (Telegram Bridge) */}
      <section className="section-padding relative bg-gradient-to-b from-[#080b11] via-cyan-950/20 to-[#05070a] border-t border-white/10">
        <div className="site-container">
          <div className="glass-panel-cyan p-8 sm:p-14 max-w-4xl mx-auto text-center relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none" />

            <div className="author-seal mx-auto mb-6">
              <span>ይ</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-white font-['Cinzel'] tracking-tight">
              CONNECT WITH THE AUTHOR
              <span className="block text-xl sm:text-3xl font-['Noto_Serif_Ethiopic'] text-[#d4af37] font-semibold mt-2">
                ቀጥታ ከአንባቢ ጋር የሚደረግ ውይይት
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#ebe4d3] max-w-xl mx-auto font-['Noto_Serif_Ethiopic'] leading-relaxed">
              {lang === 'am'
                ? "በይፋዊው የቴሌግራም ቻናል (@yismakeworku) በኩል ከአስራ ስምንት ሺህ በላይ አባላት ባሉበት መድረክ ላይ በየዕለቱ የደራሲነት ማስታወሻዎችን፣ አዳዲስ ምልከታዎችንና ስነ-ጽሑፋዊ ውይይቶችን ይከታተሉ።"
                : "Join over 18,600 readers on the official Telegram channel (@yismakeworku) for behind-the-scenes writing craft, Amharic poetic dispatches, book excerpts, and direct community dialogue."}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={authorData.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyan text-sm sm:text-base px-6 py-3"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.63 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.88 7.97-3.44 3.8-1.58 4.59-1.86 5.11-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.22-.04.38z" />
                </svg>
                <span>{lang === 'am' ? 'ቴሌግራም ቻናሉን ይቀላቀሉ' : 'Join Telegram @yismakeworku'}</span>
              </a>

              <Link to="/contact" className="btn-secondary text-sm sm:text-base px-6 py-3">
                <span>{lang === 'am' ? 'የሚዲያና የአንባቢ መልዕክት' : 'Media & Academic Inquiry'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
