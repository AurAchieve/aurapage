[AuraPages](https://aurapage.me) - a simple social media-like page to flex your aura to the world. Show the best of your memories and achievements in your style using AuraPages. Choose your favorite page theme from a long list. All open source and written in nextjs. Requires SSR for rendering on a server.

Powered by [AurAchieve](https://aurachieve.com), a open source self-improvement app.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Creating a New Theme

AuraPage uses an extensible theming system that makes it easy for contributors to add new themes. Themes are organized in the `lib/themes` folder for maintainability and contribution-friendly structure.

### Theme Structure

Each theme is a separate file that exports a `Theme` object. The theme system includes:

- **9 built-in themes**: default, hacker, peace, midnight, inferno, gold, galactic, early, spider
- **17 design tokens per theme**: surface colors, text colors, optional font family, border radius, accent colors, and more
- **Optional CSS support**: themes can include custom CSS for specialized styling needs

### Adding a New Theme

1. **Create a new theme file** in `lib/themes/` directory:

```bash
# Example: Create my-cool-theme.ts
touch lib/themes/my-cool-theme.ts
```

2. **Define your theme** using the Theme interface:

```typescript
import type { Theme } from '../types';

export const myCoolTheme: Theme = {
  // Background & surface colors
  surface: 'bg-[#COLOR]',
  surfaceElevated: 'bg-[#COLOR]',
  readingSurface: 'bg-[#COLOR]',
  readingOnSurface: 'text-[#COLOR]',
  
  // Text colors
  onSurface: 'text-[#COLOR]',
  onSurfaceVariant: 'text-[#COLOR]',
  
  // Container styling
  surfaceContainer: 'bg-[#COLOR]',
  primaryContainer: 'bg-[#COLOR]',
  onPrimaryContainer: 'text-[#COLOR]',
  onPrimary: 'text-[#COLOR]',
  
  // Accent colors
  primary: 'text-[#COLOR]',
  accent: '#COLOR',
  
  // UI elements
  divider: 'border-[#COLOR]/[opacity]',
  fabBackground: 'bg-[#COLOR]',
  fabIcon: 'text-[#COLOR]',
  outline: 'border-[#COLOR]',
  
  // Styling
  radius: 'rounded-[size]',
  font: 'font-family-class',
};
```

3. **Export your theme** in `lib/themes/index.ts`:

```typescript
import { myCoolTheme } from './my-cool-theme';

export const themes: Record<string, Theme> = {
  // ... existing themes
  'my-cool-theme': myCoolTheme,
};
```

4. **(Optional) Add custom CSS** in your theme file:

```typescript
export const myCoolThemeCss = `
  /* Custom styles for my-cool-theme */
  .my-cool-theme-specific-class {
    /* Your CSS here */
  }
`;
```

### Theme Design Tokens

| Token | Purpose | Example |
|-------|---------|---------|
| `surface` | Primary background color | `bg-[#050505]` |
| `surfaceElevated` | Elevated surface (cards, dropdowns) | `bg-[#111111]` |
| `readingSurface` | Content reading area background | `bg-[#101111]` |
| `readingOnSurface` | Text color in reading area | `text-[#F7F8F9]` |
| `onSurface` | Primary text color | `text-white` |
| `onSurfaceVariant` | Secondary text color | `text-white/60` |
| `surfaceContainer` | Container backgrounds | `bg-[#0d0d0d]` |
| `primaryContainer` | Primary action container | `bg-[#2E8B57]` |
| `onPrimaryContainer` | Text on primary container | `text-white` |
| `primary` | Primary text/link color | `text-[#76C893]` |
| `accent` | Accent color (hex value) | `#76C893` |
| `divider` | Border/divider color | `border-white/15` |
| `fabBackground` | Floating action button background | `bg-[#121515]` |
| `fabIcon` | FAB icon color | `text-[#76C893]` |
| `outline` | Border/outline color | `border-white/10` |
| `radius` | Border radius utility | `rounded-3xl` |
| `font` | Font family (optional) | `font-gabarito` |

### Cleaning Up Code Comments

To remove unnecessary comments from the codebase (while preserving important notes):

```bash
node scripts/remove-comments.js
```

This script:
- Preserves comments marked with `!`, `TODO`, `FIXME`, `NOTE`, `HACK`, etc.
- Removes inline `//` and block `/* */` comments
- Cleans up extra whitespace
- Skips `node_modules`, `.next`, and build directories
