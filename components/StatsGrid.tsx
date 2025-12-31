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
      title: "We went to the Burj Khalifa",
      description: "It was an amazing experience!",
      icon: MapPin,
      color: "bg-[#FF6B6B]", // Vibrant Red/Pink
    },
    {
      title: "Late Night Coding Session",
      description: "Shipped the new feature at 3 AM.",
      icon: Coffee,
      color: "bg-[#4ECDC4]", // Vibrant Turquoise
    },
    {
      title: "Concert in the Park",
      description: "The vibes were immaculate.",
      icon: Music,
      color: "bg-[#FFE66D]", // Vibrant Yellow
    },
    {
      title: "Photography Walk",
      description: "Captured some stunning shots downtown.",
      icon: Camera,
      color: "bg-[#1A535C]", // Deep Teal
    },
    {
      title: "Trip to Tokyo",
      description: "Sushi, neon lights, and great friends.",
      icon: Plane,
      color: "bg-[#FF9F1C]", // Bright Orange
    },
    {
      title: "Aura Level Up!",
      description: `Reached ${user.auraLevel} status!`,
      icon: Sparkles,
      color: "bg-[#9B5DE5]", // Vibrant Purple
    }
  ];

  return (
    <div className={`${theme.font || 'font-inter'} w-full`}>
      <p className={`text-lg font-semibold mb-6 ${theme.onSurface}`}>{user.name}'s Public Memories</p>
      
      <div className="grid grid-cols-1 gap-4">
        {memories.map((memory, index) => (
          <div key={index} className={`border p-3 flex items-center hover:shadow-md transition-all duration-200 ${theme.outline} ${theme.radius} ${theme.surfaceContainer} ${theme.font || 'font-gabarito'}`}>
            <div className={`w-14 h-14 flex items-center justify-center text-center ${memory.color} text-white mr-4 shrink-0 shadow-sm ${theme.radius}`}>
              <memory.icon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className={`m-0 mb-1 text-base font-bold ${theme.onSurface}`}>{memory.title}</h3>
              <p className={`m-0 p-0 text-sm ${theme.onSurfaceVariant}`}>{memory.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
