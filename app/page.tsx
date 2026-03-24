'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-[#9B5DE5] selection:text-white">
      
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#2E8B57] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob"></div>
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-[#32CD32] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-[#006400] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] bg-[#98FB98] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      <div className="absolute inset-0 w-full h-full z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http:

      <main className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
        
        <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-bold font-garamond leading-[0.85] tracking-tight mb-8 animate-fade-in-up animation-delay-200 mt-20">
          Level up <br />
          <span className="font-playfair italic font-normal bg-linear-to-r from-[#D9ED92] via-[#76C893] to-[#1A759F] text-transparent bg-clip-text pr-4">
            your presence.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl font-gabarito text-white/60 max-w-2xl mb-12 leading-relaxed animate-fade-in-up animation-delay-400">
          Flex your aura, showcase your achievements, and let the world see your stats in style.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center animate-fade-in-up animation-delay-600">
          <Link
            className="group relative px-10 py-5 bg-white text-black rounded-full font-gabarito font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
            href="https:
          >
            <span className="relative z-10">Get AurAchieve</span>
          </Link>
          
          <Link 
            href="/demo" 
            className="px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-gabarito text-xl text-white/80 hover:bg-white/10 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            View Demo
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-8 w-full text-center z-10 animate-fade-in">
        <p className="text-white/30 font-gabarito text-sm">
          Powered by <a href="https://aurachieve.com" target="_blank" rel="noopener noreferrer">AurAchieve</a>
      </footer>
      
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
}
