import React from 'react';

export const EarlyBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-[#020202] perspective-[1000px]">
      
      {/* 3D Floating "Thank You" Text Effect using CSS Shadows/Gradients to simulate structure */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <div className="text-[20vw] font-black tracking-tighter leading-none text-center select-none transform rotate-x-12 rotate-y-12 animate-float-3d">
          THANK<br/>YOU
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0284c7]/5 to-transparent"></div>

      {/* Floating particles/confetti to signify celebration/carrying */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
            <div 
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-full opacity-40 blur-[1px] animate-rise"
                style={{
                    left: `${Math.random() * 100}%`,
                    bottom: '-20px',
                    animationDuration: `${10 + Math.random() * 20}s`,
                    animationDelay: `${Math.random() * 10}s`
                }}
            />
        ))}
      </div>

      <style jsx>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
        }
        @keyframes float3d {
          0%, 100% { transform: perspective(1000px) rotateX(20deg) rotateY(-10deg) scale(0.9); }
          50% { transform: perspective(1000px) rotateX(10deg) rotateY(10deg) scale(1.1); }
        }
        .animate-float-3d {
          animation: float3d 20s ease-in-out infinite;
          text-shadow: 0 20px 50px rgba(0,0,0,0.5);
          background: linear-gradient(to bottom right, #38bdf8, #0ea5e9);
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
};
