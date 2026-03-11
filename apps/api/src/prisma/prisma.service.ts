import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const starterGenres = [
  { name: 'Action', slug: 'action' },
  { name: 'Adventure', slug: 'adventure' },
  { name: 'Comedy', slug: 'comedy' },
  { name: 'Drama', slug: 'drama' },
  { name: 'Fantasy', slug: 'fantasy' },
  { name: 'Supernatural', slug: 'supernatural' },
];

const starterAnime = [
  {
    slug: 'attack-on-titan',
    titleEnglish: 'Attack on Titan',
    titleRomaji: 'Shingeki no Kyojin',
    synopsis:
      'Many years ago, humanity was forced to retreat behind enormous walls to escape the terrifying Titans that roam the land outside their fortress.',
    type: 'TV' as const,
    episodeCount: 75,
    status: 'FINISHED' as const,
    season: 'SPRING' as const,
    year: 2013,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
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
    synopsis:
      'After his family is brutally murdered, Tanjiro Kamado joins an organization of demon slayers to find a cure for his sister who has turned into a demon.',
    type: 'TV' as const,
    episodeCount: 44,
    status: 'AIRING' as const,
    season: 'SPRING' as const,
    year: 2019,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
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
    synopsis:
      'A boy swallows a cursed talisman and becomes host to a powerful curse, joining a secret organization of sorcerers.',
    type: 'TV' as const,
    episodeCount: 47,
    status: 'AIRING' as const,
    season: 'FALL' as const,
    year: 2020,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
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
    synopsis:
      'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as One Piece.',
    type: 'TV' as const,
    episodeCount: 1000,
    status: 'AIRING' as const,
    season: 'FALL' as const,
    year: 1999,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    rating: 8.7,
    ratingCount: 150000,
    popularity: 99000,
    viewCount: 3000000,
    genreSlugs: ['action', 'adventure', 'comedy'],
  },
  {
    slug: 'naruto-shippuden',
    titleEnglish: 'Naruto Shippuden',
    titleRomaji: 'Naruto: Shippuuden',
    synopsis:
      'Naruto returns stronger, older, and more determined to protect the people he loves while facing the Akatsuki threat.',
    type: 'TV' as const,
    episodeCount: 500,
    status: 'FINISHED' as const,
    season: 'WINTER' as const,
    year: 2007,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/5/17407.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/5/17407.jpg',
    rating: 8.3,
    ratingCount: 112000,
    popularity: 94000,
    viewCount: 2100000,
    genreSlugs: ['action', 'adventure', 'drama'],
  },
  {
    slug: 'death-note',
    titleEnglish: 'Death Note',
    titleRomaji: 'Death Note',
    synopsis:
      'A brilliant student discovers a supernatural notebook and begins a cat-and-mouse battle with the world’s greatest detective.',
    type: 'TV' as const,
    episodeCount: 37,
    status: 'FINISHED' as const,
    season: 'FALL' as const,
    year: 2006,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
    rating: 8.6,
    ratingCount: 146000,
    popularity: 97000,
    viewCount: 2300000,
    genreSlugs: ['drama', 'fantasy', 'supernatural'],
  },
];

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    await this.ensureStarterData();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async ensureStarterData() {
    for (const genre of starterGenres) {
      await this.genre.upsert({
        where: { slug: genre.slug },
        update: {},
        create: genre,
      });
    }

    for (const anime of starterAnime) {
      const { genreSlugs, ...animeFields } = anime;

      let createdAnime = await this.anime.findUnique({
        where: { slug: anime.slug },
      });

      if (!createdAnime) {
        createdAnime = await this.anime.create({
          data: animeFields,
        });
      }

      for (const slug of genreSlugs) {
        const existingGenre = await this.genre.findUnique({ where: { slug } });
        if (!existingGenre) {
          continue;
        }

        await this.animeGenre.upsert({
          where: {
            animeId_genreId: {
              animeId: createdAnime.id,
              genreId: existingGenre.id,
            },
          },
          update: {},
          create: {
            animeId: createdAnime.id,
            genreId: existingGenre.id,
          },
        });
      }

      for (let episodeNumber = 1; episodeNumber <= Math.min(anime.episodeCount, 12); episodeNumber++) {
        await this.episode.upsert({
          where: {
            animeId_episodeNumber: {
              animeId: createdAnime.id,
              episodeNumber,
            },
          },
          update: {},
          create: {
            animeId: createdAnime.id,
            episodeNumber,
            title: `Episode ${episodeNumber}`,
            duration: 24 * 60,
          },
        });
      }
    }
  }
}
