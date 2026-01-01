'use client';

import React, { useEffect, useState } from 'react';

export const DefaultBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#050505', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0a2a1a', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>

        <rect width="1200" height="800" fill="url(#grad1)" />

        <ellipse cx="200" cy="150" rx="300" ry="250" fill="#2E8B57" opacity="0.15" filter="url(#blur)">
          <animate attributeName="cx" values="200;230;180;200" dur="10s" repeatCount="indefinite" />
          <animate attributeName="cy" values="150;100;200;150" dur="10s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1000" cy="100" rx="350" ry="280" fill="#32CD32" opacity="0.12" filter="url(#blur)">
          <animate attributeName="cx" values="1000;1030;980;1000" dur="10s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="cy" values="100;50;150;100" dur="10s" repeatCount="indefinite" begin="2s" />
        </ellipse>
        <ellipse cx="600" cy="700" rx="400" ry="300" fill="#1a5c3a" opacity="0.1" filter="url(#blur)">
          <animate attributeName="cx" values="600;630;570;600" dur="10s" repeatCount="indefinite" begin="4s" />
          <animate attributeName="cy" values="700;650;750;700" dur="10s" repeatCount="indefinite" begin="4s" />
        </ellipse>
        <ellipse cx="100" cy="600" rx="280" ry="320" fill="#006400" opacity="0.08" filter="url(#blur)">
          <animate attributeName="cx" values="100;130;70;100" dur="10s" repeatCount="indefinite" begin="6s" />
          <animate attributeName="cy" values="600;550;650;600" dur="10s" repeatCount="indefinite" begin="6s" />
        </ellipse>
        <ellipse cx="1100" cy="500" rx="320" ry="250" fill="#228B22" opacity="0.1" filter="url(#blur)">
          <animate attributeName="cx" values="1100;1130;1070;1100" dur="10s" repeatCount="indefinite" begin="3s" />
          <animate attributeName="cy" values="500;450;550;500" dur="10s" repeatCount="indefinite" begin="3s" />
        </ellipse>

        <circle cx="150" cy="200" r="1.5" fill="#76C893" opacity="0.6" />
        <circle cx="300" cy="150" r="1" fill="#76C893" opacity="0.4" />
        <circle cx="500" cy="100" r="1.5" fill="#76C893" opacity="0.5" />
        <circle cx="800" cy="180" r="1" fill="#76C893" opacity="0.3" />
        <circle cx="1050" cy="220" r="1.5" fill="#76C893" opacity="0.5" />
        <circle cx="200" cy="450" r="1" fill="#76C893" opacity="0.4" />
        <circle cx="900" cy="380" r="1.5" fill="#76C893" opacity="0.5" />
        <circle cx="400" cy="650" r="1" fill="#76C893" opacity="0.3" />
        <circle cx="700" cy="720" r="1.5" fill="#76C893" opacity="0.5" />
        <circle cx="1100" cy="650" r="1" fill="#76C893" opacity="0.4" />
        <circle cx="50" cy="750" r="1" fill="#76C893" opacity="0.3" />
        <circle cx="250" cy="780" r="1.5" fill="#76C893" opacity="0.4" />
      </svg>

      <style jsx>{`
        div {
          background: radial-gradient(circle at 20% 50%, rgba(46, 139, 87, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(50, 205, 50, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(0, 100, 0, 0.08) 0%, transparent 50%);
        }
      `}</style>
    </div>
  );
};
