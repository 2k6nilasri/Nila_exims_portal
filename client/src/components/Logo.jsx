import React from 'react';

export const Logo = ({ className = "h-10 w-auto", showText = true, textColor = "text-slate-900" }) => {
  return (
    <div className="flex items-center gap-3 select-none cursor-pointer">
      {/* Brand Icon SVG: Globe with Green Sweeping Import/Export Arrows */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-600 p-2 shadow-md shadow-emerald-950/20 group hover:scale-105 transition-transform duration-300">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
          {/* Globe Grid lines */}
          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="3" opacity="0.3" />
          <ellipse cx="50" cy="50" rx="38" ry="18" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.4" />
          <ellipse cx="50" cy="50" rx="18" ry="38" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.4" />
          <line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="3" opacity="0.4" />
          <line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" strokeWidth="3" opacity="0.4" />
          
          {/* Sweeping Upward Curved Export Arrow (Vibrant Lime/White) */}
          <path d="M 15,65 C 25,25 70,20 85,35" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <polygon points="85,25 93,37 79,42" fill="#ffffff" />
          
          {/* Return Import Arrow (Emerald) */}
          <path d="M 85,45 C 75,78 30,80 18,65" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-2xl tracking-tight text-emerald-800">NILA</span>
            <span className="font-bold text-2xl tracking-wide text-emerald-600">EXIMS</span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
            Import Export Consultant
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
