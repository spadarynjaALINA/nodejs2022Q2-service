import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Album } from '@prisma/client';
import { ErrorHandler } from 'src/helpers/errorHandler';
import { strGenerate } from 'src/helpers/str-generate';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/modules/logger/httpexception-filter.service';
import { MyLogger } from 'src/modules/logger/logger.service';
import { AlbumDto } from '../dto/albums.dto';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';
import { AlbumsService } from '../services/albums.service';

@Controller('album')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
export class AlbumsController {
  error = new ErrorHandler();
  strGenerate = new strGenerate();
  constructor(
    private readonly albumsService: AlbumsService,
    private myLogger: MyLogger,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<IAlbum[]> {
    const args = [`albums/`, 'GET', 'album'];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.albumsService.findAll()) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.albumsService.findAll();
    } else {
      this.error.serverError();
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | AlbumDto> {
    const args = [`albums/${id}`, 'GET', 'album', id];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.albumsService.findOne(id)) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.albumsService.findOne(id);
    } else {
      this.error.notFound('album', 'GET');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const args = [`albums/`, 'POST', 'album', JSON.stringify(createAlbumDto)];
    const msg = this.strGenerate.postVerbose(args);
    this.myLogger.verbose(msg);
    if (this.albumsService.create(createAlbumDto)) {
      const msg = this.strGenerate.postLog(args);
      this.myLogger.log(msg);
      return this.albumsService.create(createAlbumDto);
    } else {
      this.error.serverError();
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const args = [`albums/`, 'PUT', 'album', id];
    const msg = this.strGenerate.putVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.albumsService.update(updateAlbumDto, id)) {
      const msg = this.strGenerate.putLog(args);
      this.myLogger.log(msg);
      return await this.albumsService.update(updateAlbumDto, id);
    } else {
      this.error.notFound('album', 'PUT');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Album | void> {
    const args = [`albums/${id}`, 'DELETE', 'album', id];
    const msg = this.strGenerate.deleteVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.albumsService.delete(id)) {
      const msg = this.strGenerate.deleteLog(args);
      this.myLogger.log(msg);
      return await this.albumsService.delete(id);
    } else {
      this.error.notFound('album', 'DELETE');
    }
  }
}
