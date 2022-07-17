import { Injectable } from '@nestjs/common';
import { AlbumDto } from './modules/albums/dto/albums.dto';
import { ArtistDto } from './modules/artists/dto/artist.tdo';
import { FavoriteDto } from './modules/favorites/dto/favorites.dto';
import { TrackDto } from './modules/tracks/dto/track.dto';
import { IUser } from './modules/users/interfaces/user.interface';
@Injectable()
export class BD {
  albums: AlbumDto[] = [
    {
      id: 'cc2b06d7-4906-4a19-9935-06e9de2f9e23',
      name: 'name',

      year: 2002,
      artistId: '085f7d32-10c5-476e-9803-169dcb663e30',
    },
  ];
  artists: ArtistDto[] = [
    // {
    //   name: 'name',
    //   id: '085f7d32-10c5-476e-9803-169dcb663e30',
    //   grammy: true,
    // },
  ];
  tracks: TrackDto[] = [
    {
      id: '085f7d32-10c5-476e-9803-169dcb663e30',
      name: 'string',
      artistId: '085f7d32-10c5-476e-9803-169dcb663e30',
      albumId: 'cc2b06d7-4906-4a19-9935-06e9de2f9e23',
      duration: 123,
    },
  ];
  favorites: FavoriteDto = {
    artists: [],
    albums: [],
    tracks: [],
  };
  users: IUser[] = [
    {
      id: '085f7d32-10c5-476e-9803-169dcb663e30',
      login: 'login',
      password: '123',
      version: 1,
      createdAt: 1657961818145,
      updatedAt: 1657961818145,
    },
  ];

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
