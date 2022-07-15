import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './src/module/user/user/user.controller';
import { UserController } from './modules/user/user/user.controller';
import { UsersController } from './modules/users/controllers/users.controller';
import { UsersModule } from './modules/users/users.module';
import { AlbumsService } from './modules/albums/albums.service';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TracksModule } from './modules/tracks/tracks.module';

@Module({
  imports: [UsersModule, AlbumsModule, ArtistsModule, FavoritesModule, TracksModule],
  controllers: [AppController, UserController, UsersController],
  providers: [AppService, AlbumsService],
})
export class AppModule {}
