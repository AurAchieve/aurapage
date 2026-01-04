# Memories Implementation for AuraPages

## Overview
AuraPages now displays real memories from the MemoryLanes database instead of dummy data. Memories are fetched based on the user's `e2e` field in the profiles collection and are decrypted using AES-256 encryption.

## How It Works

### 1. User Configuration (e2e field)
The `e2e` field in the profiles collection determines memory handling:
- `null`: User has no memories (nothing will be fetched)
- `false`: Fetch and display memories from memorylanes_database (default for web)
- `true`: End-to-end encrypted (not supported on web, reserved for mobile app)

### 2. Memory Fetching
- Each user has their own collection in the `memorylanes_database`
- Collection ID = username
- Only memories with `public: true` are fetched
- Memories are ordered by creation date (most recent first)

### 3. Decryption
- Memory `name` and `description` fields are encrypted using AES-256
- Decryption key: `MEMORYLANES_ENCRYPTION_KEY` from environment variables
- Uses `crypto-js` library for decryption

### 4. Display Features
- **Expandable cards**: Tap/click to expand long memory descriptions
- **Rich text formatting**: Supports bold (`**text**` or `__text__`) and italic (`*text*` or `_text_`)
- **Icons**: Automatically assigned based on mood or rotated through a set of icons
- **Location display**: Shows location if available
- **Color-coded cards**: Each memory gets a unique color from a predefined palette

## Installation

1. Install dependencies:
```bash
npm install crypto-js @types/crypto-js
```

2. Update your `.env` file with MemoryLanes credentials:
```env
MEMORYLANES_DATABASE_ID=your-memorylanes-db-id
MEMORYLANES_ENCRYPTION_KEY=your-encryption-key
MEMORYLANES_STORAGE_BUCKET_ID=your-storage-bucket-id
```

## Files Modified

### New Files
- `/lib/memories.ts`: Memory fetching and decryption utilities
  - `fetchPublicMemories()`: Fetches public memories for a user
  - `decryptField()`: Decrypts AES-256 encrypted text
  - `shouldFetchMemories()`: Checks if memories should be fetched

### Modified Files
- `/lib/types.ts`: Added `Memory` interface and updated `UserProfile` and `PublicUser`
- `/lib/data.ts`: Updated `getUserByUsername()` to fetch memories
- `/components/StatsGrid.tsx`: Complete rewrite to display real memories with expand/collapse
- `/package.json`: Added `crypto-js` and `@types/crypto-js` dependencies
- `/.env.example`: Added `APPWRITE_BUCKET_ID` documentation
- `/.env`: Added missing MemoryLanes environment variables

## Memory Data Structure

```typescript
interface Memory {
  $id: string;           // Unique ID
  name: string;          // Encrypted - Title of the memory
  description: string;   // Encrypted - Full description
  public: boolean;       // Only true memories are shown
  mood?: string;         // Optional mood (affects icon selection)
  timestamp?: string;    // When the memory occurred
  location?: string;     // Where the memory occurred
}
```

## Usage Example

### In MemoryLanes App
When creating a memory, ensure:
1. Set `public: true` for memories you want to show on AuraPage
2. Encrypt `name` and `description` fields using AES-256 with `MEMORYLANES_ENCRYPTION_KEY`
3. Store in the user's personal collection (collection ID = username)

### Testing
To test, you need a user with:
1. An aurapage enabled (`enable: true` in aurapage collection)
2. `e2e: false` in profiles collection
3. A collection in memorylanes_database with their username as the collection ID
4. At least one document with `public: true`

## Rich Text Formatting Examples

Users can format their memory text:
- `**bold text**` → **bold text**
- `__bold text__` → **bold text**
- `*italic text*` → *italic text*
- `_italic text_` → *italic text*
- Combined: `**This is _very_ important**` → **This is _very_ important**

## Next Steps

1. Run `npm install` to install the new dependencies
2. Verify environment variables are set correctly
3. Test with a user who has public memories
4. Deploy to production

## Troubleshooting

### No memories showing
- Check user's `e2e` field (should be `false`)
- Verify collection exists in memorylanes_database with username as collection ID
- Ensure at least one memory has `public: true`
- Check console for decryption errors

### Decryption errors
- Verify `MEMORYLANES_ENCRYPTION_KEY` matches the key used to encrypt
- Check that name/description fields are properly encrypted

### Collection not found
- Ensure the user has a collection in memorylanes_database
- Collection ID must exactly match the username
