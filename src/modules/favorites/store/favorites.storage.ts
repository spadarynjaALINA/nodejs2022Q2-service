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
    const typeEdit = `${type}s`;
    if (!this.bd[typeEdit].find((item) => item.id === id)) {

    } else if (this.favorites[typeEdit].find((item: string) => item === id)) {
      console.log('already in favorites');
      return this.error.alreadyExist(type);
    } else {
      this.favorites[typeEdit].push(id);
      console.log('added');
      HttpStatus.CREATED;
      return this.error.alreadyExist(type);
    }
  }

  async delete(type: string, id: string): Promise<string | void> {
    const typeEdit = `${type}s`;
    if (this.favorites[typeEdit].find((item: string) => item === id)) {
      this.favorites[typeEdit] = this.favorites[typeEdit].filter(
        (favorite: string) => favorite !== id,
      );

      return this.error.alreadyExist(type);
    } else {
      return this.error.deleted(type);
    }
  }

  findById(type, id: string) {
    const item = this.bd[type].find((i) => i.id === id);
    return item;
  }
}
