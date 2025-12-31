import { createAdminClient, Query } from './appwrite';
import { PublicUser, UserProfile, AuraPage } from './types';
import { Client as AppwriteClient, Storage, Models } from 'appwrite';

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

export async function getUserByUsername(username: string): Promise<PublicUser | null> {
  try {
    // 1. Fetch AuraPage Settings
    const auraPageResponse = await databases.listDocuments<AuraPage & Models.Document>(
      DATABASE_ID,
      AURAPAGE_COLLECTION_ID,
      [Query.equal('username', username), Query.limit(1)]
    );

    if (auraPageResponse.documents.length === 0) {
      return null;
    }

    const auraPage = auraPageResponse.documents[0];

    // Check if profile is enabled
    if (auraPage.enable === false) {
      return null;
    }

    // 2. Fetch User Profile (Stats & Auth ID)
    const profileResponse = await databases.listDocuments<UserProfile & Models.Document>(
      DATABASE_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal('username', username), Query.limit(1)]
    );

    if (profileResponse.documents.length === 0) {
      // AuraPage exists but Profile doesn't? Edge case, but treat as not found or partial?
      // Let's treat as not found for safety
      return null;
    }

    const profile = profileResponse.documents[0];

    // 3. Fetch User Name from Auth
    let name = 'Anonymous Aura';
    let joinedAt = profile.$createdAt;
    try {
      const user = await users.get(profile.userId);
      name = user.name || name;
      joinedAt = user.registration;
    } catch (error) {
      console.error('Error fetching user from Auth:', error);
      // Fallback to profile name if available (not in interface but might exist in DB), or keep default
    }

    // 4. Fetch/Calculate Stats
    // Try to get stats from profile first
    let totalTasks = profile.totalTasks || 0;
    let streak = profile.streak || 0;

    // If totalTasks is 0, maybe try to count them? 
    // (Optional optimization: only if not in profile)
    if (totalTasks === 0 && TASKS_COLLECTION_ID) {
      try {
        // This is expensive if many tasks, but okay for MVP
        // Assuming 'userId' is the field in tasks collection
        const tasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_COLLECTION_ID,
            [
                Query.equal('userId', profile.userId),
                // Query.equal('status', 'completed') // Assuming status field exists
                Query.limit(1) // We just want the total count if possible, but Appwrite list returns total
            ]
        );
        totalTasks = tasks.total;
      } catch (e) {
        console.error("Failed to count tasks", e);
      }
    }

    return {
      username: profile.username,
      name: name,
      aura: profile.aura || 0,
      auraLevel: calculateAuraLevel(profile.aura || 0),
      theme: auraPage.theme || 'default',
      avatarUrl: storage.getFileView({
        bucketId: process.env.APPWRITE_BUCKET_ID!,
        fileId: `${profile.username}`
      }).toString(),
      stats: {
        streak: streak,
        totalTasks: totalTasks,
      },
      joinedAt: joinedAt
    };

  } catch (error) {
    console.error('Error fetching public user:', error);
    return null;
  }
}
