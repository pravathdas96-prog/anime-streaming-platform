import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnimeVault - Stream Your Favorite Anime',
  description: 'A modern anime streaming platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <header className="border-b border-gray-800 sticky top-0 bg-background/95 backdrop-blur z-50">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-primary">
              AnimeVault
            </a>
            <div className="flex items-center gap-6">
              <a href="/" className="hover:text-primary transition">Home</a>
              <a href="/anime" className="hover:text-primary transition">Browse</a>
              <button className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition">
                Sign In
              </button>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-800 mt-16 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© 2024 AnimeVault. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
