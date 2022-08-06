import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { MyLogger } from '../logger/logger.service';

@Module({
  providers: [FavoritesService, MyLogger],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
