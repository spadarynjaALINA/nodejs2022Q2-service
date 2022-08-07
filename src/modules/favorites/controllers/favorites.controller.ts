import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';

import { ErrorHandler } from 'src/helpers/errorHandler';
import { strGenerate } from 'src/helpers/str-generate';
import { HttpExceptionFilter } from 'src/modules/logger/httpexception-filter.service';
import { MyLogger } from 'src/modules/logger/logger.service';

import { FavoritesResponse } from '../dto/add-favorites.dto';

import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
@UseFilters(HttpExceptionFilter)
export class FavoritesController {
  error = new ErrorHandler();
  strGenerate = new strGenerate();
  constructor(
    private readonly favoritesService: FavoritesService,
    private myLogger: MyLogger,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<FavoritesResponse> {
    const args = [`favs`, 'GET', 'favorite'];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.favoritesService.findAll()) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.favoritesService.findAll();
    } else {
      this.error.serverError();
    }
  }

  @Post('/:type/:id')
  @HttpCode(HttpStatus.CREATED)
  async add(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const args = [`favs/${type}/${id}`, 'GET', 'favorite'];
    const msg = this.strGenerate.postVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.favoritesService.add(type, id)) {
      const msg = this.strGenerate.postLog(args);
      this.myLogger.log(msg);
      return await this.favoritesService.add(type, id);
    } else {
      this.error.notExist(type);
    }
  }

  @Delete('/:type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const args = [`favs/${type}/${id}`, 'GET', 'favorite'];
    const msg = this.strGenerate.deleteVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.favoritesService.delete(type, id)) {
      const msg = this.strGenerate.deleteLog(args);
      this.myLogger.log(msg);
      return await this.favoritesService.delete(type, id);
    } else {
      this.error.notFound(type, 'DELETE');
    }
  }
}
