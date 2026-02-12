import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface FindAllParams {
  page: number;
  limit: number;
  genre?: string;
  status?: string;
  sort: string;
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
  }

  async getTrending(limit: number) {
    const data = await this.prisma.anime.findMany({
      orderBy: { viewCount: 'desc' },
      take: limit,
      include: {
        genres: {
          include: { genre: true },
        },
      },
    });

    return {
      data: data.map((anime) => ({
        ...anime,
        genres: anime.genres.map((g) => g.genre),
      })),
    };
  }

  async getPopular(limit: number) {
    const data = await this.prisma.anime.findMany({
      orderBy: { popularity: 'desc' },
      take: limit,
      include: {
        genres: {
          include: { genre: true },
        },
      },
    });

    return {
      data: data.map((anime) => ({
        ...anime,
        genres: anime.genres.map((g) => g.genre),
      })),
    };
  }

  async findBySlug(slug: string) {
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
      throw new NotFoundException(`Anime with slug "${slug}" not found`);
    }

    // Increment view count
    await this.prisma.anime.update({
      where: { id: anime.id },
      data: { viewCount: { increment: 1 } },
    });

    return {
      ...anime,
      genres: anime.genres.map((g) => g.genre),
    };
  }

  async getEpisodes(slug: string) {
    const anime = await this.prisma.anime.findUnique({
      where: { slug },
      include: {
        episodes: {
          orderBy: { episodeNumber: 'asc' },
        },
      },
    });

    if (!anime) {
      throw new NotFoundException(`Anime with slug "${slug}" not found`);
    }

    return {
      animeId: anime.id,
      totalEpisodes: anime.episodes.length,
      episodes: anime.episodes,
    };
  }
}
