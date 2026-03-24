import type { Theme } from '../types';
import { defaultTheme } from './default';
import { hackerTheme } from './hacker';
import { peaceTheme } from './peace';
import { midnightTheme } from './midnight';
import { infernoTheme } from './inferno';
import { goldTheme } from './gold';
import { galacticTheme } from './galactic';
import { earlyTheme } from './early';
import { spiderTheme } from './spider';

export const themes: Record<string, Theme> = {
  default: defaultTheme,
  hacker: hackerTheme,
  peace: peaceTheme,
  midnight: midnightTheme,
  inferno: infernoTheme,
  gold: goldTheme,
  galactic: galacticTheme,
  early: earlyTheme,
  spider: spiderTheme,
};

export const getTheme = (themeName: string): Theme => {
  return themes[themeName] || themes.default;
};

export function getContrastColor(hexColor: string): string {
  if (!hexColor) return '#ffffff';

  const normalizedColor = normalizeTagColor(hexColor);
  if (!normalizedColor) return '#ffffff';

  if (normalizedColor.startsWith('rgb')) {
    const rgbValues = normalizedColor.match(/\d+(?:\.\d+)?/g);
    if (!rgbValues || rgbValues.length < 3) return '#000000';

    const r = Number(rgbValues[0]);
    const g = Number(rgbValues[1]);
    const b = Number(rgbValues[2]);

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  }

  const namedColors: Record<string, string> = {
    white: '#ffffff',
    black: '#000000',
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#ffff00',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    purple: '#800080',
    pink: '#ffc0cb',
    orange: '#ffa500',
    gray: '#808080',
    grey: '#808080',
    silver: '#c0c0c0',
    gold: '#ffd700',
    brown: '#a52a2a',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
    teal: '#008080',
    lime: '#00ff00',
    indigo: '#4b0082',
    violet: '#ee82ee',
    lavender: '#e6e6fa',
    beige: '#f5f5dc',
    ivory: '#fffff0',
    mint: '#98ff98',
    coral: '#ff7f50',
    salmon: '#fa8072',
  };

  let hex = normalizedColor.toLowerCase().replace(/[^0-9a-f]/g, '');

  const cleanName = normalizedColor.toLowerCase().trim();
  if (namedColors[cleanName]) {
    hex = namedColors[cleanName].replace('#', '');
  }

  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  if (hex.length !== 6) return '#000000';

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  return (yiq >= 128) ? '#000000' : '#ffffff';
}

export function normalizeTagColor(color?: string): string | undefined {
  if (!color) return undefined;

  const input = color.trim();
  if (!input) return undefined;

  if (/^(rgb|hsl)a?\(/i.test(input)) return input;
  if (/^[a-z]+$/i.test(input)) return input;

  if (/^#[0-9a-f]{3}$/i.test(input) || /^#[0-9a-f]{6}$/i.test(input) || /^#[0-9a-f]{8}$/i.test(input)) {
    return input;
  }

  if (/^[0-9a-f]{3}$/i.test(input) || /^[0-9a-f]{6}$/i.test(input)) {
    return `#${input}`;
  }

  const flutterHex = input.match(/^0x([0-9a-f]{8})$/i);
  if (flutterHex) {
    const value = flutterHex[1];
    const a = parseInt(value.slice(0, 2), 16) / 255;
    const r = parseInt(value.slice(2, 4), 16);
    const g = parseInt(value.slice(4, 6), 16);
    const b = parseInt(value.slice(6, 8), 16);
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
  }

  if (/^\d+$/.test(input)) {
    const numericValue = Number(input);
    if (!Number.isNaN(numericValue)) {
      const hex = numericValue.toString(16).padStart(8, '0').slice(-8);
      const a = parseInt(hex.slice(0, 2), 16) / 255;
      const r = parseInt(hex.slice(2, 4), 16);
      const g = parseInt(hex.slice(4, 6), 16);
      const b = parseInt(hex.slice(6, 8), 16);
      return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
    }
  }

  return undefined;
}
