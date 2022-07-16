import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { url } from 'inspector';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
import { URL } from 'url';
import { FavoriteDto } from '../dto/favorites.dto';
import { IFavorite } from '../interfaces/favorite.interface';
import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
export class FavoritesController {
  error = new ErrorHandler();
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async all(): Promise<IFavorite> {
    return await this.favoritesService.findAll();
  }

  @Put('/:type/:id')
  async add(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IFavorite> {
    return await this.favoritesService.add(type, id);
  }

  @Delete('/:type/:id')
  // @HttpCode(204)
  async delete(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string | void> {
    const track = await this.favoritesService.delete(type, id);
    if (track === null) return this.error.notFound('Favorites');
    return track;
  }
}
