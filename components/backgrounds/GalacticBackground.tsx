import React from 'react';

export const GalacticBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-black">
      {/* Dense Starfield */}
      <div className="absolute inset-0 opacity-100" 
           style={{ 
             backgroundImage: `
                radial-gradient(1.5px 1.5px at 10px 10px, white, transparent),
                radial-gradient(1px 1px at 45px 85px, white, transparent),
                radial-gradient(2px 2px at 90px 40px, white, transparent),
                radial-gradient(1px 1px at 150px 120px, white, transparent),
                radial-gradient(1.5px 1.5px at 200px 180px, white, transparent),
                radial-gradient(1px 1px at 250px 40px, white, transparent),
                radial-gradient(2px 2px at 300px 220px, white, transparent),
                radial-gradient(1px 1px at 350px 15px, white, transparent),
                radial-gradient(1.5px 1.5px at 400px 300px, white, transparent),
                radial-gradient(1px 1px at 450px 80px, white, transparent),
                radial-gradient(1.5px 1.5px at 50px 350px, white, transparent),
                radial-gradient(1px 1px at 120px 420px, white, transparent),
                radial-gradient(2px 2px at 180px 380px, white, transparent),
                radial-gradient(1px 1px at 280px 450px, white, transparent),
                radial-gradient(1.5px 1.5px at 380px 360px, white, transparent),
                radial-gradient(1px 1px at 460px 420px, white, transparent)
             `,
             backgroundSize: '500px 500px',
             animation: 'starScroll 60s linear infinite'
           }}>
      </div>
      
      {/* Additional denser layer for depth */}
      <div className="absolute inset-0 opacity-50" 
           style={{ 
             backgroundImage: `
                radial-gradient(1px 1px at 20px 30px, #cccccc, transparent),
                radial-gradient(1px 1px at 70px 100px, #cccccc, transparent),
                radial-gradient(1px 1px at 130px 50px, #cccccc, transparent),
                radial-gradient(1px 1px at 190px 150px, #cccccc, transparent),
                radial-gradient(1px 1px at 240px 80px, #cccccc, transparent),
                radial-gradient(1px 1px at 310px 200px, #cccccc, transparent),
                radial-gradient(1px 1px at 40px 250px, #cccccc, transparent),
                radial-gradient(1px 1px at 110px 290px, #cccccc, transparent),
                radial-gradient(1px 1px at 170px 230px, #cccccc, transparent),
                radial-gradient(1px 1px at 260px 280px, #cccccc, transparent)
             `,
             backgroundSize: '350px 350px',
             animation: 'starScroll 90s linear infinite reverse'
           }}>
      </div>

      <style jsx>{`
        @keyframes starScroll {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
};
