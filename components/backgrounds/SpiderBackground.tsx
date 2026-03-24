import React from 'react';

export const SpiderBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 15%, rgba(225,29,72,0.32), transparent 42%), radial-gradient(circle at 85% 82%, rgba(61,184,255,0.26), transparent 46%), linear-gradient(165deg, #0A0D19 0%, #10162C 45%, #0C1020 100%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'repeating-linear-gradient(120deg, transparent 0 42px, rgba(69,100,174,0.28) 42px 43px, transparent 43px 84px), repeating-linear-gradient(60deg, transparent 0 42px, rgba(225,29,72,0.2) 42px 43px, transparent 43px 84px)',
          maskImage: 'radial-gradient(ellipse at top, rgba(0,0,0,0.95), rgba(0,0,0,0.45) 60%, transparent 100%)',
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[24vh]"
        style={{
          background: 'linear-gradient(0deg, rgba(225,29,72,0.15) 0%, rgba(61,184,255,0.04) 45%, transparent 100%)',
        }}
      />
    </div>
  );
};
