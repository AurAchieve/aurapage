'use client';

import React, { useState } from 'react';
import { PublicUser, Memory } from '@/lib/types';
import { Theme, getContrastColor, normalizeTagColor } from '@/lib/themes';
import { useRouter } from 'next/navigation';
import { deltaToPlainText, isQuillDelta, parseDescriptionWithSong } from '@/lib/quill-utils';

interface StatsGridProps {
  user: PublicUser;
  theme: Theme;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ user, theme }) => {
  const router = useRouter();

  const handleMemoryClick = (memoryId: string) => {
    const target = `/${user.username}/memory/${memoryId}`;

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition?.(() => {
        router.push(target);
      });
      return;
    }

    router.push(target);
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
      
      <div className={`border ${theme.outline} rounded-[2.25rem] overflow-hidden ${theme.surfaceContainer}`}>
        {user.memories.map((memory, index) => {
          const date = memory.timestamp ? new Date(memory.timestamp) : null;
          const day = date ? date.getDate() : '?';
          const month = date ? date.toLocaleString('default', { month: 'short' }) : '';
          const tagBackgroundColor = normalizeTagColor(memory.tagColor) || theme.accent;
          const tagTextColor = getContrastColor(tagBackgroundColor);
          const tagBorderColor = tagTextColor === '#000000' ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.28)';
          
          const namePreview = isQuillDelta(memory.name) 
            ? deltaToPlainText(memory.name, 60) 
            : (memory.name.length > 60 ? memory.name.substring(0, 60) + '...' : memory.name);
          
          const { cleanDescription } = parseDescriptionWithSong(memory.description);

          const descPreview = isQuillDelta(cleanDescription)
            ? deltaToPlainText(cleanDescription, 100)
            : (cleanDescription.length > 100 ? cleanDescription.substring(0, 100) + '...' : cleanDescription);
          
          return (
            <div 
              key={memory.$id} 
              className={`group px-5 py-4 md:px-6 md:py-5 flex items-start gap-4 transition-all duration-200 cursor-pointer ${index !== user.memories.length - 1 ? `border-b ${theme.divider}` : ''} hover:bg-white/5`}
              onClick={() => handleMemoryClick(memory.$id)}
            >
              <div className={`flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center rounded-2xl border ${theme.outline} ${theme.surfaceElevated}`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.onSurfaceVariant}`}>{month}</span>
                <span className={`text-xl font-bold leading-none ${theme.onSurface}`}>{day}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={`m-0 mb-1 text-lg font-bold leading-tight ${theme.onSurface}`}
                  style={{ viewTransitionName: `memory-title-${memory.$id}` }}
                >
                  {namePreview}
                </h3>
                <p className={`m-0 text-sm leading-relaxed ${theme.onSurfaceVariant}`}>
                  {descPreview}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {memory.mood && (
                    <span className={`text-xs ${theme.onSurfaceVariant}`}>Mood: {memory.mood}</span>
                  )}
                  {memory.location && (
                    <div className={`text-xs ${theme.onSurfaceVariant}`}>{memory.location}</div>
                  )}
                  {memory.tag && (
                    <div 
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ 
                        backgroundColor: tagBackgroundColor,
                        color: tagTextColor,
                        border: `1px solid ${tagBorderColor}`,
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
