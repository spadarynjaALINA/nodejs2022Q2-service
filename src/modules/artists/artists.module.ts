import { Module } from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistsController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [PrismaService, ArtistsService, MyLogger],
})
export class ArtistsModule {}
