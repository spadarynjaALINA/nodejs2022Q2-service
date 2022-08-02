import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  HttpStatus,
} from '@nestjs/common';

import { ErrorHandler } from 'src/helpers/errorHandler';

import { FavoritesResponse } from '../dto/add-favorites.dto';

import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
export class FavoritesController {
  error = new ErrorHandler();
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<FavoritesResponse> {
    return await this.favoritesService.findAll();
  }

  @Post('/:type/:id')
  @HttpCode(HttpStatus.CREATED)
  async add(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return (
      (await this.favoritesService.add(type, id)) ?? this.error.notExist(type)
    );
  }

  @Delete('/:type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return (
      (await this.favoritesService.delete(type, id)) ??
      this.error.notFound(type)
    );
  }
}
