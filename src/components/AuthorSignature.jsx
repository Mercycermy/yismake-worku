import React from 'react';

/**
 * Elegant SVG signature for Yismake Worku
 * Modeled after author signature branding on jkrowling.com
 */
export default function AuthorSignature({ className = 'h-12 text-[#d4af37]', light = false }) {
  const strokeColor = light ? '#f4efe6' : 'currentColor';
  const goldColor = light ? '#e5c06e' : '#d4af37';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 420 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-24 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
      >
        {/* Artistic flowing calligraphy lines evoking Yismake Worku's hand */}
        <path
          d="M25 82 C35 70, 48 30, 58 20 C64 14, 75 16, 78 28 C82 45, 80 82, 85 92 C88 98, 98 100, 110 85 C122 70, 130 38, 142 32 C150 28, 158 35, 155 48 C150 72, 142 85, 160 82 C172 80, 185 62, 195 50 C202 42, 212 40, 218 46 C225 55, 218 78, 230 75 C242 72, 256 48, 270 38 C280 30, 292 34, 290 48 C288 65, 280 82, 298 78 C315 74, 335 45, 350 30 C362 18, 385 14, 395 24 C405 35, 398 52, 385 65 C365 85, 330 96, 295 98 C220 102, 140 100, 60 96 C40 95, 20 92, 15 90"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 900, strokeDashoffset: 0 }}
        />
        {/* Underline flourish with ink taper */}
        <path
          d="M45 92 C120 88, 240 85, 360 88 C385 89, 405 87, 410 84"
          stroke={goldColor}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Elegant Ge'ez monogram stamp in corner */}
        <circle cx="390" cy="40" r="16" stroke={goldColor} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
        <text
          x="390"
          y="45"
          textAnchor="middle"
          fontSize="14"
          fontFamily="'Noto Serif Ethiopic', serif"
          fill={goldColor}
          fontWeight="bold"
        >
          ይ
        </text>
      </svg>
      <div className="flex items-center gap-2 -mt-1 font-serif tracking-[0.25em] text-[11px] uppercase font-semibold text-[#d4af37]">
        <span>Yismake Worku</span>
        <span className="text-white/40">•</span>
        <span className="font-serif text-[10px] text-white/80">ይስማዕከ ወርቁ</span>
      </div>
    </div>
  );
}
