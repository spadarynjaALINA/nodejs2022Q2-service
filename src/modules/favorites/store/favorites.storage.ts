import { Injectable } from '@nestjs/common';

import { BD } from 'src/bd';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
import { FavoritesResponse } from '../dto/add-favorites.dto';
import { FavoritesStore } from '../schemas/favorites.interface';

@Injectable()
export class InMemoryFavoritesStore implements FavoritesStore {
  bd = new BD();
  favorites = this.bd.favorites;
  error = new ErrorHandler();
  all(): FavoritesResponse {
    return {
      artists: this.bd.artists,
      albums: this.bd.albums,
      tracks: this.bd.tracks,
    };
  }

  add(type: string, id: string): void {
    switch (type) {
      case 'artist':
        if (!this.bd.artists.find((item) => item.id === id)) {
          this.error.notExist(type);
        } else {
          if (!this.bd.favorites.artists.find((item: string) => item === id)) {
            this.favorites.artists.push(id);
            this.error.alreadyExist(type);
          }
        }
        break;
      case 'album':
        if (!this.bd.albums.find((item) => item.id === id)) {
          this.error.notExist(type);
        } else {
          if (!this.bd.favorites.albums.find((item: string) => item === id)) {
            this.favorites.albums.push(id);
            this.error.alreadyExist(type);
          }
        }
        break;
      case 'track':
        if (!this.bd.tracks.find((item) => item.id === id)) {
          this.error.alreadyExist(type);
        } else {
          if (!this.bd.favorites.tracks.find((item: string) => item === id)) {
            this.favorites.tracks.push(id);
            this.error.alreadyExist(type);
          }
        }
        break;
    }
  }

  async delete(type: string, id: string): Promise<string | void> {
    switch (type) {
      case 'artist':
        if (!this.bd.artists.find((item) => item.id === id)) {
          return this.error.deleted(type);
        } else {
          if (this.bd.favorites.artists.find((item: string) => item === id)) {
            this.favorites.artists = this.favorites.artists.filter(
              (item) => item !== id,
            );

            this.error.deleted(type);
          } else {
            this.error.notExist(type);
          }
        }
        break;
      case 'album':
        if (!this.bd.albums.find((item) => item.id === id)) {
          return this.error.deleted(type);
        } else {
          if (this.bd.favorites.albums.find((item: string) => item === id)) {
            this.favorites.albums = this.favorites.albums.filter(
              (item) => item !== id,
            );
            this.error.deleted(type);
          } else {
            this.error.notExist(type);
          }
        }

        break;
      case 'track':
        if (!this.bd.tracks.find((item) => item.id === id)) {
          return this.error.deleted(type);
        } else {
          if (this.bd.favorites.tracks.find((item: string) => item === id)) {
            this.favorites.tracks = this.favorites.tracks.filter(
              (item) => item !== id,
            );
            this.error.deleted(type);
          } else {
            this.error.notExist(type);
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
