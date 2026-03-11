import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface FindAllParams {
  page: number;
  limit: number;
  genre?: string;
  status?: string;
  sort: string;
}

const mockAnime = [
  {
    id: '1',
    slug: 'attack-on-titan',
    titleEnglish: 'Attack on Titan',
    titleRomaji: 'Shingeki no Kyojin',
    synopsis:
      'Many years ago, humanity was forced to retreat behind enormous walls to escape the terrifying Titans that roam the land outside their fortress.',
    type: 'TV',
    episodeCount: 75,
    status: 'FINISHED',
    season: 'SPRING',
    year: 2013,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    rating: 9,
    ratingCount: 125000,
    popularity: 98000,
    viewCount: 2500000,
    genres: [{ name: 'Action', slug: 'action' }, { name: 'Drama', slug: 'drama' }, { name: 'Fantasy', slug: 'fantasy' }],
  },
  {
    id: '2',
    slug: 'demon-slayer',
    titleEnglish: 'Demon Slayer',
    titleRomaji: 'Kimetsu no Yaiba',
    synopsis:
      'After his family is brutally murdered, Tanjiro Kamado joins an organization of demon slayers to find a cure for his sister who has turned into a demon.',
    type: 'TV',
    episodeCount: 44,
    status: 'AIRING',
    season: 'SPRING',
    year: 2019,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    rating: 8.5,
    ratingCount: 98000,
    popularity: 95000,
    viewCount: 2000000,
    genres: [{ name: 'Action', slug: 'action' }, { name: 'Supernatural', slug: 'supernatural' }],
  },
  {
    id: '3',
    slug: 'jujutsu-kaisen',
    titleEnglish: 'Jujutsu Kaisen',
    titleRomaji: 'Jujutsu Kaisen',
    synopsis:
      'A boy swallows a cursed talisman and becomes host to a powerful curse, joining a secret organization of sorcerers.',
    type: 'TV',
    episodeCount: 47,
    status: 'AIRING',
    season: 'FALL',
    year: 2020,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    rating: 8.7,
    ratingCount: 85000,
    popularity: 92000,
    viewCount: 1800000,
    genres: [{ name: 'Action', slug: 'action' }, { name: 'Supernatural', slug: 'supernatural' }],
  },
  {
    id: '4',
    slug: 'one-piece',
    titleEnglish: 'One Piece',
    titleRomaji: 'One Piece',
    synopsis:
      'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as One Piece.',
    type: 'TV',
    episodeCount: 1000,
    status: 'AIRING',
    season: 'FALL',
    year: 1999,
    posterUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    rating: 8.7,
    ratingCount: 150000,
    popularity: 99000,
    viewCount: 3000000,
    genres: [
      { name: 'Action', slug: 'action' },
      { name: 'Adventure', slug: 'adventure' },
      { name: 'Comedy', slug: 'comedy' },
    ],
  },
];

function buildMockEpisodes(animeId: string, totalEpisodes: number) {
  return Array.from({ length: Math.min(totalEpisodes || 12, 12) }, (_, index) => ({
    id: `${animeId}-ep-${index + 1}`,
    animeId,
    episodeNumber: index + 1,
    title: `Episode ${index + 1}`,
    duration: 24 * 60,
  }));
}

function getMockAnimeList(params: FindAllParams) {
  const { page, limit, genre, status, sort } = params;

  let data = [...mockAnime];

  if (status) {
    data = data.filter((anime) => anime.status === status);
  }

  if (genre) {
    data = data.filter((anime) => anime.genres.some((item) => item.slug === genre));
  }

  if (sort === 'rating') {
    data.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'recent') {
    data.sort((a, b) => (b.year || 0) - (a.year || 0));
  } else {
    data.sort((a, b) => b.popularity - a.popularity);
  }

  const start = (page - 1) * limit;
  const paged = data.slice(start, start + limit);

  return {
    data: paged,
    meta: {
      currentPage: page,
      totalPages: data.length === 0 ? 0 : Math.ceil(data.length / limit),
      totalItems: data.length,
      itemsPerPage: limit,
    },
  };
}

function getMockAnimeBySlug(slug: string) {
  return mockAnime.find((anime) => anime.slug === slug);
}

