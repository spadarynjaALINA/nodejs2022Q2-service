import { Module } from '@nestjs/common';
import { AlbumsController } from './controllers/albums.controller';

@Module({
  controllers: [AlbumsController],
})
export class AlbumsModule {}
