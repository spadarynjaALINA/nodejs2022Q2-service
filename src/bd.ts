import { Injectable } from '@nestjs/common';
import { AlbumDto } from './modules/albums/dto/albums.dto';
import { ArtistDto } from './modules/artists/dto/artist.tdo';
import { FavoriteDto } from './modules/favorites/dto/favorites.dto';
import { TrackDto } from './modules/tracks/dto/track.dto';
import { IUser } from './modules/users/interfaces/user.interface';
@Injectable()
export class BD {
  albums: AlbumDto[] = [];
  artists: ArtistDto[] = [];
  tracks: TrackDto[] = [];
  favorites: FavoriteDto = {
    artists: [],
    albums: [],
    tracks: [],
  };
  users: IUser[] = [];

  private static instance: IBD;
  constructor() {
    if (!BD.instance) {
      BD.instance = this;
    }
    return BD.instance;
  }
}
export interface IBD {
  albums: AlbumDto[];
  artists: ArtistDto[];
  tracks: TrackDto[];
  users: IUser[];
  favorites: FavoriteDto;
}
