import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create genres
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { slug: 'action' },
      update: {},
      create: { name: 'Action', slug: 'action' },
    }),
    prisma.genre.upsert({
      where: { slug: 'adventure' },
      update: {},
      create: { name: 'Adventure', slug: 'adventure' },
    }),
    prisma.genre.upsert({
      where: { slug: 'comedy' },
      update: {},
      create: { name: 'Comedy', slug: 'comedy' },
    }),
    prisma.genre.upsert({
      where: { slug: 'drama' },
      update: {},
      create: { name: 'Drama', slug: 'drama' },
    }),
    prisma.genre.upsert({
      where: { slug: 'fantasy' },
      update: {},
      create: { name: 'Fantasy', slug: 'fantasy' },
    }),
    prisma.genre.upsert({
      where: { slug: 'supernatural' },
      update: {},
      create: { name: 'Supernatural', slug: 'supernatural' },
    }),
  ]);

  console.log(`✅ Created ${genres.length} genres`);

  // Create anime
  const animeData = [
    {
      slug: 'attack-on-titan',
      titleEnglish: 'Attack on Titan',
      titleRomaji: 'Shingeki no Kyojin',
      synopsis: 'Many years ago, humanity was forced to retreat behind enormous walls to escape the terrifying Titans that roam the land outside their fortress.',
      type: 'TV' as const,
      episodeCount: 75,
      status: 'FINISHED' as const,
      season: 'SPRING' as const,
      year: 2013,
      posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
      rating: 9.0,
      ratingCount: 125000,
      popularity: 98000,
      viewCount: 2500000,
      genreSlugs: ['action', 'drama', 'fantasy'],
    },
    {
      slug: 'demon-slayer',
      titleEnglish: 'Demon Slayer',
      titleRomaji: 'Kimetsu no Yaiba',
      synopsis: 'After his family is brutally murdered, Tanjiro Kamado joins an organization of demon slayers to find a cure for his sister who has turned into a demon.',
      type: 'TV' as const,
      episodeCount: 44,
      status: 'AIRING' as const,
      season: 'SPRING' as const,
      year: 2019,
      posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
      rating: 8.5,
      ratingCount: 98000,
      popularity: 95000,
      viewCount: 2000000,
      genreSlugs: ['action', 'supernatural'],
    },
    {
      slug: 'jujutsu-kaisen',
      titleEnglish: 'Jujutsu Kaisen',
      titleRomaji: 'Jujutsu Kaisen',
      synopsis: 'A boy swallows a cursed talisman and becomes host to a powerful curse, joining a secret organization of sorcerers.',
      type: 'TV' as const,
      episodeCount: 47,
      status: 'AIRING' as const,
      season: 'FALL' as const,
      year: 2020,
      posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
      rating: 8.7,
      ratingCount: 85000,
      popularity: 92000,
      viewCount: 1800000,
      genreSlugs: ['action', 'supernatural'],
    },
    {
      slug: 'one-piece',
      titleEnglish: 'One Piece',
      titleRomaji: 'One Piece',
      synopsis: 'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as One Piece.',
      type: 'TV' as const,
      episodeCount: 1000,
      status: 'AIRING' as const,
      season: 'FALL' as const,
      year: 1999,
      posterUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
      rating: 8.7,
      ratingCount: 150000,
      popularity: 99000,
      viewCount: 3000000,
      genreSlugs: ['action', 'adventure', 'comedy'],
    },
  ];

  for (const anime of animeData) {
    const { genreSlugs, ...animeFields } = anime;
    
    const created = await prisma.anime.upsert({
      where: { slug: anime.slug },
      update: {},
      create: {
        ...animeFields,
        genres: {
          create: genreSlugs.map((slug) => ({
            genre: { connect: { slug } },
          })),
        },
      },
    });

    // Create some episodes
    for (let i = 1; i <= Math.min(anime.episodeCount || 12, 12); i++) {
      await prisma.episode.upsert({
        where: {
          animeId_episodeNumber: {
            animeId: created.id,
            episodeNumber: i,
          },
        },
        update: {},
        create: {
          animeId: created.id,
          episodeNumber: i,
          title: `Episode ${i}`,
          duration: 24 * 60,
        },
      });
    }

    console.log(`✅ Created anime: ${anime.titleEnglish}`);
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
