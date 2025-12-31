'use client';

import React, { useEffect, useState } from 'react';

export const MidnightBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#4f378b] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#381E72] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-[#eaddff] shadow-[0_0_60px_rgba(234,221,255,0.4)] opacity-90"></div>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};
