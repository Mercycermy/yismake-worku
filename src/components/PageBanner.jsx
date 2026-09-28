import React from 'react';

/**
 * Full-width page banner with desk/writing background
 * Matches jkrowling.com subpage header style
 */
export default function PageBanner({ title }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: "url('/images/writers-desk.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      <div className="relative z-10 py-14 sm:py-20 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-white italic drop-shadow-lg tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  );
}
