'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

interface MemoryScrollChromeProps {
  accentColor: string;
  fabBackgroundClass: string;
  fabIconClass: string;
}

export function MemoryScrollChrome({ accentColor, fabBackgroundClass, fabIconClass }: MemoryScrollChromeProps) {
  const [progress, setProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const lastScrollYRef = useRef(0);
  const hasScrolledDownRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollY = window.scrollY;
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min(1, Math.max(0, currentScrollY / maxScroll));
      setProgress(nextProgress);

      if (currentScrollY > 180) {
        hasScrolledDownRef.current = true;
      }

      const scrollingUp = currentScrollY < lastScrollYRef.current - 4;
      const scrollingDown = currentScrollY > lastScrollYRef.current + 4;

      if (hasScrolledDownRef.current && scrollingUp && currentScrollY > 120) {
        setShowFab(true);
      }

      if (scrollingDown || currentScrollY <= 120) {
        setShowFab(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const onResize = () => {
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    };

    onResize();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const progressPercent = Math.round(progress * 100);

  const fabRingStyle = useMemo(
    () => ({
      background: `conic-gradient(${accentColor} ${progressPercent * 3.6}deg, rgba(255,255,255,0.2) 0deg)`,
    }),
    [accentColor, progressPercent]
  );

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-black/15" aria-hidden="true">
        <div
          className="h-full transition-[width] duration-100"
          style={{ width: `${progressPercent}%`, backgroundColor: accentColor }}
        />
      </div>

      {showFab && (
        isDesktop ? (
          <button
            type="button"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-6 right-6 z-[70] h-11 px-4 rounded-full shadow-lg inline-flex items-center gap-2 font-medium ${fabBackgroundClass} ${fabIconClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current`}
          >
            <ArrowUp size={18} />
            <span>Scroll to top</span>
          </button>
        ) : (
          <button
            type="button"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[70] p-[3px] rounded-full shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current"
            style={fabRingStyle}
          >
            <span className={`flex items-center justify-center w-11 h-11 rounded-full ${fabBackgroundClass} ${fabIconClass}`}>
              <ArrowUp size={20} />
            </span>
          </button>
        )
      )}
    </>
  );
}
