import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
import { FavoritesResponse } from '../dto/add-favorites.dto';
import { FavoritesService } from '../services/favorites.service';
@Controller('favs')
export class FavoritesController {
  error = new ErrorHandler();
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async all(): Promise<FavoritesResponse> {
    return await this.favoritesService.findAll();
  }

  @Post('/:type/:id')
  @HttpCode(201)
  async add(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return await this.favoritesService.add(type, id);
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  async delete(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string | void> {
    const track = await this.favoritesService.delete(type, id);

    return track;
  }
}
