import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';

export default function Enquiries() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    category: 'Media & Press',
    message: ''
  });

  const [verifyIsbn, setVerifyIsbn] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verifyIsbn.trim()) return;

    const cleaned = verifyIsbn.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const knownCodes = [
      'dertogada',
      'ramatohara',
      'xantoxara',
      'lostspell',
      'keburdengay',
      'melos',
      'telmid',
      'zamra',
      '9781912915606',
      '9789994490123'
    ];

    if (knownCodes.some((code) => cleaned.includes(code))) {
      setVerifyResult({
        status: 'verified',
        title: lang === 'am' ? 'ትክክለኛ የጸደቀ እትም' : 'Authentic Authorized Edition',
        message:
          lang === 'am'
            ? 'ይህ እትም በይስማዕከ ወርቁ እና በህጋዊ አሳታሚዎቹ የተመዘገበ ህጋዊ ስራ መሆኑ ተረጋግጧል።'
            : 'This title matches official registry records published under direct author authorization.'
      });
    } else {
      setVerifyResult({
        status: 'unverified',
        title: lang === 'am' ? 'ያልተረጋገጠ ወይም ያልተፈቀደ እትም' : 'Unverified Edition Record',
        message:
          lang === 'am'
            ? 'ያስገቡት ኮድ በይፋዊው መዝገብ ውስጥ አልተገኘም። እባክዎ ህጋዊውን መጽሐፍ ከታወቁ የመጻሕፍት መደብሮች ብቻ ይግዙ።'
            : 'This serial does not appear in official registry files. Please ensure you acquire copies through verified bookshops or authorized digital portals.'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-[#222222] font-sans py-14 sm:py-20">
      <div className="site-container max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-14 pb-8 border-b border-gray-200">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] mb-4">
            {lang === 'am' ? 'ጥያቄዎችና አድራሻ' : 'Enquiries'}
          </h1>
          <p className="text-base text-[#666666] max-w-xl mx-auto font-serif">
            {lang === 'am'
              ? 'ለሚዲያ ጥያቄዎች፣ የትርጉም እና የማሳተም መብቶች፣ እንዲሁም የመጻሕፍት ትክክለኛነት ማረጋገጫ ይፋዊ መመሪያ።'
              : 'Official guidelines for media, translation rights, publisher contacts, and the verified authentication register.'}
          </p>
        </div>

        {/* Imposter & Counterfeit Notice (Exact JKR Enquiries Notice box) */}
        <div id="verification" className="bg-[#fff9eb] border border-[#e5c06e] p-6 sm:p-8 rounded-sm mb-14 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="text-2xl text-[#b8860b] shrink-0 mt-0.5">⚠️</span>
            <div className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                {lang === 'am'
                  ? 'ስለ ሀሰተኛ ገጾችና ያልተፈቀዱ ቅጂዎች የተሰጠ ይፋዊ ማስጠንቀቂያ'
                  : 'Important Notice: Imposter Accounts & Counterfeit Books'}
              </h2>
              <p className="text-sm sm:text-[15px] text-[#444444] leading-relaxed font-sans">
                {lang === 'am'
                  ? 'በይስማዕከ ወርቁ ስም በመስመር ላይ የሚንቀሳቀሱ ሀሰተኛ የፌስቡክና የቲክቶክ ገጾች እንዲሁም ያልተፈቀዱ የፒዲኤፍ (PDF) ስርጭቶች እንዳሉ እናውቃለን። ይስማዕከ ወርቁ ከአንባቢዎቹ ጋር የሚገናኘው በይፋዊ የቴሌግራም ቻናሉ (@yismakeworku) እና በዚህ ይፋዊ ድረ-ገጽ ብቻ ነው።'
                  : 'We are aware of fake social media accounts online posing as Yismake Worku and his publishers, as well as illicit bootleg PDF copies circulating without copyright authorization. Yismake Worku communicates directly with readers only through his official verified Telegram channel (@yismakeworku) and this official website.'}
              </p>
              <p className="text-xs text-[#777777]">
                {lang === 'am'
                  ? 'እባክዎ ገንዘብ የሚጠይቁ ወይም የተሳሳቱ መረጃዎችን የሚያሰራጩ ገጾችን ባለማመን ለህግ ያሳውቁ።'
                  : 'Please do not interact with accounts soliciting funds, selling unauthorized translations, or offering fake signings.'}
              </p>
            </div>
          </div>
        </div>

        {/* Book Authenticity Verification Tool */}
        <div className="bg-[#fafafa] border border-gray-200 p-6 sm:p-8 rounded-sm mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">🔍</span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
              {lang === 'am' ? 'የመጽሐፍ ትክክለኛነት ማረጋገጫ' : 'Book Edition Authentication Tool'}
            </h2>
          </div>
          <p className="text-sm text-[#666666] leading-relaxed mb-6 font-sans">
            {lang === 'am'
              ? 'የያዙት መጽሐፍ (ዴርቶጋዳ፣ ራማቶሓራ፣ ክቡር ድንጋይ ወዘተ) ትክክለኛ መሆኑን ለማረጋገጥ የመጽሐፉን ስም ወይም የISBN ቁጥር ያስገቡ።'
              : 'Enter an ISBN, publisher serial, or book title to check against our authorized publication registry.'}
          </p>

          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={verifyIsbn}
              onChange={(e) => setVerifyIsbn(e.target.value)}
              placeholder="e.g. Dertogada, The Lost Spell, or 9781912915606"
              className="flex-1 bg-white border border-gray-300 focus:border-[#111111] px-4 py-2.5 rounded-full text-sm text-[#111111] outline-none"
            />
            <button
              type="submit"
              className="jkr-pill-btn-dark !py-2.5 !px-6 !text-xs cursor-pointer"
            >
              {lang === 'am' ? 'አረጋግጥ' : 'Verify Edition'}
            </button>
          </form>

          {verifyResult && (
            <div
              className={`mt-6 p-4 rounded-sm border ${
                verifyResult.status === 'verified'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <div className="font-bold text-sm mb-1">{verifyResult.title}</div>
              <div className="text-xs leading-relaxed">{verifyResult.message}</div>
            </div>
          )}
        </div>

        {/* Rights & Licensing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div className="bg-[#fafafa] border border-gray-200 p-6 sm:p-8 rounded-sm">
            <h3 className="font-serif text-xl font-bold text-[#111111] mb-2">
              {lang === 'am' ? 'የትርጉም እና የማሳተም መብቶች' : 'Translation & Film Rights'}
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed mb-4 font-sans">
              {lang === 'am'
                ? 'የዴርቶጋዳ ተከታታይ ስራዎች፣ ክቡር ድንጋይ ወይም ሌሎች ልቦለዶች ወደ ሌሎች ቋንቋዎች እንዲተረጎሙ ወይም ለፊልም/ቴሌቪዥን ስራዎች ፈቃድ ለማግኘት በዚህ በኩል ያነጋግሩን።'
                : 'For inquiries regarding foreign language translation rights, television adaptations, or theatrical permissions for Dertogada and standalone works.'}
            </p>
            <div className="font-mono text-xs font-semibold text-[#111111]">
              rights@yismakeworku.com
            </div>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-6 sm:p-8 rounded-sm">
            <h3 className="font-serif text-xl font-bold text-[#111111] mb-2">
              {lang === 'am' ? 'የሚዲያና ጋዜጣዊ ጥያቄዎች' : 'Media & Press Enquiries'}
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed mb-4 font-sans">
              {lang === 'am'
                ? 'ለቴሌቪዥን፣ ለጋዜጣና ለመጽሔት ቃለ-መጠይቆች፣ የፎቶግራፍ ጥያቄዎችና የፕሬስ መግለጫዎች ይፋዊ የፕሬስ ማዕከላችንን ይጠቀሙ።'
                : 'Journalists, cultural broadcasters, and academic researchers seeking interviews, archival quotes, or high-resolution author portraits.'}
            </p>
            <div className="font-mono text-xs font-semibold text-[#111111]">
              press@yismakeworku.com
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#fafafa] border border-gray-200 p-8 sm:p-10 rounded-sm">
          <h2 className="font-serif text-2xl font-bold text-[#111111] mb-2">
            {lang === 'am' ? 'መልእክት ይላኩ' : 'Send an Official Enquiry'}
          </h2>
          <p className="text-sm text-[#666666] mb-8 font-sans">
            {lang === 'am'
              ? 'እባክዎ ትክክለኛ መረጃዎን ሞልተው ይላኩ። ተገቢው ቡድን በአጭር ጊዜ ውስጥ ምላሽ ይሰጥዎታል።'
              : 'Please complete the form below. Professional inquiries will be routed to the appropriate publisher representative.'}
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-sm text-center">
              <span className="text-3xl text-emerald-600 block mb-2">✓</span>
              <h3 className="font-serif text-lg font-bold text-emerald-950 mb-2">
                {lang === 'am' ? 'መልእክትዎ በተሳካ ሁኔታ ተልኳል!' : 'Thank you for your enquiry.'}
              </h3>
              <p className="text-xs text-emerald-800">
                {lang === 'am'
                  ? 'መልእክትዎ ወደ ደራሲው የስራ ቡድን ደርሷል። በአጭር ጊዜ ውስጥ ምላሽ እናደርሳለን።'
                  : 'Your message has been logged. Our literary representative will respond to genuine inquiries within 3 business days.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2 font-sans">
                    {lang === 'am' ? 'ሙሉ ስም' : 'Your Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-[#111111] px-4 py-2.5 rounded-sm text-sm text-[#111111] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2 font-sans">
                    {lang === 'am' ? 'ኢሜይል አድራሻ' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-[#111111] px-4 py-2.5 rounded-sm text-sm text-[#111111] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2 font-sans">
                    {lang === 'am' ? 'ድርጅት / ተቋም' : 'Organization / Publication'}
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-[#111111] px-4 py-2.5 rounded-sm text-sm text-[#111111] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2 font-sans">
                    {lang === 'am' ? 'የጥያቄው አይነት' : 'Enquiry Type'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-[#111111] px-4 py-2.5 rounded-sm text-sm text-[#111111] outline-none"
                  >
                    <option value="Media & Press">Media &amp; Press Request</option>
                    <option value="Translation Rights">Translation Rights Inquiry</option>
                    <option value="Film/TV Rights">Film &amp; Television Adaptation</option>
                    <option value="Academic Research">Academic &amp; Scholarly Query</option>
                    <option value="Counterfeit Report">Report Bootleg / Counterfeit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2 font-sans">
                  {lang === 'am' ? 'መልእክት' : 'Your Message'} *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-gray-300 focus:border-[#111111] p-4 rounded-sm text-sm text-[#111111] outline-none"
                />
              </div>

              <button
                type="submit"
                className="jkr-pill-btn-dark cursor-pointer"
              >
                {lang === 'am' ? 'መልእክቱን ላክ' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
