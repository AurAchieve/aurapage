'use client';

import { useState } from 'react';
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
}

export function MemoryFiles({ files, themeRadius }: MemoryFilesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map((file, index) => {
          if (file.type === 'image') {
            return (
              <div 
                key={index} 
                className={`relative w-full h-64 ${themeRadius} overflow-hidden cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => setSelectedImage(file.url)}
              >
                <Image
                  src={file.url}
                  alt={`Memory attachment ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            );
          }

          if (file.type === 'video') {
            return (
              <div key={index} className={`${themeRadius} overflow-hidden`}>
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

          if (file.type === 'audio') {
            return (
              <div key={index} className={`p-4 bg-black/5 ${themeRadius} flex items-center justify-center`}>
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
          }

          return null;
        })}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-[101]"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
             <Image
              src={selectedImage}
              alt="Full size memory"
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
