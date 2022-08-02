import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackDto } from '../dto/track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ITrack } from '../interfaces/track.interface';
import { TracksStore } from '../interfaces/tracks.interface';

@Injectable()
export class TracksService {
  constructor(@Inject('TracksStore') private storage: TracksStore) {}

  async create(createTracksDto: CreateTrackDto): Promise<ITrack> {
    return this.storage.create(createTracksDto);
  }

  async delete(id: string): Promise<string> {
    return this.storage.delete(id);
  }

  async findAll(): Promise<ITrack[]> {
    return this.storage.all();
  }

  async findOne(id: string): Promise<TrackDto> {
    return this.storage.findById(id);
  }

  async update(updateTrackDto: UpdateTrackDto, id: string): Promise<ITrack> {
    return this.storage.update(updateTrackDto, id);
  }
}
