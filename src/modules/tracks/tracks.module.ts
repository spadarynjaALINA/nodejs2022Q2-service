import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksController } from './controllers/tracks.controller';

@Module({
  providers: [TracksService],
  controllers: [TracksController]
})
export class TracksModule {}
