import { AlbumDto } from 'src/modules/albums/dto/albums.dto';
import { IArtist } from 'src/modules/artists/interfaces/artist.interface';

import { TrackDto } from 'src/modules/tracks/dto/track.dto';

export interface FavoritesResponse {
  artists: IArtist[];
  albums: AlbumDto[];
  tracks: TrackDto[];
}
