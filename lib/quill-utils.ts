import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

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
