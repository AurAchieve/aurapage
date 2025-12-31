'use client';

import React, { useEffect, useState } from 'react';

export const PeaceBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#fff0f5] to-[#ffe6ea]">
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#ffb7c5] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#ffc1e3] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>
      
      <style jsx>{`
        @keyframes fall {
          0% { transform: translate(0, -10vh) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translate(20vw, 100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .petal {
          position: absolute;
          top: -20px;
          width: 15px;
          height: 15px;
          background: #ffb7c5;
          border-radius: 100% 0 100% 0;
          animation: fall 10s linear infinite;
          box-shadow: 0 0 5px rgba(255, 183, 197, 0.5);
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 7}s`,
            transform: `scale(${0.5 + Math.random()})`,
          }}
        />
      ))}
    </div>
  );
};
