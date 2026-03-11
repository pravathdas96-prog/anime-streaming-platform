import Image from 'next/image';
import { Star } from 'lucide-react';

interface AnimeCardProps {
  anime: {
    id: string;
    slug: string;
    titleEnglish: string;
    posterUrl: string;
    rating: number;
    episodes?: number;
    episodeCount?: number;
    status?: string;
  };
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const episodeLabel = anime.episodes ?? anime.episodeCount;

  return (
    <a
      href={`/anime/${anime.slug}`}
      className="group glass-panel relative overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-2"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={anime.posterUrl}
          alt={anime.titleEnglish}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-gray-400">
          <span>{anime.status || 'Catalog'}</span>
          <span>{episodeLabel ? `${episodeLabel} eps` : 'New drop'}</span>
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold transition group-hover:text-primary">
          {anime.titleEnglish}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span>{anime.rating}</span>
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">View details</span>
        </div>
      </div>

      {anime.status === 'AIRING' && (
        <span className="absolute left-3 top-3 rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black">
          AIRING
        </span>
      )}
    </a>
  );
}
