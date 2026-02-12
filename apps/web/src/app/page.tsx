import { AnimeCard } from '@/components/AnimeCard';

async function getAnimeList() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/anime?limit=12`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    // Return mock data for demo
    return {
      data: [
        {
          id: '1',
          slug: 'attack-on-titan',
          titleEnglish: 'Attack on Titan',
          synopsis: 'Humanity fights for survival against giant humanoid Titans.',
          posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
          rating: 9.0,
          episodes: 75,
          status: 'FINISHED',
          year: 2013,
        },
        {
          id: '2',
          slug: 'demon-slayer',
          titleEnglish: 'Demon Slayer',
          synopsis: 'A boy fights demons to save his sister.',
          posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
          rating: 8.5,
          episodes: 44,
          status: 'AIRING',
          year: 2019,
        },
        {
          id: '3',
          slug: 'jujutsu-kaisen',
          titleEnglish: 'Jujutsu Kaisen',
          synopsis: 'A boy swallows a cursed finger and joins a secret organization.',
          posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
          rating: 8.7,
          episodes: 47,
          status: 'AIRING',
          year: 2020,
        },
        {
          id: '4',
          slug: 'one-piece',
          titleEnglish: 'One Piece',
          synopsis: 'A pirate searches for the ultimate treasure.',
          posterUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
          rating: 8.7,
          episodes: 1000,
          status: 'AIRING',
          year: 1999,
        },
      ],
    };
  }
}

export default async function HomePage() {
  const { data: animeList } = await getAnimeList();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span className="text-primary">AnimeVault</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Stream your favorite anime in high quality
        </p>
        <a
          href="/anime"
          className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 rounded-lg font-semibold text-lg transition"
        >
          Browse Anime
        </a>
      </section>

      {/* Trending Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animeList.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>
    </div>
  );
}
