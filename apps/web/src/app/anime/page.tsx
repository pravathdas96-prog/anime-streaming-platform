import { AnimeCard } from '@/components/AnimeCard';

async function getAnimeList() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/anime?limit=20`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    if (!data?.data?.length) throw new Error('No anime data');
    return data;
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
  const categories = ['Action', 'Adventure', 'Drama', 'Fantasy', 'Supernatural', 'Long-running'];

  return (
    <div className="container mx-auto py-8">
      <section className="glass-panel rounded-[32px] px-6 py-8 md:px-10">
        <p className="text-sm uppercase tracking-[0.3em] text-secondary">Catalog</p>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold md:text-5xl">Browse Anime</h1>
            <p className="mt-3 max-w-2xl text-gray-300">
              Explore the starter catalog, jump into detail pages, and use the live API as the base for whatever you build next.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-200">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <select className="rounded-full border border-white/10 bg-card px-4 py-3 text-sm text-gray-200">
          <option>All Genres</option>
          <option>Action</option>
          <option>Adventure</option>
          <option>Comedy</option>
          <option>Drama</option>
        </select>
        <select className="rounded-full border border-white/10 bg-card px-4 py-3 text-sm text-gray-200">
          <option>All Status</option>
          <option>Airing</option>
          <option>Finished</option>
          <option>Upcoming</option>
        </select>
        <select className="rounded-full border border-white/10 bg-card px-4 py-3 text-sm text-gray-200">
          <option>Sort: Popularity</option>
          <option>Sort: Rating</option>
          <option>Sort: Recent</option>
        </select>
        <div className="ml-auto rounded-full border border-primary/30 bg-primary/10 px-5 py-3 text-sm text-primary">
          {animeList.length} titles ready
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {animeList.map((anime: any) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
