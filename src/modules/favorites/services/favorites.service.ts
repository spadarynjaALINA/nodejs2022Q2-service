import { Inject, Injectable } from '@nestjs/common';
import { FavoritesRepsonse } from '../dto/add-favorites.dto';
import { FavoriteDto } from '../dto/favorites.dto';
import { IFavorite } from '../interfaces/favorite.interface';
import { FavoritesStore } from '../schemas/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(@Inject('FavoritesStore') private storage: FavoritesStore) {}

  async add(type: string, id: string): Promise<void> {
    console.log(type, id, 'services');
    return this.storage.add(type, id);
  }

  async delete(type: string, id: string): Promise<string | void> {
    return await this.storage.delete(type, id);
  }

  async findAll(): Promise<FavoritesRepsonse> {
    return await this.storage.all();
  }
}
