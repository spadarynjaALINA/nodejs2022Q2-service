import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksController } from './controllers/tracks.controller';
import { InMemoryTracksStore } from './store/tracks.storage';

@Module({
  providers: [
    TracksService,
    {
      provide: 'TracksStore',
      useClass: InMemoryTracksStore,
    },
  ],
  controllers: [TracksController],
})
export class TracksModule {}
