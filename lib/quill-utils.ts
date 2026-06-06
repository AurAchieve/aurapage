import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

export interface ListenedToSong {
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
}

export interface ParsedDescriptionWithSong {
  cleanDescription: string;
  song: ListenedToSong | null;
}

const LISTENED_TO_PREFIX = '%%LISTENED_TO:';
const LISTENED_TO_SUFFIX = '%%';

export function parseDescriptionWithSong(description: string): ParsedDescriptionWithSong {
  const originalDescription = String(description ?? '');
  const listenedToIndex = originalDescription.lastIndexOf(LISTENED_TO_PREFIX);

  if (listenedToIndex === -1) {
    return {
      cleanDescription: originalDescription,
      song: null,
    };
  }

  const suffixIndex = originalDescription.lastIndexOf(LISTENED_TO_SUFFIX);

  if (suffixIndex === -1 || suffixIndex < listenedToIndex + LISTENED_TO_PREFIX.length) {
    return {
      cleanDescription: originalDescription,
      song: null,
    };
  }

  const songJson = originalDescription
    .slice(listenedToIndex + LISTENED_TO_PREFIX.length, suffixIndex)
    .trim();

  const cleanDescription = originalDescription
    .slice(0, listenedToIndex)
    .replace(/(?:\r?\n)+$/, '');

  try {
    return {
      cleanDescription,
      song: JSON.parse(songJson) as ListenedToSong,
    };
  } catch (error) {
    console.error('Error parsing listened-to soundtrack metadata:', error);
    return {
      cleanDescription,
      song: null,
    };
  }
}

export function deltaToHtml(deltaString: string): string {
  try {
    const delta = JSON.parse(deltaString);
    const ops = delta.ops || delta;
    const converter = new QuillDeltaToHtmlConverter(ops, {});
    return converter.convert();
  } catch (error) {
    console.error('Error parsing Quill Delta:', error);
    return deltaString;
  }
}

export function deltaToPlainText(deltaString: string, maxLength: number = 150): string {
  try {
    const delta = JSON.parse(deltaString);
    const ops = delta.ops || delta;
    
    let text = '';
    for (const op of ops) {
      if (typeof op.insert === 'string') {
        text += op.insert;
      }
    }
    
    text = text.trim();
    if (text.length > maxLength) {
      return text.substring(0, maxLength).trim() + '...';
    }
    return text;
  } catch (error) {
    console.error('Error parsing Quill Delta:', error);
    const text = String(deltaString);
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}

export function isQuillDelta(str: string): boolean {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed.ops) || Array.isArray(parsed);
  } catch {
    return false;
  }
}
