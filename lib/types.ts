export interface UserProfile {
  $id: string;
  userId: string;
  username: string;
  aura: number;
  avatarId?: string;
  streak?: number; 
  totalTasks?: number;
  e2e?: boolean | null;
}

export interface Theme {
  surface: string;
  surfaceElevated: string;
  readingSurface: string;
  readingOnSurface: string;
  onSurface: string;
  onSurfaceVariant: string;
  surfaceContainer: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  onPrimary?: string;
  primary: string;
  divider: string;
  accent: string;
  fabBackground: string;
  fabIcon: string;
  outline: string;
  radius: string;
  font?: string;
}

export interface AuraPage {
  $id: string;
  username: string;
  theme: 'default' | 'hacker' | 'peace' | 'midnight' | 'inferno' | 'gold' | 'galactic' | 'early' | 'spider';
  enable: boolean;
  bio?: string;
}

export interface Memory {
  $id: string;
  name: string;
  description: string;
  public: boolean;
  mood?: string;
  timestamp?: string;
  location?: string;
  tag?: string;
  tagColor?: string;
  files?: string | string[];
  [key: string]: any;
}

export interface PublicUser {
  name: string;
  username: string;
  aura: number;
  auraLevel: string;
  theme: string;
  avatarUrl?: string;
  bio?: string;
  stats: {
    streak: number;
    totalTasks: number;
  };
  joinedAt: string;
  memories: Memory[];
}
