import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    UsersModule,
    PrismaModule,
  ],
})
export class AppModule {}