@Injectable()
export class AnimeService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: FindAllParams) {
    const { page, limit, genre, status, sort } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (genre) {
      where.genres = {
        some: {
          genre: { slug: genre },
        },
      };
    }

    const orderBy: any = {};
    if (sort === 'popularity') orderBy.popularity = 'desc';
    if (sort === 'rating') orderBy.rating = 'desc';
    if (sort === 'recent') orderBy.createdAt = 'desc';

    try {
      const [data, total] = await Promise.all([
        this.prisma.anime.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: {
            genres: {
              include: { genre: true },
            },
          },
        }),
        this.prisma.anime.count({ where }),
      ]);

      if (total === 0) {
        return getMockAnimeList(params);
      }

      return {
        data: data.map((anime) => ({
          ...anime,
          genres: anime.genres.map((g) => g.genre),
        })),
        meta: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
        },
      };
    } catch {
      return getMockAnimeList(params);
    }
  }

  async getTrending(limit: number) {
    try {
      const data = await this.prisma.anime.findMany({
        orderBy: { viewCount: 'desc' },
        take: limit,
        include: {
          genres: {
            include: { genre: true },
          },
        },
      });

      if (data.length === 0) {
        return { data: mockAnime.slice(0, limit) };
      }

      return {
        data: data.map((anime) => ({
          ...anime,
          genres: anime.genres.map((g) => g.genre),
        })),
      };
    } catch {
      return { data: mockAnime.slice(0, limit) };
    }
  }

  async getPopular(limit: number) {
    try {
      const data = await this.prisma.anime.findMany({
        orderBy: { popularity: 'desc' },
        take: limit,
        include: {
          genres: {
            include: { genre: true },
          },
        },
      });

      if (data.length === 0) {
        return { data: mockAnime.slice(0, limit) };
      }

      return {
        data: data.map((anime) => ({
          ...anime,
          genres: anime.genres.map((g) => g.genre),
        })),
      };
    } catch {
      return { data: mockAnime.slice(0, limit) };
    }
  }

  async findBySlug(slug: string) {
    try {
      const anime = await this.prisma.anime.findUnique({
        where: { slug },
        include: {
          genres: { include: { genre: true } },
          episodes: {
            orderBy: { episodeNumber: 'asc' },
            take: 50,
          },
        },
      });

      if (!anime) {
        const mock = getMockAnimeBySlug(slug);
        if (!mock) {
          throw new NotFoundException(`Anime with slug "${slug}" not found`);
        }

        return {
          ...mock,
          episodes: buildMockEpisodes(mock.id, mock.episodeCount),
        };
      }

      await this.prisma.anime.update({
        where: { id: anime.id },
        data: { viewCount: { increment: 1 } },
      });

      return {
        ...anime,
        genres: anime.genres.map((g) => g.genre),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const mock = getMockAnimeBySlug(slug);
      if (!mock) {
        throw new NotFoundException(`Anime with slug "${slug}" not found`);
      }

      return {
        ...mock,
        episodes: buildMockEpisodes(mock.id, mock.episodeCount),
      };
    }
  }

  async getEpisodes(slug: string) {
    try {
      const anime = await this.prisma.anime.findUnique({
        where: { slug },
        include: {
          episodes: {
            orderBy: { episodeNumber: 'asc' },
          },
        },
      });

      if (!anime) {
        const mock = getMockAnimeBySlug(slug);
        if (!mock) {
          throw new NotFoundException(`Anime with slug "${slug}" not found`);
        }

        const episodes = buildMockEpisodes(mock.id, mock.episodeCount);
        return {
          animeId: mock.id,
          totalEpisodes: episodes.length,
          episodes,
        };
      }

      return {
        animeId: anime.id,
        totalEpisodes: anime.episodes.length,
        episodes: anime.episodes,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const mock = getMockAnimeBySlug(slug);
      if (!mock) {
        throw new NotFoundException(`Anime with slug "${slug}" not found`);
      }

      const episodes = buildMockEpisodes(mock.id, mock.episodeCount);
      return {
        animeId: mock.id,
        totalEpisodes: episodes.length,
        episodes,
      };
    }
  }
}

