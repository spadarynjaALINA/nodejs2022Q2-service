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
import { Artist } from '@prisma/client';
import { ErrorHandler } from 'src/helpers/errorHandler';
import { strGenerate } from 'src/helpers/str-generate';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/modules/logger/httpexception-filter.service';
import { MyLogger } from 'src/modules/logger/logger.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { IArtist } from '../interfaces/artist.interface';
import { ArtistsService } from '../services/artists.service';

@Controller('artist')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
export class ArtistsController {
  error = new ErrorHandler();
  strGenerate = new strGenerate();
  constructor(
    private readonly artistsService: ArtistsService,
    private myLogger: MyLogger,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<IArtist[]> {
    const args = [`artist/`, 'GET', 'artist'];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.artistsService.findAll()) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.artistsService.findAll();
    } else {
      this.error.serverError();
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | IArtist> {
    const args = [`artist/${id}`, 'GET', 'artist', id];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.artistsService.findOne(id)) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.artistsService.findOne(id);
    } else {
      this.error.notFound('artist', 'GET');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    const args = [`artist/`, 'POST', 'artist', JSON.stringify(createArtistDto)];
    const msg = this.strGenerate.postVerbose(args);
    this.myLogger.verbose(msg);
    if (this.artistsService.create(createArtistDto)) {
      const msg = this.strGenerate.postLog(args);
      this.myLogger.log(msg);
      return this.artistsService.create(createArtistDto);
    } else {
      this.error.serverError();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const args = [`artist/${id}`, 'PUT', 'artist', id];
    const msg = this.strGenerate.putVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.artistsService.update(updateArtistDto, id)) {
      const msg = this.strGenerate.putLog(args);
      this.myLogger.log(msg);
      return await this.artistsService.update(updateArtistDto, id);
    } else {
      this.error.notFound('artist', 'PUT');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Artist | void> {
    const args = [`artist/${id}`, 'DELETE', 'artist', id];
    const msg = this.strGenerate.deleteVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.artistsService.delete(id)) {
      const msg = this.strGenerate.deleteLog(args);
      this.myLogger.log(msg);
      return await this.artistsService.delete(id);
    } else {
      this.error.notFound('artist', 'DELETE');
    }
  }
}
