'use client';

import React, { useEffect, useState } from 'react';

export const InfernoBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-t from-[#350d0d] via-[#201a19] to-[#201a19]">
      <div className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#ff5449] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[#ffb4ab] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob animation-delay-4000"></div>

      <style jsx>{`
        @keyframes rise {
          0% { transform: translateY(100vh) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-10vh) scale(0); opacity: 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .ember {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          animation: rise linear infinite;
          filter: blur(1px);
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      {[...Array(40)].map((_, i) => {
        const size = Math.random() * 4 + 2;
        const color = Math.random() > 0.6 ? '#ffb4ab' : (Math.random() > 0.3 ? '#ff897d' : '#ff5449');
        return (
          <div
            key={i}
            className="ember"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              animationDuration: `${4 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        );
      })}
    </div>
  );
};
