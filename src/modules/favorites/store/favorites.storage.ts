import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { BD } from 'src/bd';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
import { FavoritesRepsonse } from '../dto/add-favorites.dto';
import { FavoriteDto } from '../dto/favorites.dto';
import { IFavorite } from '../interfaces/favorite.interface';
import { FavoritesStore } from '../schemas/favorites.interface';

@Injectable()
export class InMemoryFavoritesStore implements FavoritesStore {
  bd = new BD();
  favorites = this.bd.favorites;
  error = new ErrorHandler();
  all(): FavoritesRepsonse {
    const favs = {
      artists: [],
      albums: [],
      tracks: [],
    };

    for (const key in this.favorites) {
      console.log(this.favorites[key], favs[key]);
      this.favorites[key].forEach((item) => {
        favs[key].push(this.findById(key, item));
      });
    }
    return favs;
  }

  add(type: string, id: string): void {
    switch (type) {
      case 'artist':
        console.log(
          this.bd.artists.find((item) => item.id === id),
          'switch',
          type,
          id,
          '-id',
        );
        if (!this.bd.artists.find((item) => item.id === id)) {
          return this.error.alreadyExist(type);
        } else {
          console.log('else');
          if (this.bd.favorites.artists.find((item: string) => item === id)) {
            console.log('already in favorites');
            this.error.alreadyExist(type);
          } else {
            this.favorites.artists.push(id);
            console.log('added');

            this.error.notExist(type);
          }
        }
        break;
      case 'album':
        if (!this.bd.albums.find((item) => item.id === id)) {
          return this.error.alreadyExist(type);
        } else {
          console.log('else');
          if (this.bd.favorites.albums.find((item: string) => item === id)) {
            console.log('already in favorites');
            this.error.alreadyExist(type);
          } else {
            this.favorites.albums.push(id);
            console.log('added');

            this.error.notExist(type);
          }
        }
        break;
      case 'track':
        if (!this.bd.tracks.find((item) => item.id === id)) {
          return this.error.alreadyExist(type);
        } else {
          console.log('else');
          if (this.bd.favorites.tracks.find((item: string) => item === id)) {
            console.log('already in favorites');
            this.error.alreadyExist(type);
          } else {
            this.favorites.tracks.push(id);
            console.log('added');
            this.error.notExist(type);
          }
        }
        break;
    }
  }

  async delete(type: string, id: string): Promise<string | void> {
    switch (type) {
      case 'artist':
        if (!this.bd.artists.find((item) => item.id === id)) {
          return this.error.alreadyExist(type);
        } else {
          console.log('else');
          if (this.bd.favorites.artists.find((item: string) => item === id)) {
            console.log('already in favorites');
            this.error.alreadyExist(type);
          } else {
            this.favorites.artists = this.favorites.artists.filter(
              (item) => item !== id,
            );
            console.log('added');

            this.error.notExist(type);
          }
        }
        break;
      case 'album':
        if (!this.bd.albums.find((item) => item.id === id)) {
          return this.error.alreadyExist(type);
        } else {
          console.log('else');
          if (this.bd.favorites.albums.find((item: string) => item === id)) {
            console.log('already in favorites');
            this.error.alreadyExist(type);
          } else {
            this.favorites.albums = this.favorites.albums.filter(
              (item) => item !== id,
            );
            console.log('added');

            this.error.deleted(type);
          }
        }
        break;
      case 'track':
        if (!this.bd.tracks.find((item) => item.id === id)) {
          return this.error.deleted(type);
        } else {
          console.log('else');
          if (this.bd.favorites.tracks.find((item: string) => item === id)) {
            console.log('already in favorites');
            this.error.alreadyExist(type);
          } else {
            this.favorites.tracks = this.favorites.tracks.filter(
              (item) => item !== id,
            );
            console.log('added');
            this.error.deleted(type);
          }
        }
        break;
    }
  }

  findById(type, id: string) {
    const item = this.bd[type].find((i) => i.id === id);
    return item;
  }
}
