'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export interface MemoryFile {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'unknown';
}

interface MemoryFilesProps {
  files: MemoryFile[];
  themeRadius: string;
  outlineClass: string;
  surfaceContainerClass: string;
  onSurfaceVariantClass: string;
}

const getSectionLabel = (type: 'image' | 'video' | 'audio', count: number): string => {
  const noun = type === 'image' ? 'Image' : type === 'video' ? 'Video' : 'Audio';
  return `${count} ${count === 1 ? noun : `${noun}s`}`;
};

export function MemoryFiles({
  files,
  themeRadius,
  outlineClass,
  surfaceContainerClass,
  onSurfaceVariantClass,
}: MemoryFilesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const groupedFiles = useMemo(() => {
    return {
      video: files.filter(file => file.type === 'video'),
      image: files.filter(file => file.type === 'image'),
      audio: files.filter(file => file.type === 'audio'),
    };
  }, [files]);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedImage(null);
      }
    };

    const onPopState = () => {
      setSelectedImage(null);
    };

    window.history.pushState({ memoryImageOpen: true }, '');
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('popstate', onPopState);
    };
  }, [selectedImage]);

  const closeImage = () => {
    if (selectedImage) {
      window.history.back();
      setSelectedImage(null);
    }
  };

  const sectionOrder: Array<'video' | 'image' | 'audio'> = ['video', 'image', 'audio'];

  return (
    <>
      <div className="space-y-4">
        {sectionOrder.map(sectionType => {
          const sectionFiles = groupedFiles[sectionType];

          if (sectionFiles.length === 0) {
            return null;
          }

          return (
            <details key={sectionType} className={`border ${outlineClass} ${themeRadius} overflow-hidden`}>
              <summary className={`px-4 py-3 cursor-pointer select-none font-semibold text-sm md:text-base ${onSurfaceVariantClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current`}>
                {getSectionLabel(sectionType, sectionFiles.length)}
              </summary>

              <div className="px-4 pb-4 pt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectionFiles.map((file, index) => {
                  if (file.type === 'image') {
                    return (
                      <div
                        key={file.id || `${sectionType}-${index}`}
                        className={`relative w-full h-64 ${themeRadius} overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border ${outlineClass}`}
                        onClick={() => setSelectedImage(file.url)}
                      >
                        <Image
                          src={file.url}
                          alt={`Memory attachment ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    );
                  }

                  if (file.type === 'video') {
                    return (
                      <div key={file.id || `${sectionType}-${index}`} className={`${themeRadius} overflow-hidden border ${outlineClass}`}>
                        <video
                          src={file.url}
                          controls
                          className="w-full h-auto max-h-96"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    );
                  }

                  return (
                    <div key={file.id || `${sectionType}-${index}`} className={`p-4 border ${outlineClass} ${surfaceContainerClass} ${themeRadius} flex items-center justify-center`}>
                      <audio
                        src={file.url}
                        controls
                        className="w-full"
                        preload="metadata"
                      >
                        Your browser does not support the audio tag.
                      </audio>
                    </div>
                  );
                })}
              </div>
            </details>
          );
        })}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeImage();
            }
          }}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-[101]"
            onClick={closeImage}
            aria-label="Close fullscreen image"
          >
            <X size={32} />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
             <Image
              src={selectedImage}
              alt="Full size memory"
              fill
              className="object-contain"
              quality={100}
              priority
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}
