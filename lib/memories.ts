import { createAdminClient, Query } from './appwrite';
import { Memory } from './types';
import { Models } from 'node-appwrite';
import crypto from 'crypto';

const MEMORYLANES_DATABASE_ID = process.env.MEMORYLANES_DATABASE_ID!;
const MEMORYLANES_ENCRYPTION_KEY = process.env.MEMORYLANES_ENCRYPTION_KEY!;

function deriveAesKey(): Buffer {
  return crypto.createHash('sha256').update(MEMORYLANES_ENCRYPTION_KEY).digest();
}

function decryptField(packed: string): string {
  try {
    if (!packed) return packed;
    
    const text = String(packed);
    const parts = text.split('.');
    
    if (parts.length !== 3) return packed;
    
    const [ivB64, tagB64, ctB64] = parts;
    const iv = Buffer.from(ivB64, 'base64');
    const tag = Buffer.from(tagB64, 'base64');
    const ciphertext = Buffer.from(ctB64, 'base64');
    
    const key = deriveAesKey();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plaintext.toString('utf8');
  } catch (error) {
    console.error('Decryption error:', error);
    return packed;
  }
}

function decryptFilesField(files?: string | string[]): string | string[] | undefined {
  if (!files) return files;

  if (Array.isArray(files)) {
    return files.map(file => decryptField(String(file)));
  }

  return decryptField(String(files));
}

export async function fetchPublicMemories(userId: string, needsDecryption: boolean = true): Promise<Memory[]> {
  try {
    const { databases } = createAdminClient();
    
    const userCollectionId = userId;
    
    const response = await databases.listDocuments<Memory & Models.Document>(
      MEMORYLANES_DATABASE_ID,
      userCollectionId,
      [
        Query.equal('public', true),
        Query.orderDesc('$createdAt'),
        Query.limit(100)
      ]
    );
    
    const processedMemories = response.documents.map(memory => ({
      $id: memory.$id,
      name: needsDecryption ? decryptField(memory.name) : memory.name,
      description: needsDecryption ? decryptField(memory.description) : memory.description,
      public: memory.public,
      mood: (needsDecryption && memory.mood) ? decryptField(memory.mood) : memory.mood,
      timestamp: memory.timestamp || memory.$createdAt,
      location: memory.location,
      tag: (needsDecryption && memory.tag) ? decryptField(memory.tag) : memory.tag,
      tagColor: (needsDecryption && memory.tagColor) ? decryptField(String(memory.tagColor)) : memory.tagColor,
      tagColorEncrypted: memory.tagColor,
      files: needsDecryption ? decryptFilesField(memory.files) : memory.files,
      ...Object.keys(memory).reduce((acc, key) => {
        if (!['$id', 'name', 'description', 'public', 'mood', 'timestamp', 'location', 'tag', 'tagColor', 'files', '$createdAt', '$updatedAt', '$permissions', '$collectionId', '$databaseId'].includes(key)) {
          acc[key] = memory[key];
        }
        return acc;
      }, {} as Record<string, any>)
    }));
    
    return processedMemories;
  } catch (error: any) {
    console.error(`Error fetching memories for userId ${userId}:`, error?.message || error);
    return [];
  }
}

export function shouldFetchMemories(e2e: boolean | null | undefined): boolean {
  return e2e === false || e2e === true;
}

export function needsDecryption(e2e: boolean | null | undefined): boolean {
  return e2e === false || e2e === true;
}
