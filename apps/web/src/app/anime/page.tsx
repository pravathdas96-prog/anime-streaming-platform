import { AnimeCard } from '@/components/AnimeCard';

async function getAnimeList() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/anime?limit=20`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
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
        {
          id: '5',
          slug: 'naruto-shippuden',
          titleEnglish: 'Naruto Shippuden',
          synopsis: 'Naruto continues his quest to become Hokage.',
          posterUrl: 'https://cdn.myanimelist.net/images/anime/5/17407.jpg',
          rating: 8.3,
          episodes: 500,
          status: 'FINISHED',
          year: 2007,
        },
        {
          id: '6',
          slug: 'death-note',
          titleEnglish: 'Death Note',
          synopsis: 'A student discovers a notebook that can kill anyone.',
          posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
          rating: 8.6,
          episodes: 37,
          status: 'FINISHED',
          year: 2006,
        },
      ],
    };
  }
}

export default async function AnimePage() {
  const { data: animeList } = await getAnimeList();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Browse Anime</h1>
      
      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <select className="px-4 py-2 bg-card border border-gray-700 rounded-lg">
          <option>All Genres</option>
          <option>Action</option>
          <option>Adventure</option>
          <option>Comedy</option>
          <option>Drama</option>
        </select>
        <select className="px-4 py-2 bg-card border border-gray-700 rounded-lg">
          <option>All Status</option>
          <option>Airing</option>
          <option>Finished</option>
          <option>Upcoming</option>
        </select>
        <select className="px-4 py-2 bg-card border border-gray-700 rounded-lg">
          <option>Sort: Popularity</option>
          <option>Sort: Rating</option>
          <option>Sort: Recent</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animeList.map((anime: any) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
