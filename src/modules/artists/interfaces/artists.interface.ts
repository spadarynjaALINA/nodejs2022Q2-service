import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { IArtist } from './artist.interface';

export interface ArtistsStore {
  all: () => IArtist[];
  findById: (id: string) => IArtist;
  create: (params: CreateArtistDto) => IArtist;
  update: (params: UpdateArtistDto) => IArtist;
  delete: (id: string) => string;
}
