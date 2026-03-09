import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { getProjectVersion } from '@/lib/version';

export default async function Home() {
  const version = getProjectVersion();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="flex items-center gap-3">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <Badge
            variant="secondary"
            className="font-mono text-[10px] opacity-70"
          >
            v{version}
          </Badge>
        </div>
      </main>
    </div>
  );
}
