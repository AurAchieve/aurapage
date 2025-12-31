import { getUserByUsername } from '@/lib/data';
import { ProfileHeader } from '@/components/ProfileHeader';
import { StatsGrid } from '@/components/StatsGrid';
import { ThemeBackground } from '@/components/ThemeBackground';
import { getTheme } from '@/lib/themes';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { clsx } from 'clsx';

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: 'User Not Found | AuraPages',
    };
  }

  return {
    title: `${user.name} (@${user.username}) | AuraPages`,
    description: `Check out ${user.name}'s stats on AuraPages. Level: ${user.auraLevel} | Aura: ${user.aura}`,
    openGraph: {
      title: `${user.name} on AuraPages`,
      description: `Level: ${user.auraLevel} | Aura: ${user.aura}`,
      images: [
        {
          url: `/api/og?username=${username}`, // We'll implement this or use the file convention
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const theme = getTheme(user.theme);

  return (
    <main className={`min-h-screen flex flex-col items-center pt-20 ${theme.surface} ${theme.font || ''} relative`}>
      <ThemeBackground theme={user.theme} />
      <div className="w-full max-w-6xl px-4 lg:px-8 py-8 lg:py-12 z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Profile Info (Sticky on Desktop) */}
          <div className="w-full lg:w-[350px] shrink-0">
            <ProfileHeader user={user} theme={theme} />
          </div>

          {/* Right Column: Memories / Content */}
          <div className="w-full flex-1">
            <div className={`lg:hidden w-full border-t my-6 ${theme.outline}`} />
            <StatsGrid user={user} theme={theme} />
          </div>

        </div>
        
        <div className={`mt-12 text-center text-sm ${theme.onSurfaceVariant}`}>
          <p>Get your AuraPage with <a href="https://aurachieve.com" className={`${theme.primary} hover:underline`}>AurAchieve</a>.</p>
      </div>
      </div>
    </main>
  );
}
