import React from 'react';
import { PublicUser } from '@/lib/types';
import { Theme } from '@/lib/themes';
import { Sparkles, MapPin, Music, Coffee, Camera, Plane } from 'lucide-react';

interface StatsGridProps {
  user: PublicUser;
  theme: Theme;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ user, theme }) => {
  const memories = [
    {
      title: "we went to antartica",
      description: "penguins are gangsta",
      icon: MapPin,
      color: "bg-[#E63946]",
    },
    {
      title: "did sm hacking and shi",
      description: "im such a nerd",
      icon: Coffee,
      color: "bg-[#06D6A0]",
    },
    {
      title: "i got a wife",
      description: "she loves the game",
      icon: Music,
      color: "bg-[#FFB703]",
    },
    {
      title: "pictured my city",
      description: "the dawgs be everywhere",
      icon: Camera,
      color: "bg-[#0077B6]",
    },
    {
      title: "trip to japan'o desu",
      description: "shizuka-chan :blush:",
      icon: Plane,
      color: "bg-[#FB5607]",
    },
    {
      title: "i met john cena",
      description: `he's a cool guy`,
      icon: Sparkles,
      color: "bg-[#7209B7]",
    }
  ];

  return (
    <div className={`${theme.font || 'font-inter'} w-full`}>
      <div className="mb-10">
        <h3 className={`text-2xl font-bold mb-2 ${theme.onSurface}`}>{user.name}'s Public Memories</h3>
        <div className={`h-1 w-16 ${theme.primaryContainer}`}></div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {memories.map((memory, index) => (
          <div key={index} className={`group p-4 flex items-start gap-4 transition-all duration-300 hover:scale-102 ${theme.surfaceContainer} ${theme.radius}`} style={{ boxShadow: `0 2px 8px rgba(0,0,0,0.1)` }}>
            <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center text-white rounded-lg transition-transform group-hover:scale-110 ${memory.color}`} style={{ boxShadow: `0 4px 12px rgba(0,0,0,0.2)` }}>
              <memory.icon size={24} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`m-0 mb-1 text-lg font-bold leading-tight ${theme.onSurface}`}>{memory.title}</h3>
              <p className={`m-0 p-0 text-sm leading-relaxed ${theme.onSurfaceVariant}`}>{memory.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
