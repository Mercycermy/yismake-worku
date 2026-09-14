import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { authorData } from '../data/yismakeData';
import TimelineExhibition from '../components/TimelineExhibition';
import QuoteGallery from '../components/QuoteGallery';

export default function About() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 pb-24 bg-[#080b11] text-[#f6f0e2]">
      {/* Editorial Biography Hero */}
      <section className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        {/* Atmospheric Backdrops */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 filter brightness-50"
          style={{ backgroundImage: "url('/images/library-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/85 to-[#080b11]/60" />
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Author Portrait with Imperial Gold Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm">
                <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                  <img
                    src={authorData.avatar}
                    alt="Yismake Worku - Portrait"
                    className="w-full h-full object-cover object-center filter saturate-[1.15]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent opacity-50" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-center font-mono">
                    <div className="text-sm font-bold text-white font-['Cinzel']">YISMAKE WORKU</div>
                    <div className="text-xs text-[#d4af37] font-['Noto_Serif_Ethiopic']">ደራሲ ይስማዕከ ወርቁ</div>
                  </div>
                </div>

                {/* Cyber Geometric Accents */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]" />
              </div>
            </div>

            {/* Right: Visionary Bio Statement */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase mb-4">
                <span>❖ {lang === 'am' ? 'የደራሲው የህይወት ታሪክ' : 'OFFICIAL BIOGRAPHICAL DOSSIER'} ❖</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white font-['Cinzel'] tracking-tight">
                THE <span className="text-gradient-gold">AUTHOR</span>
                <span className="block text-3xl sm:text-5xl font-['Noto_Serif_Ethiopic'] text-[#ebe4d3] font-bold mt-2">
                  ይስማዕከ ወርቁ
                </span>
              </h1>

              <div className="mt-4 text-xs font-mono text-cyan-300 tracking-wider">
                {lang === 'am' ? authorData.titles.am : authorData.titles.en}
              </div>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-[#ebe4d3] font-['Noto_Serif_Ethiopic'] leading-relaxed">
                <p>{lang === 'am' ? authorData.bio.am : authorData.bio.en}</p>
              </div>

              {/* Verified Author Profile Highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono border-t border-white/10 pt-6">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-white/40 uppercase">{lang === 'am' ? 'የትውልድ ዘመን' : 'Birth Era'}</div>
                  <div className="text-white font-semibold mt-1">
                    {lang === 'am' ? authorData.birthEra.am : authorData.birthEra.en}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-white/40 uppercase">{lang === 'am' ? 'የትምህርትና የመምህርነት መስክ' : 'Academic Role'}</div>
                  <div className="text-[#00f0ff] font-semibold mt-1">
                    {lang === 'am' ? authorData.academicAffiliation.am : authorData.academicAffiliation.en}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-white/40 uppercase">{lang === 'am' ? 'መነሻና ሥረ-መሠረት' : 'Origins & Roots'}</div>
                  <div className="text-white font-semibold mt-1">
                    {lang === 'am' ? authorData.origins.am : authorData.origins.en}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-white/40 uppercase">{lang === 'am' ? 'ይፋዊ የቴሌግራም ማህበረሰብ' : 'Official Community'}</div>
                  <div className="text-[#d4af37] font-semibold mt-1">
                    {authorData.telegram.handle} ({authorData.telegram.subscribers})
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={authorData.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyan text-xs"
                >
                  <span>{lang === 'am' ? 'ቴሌግራም ቻናል' : 'Telegram Channel'}</span>
                  <span>↗</span>
                </a>
                <Link to="/sources" className="btn-secondary text-xs">
                  <span>{lang === 'am' ? 'አካዳሚያዊ ማጣቀሻዎች' : 'Academic Citations'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Visual Timeline */}
      <TimelineExhibition />

      {/* Academic & Literary Philosophy Section */}
      <section className="section-padding bg-[#080b11] border-t border-white/10">
        <div className="site-container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white font-['Cinzel']">
              LITERARY <span className="text-gradient-cyan">INFLUENCE & PHILOSOPHY</span>
              <span className="block text-xl font-['Noto_Serif_Ethiopic'] text-[#d4af37] mt-1">
                የፍልስፍናና የአጻጻፍ ፈሊጥ
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-[#ebe4d3] font-['Noto_Serif_Ethiopic'] leading-relaxed">
            <div className="glass-panel p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#00f0ff] font-['Cinzel'] mb-2">
                1. Reconciling Monastic Wisdom with the Space Age
              </h3>
              <p>
                {lang === 'am'
                  ? "ይስማዕከ ወርቁ በስራዎቹ የምዕራባውያኑን ሳይንስና የኢትዮጵያን ጥንታዊ ገዳማዊ እውቀት አያጋጭም። ይልቁንም ጥንታውያኑ የብራና መጻሕፍት፣ በጣና ሐይቅና በጎጃም ገዳማት የተሰወሩ የስነ-ፈለክና የሂሳብ ምሥጢራት ለወደፊቱ የቴክኖሎጂ ዘመን ቁልፍ እንደሆኑ ያሳያል።"
                  : "Rather than treating science and traditional culture as antagonists, Yismake synthesizes them. In the Dertogada lore, centuries-old Ge'ez parchments preserved in Lake Tana monasteries contain celestial mathematics that modern Ethiopian rocket scientists decode to engineer high-tech sovereign propulsion."}
              </p>
            </div>

            <div className="glass-panel p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#d4af37] font-['Cinzel'] mb-2">
                2. Reversing the Brain Drain & Techno-Sovereignty
              </h3>
              <p>
                {lang === 'am'
                  ? "የሻጊዝ እጅጉ ገጸ-ባህሪ በዶክተር ቅታው እጅጉ ታሪክ ተመስርቶ የተቀረጸ ሲሆን፣ የተማረው ዜጋ እውቀቱን ለውጭ አገር ሳይሆን ለአገሩ ትንሳኤ እንዲያውል ጥሪ ያቀርባል። የምሁራን ስደት (Brain Drain) መቆም እንዳለበትና እውነተኛ ነጻነት የሚረጋገጠው በቴክኖሎጂ ልዕልና እንደሆነ ያትታል።"
                  : "Through characters like Shagiz Ejigu (honoring NASA aerospace pioneer Kitaw Ejigu), Yismake challenges the historical tragedy of the African brain drain. His fiction is a manifesto for the return of intellectual capital, asserting that genuine national sovereignty requires indigenous scientific superiority."}
              </p>
            </div>

            <div className="glass-panel p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#ff6b81] font-['Cinzel'] mb-2">
                3. Biting Political Satire & The Metamorphic Eye
              </h3>
              <p>
                {lang === 'am'
                  ? "በ'ክቡር ድንጋይ' (The Lost Spell) ውስጥ ባለጸጋውን ወደ ውሻነት በመቀየር፣ ደራሲው የህብረተሰቡን የመደብ ግብዝነት፣ የፖለቲካውን ውሸትና የድሆቹን መከራ በድፍረት ይመረምራል። ይህም ስራ በእንግሊዝ አገር ለታላቁ የ2022 TA First Translation Prize ሽልማት እጩ እንዲሆን አስችሎታል።"
                  : "In Kebur Dengay (translated as The Lost Spell), turning an arrogant corrupt businessman into a stray dog offers a devastatingly sharp critique of power and urban hypocrisy. Shortlisted for the 2022 TA First Translation Prize in the UK, the novel proved that Ethiopian satire possesses universal human resonance."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Showcase */}
      <QuoteGallery />
    </main>
  );
}
