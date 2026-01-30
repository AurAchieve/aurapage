// Light/Dark text selection based on background color brightness
export function getContrastColor(hexColor: string): string {
  if (!hexColor) return '#ffffff';
  
  // Basic named color support for common cases
  const namedColors: Record<string, string> = {
    white: '#ffffff', black: '#000000', red: '#ff0000', green: '#00ff00', blue: '#0000ff',
    yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff', purple: '#800080', 
    pink: '#ffc0cb', orange: '#ffa500', gray: '#808080', grey: '#808080',
    silver: '#c0c0c0', gold: '#ffd700', brown: '#a52a2a', maroon: '#800000',
    navy: '#000080', olive: '#808000', teal: '#008080', lime: '#00ff00',
    indigo: '#4b0082', violet: '#ee82ee', lavender: '#e6e6fa', beige: '#f5f5dc',
    ivory: '#fffff0', mint: '#98ff98', coral: '#ff7f50', salmon: '#fa8072'
  };

  let hex = hexColor.toLowerCase().replace(/[^0-9a-f]/g, ''); // aggressive cleanup assuming hex
  
  // Check if it was a named color originally
  const cleanName = hexColor.toLowerCase().trim();
  if (namedColors[cleanName]) {
    hex = namedColors[cleanName].replace('#', '');
  }

  // Handle short hex codes (e.g. #FFF)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // If parsing fails (not 6 hex chars), default to black text as it's safer on light/colored backgrounds
  // which are more common for "missing" textures than pure black.
  if (hex.length !== 6) return '#000000';

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // Threshold of 128 is standard
  return (yiq >= 128) ? '#000000' : '#ffffff';
}

export interface Theme {
  surface: string;
  onSurface: string;
  onSurfaceVariant: string;
  surfaceContainer: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  onPrimary?: string;
  primary: string;
  outline: string;
  radius: string;
  font?: string;
}

export const themes: Record<string, Theme> = {
  default: {
    surface: 'bg-[#050505]',
    onSurface: 'text-white',
    onSurfaceVariant: 'text-white/60',
    surfaceContainer: 'bg-[#0d0d0d]',
    primaryContainer: 'bg-[#2E8B57]',
    onPrimaryContainer: 'text-white',
    onPrimary: 'text-white',
    primary: 'text-[#76C893]',
    outline: 'border-white/10',
    radius: 'rounded-3xl',
    font: 'font-gabarito',
  },
  hacker: {
    surface: 'bg-black',
    onSurface: 'text-[#00ff41]',
    onSurfaceVariant: 'text-[#008F11]',
    surfaceContainer: 'bg-[#0d0d0d] border border-[#003B00]',
    primaryContainer: 'bg-[#003B00]',
    onPrimaryContainer: 'text-[#00ff41]',
    onPrimary: 'text-black',
    primary: 'text-[#00ff41]',
    outline: 'border-[#00ff41]',
    radius: 'rounded-none',
    font: 'font-vt323 text-xl tracking-wide',
  },
  peace: {
    surface: 'bg-[#fff0f5]',
    onSurface: 'text-[#5e112f]',
    onSurfaceVariant: 'text-[#7a3045]',
    surfaceContainer: 'bg-[#ffe6ef]',
    primaryContainer: 'bg-[#ffb7c5]',
    onPrimaryContainer: 'text-[#5e112f]',
    onPrimary: 'text-white',
    primary: 'text-[#8c1d45]',
    outline: 'border-[#ffb7c5]',
    radius: 'rounded-[2.5rem]',
    font: 'font-quicksand',
  },
  midnight: {
    surface: 'bg-[#0f0f1a]',
    onSurface: 'text-[#e6e1e5]',
    onSurfaceVariant: 'text-[#cac4d0]',
    surfaceContainer: 'bg-[#1d1b2e]',
    primaryContainer: 'bg-[#4f378b]',
    onPrimaryContainer: 'text-[#eaddff]',
    onPrimary: 'text-white',
    primary: 'text-[#d0bcff]',
    outline: 'border-[#938f99]',
    radius: 'rounded-3xl',
    font: 'font-space-grotesk',
  },
  inferno: {
    surface: 'bg-[#201a19]',
    onSurface: 'text-[#ede0de]',
    onSurfaceVariant: 'text-[#d0c4c2]',
    surfaceContainer: 'bg-[#352826]',
    primaryContainer: 'bg-[#ffb4ab]',
    onPrimaryContainer: 'text-[#690005]',
    onPrimary: 'text-white',
    primary: 'text-[#ffb4ab]',
    outline: 'border-[#a08c8a]',
    radius: 'rounded-2xl',
    font: 'font-cinzel',
  },
  gold: {
    surface: 'bg-[#121212]',
    onSurface: 'text-[#f5e6c8]',
    onSurfaceVariant: 'text-[#d4c5a3]',
    surfaceContainer: 'bg-[#1e1e1e] border border-[#d4af37]',
    primaryContainer: 'bg-[#d4af37]',
    onPrimaryContainer: 'text-[#121212]',
    onPrimary: 'text-[#121212]',
    primary: 'text-[#d4af37]',
    outline: 'border-[#d4af37]',
    radius: 'rounded-sm',
    font: 'font-gabarito',
  },
  galactic: {
    surface: 'bg-[#000000]',
    onSurface: 'text-white',
    onSurfaceVariant: 'text-gray-400',
    surfaceContainer: 'bg-[#111111] border border-white/20',
    primaryContainer: 'bg-white',
    onPrimaryContainer: 'text-black',
    onPrimary: 'text-black',
    primary: 'text-white',
    outline: 'border-white',
    radius: 'rounded-lg',
    font: 'font-orbitron tracking-widest',
  },
  early: {
    surface: 'bg-[#0a0a0f]',
    onSurface: 'text-[#e0f2fe]', /* Sky 100 */
    onSurfaceVariant: 'text-[#bae6fd]', /* Sky 200 */
    surfaceContainer: 'bg-[#1e293b]', /* Slate 800 */
    primaryContainer: 'bg-[#0284c7]', /* Sky 600 */
    onPrimaryContainer: 'text-white',
    onPrimary: 'text-white',
    primary: 'text-[#38bdf8]', /* Sky 400 */
    outline: 'border-[#38bdf8]',
    radius: 'rounded-2xl',
    font: 'font-montserrat',
  },
};


export const getTheme = (themeName: string): Theme => {
  return themes[themeName] || themes.default;
};
