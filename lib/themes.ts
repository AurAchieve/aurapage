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
};

export const getTheme = (themeName: string): Theme => {
  return themes[themeName] || themes.default;
};
