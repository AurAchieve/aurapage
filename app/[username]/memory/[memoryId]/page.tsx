import { getUserByUsername } from '@/lib/data';
import { getTheme, getContrastColor, normalizeTagColor } from '@/lib/themes';
import { notFound } from 'next/navigation';
import { ThemeBackground } from '@/components/ThemeBackground';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Tag, Download, ExternalLink, Music2 } from 'lucide-react';
import { deltaToHtml, isQuillDelta, deltaToPlainText, parseDescriptionWithSong } from '@/lib/quill-utils';
import { Metadata } from 'next';
import { MemoryFiles, MemoryFile } from '@/components/MemoryFiles';
import { Client as AppwriteClient, Storage } from 'appwrite';
import { MemoryScrollChrome } from '@/components/MemoryScrollChrome';

interface PageProps {
  params: Promise<{ username: string; memoryId: string }>;
}

const clientSDK = new AppwriteClient()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!);

const storage = new Storage(clientSDK);
const BUCKET_ID = process.env.MEMORYLANES_STORAGE_BUCKET_ID!;

const getFileViewUrl = (fileId: string): string => {
  return storage.getFileView({
    bucketId: BUCKET_ID,
    fileId,
  }).toString();
};

const getFilePreviewUrl = (fileId: string): string => {
  return storage.getFilePreview({
    bucketId: BUCKET_ID,
    fileId,
  }).toString();
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

const getFileTypeFromMime = (mimeType?: string): 'image' | 'video' | 'audio' | 'unknown' => {
  if (!mimeType) return 'unknown';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  return 'unknown';
};

interface ParsedFileRef {
  fileId?: string;
  fileName?: string;
  mimeType?: string;
  url?: string;
}

const isParsedFileRef = (value: ParsedFileRef | null): value is ParsedFileRef => value !== null;

const parseFileRef = (value: unknown): ParsedFileRef | null => {
  if (typeof value === 'string') {
    const trimmed = value.trim().replace(/^['\"]|['\"]$/g, '');
    if (!trimmed) return null;

    if (isHttpUrl(trimmed)) {
      return { url: trimmed, fileName: trimmed };
    }

    return { fileId: trimmed, fileName: trimmed };
  }

  if (value && typeof value === 'object') {
    const item = value as Record<string, unknown>;

    const fileIdCandidate = [
      item.fileId,
      item.id,
      item.$id,
      item.storageId,
    ].find(v => typeof v === 'string' && v.trim().length > 0) as string | undefined;

    const fileNameCandidate = [
      item.fileName,
      item.filename,
      item.name,
      item.originalName,
    ].find(v => typeof v === 'string' && v.trim().length > 0) as string | undefined;

    const urlCandidate = [item.url, item.href]
      .find(v => typeof v === 'string' && v.trim().length > 0) as string | undefined;

    const mimeTypeCandidate = [item.mimeType, item.type]
      .find(v => typeof v === 'string' && v.trim().length > 0) as string | undefined;

    if (!fileIdCandidate && !urlCandidate) return null;

    return {
      fileId: fileIdCandidate,
      fileName: fileNameCandidate,
      mimeType: mimeTypeCandidate,
      url: urlCandidate,
    };
  }

  return null;
};

const isHttpUrl = (value: string): boolean => /^https?:\/\//.test(value);

const normalizeRawFileRefs = (rawFiles?: string | string[]): ParsedFileRef[] => {
  if (!rawFiles) return [];

  if (Array.isArray(rawFiles)) {
    return rawFiles
      .map(file => parseFileRef(file))
      .filter(isParsedFileRef);
  }

  const value = String(rawFiles).trim();
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed
        .map(file => parseFileRef(file))
        .filter(isParsedFileRef);
    }
  } catch {
  }

  return value
    .split(',')
    .map(file => parseFileRef(file))
    .filter(isParsedFileRef);
};

const buildMemoryFiles = (rawFiles?: string | string[]): MemoryFile[] => {
  const rawRefs = normalizeRawFileRefs(rawFiles);

  return rawRefs.map(rawRef => {
    const candidateName = rawRef.fileName || rawRef.fileId || rawRef.url || '';
    const typeFromMime = getFileTypeFromMime(rawRef.mimeType);
    const type = typeFromMime !== 'unknown' ? typeFromMime : getFileType(candidateName);

    if (rawRef.url && isHttpUrl(rawRef.url)) {
      return {
        id: rawRef.fileId || rawRef.url,
        url: rawRef.url,
        type
      } satisfies MemoryFile;
    }

    const fileId = rawRef.fileId;

    if (!fileId) {
      return {
        id: candidateName,
        url: candidateName,
        type,
      } satisfies MemoryFile;
    }

    return {
      id: fileId,
      url: type === 'image' ? getFilePreviewUrl(fileId) : getFileViewUrl(fileId),
      type: type === 'unknown' ? 'image' : type
    } satisfies MemoryFile;
  });
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username, memoryId } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: 'Memory Not Found | AuraPages',
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  const memory = user.memories.find(m => m.$id === memoryId);
  
  if (!memory) {
    return {
      title: 'Memory Not Found | AuraPages',
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  const memoryName = isQuillDelta(memory.name) ? deltaToPlainText(memory.name) : memory.name;
  const date = new Date(memory.timestamp || memory.$createdAt).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const title = `${user.name}'s Memory - ${memoryName}`;
  const description = `${user.name} (@${user.username}) shared a memory from ${date}! Check it out on AuraPages.`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      title,
      description,
    },
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
  const { cleanDescription, song } = parseDescriptionWithSong(memory.description);
  const descriptionHtml = isQuillDelta(cleanDescription) ? deltaToHtml(cleanDescription) : cleanDescription;
  const tagBackgroundColor = normalizeTagColor(memory.tagColor) || theme.accent;
  const tagTextColor = getContrastColor(tagBackgroundColor);
  const tagBorderColor = tagTextColor === '#000000' ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.28)';
  const tagColorEncrypted = typeof memory.tagColorEncrypted === 'string' ? memory.tagColorEncrypted : String(memory.tagColorEncrypted ?? '');

  const memoryFiles = buildMemoryFiles(memory.files);

  return (
    <main className={`min-h-screen ${theme.surface} ${theme.onSurface} ${theme.font || ''} relative`}>
      <ThemeBackground theme={user.theme} />
      <MemoryScrollChrome
        accentColor={theme.accent}
        fabBackgroundClass={theme.fabBackground}
        fabIconClass={theme.fabIcon}
      />
      
      <header className={`w-full border-b ${theme.outline} ${theme.surface} relative z-20`}>
        <div className="w-full max-w-6xl mx-auto px-4 py-2.5 flex justify-between items-center">
          <Link href="https://aurachieve.com" className={`font-garamond text-xl font-bold hover:opacity-70 transition-opacity ${theme.onSurface}`}>
            AurAchieve
          </Link>
          <div className={`text-xs font-semibold px-3 py-1 rounded-full opacity-80 ${theme.primaryContainer} ${theme.onPrimaryContainer}`}>
            AuraPage
          </div>
        </div>
      </header>

      <div className="w-full max-w-5xl mx-auto px-4 lg:px-8 pt-8 pb-6 lg:pt-10 lg:pb-8 relative z-10">
        <Link 
          href={`/${username}`}
          className={`inline-flex items-center gap-2 mb-8 text-sm font-medium ${theme.onSurfaceVariant} hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current`}
        >
          <ArrowLeft size={20} />
          <span>Back to {user.name}'s profile</span>
        </Link>

        <article>
          <h1 
            className={`memory-title-hero text-4xl md:text-5xl font-bold leading-tight mb-4 ${theme.onSurface}`}
            style={{ viewTransitionName: `memory-title-${memory.$id}` }}
            dangerouslySetInnerHTML={{ __html: nameHtml }}
          />

          <div className={`flex flex-wrap gap-3 text-sm mb-8 ${theme.onSurfaceVariant}`}>
            {memory.timestamp && (
              <div className="inline-flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(memory.timestamp).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
            {memory.location && (
              <div className="inline-flex items-center gap-2">
                <MapPin size={16} />
                <span>{memory.location}</span>
              </div>
            )}
            {memory.tag && (
              <div 
                className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1`}
                style={{ 
                  backgroundColor: tagBackgroundColor,
                  color: tagTextColor,
                  border: `1px solid ${tagBorderColor}`,
                }}
              >
                <Tag size={12} />
                <span>{memory.tag}</span>
              </div>
            )}
            {memory.mood && (
              <div className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${theme.primaryContainer} ${theme.onPrimaryContainer}`}>
                <span className="text-sm">Mood: {memory.mood}</span>
              </div>
            )}
          </div>

        </article>
      </div>

      <section
        className={`relative z-10 w-full min-h-screen rounded-t-[2.1rem] border-x border-t ${theme.divider} ${theme.readingSurface} ${theme.readingOnSurface}`}
        aria-label="Memory reading area"
      >
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-10 py-7 md:py-10">
          {memoryFiles.length > 0 && (
            <section className={`pb-8 mb-8 border-b ${theme.divider}`} aria-label="Memory attachments">
              <MemoryFiles
                files={memoryFiles}
                themeRadius={theme.radius}
                outlineClass={theme.outline}
                surfaceContainerClass={theme.surfaceElevated}
                onSurfaceVariantClass={theme.onSurfaceVariant}
              />
            </section>
          )}

          <section aria-label="Memory description">
            <div 
              className={`prose prose-lg max-w-none leading-relaxed ${theme.readingOnSurface}`}
              style={{
                color: 'inherit'
              }}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </section>

          {song && (
            <section className="mt-10 pt-8 border-t border-white/10" aria-label="Listened to soundtrack">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] opacity-70">
                <Music2 size={16} />
                <span>Been listening to</span>
              </div>

              <div className={`overflow-hidden border ${theme.outline} ${theme.surfaceContainer} ${theme.radius}`}>
                <div className="grid gap-0 md:grid-cols-[160px_1fr]">
                  <div className="relative min-h-[160px] bg-black/10">
                    <img
                      src={song.artworkUrl100}
                      alt={`${song.trackName} by ${song.artistName}`}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-5 md:p-6 flex flex-col justify-between gap-5">
                    <div>
                      <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${theme.onSurfaceVariant}`}>
                        Apple Music soundtrack
                      </p>
                      <h2 className={`mt-2 text-2xl font-bold ${theme.onSurface}`}>
                        {song.trackName}
                      </h2>
                      <p className={`mt-1 text-base ${theme.onSurfaceVariant}`}>
                        {song.artistName}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://aurachieve.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${theme.primaryContainer} ${theme.onPrimaryContainer} hover:opacity-90 transition-opacity`}
                      >
                        <Download size={16} />
                        <span>Download AurAchieve to listen</span>
                      </a>

                      <a
                        href={song.trackViewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border ${theme.outline} ${theme.onSurface} hover:opacity-80 transition-opacity`}
                      >
                        <ExternalLink size={16} />
                        <span>Open on Apple Music</span>
                      </a>
                    </div>

                    <p className={`text-sm ${theme.onSurfaceVariant}`}>
                      Listening is available in the AurAchieve app. This page only shows the track details.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <footer className={`w-full border-t ${theme.divider}`}>
          <div className="w-full max-w-6xl mx-auto px-4 lg:px-10 py-6 text-center">
            <a
              href="https://aurachieve.com"
              className={`${theme.primary} hover:underline font-medium`}
            >
              Get your own Aura Page for free
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}
