import { getUserByUsername } from '@/lib/data';
import { getTheme, getContrastColor } from '@/lib/themes';
import { notFound } from 'next/navigation';
import { ThemeBackground } from '@/components/ThemeBackground';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Tag } from 'lucide-react';
import { deltaToHtml, isQuillDelta } from '@/lib/quill-utils';
import { Metadata } from 'next';
import { MemoryFiles, MemoryFile } from '@/components/MemoryFiles';
import { Client as AppwriteClient, Storage } from 'appwrite';

interface PageProps {
  params: Promise<{ username: string; memoryId: string }>;
}

const clientSDK = new AppwriteClient()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!);

const storage = new Storage(clientSDK);

const getFileUrl = (fileName: string): string => {
  const BUCKET_ID = process.env.MEMORYLANES_STORAGE_BUCKET_ID!;
  return storage.getFileView(BUCKET_ID, fileName).toString();
};

const getFileType = (fileName: string): 'image' | 'video' | 'audio' | 'unknown' => {
  const ext = fileName.toLowerCase().split('.').pop() || '';
  
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
  const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
  const audioExts = ['mp3', 'wav', 'ogg', 'aac', 'm4a'];
  
  if (imageExts.includes(ext)) return 'image';
  if (videoExts.includes(ext)) return 'video';
  if (audioExts.includes(ext)) return 'audio';
  
  return 'unknown';
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username, memoryId } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: 'Memory Not Found | AuraPages',
    };
  }

  const memory = user.memories.find(m => m.$id === memoryId);
  
  if (!memory) {
    return {
      title: 'Memory Not Found | AuraPages',
    };
  }

  return {
    title: `${memory.name} - ${user.name}'s Memory | AuraPage`,
    description: `View ${user.name}'s memory on AuraPages`,
  };
}

export default async function MemoryPage({ params }: PageProps) {
  const { username, memoryId } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const memory = user.memories.find(m => m.$id === memoryId);

  if (!memory) {
    notFound();
  }

  const theme = getTheme(user.theme);

  const nameHtml = isQuillDelta(memory.name) ? deltaToHtml(memory.name) : memory.name;
  const descriptionHtml = isQuillDelta(memory.description) ? deltaToHtml(memory.description) : memory.description;

  const memoryFiles: MemoryFile[] = [];
  if (memory.files) {
    const fileList = Array.isArray(memory.files) ? memory.files : memory.files.split(',');
    fileList.forEach(fileName => {
      const trimmedName = fileName.trim();
      if (trimmedName) {
        memoryFiles.push({
          id: trimmedName,
          url: getFileUrl(trimmedName),
          type: getFileType(trimmedName)
        });
      }
    });
  }

  return (
    <main className={`min-h-screen flex flex-col items-center ${theme.surface} ${theme.onSurface} ${theme.font || ''} relative`}>
      <ThemeBackground theme={user.theme} />
      
      <div className={`fixed top-0 left-0 w-full px-4 py-3 z-50 backdrop-blur-sm ${theme.surface}`}>
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
          <Link href="https://aurachieve.com" className={`font-garamond text-xl font-bold hover:opacity-70 transition-opacity ${theme.onSurface}`}>
            AurAchieve
          </Link>
          <div className={`text-xs font-semibold px-3 py-1 rounded-full opacity-80 ${theme.primaryContainer} ${theme.onPrimaryContainer}`}>
            AuraPage
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 lg:px-8 py-24 z-10">
        <Link 
          href={`/${username}`}
          className={`inline-flex items-center gap-2 mb-6 ${theme.primary} hover:opacity-70 transition-opacity`}
        >
          <ArrowLeft size={20} />
          <span>Back to {user.name}'s profile</span>
        </Link>

        <div className={`p-8 ${theme.surfaceContainer} ${theme.radius}`} style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.1)` }}>
          <h1 
            className={`text-4xl font-bold mb-6 ${theme.onSurface}`}
            dangerouslySetInnerHTML={{ __html: nameHtml }}
          />

          <div className={`flex flex-wrap gap-4 mb-8 text-sm ${theme.onSurfaceVariant}`}>
            {memory.timestamp && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(memory.timestamp).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
            {memory.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{memory.location}</span>
              </div>
            )}
            {memory.tag && (
              <div 
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-gray-200`}
                style={{ 
                  backgroundColor: memory.tagColor || '#9B5DE5',
                  color: getContrastColor(memory.tagColor || '#9B5DE5')
                }}
              >
                <Tag size={12} />
                <span>{memory.tag}</span>
              </div>
            )}
            {memory.mood && (
              <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${theme.primaryContainer} ${theme.onPrimaryContainer}`}>
                <span className="text-sm">Mood: {memory.mood}</span>
              </div>
            )}
          </div>

          {memoryFiles.length > 0 && (
            <div className="mb-8">
              <MemoryFiles files={memoryFiles} themeRadius={theme.radius} />
            </div>
          )}

          <div 
            className={`prose prose-lg max-w-none`}
            style={{
              color: 'inherit'
            }}
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      </div>
    </main>
  );
}
