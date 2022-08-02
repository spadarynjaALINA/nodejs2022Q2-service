import { Module } from '@nestjs/common';
import { ArtistsController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';
import { InMemoryArtistsStore } from './store/artists.storage';

@Module({
  providers: [
    ArtistsService,
    {
      provide: 'ArtistsStore',
      useClass: InMemoryArtistsStore,
    },
  ],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
