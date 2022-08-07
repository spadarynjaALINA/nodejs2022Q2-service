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
import { strGenerate } from 'src/helpers/str-generate';
import { MyLogger } from 'src/modules/logger/logger.service';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private myLogger: MyLogger,
  ) {}
  error = new ErrorHandler();
  strGenerate = new strGenerate();
  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<ITrack[]> {
    const args = [`track/`, 'GET', 'track'];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.tracksService.findAll()) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.tracksService.findAll();
    } else {
      this.error.serverError();
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void | TrackDto> {
    const args = [`track/`, 'GET', 'track'];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.tracksService.findOne(id)) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.tracksService.findOne(id);
    }
    this.error.notFound('track', 'GET');
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    const args = [`track/`, 'POST', 'track'];
    const msg = this.strGenerate.postVerbose(args);
    this.myLogger.verbose(msg);
    if (this.tracksService.create(createTrackDto)) {
      const msg = this.strGenerate.postLog(args);
      this.myLogger.log(msg);
      return this.tracksService.create(createTrackDto);
    } else {
      this.error.serverError();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const args = [`track/`, 'PUT', 'track'];
    const msg = this.strGenerate.putVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.tracksService.update(updateTrackDto, id)) {
      const msg = this.strGenerate.putLog(args);
      this.myLogger.log(msg);
      return await this.tracksService.update(updateTrackDto, id);
    } else {
      this.error.notFound('track', 'PUT');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<ITrack | void> {
    const args = [`track/`, 'DELETE', 'track'];
    const msg = this.strGenerate.deleteVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.tracksService.delete(id)) {
      const msg = this.strGenerate.deleteLog(args);
      this.myLogger.log(msg);
      return await this.tracksService.delete(id);
    } else {
      this.error.notFound('track', 'DELETE');
    }
  }
}
