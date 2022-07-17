import { forwardRef, Module } from '@nestjs/common';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistsService } from '../artists/services/artists.service';
import { InMemoryArtistsStore } from '../artists/store/artists.storage';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumsService } from './services/albums.service';
import { InMemoryAlbumsStore } from './store/album.storage';

@Module({
  controllers: [AlbumsController],
  imports: [forwardRef(() => ArtistsModule)],
  providers: [
    AlbumsService,
    {
      provide: 'AlbumsStore',
      useClass: InMemoryAlbumsStore,
    },
    ArtistsService,
    {
      provide: 'ArtistsStore',
      useClass: InMemoryArtistsStore,
    },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
