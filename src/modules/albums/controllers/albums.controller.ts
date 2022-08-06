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
} from '@nestjs/common';
import { Album } from '@prisma/client';
import { ErrorHandler } from 'src/helpers/errorHandler';
import { HttpExceptionFilter } from 'src/modules/logger/httpexception-filter.service';
import { MyLogger } from 'src/modules/logger/logger.service';
import { AlbumDto } from '../dto/albums.dto';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';
import { AlbumsService } from '../services/albums.service';

@Controller('album')
export class AlbumsController {
  error = new ErrorHandler();
  constructor(
    private readonly albumsService: AlbumsService,
    private myLogger: MyLogger,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<IAlbum[]> {
    this.myLogger.verbose(`Loading all albums..`);
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | AlbumDto> {
    this.myLogger.verbose(`Getting album with id ${id}`);
    return (
      (await this.albumsService.findOne(id)) || this.error.notFound('Album')
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    this.myLogger.verbose(
      `Creating a new album, data: ${JSON.stringify(createAlbumDto)}`,
    );
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    this.myLogger.verbose(`Updating album with id ${id}`);
    return (
      (await this.albumsService.update(updateAlbumDto, id)) ||
      this.error.notFound('Album')
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Album | void> {
    this.myLogger.verbose(`Deleting album with id ${id}`);
    return (
      (await this.albumsService.delete(id)) || this.error.notFound('Album')
    );
  }
}
function UseFilters(arg0: any) {
  throw new Error('Function not implemented.');
}
