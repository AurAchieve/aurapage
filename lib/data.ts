import { createAdminClient, Query } from './appwrite';
import { PublicUser, UserProfile, AuraPage, Memory } from './types';
import { Client as AppwriteClient, Storage, Models } from 'appwrite';
import { fetchPublicMemories, shouldFetchMemories, needsDecryption } from './memories';

const { databases, users } = createAdminClient();

const clientSDK = new AppwriteClient()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!);

const storage = new Storage(clientSDK);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
const PROFILES_COLLECTION_ID = process.env.PROFILES_COLLECTION_ID!;
const AURAPAGE_COLLECTION_ID = process.env.AURAPAGE_COLLECTION_ID!;
const TASKS_COLLECTION_ID = process.env.TASKS_COLLECTION_ID!;

function calculateAuraLevel(aura: number): string {
  if (aura < 100) return 'Novice';
  if (aura < 500) return 'Apprentice';
  if (aura < 1000) return 'Adept';
  if (aura < 5000) return 'Expert';
  if (aura < 10000) return 'Master';
  if (aura < 50000) return 'Grandmaster';
  return 'Ascended';
}

function buildAvatarUrl(username: string, version?: string): string {
  const avatarUrl = storage.getFileView(
    process.env.APPWRITE_BUCKET_ID!,
    `${username}`
  ).toString();

  if (!version) return avatarUrl;

  const separator = avatarUrl.includes('?') ? '&' : '?';
  return `${avatarUrl}${separator}v=${encodeURIComponent(version)}`;
}

export async function getUserByUsername(username: string): Promise<PublicUser | null> {
  try {
    const auraPageResponse = await databases.listDocuments<AuraPage & Models.Document>(
      DATABASE_ID,
      AURAPAGE_COLLECTION_ID,
      [Query.equal('username', username), Query.limit(1)]
    );

    if (auraPageResponse.documents.length === 0) {
      return null;
    }

    const auraPage = auraPageResponse.documents[0];

    if (auraPage.enable === false) {
      return null;
    }

    const profileResponse = await databases.listDocuments<UserProfile & Models.Document>(
      DATABASE_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal('username', username), Query.limit(1)]
    );

    if (profileResponse.documents.length === 0) {
      return null;
    }

    const profile = profileResponse.documents[0];

    let name = 'Anonymous Aura';
    let joinedAt = profile.$createdAt;
    try {
      const user = await users.get(profile.userId);
      name = user.name || name;
      joinedAt = user.registration;
    } catch (error) {
      console.error('Error fetching user from Auth:', error);
    }

    let totalTasks = profile.totalTasks || 0;
    let streak = profile.streak || 0;

    if (totalTasks === 0 && TASKS_COLLECTION_ID) {
      try {
        const tasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_COLLECTION_ID,
            [
                Query.equal('userId', profile.userId),
                Query.limit(1)
            ]
        );
        totalTasks = tasks.total;
      } catch (e) {
        console.error("Failed to count tasks", e);
      }
    }

    let memories: Memory[] = [];
    if (shouldFetchMemories(profile.e2e)) {
      try {
        const decrypt = needsDecryption(profile.e2e);
        memories = await fetchPublicMemories(profile.userId, decrypt);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    }

    return {
      username: profile.username,
      name: name,
      aura: profile.aura || 0,
      auraLevel: calculateAuraLevel(profile.aura || 0),
      theme: auraPage.theme || 'default',
      avatarUrl: buildAvatarUrl(profile.username, profile.$updatedAt),
      bio: auraPage.bio,
      stats: {
        streak: streak,
        totalTasks: totalTasks,
      },
      joinedAt: joinedAt,
      memories: memories
    };

  } catch (error) {
    console.error('Error fetching public user:', error);
    return null;
  }
}
