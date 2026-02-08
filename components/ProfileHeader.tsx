'use client';

import React, { useState } from 'react';
import { PublicUser } from '@/lib/types';
import { Theme } from '@/lib/themes';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface ProfileHeaderProps {
  user: PublicUser;
  theme: Theme;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, theme }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div className={`fixed top-0 left-0 w-full px-4 py-3 z-50 backdrop-blur-sm ${theme.surface}`}>
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
          <Link href="https://aurachieve.com" className={`font-garamond text-xl font-bold hover:opacity-70 transition-opacity ${theme.onSurface}`}>
            AurAchieve
          </Link>
          <div className={`text-xs font-semibold px-3 py-1 rounded-full opacity-80 ${theme.primaryContainer} ${theme.onPrimaryContainer}`}>
            AuraPage
          </div>
        </div>
      </div>

      <div className={`flex flex-col items-center justify-center text-center w-full lg:items-start lg:text-left lg:sticky lg:top-24 ${theme.font || 'font-gabarito'}`}>
        <div className={`w-[140px] h-[140px] rounded-full border-2 p-0 overflow-hidden relative mb-6 flex items-center justify-center transition-transform hover:scale-105 ${theme.outline} ${theme.surfaceContainer}`} style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.2)` }}>
          {user.avatarUrl && !imageError ? (
            <Image 
              src={user.avatarUrl} 
              alt={user.username}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className={`text-6xl font-bold ${theme.onSurfaceVariant}`}>{user.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        
        <h2 className={`text-4xl font-bold m-0 mb-2 ${theme.onSurface}`}>{user.name}</h2>
        <p className={`text-sm tracking-wide uppercase opacity-70 m-0 mb-4 ${theme.onSurfaceVariant}`}>@{user.username}</p>
        {user.bio && <p className={`m-0 mb-6 p-0 text-base max-w-md leading-relaxed ${theme.onSurfaceVariant}`}>{user.bio}</p>}
        
        <div className={`px-5 py-3 flex items-center justify-center w-fit gap-2 font-semibold transition-all hover:scale-105 ${theme.primaryContainer} ${theme.onPrimaryContainer} ${theme.radius}`} style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.15)` }}>
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          <span>{user.aura.toLocaleString()} Aura</span>
        </div>
      </div>
    </>
  );
};
