import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import PageBanner from '../components/PageBanner';

export default function Contact() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Reader Feedback',
    message: ''
  });

  const categories = [
    { id: 'Reader Feedback', en: 'Reader Feedback & Inquiries', am: 'የአንባቢ አስተያየቶችና ጥያቄዎች' },
    { id: 'Book Orders', en: 'Book Orders & Bulk Distribution', am: 'የመጻሕፍት ትዕዛዝ እና የጅምላ ስርጭት' },
    { id: 'Media & Press', en: 'Media, Press & Interviews', am: 'የሚዲያ፣ የጋዜጣና የቃለ-መጠይቅ ጥያቄዎች' },
    { id: 'Academic & Rights', en: 'Translation & Academic Rights', am: 'የትርጉም እና የአካዳሚክ መብቶች' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-[#222222] font-sans antialiased">
      <PageBanner title={lang === 'am' ? 'አድራሻና ግንኙነት' : 'Contact & Enquiries'} />

      <div className="site-container max-w-4xl mx-auto py-12 sm:py-16">
        {/* Page Subtitle */}
        <div className="text-center mb-12">
          <p className="text-base text-[#666666] max-w-xl mx-auto font-serif">
            {lang === 'am'
              ? 'ለአንባቢዎች፣ ለመጻሕፍት አከፋፋዮች፣ ለሚዲያና ለትርጉም ስራዎች ይፋዊ የመገናኛ መድረክ።'
              : 'Official liaison for readers, verified book distribution, literary press inquiries, and translation licensing.'}
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            ADMIN FLOW BANNER (Direct Flow with Admin)
            ───────────────────────────────────────────────────────────── */}
        <div className="mb-12 p-5 bg-[#111111] text-white rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-lg shrink-0">
              🔐
            </div>
            <div>
              <div className="font-serif font-bold text-sm sm:text-base text-amber-300">
                {lang === 'am' ? 'የደራሲና የአስተዳደር መግቢያ (Admin Portal)' : 'Author & Editorial Administration'}
              </div>
              <p className="text-xs text-gray-300">
                {lang === 'am'
                  ? 'የዜና ማሻሻያዎችን፣ የመጽሐፍ ማረጋገጫ ኮዶችንና የአንባቢ ውይይቶችን ለማስተዳደር በቀጥታ ይግቡ።'
                  : 'Direct flow for news publication, book security codes generation, and reader review moderation.'}
              </p>
            </div>
          </div>

          <Link
            to="/admin"
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-full transition-all shrink-0 shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span>{lang === 'am' ? 'ወደ አስተዳደር ገጽ ይግቡ →' : 'Direct Admin Flow →'}</span>
          </Link>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TWO-COLUMN CONTACT SYSTEM
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Official Channels & Institutional Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            {/* Telegram Official Dispatch */}
            <div className="p-6 bg-[#fafafa] border border-gray-300 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#229ED9] uppercase tracking-wider">
                <span>💬</span>
                <span>{lang === 'am' ? 'ይፋዊ የቴሌግራም ቻናል' : 'Official Telegram'}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#111111]">
                @yismakeworku
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {lang === 'am'
                  ? 'ከ18,600 በላይ አንባቢዎች የተሰባሰቡበት ይፋዊ ቻናል፤ አዳዲስ ግጥሞች፣ የስነ-ጽሑፍ ምክሮችና የቀጥታ መረጃዎች ይቀርባሉ።'
                  : 'Join 18,600+ readers on the official channel for direct daily reflections, poetry excerpts, and book announcements.'}
              </p>
              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 py-2 px-4 bg-[#229ED9] hover:bg-[#1e8bc0] text-white text-xs font-bold rounded-full transition-colors shadow-sm"
              >
                <span>Join Channel (18.6K+)</span>
                <span>↗</span>
              </a>
            </div>

            {/* Academic & Publisher Coordinates */}
            <div className="p-6 bg-white border border-gray-300 rounded-lg space-y-4 text-xs font-sans">
              <h3 className="font-serif text-base font-bold text-[#111111] border-b pb-2">
                {lang === 'am' ? 'ይፋዊ አድራሻዎች' : 'Institutional Coordinates'}
              </h3>

              <div className="space-y-3 text-gray-600">
                <div>
                  <strong className="block text-gray-900">{lang === 'am' ? 'አካዳሚያዊ ተቋም' : 'Academic Affiliation'}:</strong>
                  Debre Markos University, Department of Literature, East Gojjam, Ethiopia
                </div>

                <div>
                  <strong className="block text-gray-900">{lang === 'am' ? 'ዓለም አቀፍ አሳታሚ' : 'International Publisher (UK)'}:</strong>
                  Henningham Family Press, London, United Kingdom (Publisher of <em>The Lost Spell</em>)
                </div>

                <div>
                  <strong className="block text-gray-900">{lang === 'am' ? 'ዋና የስርጭት ማዕከል' : 'Distribution Center'}:</strong>
                  Addis Ababa &amp; Debre Markos, Ethiopia
                </div>
              </div>
            </div>

            {/* Imposter & Counterfeit Warning Box */}
            <div className="p-5 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <span>⚠️</span>
                <span>{lang === 'am' ? 'የጥንቃቄ ማስታወቂያ' : 'Anti-Counterfeit Advisory'}</span>
              </div>
              <p className="leading-relaxed">
                {lang === 'am'
                  ? 'በደራሲው ስም ገንዘብ የሚጠይቁ ወይም ያልተፈቀዱ የፒዲኤፍ (PDF) ስርጭቶችን የሚያካሂዱ ሀሰተኛ ገጾች አሉ። እባክዎ መጽሐፍትን ከተፈቀደላቸው መደብሮች ብቻ ይግዙ።'
                  : 'Be alert to imposter social media accounts soliciting funds or circulating unauthorized bootlegs. Always verify codes on our website.'}
              </p>
              <Link
                to="/verify"
                className="inline-block text-amber-800 underline font-bold pt-1 hover:text-black"
              >
                {lang === 'am' ? 'የመጽሐፍ ማረጋገጫ ገጽን ይጎብኙ →' : 'Go to Book Verification Page →'}
              </Link>
            </div>
          </div>

          {/* Right: Contact & Direct Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#fafafa] border border-gray-300 rounded-lg shadow-sm">
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#111111]">
                    {lang === 'am' ? 'መልዕክትዎ ደርሶናል!' : 'Message Sent Successfully!'}
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    {lang === 'am'
                      ? `እናመሰግናለን ${formData.name}። መልዕክትዎ ለደራሲውና ለስራ አስኪያጁ ቡድን ተላልፏል። በተቻለ ፍጥነት ምላሽ እንሰጣለን።`
                      : `Thank you, ${formData.name}. Your inquiry has been forwarded to Yismake Worku’s liaison coordinator.`}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-[#111111] text-white text-xs font-bold rounded-full cursor-pointer hover:bg-black"
                  >
                    {lang === 'am' ? 'ሌላ መልዕክት ላክ' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#111111] mb-1">
                      {lang === 'am' ? 'ቀጥታ መልዕክት ይላኩ' : 'Send a Direct Message'}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      {lang === 'am'
                        ? 'ለአስተያየት፣ ለትዕዛዝ ወይም ለቃለ-መጠይቅ ጥያቄዎች ቅጹን ይሙሉ'
                        : 'Fill out this form for enquiries, book orders, press, or translation.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {lang === 'am' ? 'ሙሉ ስም *' : 'Your Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Martha Hailu"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {lang === 'am' ? 'ኢሜይል አድራሻ *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {lang === 'am' ? 'ስልክ ቁጥር (አማራጭ)' : 'Phone Number (Optional)'}
                      </label>
                      <input
                        type="tel"
                        placeholder="0911XXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {lang === 'am' ? 'የመልዕክቱ ዓላማ' : 'Inquiry Category'}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {lang === 'am' ? c.am : c.en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'am' ? 'መልዕክትዎን እዚህ ይጻፉ *' : 'Your Message *'}
                    </label>
                    <textarea
                      required
                      rows="5"
                      placeholder={
                        lang === 'am'
                          ? 'የመልዕክትዎን ዝርዝር ያስገቡ...'
                          : 'Please specify the nature of your message, book order details, or press deadline...'
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#111111] hover:bg-black text-white font-bold text-xs rounded transition-all cursor-pointer shadow-md"
                  >
                    {lang === 'am' ? 'መልዕክቱን ላክ' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
