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
  async all(): Promise<ITrack[]> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | TrackDto> {
    const track = await this.tracksService.findOne(id);
    if (!track) return this.error.notFound('Track');
    return track;
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.update(updateTrackDto, id);
    console.log(track);
    if (!track) return this.error.notFound('Track');
    return track;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<string | void> {
    const track = await this.tracksService.delete(id);
    if (!track) return this.error.notFound('Track');
    return this.error.deleted('Track');
  }
}
