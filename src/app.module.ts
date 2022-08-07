import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';

import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerMiddleware } from './modules/logger/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './modules/logger/httpexception-filter.service';
import { UsersController } from './modules/users/controllers/users.controller';
import { ArtistsController } from './modules/artists/controllers/artists.controller';
import { AlbumsController } from './modules/albums/controllers/albums.controller';
import { TracksController } from './modules/tracks/controllers/tracks.controller';
import { FavoritesController } from './modules/favorites/controllers/favorites.controller';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [AuthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        UsersController,
        ArtistsController,
        AlbumsController,
        TracksController,
        FavoritesController,
        ArtistsController,
        AuthController,
      );
  }
}
