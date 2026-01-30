import { ImageResponse } from 'next/og';
import { getUserByUsername } from '@/lib/data';

export const runtime = 'nodejs';

export const alt = 'AuraPages Profile';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { username: string } }) {
  const user = await getUserByUsername(params.username);

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
  const title = `${user.name} (@${user.username}) - AuraPage`;
  const description = `${user.name} has ${user.aura.toLocaleString()} aura. See memories and achievements from ${user.name} on AuraPages.`;
  const initial = (user.name?.[0] || user.username?.[0] || '?').toUpperCase();

  let avatarDataUrl: string | null = null;
  if (user.avatarUrl) {
    try {
      const res = await fetch(user.avatarUrl, { cache: 'no-store' });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || 'image/png';
        const buffer = Buffer.from(await res.arrayBuffer());
        const base64 = buffer.toString('base64');
        avatarDataUrl = `data:${contentType};base64,${base64}`;
      }
    } catch (error) {
      console.error('Failed to fetch avatar for OG image', error);
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
          justifyContent: 'space-between',
          background: theme.bg,
          color: theme.text,
          padding: '72px 96px',
          boxSizing: 'border-box',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: '65%' }}>
          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 28, opacity: 0.88, lineHeight: 1.4 }}>{description}</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div
              style={{
                background: theme.panel,
                border: `1px solid ${theme.accent}40`,
                borderRadius: 14,
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              <span style={{ color: theme.accent }}>Aura</span>
              <span>{user.aura.toLocaleString()}</span>
            </div>
            <div
              style={{
                background: theme.panel,
                border: `1px solid ${theme.accent}40`,
                borderRadius: 14,
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              <span style={{ color: theme.accent }}>Level</span>
              <span>{user.auraLevel}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            border: `10px solid ${theme.accent}`,
            boxShadow: '0 18px 48px rgba(0,0,0,0.35)',
            overflow: 'hidden',
            background: theme.panel,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {avatarDataUrl ? (
            <img
              src={avatarDataUrl}
              alt={`${user.name} avatar`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ fontSize: 96, fontWeight: 800, color: theme.accent }}>{initial}</div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
