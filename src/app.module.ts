import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';

@Module({
  imports: [ArtistsModule, TracksModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
