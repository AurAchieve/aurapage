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
      <div className={`fixed top-0 left-0 w-full py-4 text-center z-50 backdrop-blur-md border-b ${theme.surfaceContainer} ${theme.outline}`}>
        <Link href="https://aurachieve.com" className={`font-garamond text-3xl font-bold hover:opacity-80 transition-opacity ${theme.onSurface}`}>
          AurAchieve
        </Link>
      </div>

      <div className={`flex flex-col items-center justify-center text-center w-full lg:items-start lg:text-left lg:sticky lg:top-24 ${theme.font || 'font-gabarito'}`}>
        <div className={`w-[120px] h-[120px] rounded-full border-2 p-0 overflow-hidden relative mb-4 shadow-lg flex items-center justify-center ${theme.outline} ${theme.surfaceContainer}`}>
          {user.avatarUrl && !imageError ? (
            <Image 
              src={user.avatarUrl} 
              alt={user.username}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className={`text-5xl font-bold ${theme.onSurfaceVariant} ${theme.font || 'font-gabarito'}`}>{user.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        
        <h2 className={`text-3xl font-bold m-0 mb-2 ${theme.onSurface} ${theme.font || 'font-gabarito'}`}>{user.name}</h2>
        <p className={`m-0 mb-4 p-0 text-lg max-w-md ${theme.onSurfaceVariant} ${theme.font || 'font-gabarito'}`}>Hey! I'm an extremely cool guy.</p>
        
        <div className={`border rounded-full px-4 py-2 flex items-center justify-center w-fit gap-2 shadow-sm hover:shadow-md transition-shadow ${theme.outline} ${theme.surfaceContainer}`}>
          <span className={`material-symbols-rounded select-none ${theme.primary}`}>auto_awesome</span>
          <span className={`font-semibold ${theme.onSurface} ${theme.font || 'font-gabarito'}`}>Aura: {user.aura.toLocaleString()}</span>
        </div>
      </div>
    </>
  );
};
