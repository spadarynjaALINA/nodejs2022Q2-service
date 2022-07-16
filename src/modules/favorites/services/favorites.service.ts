import { Inject, Injectable } from '@nestjs/common';
import { FavoriteDto } from '../dto/favorites.dto';
import { IFavorite } from '../interfaces/favorite.interface';
import { FavoritesStore } from '../schemas/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(@Inject('FavoritesStore') private storage: FavoritesStore) {}

  async add(type: string, id: string): Promise<IFavorite> {
    console.log(type, id, 'services');
    return this.storage.add(type, id);
  }

  async delete(type: string, id: string): Promise<string> {
    return this.storage.delete(type, id);
  }

  async findAll(): Promise<IFavorite> {
    return this.storage.all();
  }
}
