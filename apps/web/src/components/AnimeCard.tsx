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
    status?: string;
  };
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <a
      href={`/anime/${anime.slug}`}
      className="group relative rounded-lg overflow-hidden bg-card hover:scale-105 transition-transform duration-300"
    >
      <div className="aspect-[3/4] relative">
        <Image
          src={anime.posterUrl}
          alt={anime.titleEnglish}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition">
          {anime.titleEnglish}
        </h3>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span>{anime.rating}</span>
          </div>
          {anime.episodes && (
            <span>{anime.episodes} eps</span>
          )}
        </div>
      </div>

      {anime.status === 'AIRING' && (
        <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-xs font-bold rounded">
          AIRING
        </span>
      )}
    </a>
  );
}
