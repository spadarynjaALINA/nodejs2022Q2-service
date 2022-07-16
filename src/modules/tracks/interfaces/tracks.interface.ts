import { CreateTrackDto } from '../dto/create-track.dto';

import { UpdateTrackDto } from '../dto/update-track.dto';
import { ITrack } from './track.interface';

export interface TracksStore {
  all: () => ITrack[];
  findById: (id: string) => ITrack;
  create: (params: CreateTrackDto) => ITrack;
  update: (params: UpdateTrackDto, id: string) => ITrack;
  delete: (id: string) => string;
}
