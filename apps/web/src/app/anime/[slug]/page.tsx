import Image from 'next/image';
import { Star, Play, Plus } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

async function getAnime(slug: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/anime/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    // Mock data for demo
    const mockData: Record<string, any> = {
      'attack-on-titan': {
        id: '1',
        slug: 'attack-on-titan',
        titleEnglish: 'Attack on Titan',
        titleRomaji: 'Shingeki no Kyojin',
        synopsis: 'Many years ago, humanity was forced to retreat behind enormous walls to escape the terrifying Titans. These gigantic humanoid creatures are mysterious and their origins remain unknown.',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
        bannerUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
        rating: 9.0,
        ratingCount: 125000,
        episodes: 75,
        status: 'FINISHED',
        year: 2013,
        season: 'SPRING',
        type: 'TV',
        genres: [{ name: 'Action' }, { name: 'Drama' }, { name: 'Fantasy' }],
      },
      'demon-slayer': {
        id: '2',
        slug: 'demon-slayer',
        titleEnglish: 'Demon Slayer',
        titleRomaji: 'Kimetsu no Yaiba',
        synopsis: 'After his family is brutally murdered, Tanjiro Kamado joins an organization of demon slayers to find a cure for his sister who has turned into a demon.',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
        bannerUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
        rating: 8.5,
        ratingCount: 98000,
        episodes: 44,
        status: 'AIRING',
        year: 2019,
        season: 'SPRING',
        type: 'TV',
        genres: [{ name: 'Action' }, { name: 'Supernatural' }],
      },
    };
    return mockData[slug] || mockData['attack-on-titan'];
  }
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const anime = await getAnime(params.slug);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={anime.bannerUrl || anime.posterUrl}
          alt={anime.titleEnglish}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-48 h-72 relative flex-shrink-0 rounded-lg overflow-hidden shadow-2xl mx-auto md:mx-0">
            <Image
              src={anime.posterUrl}
              alt={anime.titleEnglish}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{anime.titleEnglish}</h1>
            {anime.titleRomaji && (
              <p className="text-xl text-gray-400 mb-4">{anime.titleRomaji}</p>
            )}

            {/* Rating & Meta */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="font-bold">{anime.rating}</span>
                <span className="text-gray-400">({anime.ratingCount?.toLocaleString()} reviews)</span>
              </div>
              <span className="text-gray-400">{anime.type}</span>
              <span className="text-gray-400">{anime.episodes} Episodes</span>
              <span className={`px-2 py-1 rounded text-sm ${
                anime.status === 'AIRING' ? 'bg-green-500/20 text-green-400' : 
                anime.status === 'FINISHED' ? 'bg-blue-500/20 text-blue-400' : 
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {anime.status}
              </span>
            </div>

            {/* Genres */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {anime.genres?.map((genre: any, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-semibold transition">
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition">
                <Plus className="w-5 h-5" />
                Add to List
              </button>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">{anime.synopsis}</p>
        </div>

        {/* Episodes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Episodes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: Math.min(anime.episodes || 12, 12) }, (_, i) => (
              <button
                key={i}
                className="p-4 bg-card hover:bg-card/80 rounded-lg text-center transition"
              >
                <span className="text-lg font-bold">EP {i + 1}</span>
              </button>
            ))}
          </div>
          {(anime.episodes || 0) > 12 && (
            <button className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition">
              View All Episodes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
