import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Link } from 'react-router-dom';
import BookCover from './BookCover';
import { getBookSample } from '../data/bookSamples';

export default function QuickPurchaseModal({ book, isOpen, onClose }) {
  const { lang } = useLanguage();
  const [selectedFormat, setSelectedFormat] = useState('paperback');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    city: 'Addis Ababa',
    address: '',
    paymentMethod: 'telebirr'
  });

  if (!isOpen || !book) return null;

  const sampleData = getBookSample(book.slug);
  const pricing = sampleData?.pricing || {
    paperback: '380 ETB',
    hardcover: '550 ETB',
    ebook: '200 ETB',
    usd: '$14.99'
  };

  const telegramOrderUrl = `https://t.me/yismakeworku?text=${encodeURIComponent(
    `Hello, I would like to order "${book.titleEn}" (${selectedFormat.toUpperCase()} edition, ${pricing[selectedFormat] || pricing.paperback}). Please let me know how to proceed.`
  )}`;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone) return;
    setOrderPlaced(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-lg">🛒</span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold">
                {lang === 'am' ? 'መጽሐፉን ይግዙ' : 'Purchase Authorized Copy'}
              </h3>
              <p className="text-[11px] text-gray-300">
                {lang === 'am' ? book.titleAm : book.titleEn} · {pricing[selectedFormat] || pricing.paperback}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderPlaced ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h4 className="font-serif text-2xl font-bold text-gray-900">
                {lang === 'am' ? 'ትዕዛዝዎ ተመዝግቧል!' : 'Order Received Successfully!'}
              </h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {lang === 'am'
                  ? `እናመሰግናለን ${orderForm.name}። የመጽሐፉ ማከፋፈያ ቡድን በስልክ ቁጥርዎ (${orderForm.phone}) ደውሎ የትዕዛዝ ዝርዝሩንና አቅርቦቱን ያረጋግጣል።`
                  : `Thank you, ${orderForm.name}. Our book dispatch coordinator will contact you at ${orderForm.phone} shortly to confirm delivery.`}
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-xs text-left max-w-sm mx-auto space-y-1">
                <div><strong>{lang === 'am' ? 'መጽሐፍ' : 'Book'}:</strong> {book.titleEn} ({selectedFormat.toUpperCase()})</div>
                <div><strong>{lang === 'am' ? 'ዋጋ' : 'Total Price'}:</strong> {pricing[selectedFormat]}</div>
                <div><strong>{lang === 'am' ? 'የክፍያ ዘዴ' : 'Payment'}:</strong> {orderForm.paymentMethod.toUpperCase()}</div>
                <div><strong>{lang === 'am' ? 'የትዕዛዝ ቁጥር' : 'Reference'}:</strong> ORD-YIS-{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-black"
                >
                  {lang === 'am' ? 'እሺ (ዝጋ)' : 'Done (Close)'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Book Summary Card */}
              <div className="flex gap-4 items-center p-3 bg-gray-50 border border-gray-200 rounded-md">
                <div className="shrink-0">
                  <BookCover book={book} size="small" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#111111]">
                    {lang === 'am' ? book.titleAm : book.titleEn}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">
                    {book.genre} · {book.year} G.C. ({book.yearEc} ዓ.ም)
                  </p>
                  <p className="text-xs text-gray-700 line-clamp-2">
                    {lang === 'am' ? book.tagline?.am : book.tagline?.en}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-semibold">
                    <span>🛡️</span>
                    <span>{lang === 'am' ? 'ትክክለኛ የጸደቀ እትም' : 'Verified Genuine Edition'}</span>
                  </div>
                </div>
              </div>

              {/* Format / Edition Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  {lang === 'am' ? 'የእትም ዓይነት ይምረጡ' : 'Select Edition & Format'}
                </label>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('paperback')}
                    className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                      selectedFormat === 'paperback'
                        ? 'border-black bg-black text-white shadow-sm font-bold'
                        : 'border-gray-200 hover:border-gray-400 bg-white text-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{lang === 'am' ? 'መደበኛ ቅጂ' : 'Paperback'}</div>
                    <div className="text-sm mt-1">{pricing.paperback}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFormat('hardcover')}
                    className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                      selectedFormat === 'hardcover'
                        ? 'border-black bg-black text-white shadow-sm font-bold'
                        : 'border-gray-200 hover:border-gray-400 bg-white text-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{lang === 'am' ? 'ዴሉክስ (Hardcover)' : 'Hardcover'}</div>
                    <div className="text-sm mt-1">{pricing.hardcover}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFormat('ebook')}
                    className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                      selectedFormat === 'ebook'
                        ? 'border-black bg-black text-white shadow-sm font-bold'
                        : 'border-gray-200 hover:border-gray-400 bg-white text-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{lang === 'am' ? 'ዲጂታል ኢ-ቡክ' : 'Digital E-Book'}</div>
                    <div className="text-sm mt-1">{pricing.ebook}</div>
                  </button>
                </div>
              </div>

              {/* Instant Channels: Telegram & Bookstores */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  {lang === 'am' ? 'ፈጣን የማዘዣ አማራጮች' : 'Fast Order Channels'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={telegramOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-semibold rounded-md text-xs transition-colors shadow-sm"
                  >
                    <span>💬</span>
                    <span>{lang === 'am' ? 'በቴሌግራም እዘዝ' : 'Order via Telegram'}</span>
                  </a>

                  {book.purchaseLinks?.[0] ? (
                    <a
                      href={book.purchaseLinks[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-300 hover:border-black text-[#111111] font-semibold rounded-md text-xs transition-colors"
                    >
                      <span>🏪</span>
                      <span>{book.purchaseLinks[0].name}</span>
                    </a>
                  ) : (
                    <a
                      href="https://addisbooks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-300 hover:border-black text-[#111111] font-semibold rounded-md text-xs transition-colors"
                    >
                      <span>🏪</span>
                      <span>Addis Books Online</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Express Order Form */}
              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    {lang === 'am' ? 'ወይም በቀጥታ ይዘዙ (Direct Delivery)' : 'Or Express Delivery Form'}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {lang === 'am' ? 'ክፍያ በሚደርስበት ወቅት ወይም በቴሌብር' : 'Telebirr / CBE / COD'}
                  </span>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder={lang === 'am' ? 'ሙሉ ስምዎ *' : 'Your Full Name *'}
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        required
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-black outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder={lang === 'am' ? 'ስልክ ቁጥር (09...)*' : 'Phone Number (09...)*'}
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                        required
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-black outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder={lang === 'am' ? 'ከተማ (ለምሳሌ፡ አዲስ አበባ)' : 'City (e.g., Addis Ababa)'}
                        value={orderForm.city}
                        onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-black outline-none"
                      />
                    </div>
                    <div>
                      <select
                        value={orderForm.paymentMethod}
                        onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-black outline-none bg-white"
                      >
                        <option value="telebirr">Telebirr (ቴሌብር)</option>
                        <option value="cbe">CBE Birr (የኢትዮጵያ ንግድ ባንክ)</option>
                        <option value="cod">{lang === 'am' ? 'ሲደርስ በጥሬ ገንዘብ' : 'Cash on Delivery'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder={lang === 'am' ? 'የመኖሪያ ወይም የስራ አድራሻ (ክፍለ ከተማ፣ ሰፈር)' : 'Specific Delivery Address / Landmark'}
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#111111] hover:bg-black text-white font-bold text-xs rounded transition-all cursor-pointer shadow-md"
                  >
                    {lang === 'am' ? `ትዕዛዙን አረጋግጥ — ${pricing[selectedFormat]}` : `Complete Order — ${pricing[selectedFormat]}`}
                  </button>
                </form>
              </div>

              {/* Bottom direct link to full book page */}
              <div className="pt-2 text-center border-t border-gray-100">
                <Link
                  to={`/books/${book.slug}`}
                  onClick={onClose}
                  className="text-xs text-gray-500 hover:text-black underline font-semibold"
                >
                  {lang === 'am' ? 'የመጽሐፉን ሙሉ ዝርዝር፣ ቅምሻና ውይይት ይመልከቱ →' : 'View Full Details, Read Sample & Reader Discussion →'}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
