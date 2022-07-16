import { Injectable } from '@nestjs/common';
import { FavoriteDto } from '../dto/favorites.dto';
import { IFavorite } from '../interfaces/favorite.interface';
import { FavoritesStore } from '../schemas/favorites.interface';

@Injectable()
export class InMemoryFavoritesStore implements FavoritesStore {
  private favorites: FavoriteDto = {
    artists: [''],
    albums: [''],
    tracks: [''],
  };

  all(): IFavorite {
    return this.favorites;
  }

  add(type: string, id: string): IFavorite {
    console.log('store', type, id);
    this.favorites[type].push(id);
    return this.favorites;
  }

  delete(type: string, id: string): string {
    if (this.favorites[type].find((item: string) => item === id)) {
      this.favorites[type] = this.favorites[type].filter(
        (favorite: string) => favorite !== id,
      );
      return `Favorite ${type} with id ${id} was deleted`;
    } else {
      return null;
    }
  }
}
