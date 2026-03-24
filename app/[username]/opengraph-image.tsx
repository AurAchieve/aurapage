import { ImageResponse } from 'next/og';
import { getUserByUsername } from '@/lib/data';

export const runtime = 'nodejs';

export const alt = 'AuraPages Profile';
export const size = {
  width: 500,
  height: 500,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          User not found
        </div>
      ),
      {
        ...size,
      }
    );
  }

  const colors: Record<string, { bg: string; text: string; accent: string; panel: string }> = {
    default: { bg: '#0b1224', text: '#e2e8f0', accent: '#38bdf8', panel: '#11182c' },
    hacker: { bg: '#050a07', text: '#d1fae5', accent: '#22c55e', panel: '#0a1610' },
    peace: { bg: '#0f172a', text: '#e2e8f0', accent: '#0ea5e9', panel: '#131c32' },
    midnight: { bg: '#080b14', text: '#e5e7eb', accent: '#a78bfa', panel: '#0f1320' },
    inferno: { bg: '#1b0a06', text: '#ffe4e6', accent: '#ef4444', panel: '#230e0a' },
    gold: { bg: '#0f0f0f', text: '#fef3c7', accent: '#eab308', panel: '#171717' },
    galactic: { bg: '#020617', text: '#e0f2fe', accent: '#22d3ee', panel: '#0a1026' },
    early: { bg: '#05060b', text: '#e0f2fe', accent: '#38bdf8', panel: '#0b0e1a' },
  };

  const theme = colors[user.theme] || colors.default;
  const initial = (user.name?.[0] || user.username?.[0] || '?').toUpperCase();

  let avatarUrl = user.avatarUrl;

  if (avatarUrl && avatarUrl.includes('/view')) {
    try {
        const urlObj = new URL(avatarUrl);
        
        if (urlObj.pathname.endsWith('/view')) {
           urlObj.pathname = urlObj.pathname.replace(/\/view$/, '/preview');
        }
        urlObj.searchParams.set('output', 'png');
        urlObj.searchParams.set('width', '500');
        urlObj.searchParams.set('height', '500');
        urlObj.searchParams.set('quality', '80');
        avatarUrl = urlObj.toString();
    } catch (e) {
        console.error('Error transforming avatar URL:', e);
    }
  }

  let hasAvatar = false;
  if (avatarUrl) {
    try {
      const res = await fetch(avatarUrl, { method: 'HEAD', cache: 'no-store' });
      if (res.ok && res.headers.get('content-type')?.startsWith('image/')) {
        hasAvatar = true;
      }
    } catch (error) {
      console.error('Failed to check avatar for OG image', error);
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.bg,
          color: theme.text,
        }}
      >
        <div
          style={{
            width: 500,
            height: 500,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hasAvatar ? (
            <img
              src={avatarUrl}
              alt={`${user.name} avatar`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ fontSize: 200, fontWeight: 800, color: theme.accent }}>{initial}</div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
