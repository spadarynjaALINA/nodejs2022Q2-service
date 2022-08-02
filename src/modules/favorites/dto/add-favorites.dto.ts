import { AlbumDto } from 'src/modules/albums/dto/albums.dto';
import { ArtistDto } from 'src/modules/artists/dto/artist.tdo';
import { TrackDto } from 'src/modules/tracks/dto/track.dto';

export interface FavoritesRepsonse {
  artists: ArtistDto[];
  albums: AlbumDto[];
  tracks: TrackDto[];
}
