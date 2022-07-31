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
import { Artist } from '@prisma/client';
import { ErrorHandler } from 'src/helpers/errorHandler';
import { ArtistDto } from '../dto/artist.tdo';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { IArtist } from '../interfaces/artist.interface';
import { ArtistsService } from '../services/artists.service';

@Controller('artist')
export class ArtistsController {
  error = new ErrorHandler();
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<IArtist[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | ArtistDto> {
    return (
      (await this.artistsService.findOne(id)) || this.error.notFound('Artist')
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return (
      (await this.artistsService.update(updateArtistDto, id)) ||
      this.error.notFound('Artist')
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Artist | void> {
    return (
      (await this.artistsService.delete(id)) || this.error.notFound('artist')
    );
  }
}
