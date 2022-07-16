import { Module } from '@nestjs/common';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService,
    {
      provide: 'AlbumsStore',
      useClass: InMemoryAlbumsStore,
    },],
})
export class AlbumsModule {}
