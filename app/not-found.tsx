import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-xl">Sorry, the aura page you are looking for does not exist. This could be because this username doesn't exist or the user has disabled their aura page.</p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/"
          >
            Go Back Home
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Get your AuraPage with <a href="https://aurachieve.com" className="text-primary hover:underline">AurAchieve</a></p>
      </footer>
    </div>
  );
}