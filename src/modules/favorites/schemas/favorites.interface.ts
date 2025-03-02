import { AlbumDto } from 'src/modules/albums/dto/albums.dto';
import { ArtistDto } from 'src/modules/artists/dto/artist.tdo';
import { TrackDto } from 'src/modules/tracks/dto/track.dto';
import { IUser } from 'src/modules/users/interfaces/user.interface';
import { FavoritesResponse } from '../dto/add-favorites.dto';
export interface FavoritesStore {
  all: () => { artists: ArtistDto[]; albums: AlbumDto[]; tracks: TrackDto[] };

  add: (id: string, type: string) => void;

  delete: (id: string, type: string) => Promise<string | void>;
  findById: (
    type: string,
    id: string,
  ) => IUser | TrackDto | ArtistDto | AlbumDto;
}
