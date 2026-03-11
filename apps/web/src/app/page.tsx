import { AnimeCard } from '@/components/AnimeCard';

async function getAnimeList() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/anime?limit=12`, {
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
      ],
    };
  }
}

export default async function HomePage() {
  const { data: animeList } = await getAnimeList();
  const spotlight = animeList[0];
  const featured = animeList.slice(0, 4);

  return (
    <div className="pb-12">
      <section className="container mx-auto grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel relative overflow-hidden rounded-[36px] px-6 py-8 md:px-10 md:py-12">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-primary/15 to-transparent lg:block" />
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-secondary">Free Anime Discovery</p>
          <h1 className="text-balance max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
            Track the shows everyone is talking about without paying for premium tools.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
            AnimeVault gives you a polished catalog, fast details pages, and a live API-backed demo on entirely free infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/anime"
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
            >
              Browse catalog
            </a>
            <a
              href={spotlight ? `/anime/${spotlight.slug}` : '/anime'}
              className="rounded-full border border-white/10 px-6 py-3 font-semibold text-gray-100 transition hover:border-secondary/60 hover:text-secondary"
            >
              Open spotlight
            </a>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-3xl font-semibold text-secondary">Free</p>
              <p className="mt-1 text-sm text-gray-400">Hosted on Vercel, Render, and Neon free tiers.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-3xl font-semibold text-secondary">{animeList.length}+</p>
              <p className="mt-1 text-sm text-gray-400">Starter anime records ready to browse right now.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-3xl font-semibold text-secondary">Live</p>
              <p className="mt-1 text-sm text-gray-400">API and frontend connected end-to-end.</p>
            </div>
          </div>
        </div>

        <aside className="glass-panel overflow-hidden rounded-[36px]">
          {spotlight && (
            <>
              <div
                className="min-h-[280px] bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.82)), url('${spotlight.posterUrl}')` }}
              />
              <div className="space-y-4 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-secondary">Tonight&apos;s pick</p>
                <h2 className="text-3xl font-semibold">{spotlight.titleEnglish}</h2>
                <p className="line-clamp-4 text-gray-300">{spotlight.synopsis}</p>
                <a href={`/anime/${spotlight.slug}`} className="inline-flex rounded-full bg-white px-5 py-3 font-semibold text-ink transition hover:bg-secondary">
                  See details
                </a>
              </div>
            </>
          )}
        </aside>
      </section>

      <section className="container mx-auto py-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">Trending now</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Most watched in the vault</h2>
          </div>
          <a href="/anime" className="text-sm font-semibold text-gray-300 transition hover:text-primary">View full catalog</a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12">
        <div className="glass-panel rounded-[32px] px-6 py-8 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-secondary">Why it works</p>
              <h2 className="mt-2 text-3xl font-semibold">A strong free-tier starter stack</h2>
            </div>
            <a href="https://animevault-api.onrender.com/api/v1/anime?limit=6" className="text-sm font-semibold text-gray-200 transition hover:text-primary">
              Inspect the API
            </a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-black/10 p-5">
              <p className="text-lg font-semibold">Fast frontend</p>
              <p className="mt-2 text-sm leading-7 text-gray-300">Next.js static and server-rendered pages keep the app fast on free hosting.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/10 p-5">
              <p className="text-lg font-semibold">Simple backend</p>
              <p className="mt-2 text-sm leading-7 text-gray-300">NestJS plus Prisma gives you room to grow without paying for managed extras yet.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/10 p-5">
              <p className="text-lg font-semibold">Starter content</p>
              <p className="mt-2 text-sm leading-7 text-gray-300">Seeded anime and fallback content make the experience feel alive from day one.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
