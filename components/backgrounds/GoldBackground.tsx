'use client';

import React, { useEffect, useState } from 'react';

export const GoldBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#121212]">
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#d4af37] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[#f5e6c8] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob animation-delay-4000"></div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(180deg); opacity: 0; }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .dust {
          position: absolute;
          top: -10px;
          width: 3px;
          height: 3px;
          background: #ebd885;
          box-shadow: 0 0 5px #ebd885;
          border-radius: 50%;
          animation: shimmer 8s linear infinite;
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="dust"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};
