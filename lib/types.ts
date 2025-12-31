export interface UserProfile {
  $id: string;
  userId: string;
  username: string;
  aura: number;
  avatarId?: string;
  streak?: number; 
  totalTasks?: number;
}

export interface AuraPage {
  $id: string;
  username: string;
  theme: 'default' | 'hacker' | 'peace' | 'midnight' | 'inferno' | 'gold';
  enable: boolean;
}

export interface PublicUser {
  name: string;
  username: string;
  aura: number;
  auraLevel: string;
  theme: string;
  avatarUrl?: string;
  stats: {
    streak: number;
    totalTasks: number;
  };
  joinedAt: string;
}
