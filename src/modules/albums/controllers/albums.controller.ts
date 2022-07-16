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
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
import { AlbumDto } from '../dto/albums.dto';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';
import { AlbumsService } from '../services/albums.service';

@Controller('albums')
export class AlbumsController {
  error = new ErrorHandler();
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async all(): Promise<IAlbum[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | AlbumDto> {
    const Album = await this.albumsService.findOne(id);
    if (!Album) return this.error.notFound('Album');
    return Album;
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<string | void> {
    const track = await this.albumsService.delete(id);
    if (!track) return this.error.notFound('Track');
    return track;
  }
}
