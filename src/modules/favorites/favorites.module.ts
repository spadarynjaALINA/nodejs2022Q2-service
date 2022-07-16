import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { InMemoryFavoritesStore } from './store/favorites.storage';

@Module({
  providers: [
    FavoritesService,
    {
      provide: 'FavoritesStore',
      useClass: InMemoryFavoritesStore,
    },
  ],

  controllers: [FavoritesController],
})
export class FavoritesModule {}
