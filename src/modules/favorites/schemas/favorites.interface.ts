import { IFavorite } from '../interfaces/favorite.interface';

export interface FavoritesStore {
  all: () => IFavorite;

  add: (id: string, type: string) => IFavorite;

  delete: (id: string, type: string) => string;
}
