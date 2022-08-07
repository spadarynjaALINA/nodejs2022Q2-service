import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksController } from './controllers/tracks.controller';
import { MyLogger } from '../logger/logger.service';

@Module({
  providers: [TracksService, MyLogger],
  controllers: [TracksController],
})
export class TracksModule {}
