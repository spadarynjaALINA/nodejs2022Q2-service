import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackDto } from '../dto/track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ITrack } from '../interfaces/track.interface';
import { TracksStore } from '../interfaces/tracks.interface';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class InMemoryTracksStore implements TracksStore {
  private tracks: TrackDto[] = [
    {
      id: '085f7d32-10c5-476e-9803-169dcb663e30',
      name: 'string',
      artistId: null,
      albumId: null,
      duration: 123,
    },
  ];

  all(): ITrack[] {
    return this.tracks;
  }
  findById(id: string): TrackDto | undefined {
    const track = this.tracks.find((track) => track.id === id);
    return track;
  }
  create(TrackDto: CreateTrackDto): ITrack {
    const newTrack = {
      ...TrackDto,
      id: uuidv4(),
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(params: UpdateTrackDto, id: string): TrackDto {
    this.tracks = this.tracks.map((track) => {
      console.log(params);
      if (track.id === id) {
        return Object.assign(track, params);
      }
      return track;
    });
    return this.findById(id);
  }
  delete(id: string): string {
    const track = this.findById(id);
    this.tracks = this.tracks.filter((Track) => Track.id !== id);
    return !!track ? `Track with id ${id} was deleted` : null;
  }
}
