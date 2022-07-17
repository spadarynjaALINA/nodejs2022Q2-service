import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
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
  async all(): Promise<IArtist[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | ArtistDto> {
    const artist = await this.artistsService.findOne(id);
    if (!artist) return this.error.notFound('Artist');
    return artist;
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(updateArtistDto, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<string | void> {
    const track = await this.artistsService.delete(id);
    if (!track) return this.error.notFound('Track');
    return this.error.deleted('Track');
  }
}
