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

  // Simple theme mapping for OG image colors
  const colors: Record<string, { bg: string; text: string; accent: string }> = {
    default: { bg: '#f8fafc', text: '#0f172a', accent: '#2563eb' },
    hacker: { bg: '#000000', text: '#22c55e', accent: '#4ade80' },
    peace: { bg: '#f0f9ff', text: '#334155', accent: '#0ea5e9' },
    midnight: { bg: '#020617', text: '#e0e7ff', accent: '#a78bfa' },
    inferno: { bg: '#431407', text: '#ffedd5', accent: '#ef4444' },
    gold: { bg: '#171717', text: '#fef9c3', accent: '#eab308' },
  };

  const theme = colors[user.theme] || colors.default;

  return new ImageResponse(
    (
      <div
        style={{
          background: theme.bg,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.text,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: `4px solid ${theme.accent}`,
            borderRadius: '20px',
            padding: '40px 80px',
            background: theme.bg, // Ensure contrast
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>
            {user.name}
          </div>
          <div style={{ fontSize: 32, opacity: 0.8, marginBottom: 40 }}>
            @{user.username}
          </div>
          
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 'bold', color: theme.accent }}>
                {user.aura.toLocaleString()}
              </div>
              <div style={{ fontSize: 24, opacity: 0.7 }}>Aura</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 'bold', color: theme.accent }}>
                {user.auraLevel}
              </div>
              <div style={{ fontSize: 24, opacity: 0.7 }}>Level</div>
            </div>
          </div>
        </div>
        
        <div style={{ position: 'absolute', bottom: 40, fontSize: 24, opacity: 0.5 }}>
          aurachieve.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
