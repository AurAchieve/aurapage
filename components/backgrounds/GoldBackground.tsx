'use client';

import React, { useEffect, useState } from 'react';

export const GoldBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1a1410', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#2d2218', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0f0d0a', stopOpacity: 1 }} />
          </linearGradient>
          <radialGradient id="goldGlow1" cx="20%" cy="30%">
            <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="goldGlow2" cx="85%" cy="75%">
            <stop offset="0%" style={{ stopColor: '#f5e6c8', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#f5e6c8', stopOpacity: 0 }} />
          </radialGradient>
          <filter id="goldBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
          </filter>
        </defs>

        <rect width="1200" height="800" fill="url(#goldGrad)" />
        
        <rect width="1200" height="800" fill="url(#goldGlow1)" />
        <rect width="1200" height="800" fill="url(#goldGlow2)" />

        <circle cx="150" cy="120" r="2" fill="#d4af37" opacity="0.4" />
        <circle cx="350" cy="80" r="1.5" fill="#f5e6c8" opacity="0.3" />
        <circle cx="550" cy="140" r="2" fill="#d4af37" opacity="0.35" />
        <circle cx="750" cy="100" r="1.5" fill="#ebd885" opacity="0.25" />
        <circle cx="950" cy="130" r="2" fill="#d4af37" opacity="0.4" />
        <circle cx="1050" cy="90" r="1.5" fill="#f5e6c8" opacity="0.3" />

        <circle cx="100" cy="400" r="1.5" fill="#d4af37" opacity="0.35" />
        <circle cx="250" cy="350" r="2" fill="#ebd885" opacity="0.25" />
        <circle cx="500" cy="420" r="1.5" fill="#f5e6c8" opacity="0.3" />
        <circle cx="700" cy="380" r="2" fill="#d4af37" opacity="0.4" />
        <circle cx="900" cy="450" r="1.5" fill="#ebd885" opacity="0.25" />
        <circle cx="1100" cy="400" r="2" fill="#d4af37" opacity="0.35" />

        <circle cx="200" cy="700" r="2" fill="#ebd885" opacity="0.25" />
        <circle cx="450" cy="730" r="1.5" fill="#d4af37" opacity="0.3" />
        <circle cx="650" cy="690" r="2" fill="#f5e6c8" opacity="0.3" />
        <circle cx="850" cy="750" r="1.5" fill="#d4af37" opacity="0.35" />
        <circle cx="1000" cy="700" r="2" fill="#ebd885" opacity="0.25" />

        <ellipse cx="300" cy="250" rx="400" ry="200" fill="#d4af37" opacity="0.04" filter="url(#goldBlur)" />
        <ellipse cx="900" cy="550" rx="350" ry="250" fill="#f5e6c8" opacity="0.03" filter="url(#goldBlur)" />

        <line x1="0" y1="0" x2="50" y2="50" stroke="#d4af37" strokeWidth="0.5" opacity="0.1" />
        <line x1="1150" y1="700" x2="1200" y2="800" stroke="#d4af37" strokeWidth="0.5" opacity="0.08" />
        <line x1="600" y1="0" x2="600" y2="800" stroke="#d4af37" strokeWidth="0.3" opacity="0.03" />
      </svg>

      <style jsx>{`
        div {
          background: 
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(212, 175, 55, 0.02) 2px,
              rgba(212, 175, 55, 0.02) 4px
            );
        }
      `}</style>
    </div>
  );
};
