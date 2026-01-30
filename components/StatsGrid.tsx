'use client';

import React, { useState } from 'react';
import { PublicUser, Memory } from '@/lib/types';
import { Theme, getContrastColor } from '@/lib/themes';
import { Sparkles, MapPin, Music, Coffee, Camera, Plane, Heart, Star, Smile, Cloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deltaToPlainText, isQuillDelta } from '@/lib/quill-utils';

interface StatsGridProps {
  user: PublicUser;
  theme: Theme;
}

const getMemoryIcon = (memory: Memory, index: number) => {
  const mood = memory.mood?.toLowerCase();
  
  if (mood === 'happy' || mood === 'joy') return Smile;
  if (mood === 'love') return Heart;
  if (mood === 'peaceful' || mood === 'calm') return Cloud;
  if (mood === 'excited' || mood === 'amazing') return Star;
  
  const icons = [MapPin, Coffee, Music, Camera, Plane, Sparkles, Heart, Star];
  return icons[index % icons.length];
};

const memoryColors = [
  'bg-[#E63946]',
  'bg-[#06D6A0]',
  'bg-[#FFB703]',
  'bg-[#0077B6]',
  'bg-[#FB5607]',
  'bg-[#7209B7]',
  'bg-[#2E8B57]',
  'bg-[#FF006E]',
];

export const StatsGrid: React.FC<StatsGridProps> = ({ user, theme }) => {
  const router = useRouter();

  const handleMemoryClick = (memoryId: string) => {
    router.push(`/${user.username}/memory/${memoryId}`);
  };

  if (!user.memories || user.memories.length === 0) {
    return (
      <div className={`${theme.font || 'font-inter'} w-full`}>
        <div className="mb-10">
          <h3 className={`text-2xl font-bold mb-2 ${theme.onSurface}`}>{user.name}'s Public Memories</h3>
          <div className={`h-1 w-16 ${theme.primaryContainer}`}></div>
        </div>
        
        <div className={`p-8 text-center ${theme.surfaceContainer} ${theme.radius}`}>
          <p className={`text-lg ${theme.onSurfaceVariant}`}>No public memories to display yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.font || 'font-inter'} w-full`}>
      <div className="mb-10">
        <h3 className={`text-2xl font-bold mb-2 ${theme.onSurface}`}>{user.name}'s Public Memories</h3>
        <div className={`h-1 w-16 ${theme.primaryContainer}`}></div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {user.memories.map((memory, index) => {
          const color = memoryColors[index % memoryColors.length];
          const date = memory.timestamp ? new Date(memory.timestamp) : null;
          const day = date ? date.getDate() : '?';
          const month = date ? date.toLocaleString('default', { month: 'short' }) : '';
          
          const namePreview = isQuillDelta(memory.name) 
            ? deltaToPlainText(memory.name, 60) 
            : (memory.name.length > 60 ? memory.name.substring(0, 60) + '...' : memory.name);
          
          const descPreview = isQuillDelta(memory.description)
            ? deltaToPlainText(memory.description, 100)
            : (memory.description.length > 100 ? memory.description.substring(0, 100) + '...' : memory.description);
          
          return (
            <div 
              key={memory.$id} 
              className={`group p-4 flex items-start gap-4 transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${theme.surfaceContainer} ${theme.radius} relative overflow-hidden`} 
              style={{ boxShadow: `0 2px 8px rgba(0,0,0,0.1)` }}
              onClick={() => handleMemoryClick(memory.$id)}
            >
              <div 
                className={`flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center text-white rounded-lg transition-transform group-hover:scale-110 ${color}`} 
                style={{ boxShadow: `0 4px 12px rgba(0,0,0,0.2)` }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">{month}</span>
                <span className="text-xl font-bold leading-none">{day}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`m-0 mb-1 text-lg font-bold leading-tight ${theme.onSurface}`}>
                  {namePreview}
                </h3>
                <p className={`m-0 text-sm leading-relaxed ${theme.onSurfaceVariant}`}>
                  {descPreview}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {memory.mood && (
                    <span className="text-base">{memory.mood}</span>
                  )}
                  {memory.location && (
                    <div className={`flex items-center gap-1 text-xs ${theme.onSurfaceVariant}`}>
                      <MapPin size={12} />
                      <span>{memory.location}</span>
                    </div>
                  )}
                  {memory.tag && (
                    <div 
                      className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200"
                      style={{ 
                        backgroundColor: memory.tagColor || '#9B5DE5',
                        color: getContrastColor(memory.tagColor || '#9B5DE5')
                      }}
                    >
                      {memory.tag}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
