import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnimeVault | Free Anime Discovery Hub',
  description: 'Browse trending anime, explore standout series, and keep up with new favorites for free.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
          <nav className="container mx-auto flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-3 text-lg font-semibold uppercase tracking-[0.18em]">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                AV
              </span>
              <span>AnimeVault</span>
            </a>
            <div className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
              <a href="/" className="transition hover:text-primary">Home</a>
              <a href="/anime" className="transition hover:text-primary">Browse</a>
              <a href="/anime/attack-on-titan" className="transition hover:text-primary">Featured</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/anime"
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-200 transition hover:border-primary/40 hover:text-primary"
              >
                Explore
              </a>
              <a
                href="https://animevault-api.onrender.com/api/v1/anime/health"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                API Live
              </a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-white/10 py-10">
          <div className="container mx-auto flex flex-col gap-4 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold uppercase tracking-[0.2em] text-gray-200">AnimeVault</p>
              <p>Free-tier anime discovery app powered by Vercel, Render, and Neon.</p>
            </div>
            <div className="flex gap-5">
              <a href="/anime" className="transition hover:text-primary">Browse</a>
              <a href="https://animevault-api.onrender.com/api/v1/anime?limit=2" className="transition hover:text-primary">Sample API</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
