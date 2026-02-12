import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('genre') genre?: string,
    @Query('status') status?: string,
    @Query('sort') sort: string = 'popularity',
  ) {
    return this.animeService.findAll({
      page: parseInt(page),
      limit: parseInt(limit),
      genre,
      status,
      sort,
    });
  }

  @Get('trending')
  getTrending(@Query('limit') limit: string = '10') {
    return this.animeService.getTrending(parseInt(limit));
  }

  @Get('popular')
  getPopular(@Query('limit') limit: string = '20') {
    return this.animeService.getPopular(parseInt(limit));
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.animeService.findBySlug(slug);
  }

  @Get(':slug/episodes')
  getEpisodes(@Param('slug') slug: string) {
    return this.animeService.getEpisodes(slug);
  }

  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
