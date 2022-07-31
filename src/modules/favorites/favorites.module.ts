import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
