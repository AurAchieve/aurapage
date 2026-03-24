'use client';

import React from 'react';
import { DefaultBackground } from './backgrounds/DefaultBackground';
import { HackerBackground } from './backgrounds/HackerBackground';
import { PeaceBackground } from './backgrounds/PeaceBackground';
import { MidnightBackground } from './backgrounds/MidnightBackground';
import { InfernoBackground } from './backgrounds/InfernoBackground';
import { GoldBackground } from './backgrounds/GoldBackground';
import { GalacticBackground } from './backgrounds/GalacticBackground';
import { EarlyBackground } from './backgrounds/EarlyBackground';
import { SpiderBackground } from './backgrounds/SpiderBackground';

interface ThemeBackgroundProps {
  theme: string;
}

export const ThemeBackground: React.FC<ThemeBackgroundProps> = ({ theme }) => {
  switch (theme) {
    case 'hacker':
      return <HackerBackground />;
    case 'peace':
      return <PeaceBackground />;
    case 'midnight':
      return <MidnightBackground />;
    case 'inferno':
      return <InfernoBackground />;
    case 'gold':
      return <GoldBackground />;
    case 'galactic':
      return <GalacticBackground />;
    case 'early':
      return <EarlyBackground />;
    case 'spider':
      return <SpiderBackground />;
    case 'default':
      return <DefaultBackground />;
    default:
      return <DefaultBackground />;
  }
};
