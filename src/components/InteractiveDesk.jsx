import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { verifiedBooks, verifiedQuotes } from '../data/yismakeData';

export default function InteractiveDesk({ onSwitchToStory }) {
  const { lang } = useLanguage();
  const [activeModal, setActiveModal] = useState(null);

  // Desk hotspots data
  const hotspots = [
    {
      id: 'notebook',
      title: lang === 'am' ? 'የዴርቶጋዳ የእጅ ጽሑፍ ማስታወሻዎች' : 'Manuscript Notebooks: Dertogada Drafts',
      subtitle: lang === 'am' ? 'የመጀመሪያው ረቂቅ እና ምስጢራዊ ኮዶች' : 'Early drafts, character sketches & Lake Tana formulas',
      icon: '📖',
      pos: 'left-[22%] top-[48%]',
      color: '#e5c06e',
      content: {
        title: lang === 'am' ? 'በ22 ዓመት የተጻፈው ታሪክ' : 'Drafting at 22: The Birth of Dertogada',
        date: 'Debre Markos · 2008–2009',
        body: lang === 'am'
          ? "ይስማዕከ ወርቁ በደብረ ማርቆስ ዩኒቨርሲቲ በመምህርነት እያገለገለ፣ በትርፍ ሰዓቱ በጥንታዊ ደብተሮች ላይ የሻጊዝ እጅጉን፣ የሲፓራንና የጣና ሐይቁን ምስጢር ይከትበው ነበር። 'የብራናው ምስጢር ከዘመናዊው ሳይንስ ጋር የሚገናኝበትን ልቦለድ ስጀምር፣ በአገሪቱ ውስጥ ይህን ያህል ማዕበል ይፈጥራል ብዬ አላሰብኩም ነበር' ይላል።"
          : "Written while lecturing at Debre Markos University, Yismake drafted Dertogada in lined Ethiopian composition notebooks. Combining the ancient Ge'ez astronomical treatises of Gojjam monasteries with high-tech rocketry modeled after Dr. Kitaw Ejigu, the first draft took 8 months of sleepless nights before selling out 10 editions in its debut year."
      }
    },
    {
      id: 'glasses',
      title: lang === 'am' ? 'የደራሲው መነጽር' : 'The Author’s Reading Glasses',
      subtitle: lang === 'am' ? 'የፈጠራ አመለካከትና ተመስጦ' : 'Literary Vision & Foundational Influences',
      icon: '👓',
      pos: 'left-[24%] top-[18%]',
      color: '#a0e6e5',
      content: {
        title: lang === 'am' ? 'የይስማዕከ የፈጠራ ምንጮች' : 'The Creative Lens: What Shaped Yismake',
        date: 'Church Education to Modern Sci-Fi',
        body: lang === 'am'
          ? "ባህላዊው የቤተክርስቲያን የቅኔና የዜማ ትምህርት፣ የግዕዝ ቋንቋ ጥልቅ ምሥጢራት፣ እንዲሁም የጁልስ ቬርንና የአርተር ኮናን ዶይል የሳይንስ ልቦለዶች የይስማዕከን ምናብ ቀርጸውታል። ጽሑፎቹ የጥንቱንና የዘመኑን እውቀት በአንድነት ያዋህዳሉ።"
          : "From traditional ecclesiastical Qine poetry and Ge'ez manuscripts in Gojjam to Arthur Conan Doyle, Jules Verne, and real-world African aerospace pioneers like Dr. Kitaw Ejigu, Yismake's lens bridges thousands of years of monastic scholarship with cutting-edge techno-realism."
      }
    },
    {
      id: 'coffee',
      title: lang === 'am' ? 'የኢትዮጵያ ቡና ጽዋ' : 'Traditional Ethiopian Buna Cup',
      subtitle: lang === 'am' ? 'የጸሐፊው የዕለት ተዕለት ልማድ' : 'The Daily Writing Ritual & Coffee Culture',
      icon: '☕',
      pos: 'left-[69%] top-[25%]',
      color: '#ffb95f',
      content: {
        title: lang === 'am' ? 'የቡናና የብዕር ወግ' : 'Writing Fueled by Highland Coffee',
        date: 'The Morning Sanctuary',
        body: lang === 'am'
          ? "ይስማዕከ ወርቁ አብዛኞቹን ረቂቆች የሚጽፈው ማለዳ ላይ ትኩስ የኢትዮጵያ ጀበና ቡና እየጠጣ ነበር። በጎጃምና በአዲስ አበባ በሚገኙ ጸጥተኛ ካፌዎች ውስጥ ቁጭ ብሎ በቡና መዓዛ ታጅቦ መጻፍ ዋነኛ የፈጠራ ልማዱ ነው።"
          : "Freshly brewed Ethiopian coffee from clay jebenas served in porcelain sinis has fueled every chapter Yismake ever penned. He often reflects that the rich, contemplative aroma of Ethiopian coffee creates the quiet sacred space where stories unlock."
      }
    },
    {
      id: 'paperball',
      title: lang === 'am' ? 'የተጨማደደ ረቂቅ ወረቀት' : 'Screwed-up Paper: Discarded Drafts',
      subtitle: lang === 'am' ? 'ያልታተሙ ትዕይንቶችና አማራጭ ፍጻሜዎች' : 'Alternate plot twists, deleted scenes & discarded ideas',
      icon: '📜',
      pos: 'left-[53%] top-[56%]',
      color: '#ef4444',
      content: {
        title: lang === 'am' ? 'ከዴርቶጋዳ የተሰረዙ ትዕይንቶች' : 'Scenes Left on the Cutting Room Floor',
        date: 'Declassified Writer Notes',
        body: lang === 'am'
          ? "በመጀመሪያው የዴርቶጋዳ ረቂቅ ላይ፣ ሻጊዝ እጅጉ በጣና ሐይቅ ሥር በሚገኘው የጠፈር ማዕከል ውስጥ ለዓመታት ተደብቆ እንደሚኖር ታስቦ ነበር። ደራሲው በኋላ ላይ ሴራውን በማስተካከል ዓለም አቀፍ የስለላ ፍለጋውን ይበልጥ አጓጊና ፈታኝ አደረገው።"
          : "In the original handwritten treatment for Dertogada, Shagiz Ejigu was slated to be captured in Berlin before reaching Ethiopia. Yismake crumpled up 40 pages of that storyline to bring the entire tactical confrontation directly to the ancient waters of Lake Tana, dramatically raising the patriotic stakes."
      }
    },
    {
      id: 'books',
      title: lang === 'am' ? 'የታተሙት መጻሕፍት ክምችት' : 'Stack of Published Works',
      subtitle: lang === 'am' ? 'ከዴርቶጋዳ እስከ ክቡር ድንጋይ' : '15+ Masterpieces across 2 Decades',
      icon: '📚',
      pos: 'left-[84%] top-[50%]',
      color: '#3cddc7',
      content: {
        title: lang === 'am' ? '15+ የታተሙ መጻሕፍት' : 'A Monumental Body of Work',
        date: '2008 – Present',
        body: lang === 'am'
          ? "ዴርቶጋዳ፣ ራማቶሓራ፣ ዣንቶዣራ፣ ዮራቶራድ፣ ዮቶድ፣ ክቡር ድንጋይ (The Lost Spell)፣ ዛምራ፣ ግፉዓን፣ ሜሎስ፣ ተልሚድ፣ የቀንድ አውጣ ኑሮ፣ የኦጋዴን ድመቶች፣ ደህንነቱ፣ ተከርቼም እና የወንድ ምጥ። ከ200,000 በላይ ቅጂዎች የተሸጡበት የአገር ኩራት።"
          : "Across 15+ published books, Yismake created Ethiopia's first unified speculative storytelling universe. From Dertogada's sci-fi revolution to The Lost Spell's UK translation shortlist, his novels continue to inspire millions of readers across Africa and the diaspora."
      }
    },
    {
      id: 'pen',
      title: lang === 'am' ? 'የደራሲው ብዕር' : 'Fountain Pen & Inkwell',
      subtitle: lang === 'am' ? 'የአጻጻፍ ፍልስፍና' : 'The Art of Written Word & Craft',
      icon: '✒️',
      pos: 'left-[46%] top-[25%]',
      color: '#e5c06e',
      content: {
        title: lang === 'am' ? 'ብዕር እንደ ሉዓላዊ መሳሪያ' : 'The Pen as an Instrument of Sovereignty',
        date: 'On Writing & Truth',
        body: lang === 'am'
          ? "«ደራሲ ማለት የአእምሮ አርበኛ ነው። ብዕር አገራዊ ማንነትን፣ ታሪክንና የነጻነት ጥማትን የምንገልጽበት ትልቁ መሳሪያችን ነው። ቃላት ድንበር ተሻጋሪ ኃይል አላቸው።»"
          : "“To write is an act of intellectual defense. The pen is our most sovereign instrument to protect African history, imagine our own technological future, and speak unvarnished truth to power.” — Yismake Worku"
      }
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#120e0a] text-[#f4efe6] select-none">
      {/* Ambient Lighting & Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />

      {/* Desk Control Bar */}
      <div className="relative z-20 site-container pt-8 pb-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#3d2a1b]/60">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span className="font-serif text-sm font-semibold tracking-wider text-[#d4af37] uppercase">
            {lang === 'am' ? 'የደራሲው የጽሕፈት ጠረጴዛ' : "Yismake's Writing Desk"}
          </span>
          <span className="text-[#8c7866] text-xs hidden sm:inline">•</span>
          <span className="text-[#8c7866] text-xs font-mono hidden sm:inline">
            {lang === 'am' ? 'ነገሮችን ጠቅ በማድረግ ምሥጢራቸውን ይመርምሩ' : 'Click interactive relics on the desk to inspect'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToStory}
            className="flex items-center gap-2 px-4 py-2 bg-[#2a1c12] hover:bg-[#3d2a1b] border border-[#5a3e29] hover:border-[#d4af37] text-xs font-serif text-[#d4af37] tracking-wider uppercase transition-all shadow-md cursor-pointer rounded-sm"
          >
            <span>📖 {lang === 'am' ? 'ወደ ዋናው ገጽ ተመለስ' : 'Switch to Story View'}</span>
            <span>↓</span>
          </button>
        </div>
      </div>

      {/* Interactive Desk Surface Area */}
      <div className="relative w-full max-w-7xl mx-auto my-6 px-4">
        <div className="relative w-full aspect-[16/9] min-h-[500px] sm:min-h-[640px] rounded-lg overflow-hidden border-4 border-[#3a281a] shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
          {/* Desk Texture Backdrop */}
          <img
            src="/images/writers-desk.jpg"
            alt="Author's Writing Desk"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          />

          {/* Warm Vintage Desk Lamp Glow */}
          <div className="absolute top-0 right-0 w-[45%] h-[60%] bg-gradient-to-bl from-[#ffb95f]/25 via-[#ff9900]/10 to-transparent blur-3xl pointer-events-none" />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/75 pointer-events-none" />

          {/* Interactive Hotspots positioned over desk elements */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className={`absolute ${spot.pos} -translate-x-1/2 -translate-y-1/2 z-20 group/spot`}
            >
              {/* Pulsing Target Ring */}
              <button
                onClick={() => setActiveModal(spot)}
                className="relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/75 border-2 border-[#d4af37] hover:border-white hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.6)] cursor-pointer"
                aria-label={spot.title}
              >
                <span className="text-base sm:text-lg">{spot.icon}</span>
                <span className="absolute -inset-1 rounded-full border border-[#d4af37] animate-ping opacity-60 pointer-events-none" />
              </button>

              {/* Hover Tooltip Badge */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none opacity-0 group-hover/spot:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/spot:translate-y-0 whitespace-nowrap z-30">
                <div className="px-3.5 py-1.5 bg-[#1b120c]/95 border border-[#d4af37] shadow-xl text-center rounded">
                  <div className="font-serif text-xs font-bold text-[#d4af37]">{spot.title}</div>
                  <div className="text-[10px] text-[#baa898] font-sans">{spot.subtitle}</div>
                </div>
                <div className="w-2 h-2 bg-[#1b120c] border-r border-b border-[#d4af37] transform rotate-45 mx-auto -mt-1" />
              </div>
            </div>
          ))}

          {/* Desk Bottom Caption Note */}
          <div className="absolute bottom-4 left-6 z-20 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded text-xs font-serif text-[#d4af37]/90 max-w-md hidden sm:block">
            <span className="font-bold">✨ Interactive Writing Desk</span> — Click any highlighted item above to inspect the author’s journals, discarded drafts, glasses, and published works.
          </div>
        </div>
      </div>

      {/* Item Inspection Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-xl bg-[#1c140e] border-2 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.35)] p-6 sm:p-8 rounded-sm text-[#f4efe6]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#d4af37] hover:text-white border border-[#5a3e29] hover:border-[#d4af37] rounded-full transition-colors cursor-pointer text-sm"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#3d2a1b]">
              <span className="text-2xl">{activeModal.icon}</span>
              <div>
                <span className="font-mono text-[10px] text-[#d4af37] tracking-widest uppercase">
                  {activeModal.content.date}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f4efe6] tracking-tight">
                  {activeModal.content.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="font-serif text-sm sm:text-base leading-relaxed text-[#dfd7cc] space-y-4 my-5 bg-[#140e09] p-5 border border-[#3d2a1b]/60 rounded-sm">
              <p>{activeModal.content.body}</p>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#3d2a1b]">
              {activeModal.id === 'books' ? (
                <Link
                  to="/books"
                  className="px-4 py-2 bg-[#d4af37] text-black font-serif text-xs font-bold uppercase tracking-wider hover:bg-[#ebd48e] transition-colors rounded-sm"
                >
                  {lang === 'am' ? 'ሁሉንም 15+ መጻሕፍት ይመልከቱ' : 'Browse All 15+ Books →'}
                </Link>
              ) : activeModal.id === 'pen' ? (
                <Link
                  to="/on-writing"
                  className="px-4 py-2 bg-[#d4af37] text-black font-serif text-xs font-bold uppercase tracking-wider hover:bg-[#ebd48e] transition-colors rounded-sm"
                >
                  {lang === 'am' ? 'ስለ ደራሲነት ያንብቡ' : 'Explore On Writing →'}
                </Link>
              ) : (
                <span className="text-xs font-mono text-[#8c7866]">
                  YISMAKE WORKU LITERARY ARCHIVE
                </span>
              )}

              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-[#2a1c12] hover:bg-[#3d2a1b] text-xs font-serif text-[#d4af37] border border-[#5a3e29] rounded-sm transition-colors cursor-pointer"
              >
                {lang === 'am' ? 'ዝጋ' : 'Close Folio'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
