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
import { AlbumDto } from '../dto/albums.dto';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';
import { AlbumsService } from '../services/albums.service';

@Controller('album')
export class AlbumsController {
  error = new ErrorHandler();
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<IAlbum[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | AlbumDto> {
    return (
      (await this.albumsService.findOne(id)) || this.error.notFound('Album')
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return (
      (await this.albumsService.update(updateAlbumDto, id)) ||
      this.error.notFound('Album')
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Album | void> {
    return (
      (await this.albumsService.delete(id)) || this.error.notFound('Album')
    );
  }
}
