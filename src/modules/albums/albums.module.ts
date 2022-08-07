import { Module } from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, MyLogger],
})
export class AlbumsModule {}
