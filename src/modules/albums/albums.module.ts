import { Module } from '@nestjs/common';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumsService } from './services/albums.service';
import { InMemoryAlbumsStore } from './store/album.storage';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'AlbumsStore',
      useClass: InMemoryAlbumsStore,
    },
  ],
})
export class AlbumsModule {}
