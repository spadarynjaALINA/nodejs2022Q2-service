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

import { ErrorHandler } from 'src/helpers/errorHandler';
import { TracksService } from '../services/tracks.service';
import { TrackDto } from '../dto/track.dto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ITrack } from '../interfaces/track.interface';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  error = new ErrorHandler();
  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<ITrack[]> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | TrackDto> {
    return (
      (await this.tracksService.findOne(id)) || this.error.notFound('Track')
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return (
      (await this.tracksService.update(updateTrackDto, id)) ||
      this.error.notFound('Track')
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<ITrack | void> {
    return (
      (await this.tracksService.delete(id)) || this.error.notFound('Track')
    );
  }
}
